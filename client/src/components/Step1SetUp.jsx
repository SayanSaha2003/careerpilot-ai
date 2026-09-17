import { useState } from "react";
import { motion } from "motion/react";
import {
    FaUserTie,
    FaMicrophone,
    FaChartLine,
    FaUser,
    FaBriefcase,
    FaFileArrowUp,
} from "react-icons/fa6";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Step1SetUp({ onStart }) {
    const { userData } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [resumeFile, setResumeFile] = useState(null);
    const [analysisIsDone, setAnalysisIsDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [projects, setProjects] = useState("");
    const [skills, setSkills] = useState("");
    const [resumeText, setResumeText] = useState("");
    const [interviewer, setInterviewer] = useState("female");

    const [loading, setLoading] = useState(false);

    // Handle Resume Upload and Analysis
    const handleUploadResume = async () => {
        setAnalyzing(true);

        const formdata = new FormData();
        formdata.append("resume", resumeFile);

        try {
            const result = await axios.post(
                serverUrl + "/api/interview/resume",
                formdata,
                { withCredentials: true },
            );
            console.log(result.data);

            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setResumeText(result.data.resumeText || "");

            setAnalysisIsDone(true);
            setAnalyzing(false);
        } catch (error) {
            console.error(error);
            setAnalyzing(false);
        }
    };

    // get the quistion from the server and start the interview
    const handleStart = async () => {
        setLoading(true);
        try {
            const result = await axios.post(
                serverUrl + "/api/interview/generate-questions",
                { role, experience, mode, projects, skills, resumeText },
                { withCredentials: true },
            );
            console.log(result.data, interviewer);
            if (userData) {
                dispatch(
                    setUserData({
                        ...userData,
                        credits: result.data.creditsLeft,
                    }),
                );
            }

            setLoading(false);
            onStart(result.data, interviewer);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020807] px-4 py-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mx-auto flex max-w-5xl overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#050c09] shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            >
                {/* Left Section */}
                <div className="hidden w-[40%] flex-col justify-between border-r border-emerald-500/10 bg-linear-to-br from-[#071b13] via-[#04110c] to-[#020807] p-6 md:flex">
                    <div>
                        {/* Logo */}
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-500/10">
                                <img
                                    src="/logo.png"
                                    alt="CareerPilotAI"
                                    className="h-7 w-7 object-contain"
                                />
                            </div>

                            <div>
                                <h2 className="text-xs font-semibold text-white">
                                    CareerPilotAI
                                </h2>
                                <p className="text-[9px] text-slate-500">
                                    AI Career Preparation
                                </p>
                            </div>
                        </div>

                        {/* Introduction */}
                        <div className="mt-20">
                            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-emerald-400">
                                AI Mock Interview
                            </p>

                            <h1 className="mt-2 text-3xl font-bold leading-tight text-white">
                                Start Your
                                <br />
                                <span className="text-emerald-400">
                                    AI Interview
                                </span>
                            </h1>

                            <p className="mt-4 max-w-xs text-xs leading-5 text-slate-400">
                                Practice real interview scenarios powered by AI.
                                Improve your communication, technical skills,
                                and confidence.
                            </p>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2.5">
                        <div className="flex items-center gap-3 rounded-lg border border-emerald-500/10 bg-white/3 px-3 py-2.5">
                            <FaUserTie className="text-sm text-emerald-400" />
                            <div>
                                <p className="text-[10px] font-medium text-white">
                                    Choose Role & Experience
                                </p>
                                <p className="text-[8px] text-slate-500">
                                    Personalize your interview
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-lg border border-emerald-500/10 bg-white/3 px-3 py-2.5">
                            <FaMicrophone className="text-sm text-emerald-400" />
                            <div>
                                <p className="text-[10px] font-medium text-white">
                                    Smart Voice Interview
                                </p>
                                <p className="text-[8px] text-slate-500">
                                    Practice naturally with AI
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-lg border border-emerald-500/10 bg-white/3 px-3 py-2.5">
                            <FaChartLine className="text-sm text-emerald-400" />
                            <div>
                                <p className="text-[10px] font-medium text-white">
                                    Performance Analytics
                                </p>
                                <p className="text-[8px] text-slate-500">
                                    Understand and improve
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full p-5 sm:p-6 md:w-[60%] lg:p-7">
                    {/* Heading */}
                    <div className="mb-5">
                        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-emerald-400">
                            Step 1 of 3
                        </p>

                        <h2 className="mt-1.5 text-xl font-bold text-white sm:text-2xl">
                            Interview Setup
                        </h2>

                        <p className="mt-1 text-[10px] text-slate-500">
                            Configure your interview before you begin.
                        </p>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-3">
                        {/* Role */}
                        <div className="relative">
                            <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500" />

                            <input
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                type="text"
                                placeholder="Enter role"
                                className="h-10 w-full rounded-lg border border-white/10 bg-white/3 pl-10 pr-3 text-xs text-white outline-none placeholder:text-slate-600 transition focus:border-emerald-500/60 focus:bg-emerald-500/3"
                            />
                        </div>

                        {/* Experience */}
                        <div className="relative">
                            <FaBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500" />

                            <input
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                type="text"
                                placeholder="Experience (e.g. 2 years)"
                                className="h-10 w-full rounded-lg border border-white/10 bg-white/3 pl-10 pr-3 text-xs text-white outline-none placeholder:text-slate-600 transition focus:border-emerald-500/60 focus:bg-emerald-500/3"
                            />
                        </div>

                        {/* Company */}
                        {/* <div className="relative">
                            <FaBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500" />

                            <input
                                type="text"
                                placeholder="Company Name (e.g. Google, Amazon)"
                                className="h-10 w-full rounded-lg border border-white/10 bg-white/3 pl-10 pr-3 text-xs text-white outline-none placeholder:text-slate-600 transition focus:border-emerald-500/60 focus:bg-emerald-500/3"
                            />
                        </div> */}

                        {/* Interview Mode */}
                        <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className="h-10 w-full cursor-pointer rounded-lg border border-white/10 bg-[#07110d] px-3 text-xs text-white outline-none focus:border-emerald-500/60"
                        >
                            <option value="Technical">
                                Technical Interview
                            </option>
                            <option value="HR">HR Interview</option>
                        </select>

                        {/* Interviewer */}
                        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/2 px-3 py-2.5">
                            <span className="text-xs font-medium text-slate-300">
                                Interviewer
                            </span>

                            <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/20 p-1">
                                <button
                                    onClick={() => setInterviewer("female")}
                                    type="button"
                                    className={`cursor-pointer rounded-md px-3 py-1.5 text-[10px] font-medium transition-all duration-200 ${
                                        interviewer === "female"
                                            ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                                            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                    }`}
                                >
                                    👩 Female
                                </button>

                                <button
                                    onClick={() => setInterviewer("male")}
                                    type="button"
                                    className={`cursor-pointer rounded-md px-3 py-1.5 text-[10px] font-medium transition-all duration-200 ${
                                        interviewer === "male"
                                            ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                                            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                    }`}
                                >
                                    👨 Male
                                </button>
                            </div>
                        </div>

                        {/* Strong Topic */}
                        <textarea
                            placeholder="Strong Topic (e.g. React JS, DBMS, OS) — Optional"
                            className="h-20 w-full resize-none rounded-lg border border-white/10 bg-white/3 p-3 text-xs text-white outline-none placeholder:text-slate-600 transition focus:border-emerald-500/60 focus:bg-emerald-500/3"
                        />

                        {/* Resume Upload Area */}
                        {!analysisIsDone && (
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() =>
                                    document
                                        .getElementById("resumeUpload")
                                        .click()
                                }
                                className="flex min-h-25 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-emerald-500/25 bg-emerald-500/2 p-3 transition hover:border-emerald-400/60 hover:bg-emerald-500/5"
                            >
                                <input
                                    id="resumeUpload"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) =>
                                        setResumeFile(e.target.files[0])
                                    }
                                    className="hidden"
                                />

                                <FaFileArrowUp className="text-2xl text-emerald-400" />

                                {resumeFile ? (
                                    <>
                                        <p className="mt-2 max-w-full truncate text-xs font-medium text-white">
                                            {resumeFile.name}
                                        </p>

                                        <motion.button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUploadResume();
                                            }}
                                            whileHover={{ scale: 1.04, y: -1 }}
                                            whileTap={{ scale: 0.96 }}
                                            className="mt-4 cursor-pointer rounded-md border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-[10px] font-medium text-emerald-400 transition-colors duration-200 hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-emerald-300"
                                        >
                                            {analyzing
                                                ? "Analysing..."
                                                : "Analyze Resume"}
                                        </motion.button>
                                    </>
                                ) : (
                                    <>
                                        <p className="mt-2 text-xs text-slate-300">
                                            Click to upload resume
                                        </p>
                                        <p className="mt-0.5 text-[9px] text-slate-600">
                                            (Optional)
                                        </p>
                                    </>
                                )}
                            </motion.div>
                        )}

                        {/* Resume Analysis Result */}
                        {analysisIsDone && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="rounded-lg border border-emerald-500/15 bg-white/3 p-5"
                            >
                                <h3 className="text-lg font-medium text-white">
                                    Resume Analysis Result
                                </h3>

                                {/* Projects */}
                                <div className="mt-3">
                                    <p className="text-md font-medium text-slate-400">
                                        Projects
                                    </p>

                                    <ul className="mt-2 space-y-1">
                                        {projects.map((project, index) => (
                                            <li
                                                key={index}
                                                className="text-xs text-slate-300"
                                            >
                                                • {project}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Skills */}
                                <div className="mt-3">
                                    <p className="text-md font-medium text-slate-400">
                                        Skills
                                    </p>

                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Start Interview */}
                        <motion.button
                            onClick={handleStart}
                            disabled={!role || !experience || loading}
                            type="button"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="h-10 w-full cursor-pointer rounded-lg bg-emerald-500 text-xs font-semibold text-black shadow-[0_0_20px_rgba(16,185,129,0.12)] transition hover:bg-emerald-400"
                        >
                            {loading ? "Starting..." : "Start Interview"}
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Step1SetUp;
