import { motion } from "motion/react";
import { FaMicrophone, FaRobot, FaClock, FaCircle } from "react-icons/fa6";
import { BsArrowRight } from "react-icons/bs";
import { PiMicrophoneSlashFill } from "react-icons/pi";
import femaleVideo from "../assets/videos/female2.mp4";
import maleVideo from "../assets/videos/male2.mp4";
import Timer from "../components/Timer";
import { useEffect, useRef, useState } from "react";
import { serverUrl } from "../App";
import axios from "axios";

function Step2Interview({ interviewData, interviewer,  onFinish }) {
    const { interviewId, questions, userName } = interviewData;

    const voiceGender = interviewer;
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [isAIPlaying, setIsAIPlaying] = useState(false);
    const videoRef = useRef(null);
    const [subtitle, setSubtitle] = useState("");

    const [isIntroPhase, setIsIntroPhase] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(1);
    const currentQuestion = questions[currentIndex];
    const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);
    const [answer, setAnswer] = useState("");
    const recognitionRef = useRef(null);
    const [isMicOn, setIsMicOn] = useState(true);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState("");

    // Load voices and set the selectedVoice based on voiceGender
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            if (!voices.length) return;

            // Female voice search
            const femaleVoice = voices.find(
                (v) =>
                    v.name.toLowerCase().includes("zira") ||
                    v.name.toLowerCase().includes("samantha") ||
                    v.name.toLowerCase().includes("female"),
            );
            if (voiceGender === "female" && femaleVoice) {
                setSelectedVoice(femaleVoice);
                return;
            }

            // Male voice search
            const maleVoice = voices.find(
                (v) =>
                    v.name.toLowerCase().includes("david") ||
                    v.name.toLowerCase().includes("mark") ||
                    v.name.toLowerCase().includes("male"),
            );
            if (voiceGender === "male" && maleVoice) {
                setSelectedVoice(maleVoice);
                return;
            }

            // If no specific voice is found, default voice
            setSelectedVoice(voices[0]);
            console.log("Available voices:", voices);
            console.log("Selected interviewer:", voiceGender);
            console.log("Selected voice:", voices[0]);
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, [voiceGender]);

    // Choosing AI video based on the voiceGender
    const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

    // Speech Synthesis function
    const speakText = (text) => {
        return new Promise((resolve) => {
            if (!window.speechSynthesis || !selectedVoice) {
                resolve();
                return;
            }
            window.speechSynthesis.cancel();

            // Add natural pauses
            const humanText = text
                .replace(/,/g, ", ... ")
                .replace(/\./g, ". ... ");

            // setting up the speech synthesis with voice properties
            const utterance = new SpeechSynthesisUtterance(humanText);
            utterance.voice = selectedVoice;
            utterance.rate = 0.92; // slightly slower than normal
            utterance.pitch = 1.05; // small warmth
            utterance.volume = 1;

            // Handling the start and end of speech synthesis
            utterance.onstart = () => {
                setIsAIPlaying(true); // eslint-disable-next-line
                stopMic();
                videoRef.current?.play();
            };
            utterance.onend = () => {
                videoRef.current?.pause();
                videoRef.current.currentTime = 0;
                setIsAIPlaying(false);

                if (isMicOn) {
                    // eslint-disable-next-line
                    startMic();
                }
                setTimeout(() => {
                    setSubtitle("");
                    resolve();
                }, 300);
            };

            // Starting the speech
            setSubtitle(text);
            window.speechSynthesis.speak(utterance);
        });
    };

    // Handling the introduction and question workflow
    useEffect(() => {
        if (!selectedVoice) return;

        const runInterview = async () => {
            // Introduction phase
            if (isIntroPhase) {
                await speakText(
                    `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`,
                );
                await speakText(
                    "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin.",
                );
                setIsIntroPhase(false);
            }

            // Question phase
            else if (currentQuestion) {
                await new Promise((resolve) => setTimeout(resolve, 800)); // 800ms delay before next question
                if (currentIndex === questions.length - 1) {
                    await speakText(
                        "Alright, this one might be a bit more challenging.",
                    );
                }
                await speakText(currentQuestion.question);
                if (isMicOn) {
                    startMic();
                }
            }
        };
        runInterview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedVoice, isIntroPhase, currentIndex]);

    // Timer Management
    useEffect(() => {
        if (isIntroPhase) return;
        if (!currentQuestion) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isIntroPhase, currentQuestion]);

    // Resetting timer for every question
    useEffect(() => {
        if (!isIntroPhase && currentQuestion) {
            // eslint-disable-next-line
            setTimeLeft(currentQuestion.timeLimit);
        }
    }, [currentQuestion, isIntroPhase, currentIndex]);

    // Speech Recognition Functionality
    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) return;

        // Setting up the speech recognition
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = true;
        recognition.interimResults = false;

        // Converting user's speech to answer
        recognition.onresult = (event) => {
            const transcript =
                event.results[event.results.length - 1][0].transcript;

            setAnswer((prev) => prev + " " + transcript);
        };

        recognitionRef.current = recognition;
    }, []);

    // Microphone Management
    const startMic = () => {
        if (recognitionRef.current && !isAIPlaying) {
            try {
                recognitionRef.current.start();
            } catch (error) {
                // Ignore the error if recognition has already started
                if (error.name !== "InvalidStateError") {
                    console.error("Microphone error:", error);
                }
            }
        }
    };
    const stopMic = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };
    const toggleMic = () => {
        if (isMicOn) {
            stopMic();
        } else {
            startMic();
        }
        setIsMicOn(!isMicOn);
    };

    // Submitting the answer to the server and ai speak the feedback
    const handleSubmit = async () => {
        if (isSubmitting) return;
        stopMic();
        setIsSubmitting(true);

        try {
            const result = await axios.post(
                serverUrl + "/api/interview/submit-answer",
                {
                    interviewId,
                    questionIndex: currentIndex,
                    answer,
                    timeTaken: currentQuestion.timeLimit - timeLeft,
                },
                { withCredentials: true },
            );

            // Setting feedback and speaking it out
            setFeedback(result.data.feedback);
            speakText(result.data.feedback);
            setIsSubmitting(false);
        } catch (error) {
            console.error("Error submitting answer:", error);
            setIsSubmitting(false);
        }
    };

    // Auto submit answer when time runs out
    useEffect(() => {
        if (isIntroPhase) return;
        if (!currentQuestion) return;

        if (timeLeft === 0 && !isSubmitting && !feedback) {
            // eslint-disable-next-line
            handleSubmit();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft]);

    // Moving to the next question
    const handleNext = async () => {
        setAnswer("");
        setFeedback("");

        // If it's the last question, finish the interview
        if (currentIndex + 1 >= questions.length) {
            finishInterview();
            return;
        }

        // transition msg
        await speakText("Alright, let's move to the next question.");

        setCurrentIndex(currentIndex + 1);
        setTimeout(() => {
            if (isMicOn) startMic();
        }, 500);
    };

    // Finishing Interview
    const finishInterview = async () => {
        stopMic();
        setIsMicOn(false);
        try {
            const result = await axios.post(
                serverUrl + "/api/interview/finish",
                { interviewId },
                { withCredentials: true },
            );

            console.log(result.data);
            onFinish(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            // Stop speech recognition
            if (recognitionRef.current) {
                recognitionRef.current.stop();
                recognitionRef.current.abort();
            }
            // Stop speech synthesis
            window.speechSynthesis.cancel();
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#020807] px-3 py-3 sm:px-5 sm:py-4 lg:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mx-auto max-w-6xl"
            >
                {/* Header */}
                <div className="mb-4 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-[#050c09] px-3 py-2.5 sm:px-5 sm:py-3">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                            <img src="/logo.png" alt="Logo" />
                        </div>

                        <div>
                            <h1 className="text-xs font-semibold text-white sm:text-sm">
                                CareerPilotAI
                            </h1>
                            <p className="text-[8px] text-slate-500 sm:text-[9px]">
                                AI Mock Interview
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1">
                        <FaCircle className="text-[6px] text-emerald-400" />
                        <span className="text-[9px] font-medium text-emerald-400">
                            LIVE
                        </span>
                    </div>
                </div>

                {/* Main */}
                <div className="grid gap-4 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr]">
                    {/* Left */}
                    <div className="mx-auto flex h-full w-full max-w-md flex-col justify-center gap-4 lg:mx-0 lg:max-w-none">
                        {/* AI Video */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="overflow-hidden rounded-xl border border-emerald-500/20 bg-[#050c09]"
                        >
                            <div className="relative overflow-hidden bg-[#07110d]">
                                <video
                                    src={videoSource}
                                    key={videoSource} // This ensures the video reloads when the source changes
                                    ref={videoRef}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="aspect-video w-full object-cover"
                                />

                                <div className="absolute bottom-3 left-3 rounded-full border border-emerald-400/20 bg-black/70 px-2.5 py-1 backdrop-blur-sm">
                                    <div className="flex items-center gap-1.5">
                                        <FaCircle className="text-[6px] text-emerald-400" />
                                        <span className="text-[9px] text-white">
                                            AI Interviewer
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Subtitle */}
                        {subtitle && (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.05 }}
                                className="rounded-xl border border-emerald-500/20 bg-[#050c09] p-4"
                            >
                                <p className=" text-sm  text-white-400 sm:text-sm">
                                    {subtitle}
                                </p>
                            </motion.div>
                        )}

                        {/* Status */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="rounded-xl border border-emerald-500/20 bg-[#050c09] p-4"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] text-slate-400">
                                    Interview Status
                                </p>

                                <span className="text-[9px] font-medium text-emerald-400">
                                    {isAIPlaying
                                        ? "AI Speaking"
                                        : "In Progress"}
                                </span>
                            </div>

                            <div className="my-4 h-px bg-white/5" />

                            {/* Timer */}
                            <div className="flex flex-col items-center">
                                <Timer
                                    timeLeft={timeLeft}
                                    totalTime={currentQuestion?.timeLimit}
                                />

                                <p className="mt-2 text-[8px] text-slate-500">
                                    Time Remaining
                                </p>
                            </div>

                            <div className="my-4 h-px bg-white/5" />

                            {/* Question Number */}
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-lg font-semibold text-emerald-400">
                                        {currentIndex + 1}
                                    </p>
                                    <p className="text-[8px] text-slate-500">
                                        Current
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-lg font-semibold text-white">
                                        {questions.length}
                                    </p>
                                    <p className="text-[8px] text-slate-500">
                                        Total
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right */}
                    <div className="space-y-4">
                        {/* Question */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="rounded-xl border border-emerald-500/20 bg-[#050c09] p-5 sm:p-6"
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                                    Question {currentIndex + 1} /{" "}
                                    {questions.length}
                                </span>

                                <div className="flex items-center gap-1.5 text-slate-500">
                                    <FaClock className="text-[9px]" />
                                    <span className="text-[9px]">
                                        {String(timeLeft)}
                                    </span>
                                </div>
                            </div>

                            <h2 className="text-base font-semibold leading-6 text-white sm:text-lg sm:leading-7 lg:text-xl">
                                {currentQuestion?.question}
                            </h2>
                        </motion.div>

                        {/* Answer */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.25 }}
                            className="rounded-xl border border-white/10 bg-[#050c09] p-4"
                        >
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-[10px] font-medium text-slate-300">
                                    Your Answer
                                </span>

                                <span className="text-[8px] text-slate-600">
                                    Be clear and concise
                                </span>
                            </div>

                            {/* Textarea */}
                            <textarea
                                onChange={(e) => setAnswer(e.target.value)}
                                value={answer}
                                placeholder="Type your answer here..."
                                className="h-40 w-full resize-none rounded-lg border border-white/10 bg-black/20 p-3 text-xs leading-5 text-white outline-none placeholder:text-slate-600 transition focus:border-emerald-500/40 focus:bg-emerald-500/3 sm:h-48 custom-scrollbar"
                            />

                            {/* Feedback & Submit */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="rounded-xl border border-emerald-500/20 bg-[#050c09] p-4"
                            >
                                {/* AI Feedback */}
                                {feedback && (
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <FaRobot className="text-sm text-emerald-400" />

                                            <h3 className="text-xs font-semibold text-emerald-400">
                                                AI Feedback
                                            </h3>
                                        </div>

                                        <p className="mt-3 text-xs leading-5 text-slate-300">
                                            {feedback}
                                        </p>
                                    </div>
                                )}

                                {/* Submit */}
                                <div className="mt-3 flex items-center gap-2">
                                    {/* Microphone */}
                                    <motion.button
                                        onClick={toggleMic}
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.94 }}
                                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 transition hover:bg-emerald-500/10"
                                    >
                                        {isMicOn ? (
                                            <FaMicrophone className="text-sm" />
                                        ) : (
                                            <PiMicrophoneSlashFill className="text-sm text-red-500" />
                                        )}
                                    </motion.button>

                                    {/* Submit */}
                                    {!feedback ? (
                                        <motion.button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            type="button"
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="h-10 flex-1 cursor-pointer rounded-lg bg-emerald-500 text-xs font-semibold text-black shadow-[0_0_20px_rgba(16,185,129,0.1)] transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-500/50 disabled:text-slate-400"
                                        >
                                            {isSubmitting
                                                ? "Submitting..."
                                                : "Submit Answer"}
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            onClick={handleNext}
                                            type="button"
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="h-10 flex-1 flex items-center justify-center gap-2 cursor-pointer rounded-lg bg-emerald-500 text-xs font-semibold text-black shadow-[0_0_20px_rgba(16,185,129,0.1)] transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-500/50 disabled:text-slate-400"
                                        >
                                            Next Question
                                            <BsArrowRight size={18} />
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Step2Interview;
