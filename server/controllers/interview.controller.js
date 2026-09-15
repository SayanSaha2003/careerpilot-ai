import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/openRouter.service.js";
import User from "../models/user.model.js";
import Interview from "../models/interview.model.js";

// extract structured data from the resume and analyze it using AI
export const analyzeResume = async (req, res) => {
    try {
        // Validate, read, and load the uploaded resume as a PDF.
        if (!req.file) {
            return res.status(400).json({ message: "Resume required" });
        }
        const filepath = req.file.path;
        const fileBuffer = await fs.promises.readFile(filepath);
        const uint8Array = new Uint8Array(fileBuffer);
        const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

        // Extract text from all pages of the PDF
        let resumeText = "";
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const content = await page.getTextContent();

            const pageText = content.items.map((item) => item.str).join(" ");
            resumeText += pageText + "\n";
        }
        resumeText = resumeText.replace(/\s+/g, " ").trim();

        // Send the extracted text to the AI service for analysis
        const messages = [
            {
                role: "system",
                content: `Extract structured data from resume.Return strictly JSON:
                {
                    "role": "string",                
                    "projects": ["project1", "project2"],
                    "experience": "string", 
                    "skills": ["skill1", "skill2"]
                }`,
            },
            {
                role: "user",
                content: resumeText,
            },
        ];
        const aiResponse = await askAi(messages);
        const parsed = JSON.parse(aiResponse);

        // Permanently delete the temporary file from the server
        fs.unlinkSync(filepath);

        // Return the structured data as a JSON response
        res.json({
            role: parsed.role,
            experience: parsed.experience,
            projects: parsed.projects,
            skills: parsed.skills,
            resumeText,
        });
    } catch (error) {
        // send the error to the server console
        console.error(error);

        // deletes the failed uploaded file from the server
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        // Send an error response to the client.
        return res.status(500).json({ message: error.message });
    }
};

// generate interview questions based on the user's information , deduct credits and update the interview model
export const generateQuestion = async (req, res) => {
    try {
        let { role, experience, mode, resumeText, projects, skills } = req.body;

        // Trim and validate the input fields
        role = role?.trim();
        experience = experience?.trim();
        mode = mode?.trim();
        if (!role || !experience || !mode) {
            return res
                .status(400)
                .json({ message: "Role, experience, and mode are required" });
        }
        const safeResume = resumeText?.trim() || "None";
        const projectText = projects?.length > 0 ? projects.join(", ") : "None";
        const skillsText = skills?.length > 0 ? skills.join(", ") : "None";

        // Check if the user is authenticated and has sufficient credits
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.credits < 50) {
            console.error("User has insufficient credits");
            return res.status(403).json({ message: "Insufficient credits" });
        }

        // Set up the messages for the AI service, including system and user prompts
        const systemPrompt = `You are a real human interviewer conducting a professional interview.
                                Speak in simple, natural English as if you are directly talking to the candidate.
                                Generate exactly 5 interview questions.
                                
                                Strict Rules:
                                - Each question must contain between 15 and 25 words.
                                - Each question must be a single complete sentence.
                                - Do NOT number them.
                                - Do NOT add explanations.
                                - Do NOT add extra text before or after.
                                - One question per line only.
                                - Keep language simple and conversational.
                                - Questions must feel practical and realistic.

                                Difficulty progression:
                                Question 1 → easy  
                                Question 2 → easy  
                                Question 3 → medium  
                                Question 4 → medium  
                                Question 5 → hard  

                                Make questions based on the candidate's role, experience,interviewMode, projects, skills, and resume details.`;
        const userPrompt = `Role: ${role}
                            Experience: ${experience}
                            InterviewMode: ${mode}
                            Projects: ${projectText}
                            Skills: ${skillsText}
                            Resume: ${safeResume}`;

        const messages = [
            {
                role: "system",
                content: systemPrompt,
            },
            {
                role: "user",
                content: userPrompt,
            },
        ];

        const aiResponse = await askAi(messages);

        // Questions are trimmed and filtered for non-empty strings, and limit to 5 questions.
        const questionsArray = aiResponse
            .split("\n")
            .map((q) => q.trim())
            .filter((q) => q.length > 0)
            .slice(0, 5);

        // Deduct 50 credits from the user's account
        user.credits -= 50;
        await user.save();

        // create a new interview object in the database
        const interview = await Interview.create({
            userId: req.userId,
            role,
            experience,
            mode,
            resumeText: safeResume,
            questions: questionsArray.map((q, index) => ({
                question: q,
                difficulty: ["easy", "easy", "medium", "medium", "hard"][index],
                timeLimit: [60, 60, 90, 90, 120][index], // Time limits in seconds
            })),
        });

        res.json({
            interviewId: interview._id,
            creditsLeft: user.credits,
            userName: user.name,
            questions: interview.questions,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "failed to generate questions": error });
    }
};

// Submit the candidate's answer , evaluate it using AI, and update the interview document( question schema)
export const submitAnswer = async (req, res) => {
    try {
        const { interviewId, questionIndex, answer, timeTaken } = req.body;

        const interview = await Interview.findById(interviewId);
        const question = interview.questions[questionIndex];

        // If the answer is empty
        if (!answer || answer.trim() === "") {
            question.answer = "";
            question.feedback = "No answer provided.";
            question.score = 0;

            await interview.save();
            return res.json({
                feedback: question.feedback,
            });
        }
        // If the time exceeded
        else if (timeTaken > question.timeLimit) {
            question.answer = answer;
            question.feedback = "Time limit exceeded. Answer not evaluated.";
            question.score = 0;

            await interview.save();
            return res.json({
                feedback: question.feedback,
            });
        }

        // Prepare messages to evaluate the candidate's answer
        const messages = [
            {
                role: "system",
                content: `You are a professional human interviewer evaluating a candidate's answer in a real interview.
                Evaluate naturally and fairly, like a real person would.
                Score the answer in these areas (0 to 10):

                1. Confidence – Does the answer sound clear, confident, and well-presented?
                2. Communication – Is the language simple, clear, and easy to understand?
                3. Correctness – Is the answer accurate, relevant, and complete?

                Rules:
                - Be realistic and unbiased.
                - Do not give random high scores.

                - If the answer is weak, score low.
                - If the answer is strong and detailed, score high.
                - Consider clarity, structure, and relevance.

                Calculate:
                finalScore = average of confidence, communication, and correctness (rounded to nearest whole number).

                Feedback Rules:
                - Write natural human feedback.
                - 10 to 15 words only.
                - Sound like real interview feedback.
                - Can suggest improvement if needed.
                - Do NOT repeat the question.
                - Do NOT explain scoring.
                - Keep tone professional and honest.

                Return ONLY valid JSON in this format:

                {
                  "confidence": number,
                  "communication": number,
                  "correctness": number,
                  "finalScore": number,
                  "feedback": "short human feedback"
                }`,
            },
            {
                role: "user",
                content: `Question: ${question.question}
                          Answer: ${answer}`,
            },
        ];

        // Recieve the AI's evaluation
        const aiResponse = await askAi(messages);
        const parsed = JSON.parse(aiResponse);

        // Update the interview document
        question.answer = answer;
        question.feedback = parsed.feedback;
        question.score = parsed.finalScore;
        question.communication = parsed.communication;
        question.confidence = parsed.confidence;
        question.correctness = parsed.correctness;
        await interview.save();

        // Return the feedback to the client
        res.json({
            feedback: question.feedback,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "failed to submit answer": error });
    }
};

// Finish the interview and calculate the final score and update the interview document
export const finishInterview = async (req, res) => {
    try {
        const { interviewId } = req.body;
        const interview = await Interview.findById(interviewId);

        // Calculate the final score and average scores
        const totalQuestions = interview.questions.length;
        const finalScore = Number(
            interview.questions.reduce((acc, q) => acc + q.score, 0) /
            totalQuestions
        ).toFixed(1);
        const confidence = Number(
            interview.questions.reduce((acc, q) => acc + q.confidence, 0) /
            totalQuestions
        ).toFixed(1);
        const communication = Number(
            interview.questions.reduce((acc, q) => acc + q.communication, 0) /
            totalQuestions
        ).toFixed(1);
        const correctness = Number(
            interview.questions.reduce((acc, q) => acc + q.correctness, 0) /
            totalQuestions
        ).toFixed(1);

        // Update the interview document with the final score and status
        interview.finalScore = finalScore;
        interview.status = "completed";
        await interview.save();

        // Return the final/avg scores and question-wise scores to the client
        res.json({
            finalScore,
            confidence,
            communication,
            correctness,
            questionWiseScores: interview.questions.map((q) => ({
                question: q.question,
                score: q.score,
                feedback: q.feedback,
                confidence: q.confidence,
                communication: q.communication,
                correctness: q.correctness,
            })),
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "failed to finish interview": error });
    }
};
