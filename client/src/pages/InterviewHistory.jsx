import { motion } from "motion/react";
import { FaArrowLeft, FaBriefcase, FaCircleExclamation } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { serverUrl } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InterviewHistory() {
    const [interviews, setInterviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch the user's interview history
    useEffect(() => {
        const getInterviews = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/interview/get-interviews`, {
                    withCredentials: true,
                });
                console.log(response.data);
                setInterviews(response.data);
            } catch (error) {
                console.error("Error fetching interviews:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getInterviews();
    }, []);

    // Format the date
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    // const interviews = [
    //     {
    //         id: 1,
    //         role: "Software Engineer",
    //         experience:
    //             "Entry-level software engineering role with hands-on experience in web applications and REST APIs.",
    //         mode: "Technical",
    //         finalScore: "8.2",
    //         status: "completed",
    //         createdAt: "Sep 17, 2026",
    //     },
    //     {
    //         id: 2,
    //         role: "Frontend Developer",
    //         experience:
    //             "Frontend development interview covering React, JavaScript and modern web development.",
    //         mode: "Technical",
    //         finalScore: "7.4",
    //         status: "completed",
    //         createdAt: "Sep 16, 2026",
    //     },
    //     {
    //         id: 3,
    //         role: "Full Stack Developer",
    //         experience:
    //             "Full stack interview covering frontend, backend, databases and API development.",
    //         mode: "Technical",
    //         finalScore: "5.8",
    //         status: "completed",
    //         createdAt: "Sep 15, 2026",
    //     },
    //     {
    //         id: 4,
    //         role: "Software Engineer",
    //         experience:
    //             "General software engineering interview focused on problem solving and technical skills.",
    //         mode: "HR",
    //         finalScore: "0",
    //         status: "incomplete",
    //         createdAt: "Sep 14, 2026",
    //     },
    // ];

    return (
        <div className="min-h-screen bg-[#020807] px-4 py-6 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mx-auto max-w-5xl"
            >
                {/* Header */}
                <div className="mb-6 flex items-center gap-3">
                    <motion.button
                        type="button"
                        onClick={() => navigate("/")}
                        whileHover={{ scale: 1.05, x: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-emerald-500/20 bg-[#050c09] text-slate-300 transition hover:border-emerald-500/40 hover:text-emerald-400"
                    >
                        <FaArrowLeft className="text-xs" />
                    </motion.button>

                    <div>
                        <h1 className="text-xl font-semibold text-white sm:text-2xl">
                            Interview History
                        </h1>

                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                            Track your past interviews and performance reports
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    {/* Interview Items */}
                    {isLoading ? (
                        <div className="text-center py-10">
                            <p className="text-slate-500">Loading interviews...</p>
                        </div>
                    ) : interviews.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-slate-500">No interviews found.</p>
                        </div>
                    ) : (
                        interviews.map((interview, index) => (
                            <motion.div
                                key={interview._id}
                                onClick={() => navigate("/report/" + interview._id)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{
                                    scale: 1.02,
                                    y: -1,
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                                }}
                                whileTap={{ scale: 0.97 }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.1,
                                    ease: "easeOut",
                                }}
                                className="group rounded-xl border border-white/10 bg-[#050c09] p-4 transition-colors duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/10 sm:p-5 cursor-pointer"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    {/* Left */}
                                    <div className="min-w-0 flex-1">
                                        {/* Role */}
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-400">
                                                <FaBriefcase className="text-[11px]" />
                                            </div>
                                            <h2 className="truncate text-sm font-semibold text-white sm:text-base">
                                                {interview.role}
                                            </h2>
                                        </div>
                                        {/* Experience */}
                                        <p className="mt-2 line-clamp-2 text-[10px] leading-5 text-slate-500 sm:text-xs">
                                            {interview.experience}
                                        </p>
                                        {/* Mode & Date */}
                                        <div className="mt-2 flex items-center gap-2 text-[9px] text-slate-600">
                                            <span>{interview.mode}</span>
                                            <span>•</span>
                                            <span>{formatDate(interview.createdAt)}</span>
                                        </div>
                                    </div>

                                    {/* Right */}
                                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                                        {/* Final Score */}
                                        <div className="text-center">
                                            <p className="text-lg font-semibold text-emerald-400">
                                                {interview.finalScore}
                                                <span className="text-[10px] text-slate-500">
                                                    /10
                                                </span>
                                            </p>

                                            <p className="text-[8px] text-slate-600">
                                                Overall Score
                                            </p>
                                        </div>

                                        {/* Status */}
                                        <div
                                            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${
                                                interview.status === "completed"
                                                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                                    : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                                            }`}
                                        >
                                            {interview.status === "completed" ? (
                                                <FaCheckCircle className="text-[8px]" />
                                            ) : (
                                                <FaCircleExclamation className="text-[8px]" />
                                            )}

                                            <span className="text-[9px] font-medium">
                                                {interview.status.charAt(0).toUpperCase() +
                                                    interview.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default InterviewHistory;
