import { motion } from "motion/react";
import { FaMicrophone, FaRobot, FaClock, FaCircle } from "react-icons/fa6";
import femaleVideo from "../assets/videos/female2.mp4";
import maleVideo from "../assets/videos/male2.mp4";
import Timer from "../components/Timer";

function Step2Interview({ interviewData, onFinish }) {
    // const { interviewId, questions, userName } = interviewData;

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
                                    src={femaleVideo}
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
                                    In Progress
                                </span>
                            </div>

                            <div className="my-4 h-px bg-white/5" />
    
                            {/* Timer */}
                            <div className="flex flex-col items-center">
                                <Timer timeLeft={20} totalTime={30} />

                                <p className="mt-2 text-[8px] text-slate-500">
                                    Time Remaining
                                </p>
                            </div>

                            <div className="my-4 h-px bg-white/5" />

                            {/* Question Number */}
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-lg font-semibold text-emerald-400">
                                        01
                                    </p>
                                    <p className="text-[8px] text-slate-500">
                                        Current
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-lg font-semibold text-white">
                                        05
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
                                    Question 01 / 05
                                </span>

                                <div className="flex items-center gap-1.5 text-slate-500">
                                    <FaClock className="text-[9px]" />
                                    <span className="text-[9px]">00:52</span>
                                </div>
                            </div>

                            <h2 className="text-base font-semibold leading-6 text-white sm:text-lg sm:leading-7 lg:text-xl">
                                What programming languages are you most
                                comfortable with, and how have you used them in
                                your projects?
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

                            <textarea
                                placeholder="Type your answer here..."
                                className="h-40 w-full resize-none rounded-lg border border-white/10 bg-black/20 p-3 text-xs leading-5 text-white outline-none placeholder:text-slate-600 transition focus:border-emerald-500/40 focus:bg-emerald-500/3 sm:h-48"
                            />

                            {/* Feedback & Submit */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="rounded-xl border border-emerald-500/20 bg-[#050c09] p-4"
                            >
                                {/* AI Feedback */}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <FaRobot className="text-sm text-emerald-400" />

                                        <h3 className="text-xs font-semibold text-emerald-400">
                                            AI Feedback
                                        </h3>
                                    </div>

                                    <p className="mt-3 text-xs leading-5 text-slate-300">
                                        Good answer. You clearly explained your
                                        experience and connected it with your
                                        projects.
                                    </p>
                                </div>

                                {/* Submit */}
                                <div className="mt-3 flex items-center gap-2">
                                    {/* Microphone */}
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.94 }}
                                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 transition hover:bg-emerald-500/10"
                                    >
                                        <FaMicrophone className="text-sm" />
                                    </motion.button>

                                    {/* Submit */}
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="h-10 flex-1 cursor-pointer rounded-lg bg-emerald-500 text-xs font-semibold text-black shadow-[0_0_20px_rgba(16,185,129,0.1)] transition hover:bg-emerald-400"
                                    >
                                        Submit Answer
                                    </motion.button>
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
