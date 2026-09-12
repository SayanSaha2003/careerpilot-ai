import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/openRouter.service.js";

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
                }`             
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
