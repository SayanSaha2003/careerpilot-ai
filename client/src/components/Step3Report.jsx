import { motion } from "motion/react";
import { FaArrowLeft, FaDownload, FaChartLine, FaCircleCheck, FaRobot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { downloadPDF } from "../utils/downloadPDF";

function Step3Report({ report }) {
    const navigate = useNavigate();

    if (!report) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#020807]">
                <div className="text-sm text-slate-400">Failed to load interview report.</div>
            </div>
        );
    }

    // For Overall Performance
    const finalScore = report.finalScore;
    const percentage = (finalScore / 10) * 100;
    let performanceText;
    let shortTagline;
    if (finalScore >= 8) {
        performanceText = "Ready for job opportunities.";
        shortTagline = "Excellent clarity and structured responses.";
    } else if (finalScore >= 5) {
        performanceText = "Needs minor improvement before interviews.";
        shortTagline = "Good foundation, refine articulation.";
    } else {
        performanceText = "Significant improvement required.";
        shortTagline = "Work on clarity and confidence.";
    }

    // For Skill Evaluation
    const skills = [
        {
            name: "Confidence",
            score: report.confidence,
        },
        {
            name: "Communication",
            score: report.communication,
        },
        {
            name: "Correctness",
            score: report.correctness,
        },
    ];

    // For Performance Trend
    const chartData = report.questionWiseScores.map((item, index) => ({
        question: `Q${index + 1}`,
        score: item.score,
    }));

    // For Question Breakdown
    const questions = report.questionWiseScores.map((item) => ({
        question: item.question,
        score: item.score,
        feedback: item.feedback,
    }));

    // Handle PDF Download
    const handleDownload = () => {
        downloadPDF(report);
    };

    return (
        <div className="min-h-screen bg-[#020807] px-4 py-6 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mx-auto max-w-6xl"
            >
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        {/* Back Button */}
                        <motion.button
                            type="button"
                            onClick={() => navigate("/history")}
                            whileHover={{ scale: 1.05, x: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-emerald-500/20 bg-[#050c09] text-slate-300 transition hover:border-emerald-500/40 hover:text-emerald-400"
                        >
                            <FaArrowLeft className="text-xs" />
                        </motion.button>

                        <div>
                            <h1 className="text-xl font-semibold text-white sm:text-2xl">
                                Interview Analytics Dashboard
                            </h1>

                            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                AI-powered performance insights
                            </p>
                        </div>
                    </div>

                    {/* Download Button */}
                    <motion.button
                    onClick={handleDownload}
                        type="button"
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-black shadow-[0_0_20px_rgba(16,185,129,0.1)] transition hover:bg-emerald-400"
                    >
                        <FaDownload className="text-[10px]" />
                        Download PDF
                    </motion.button>
                </div>

                {/* Dashboard */}
                <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
                    {/* Left Column */}
                    <div className="space-y-4">
                        {/* Overall Performance */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="rounded-xl border border-emerald-500/20 bg-[#050c09] p-5"
                        >
                            <div className="text-center">
                                <p className="text-xs font-medium text-slate-400">
                                    Overall Performance
                                </p>

                                {/* Circular Progress Bar */}
                                <div className="h-24 w-24 flex items-center justify-center mx-auto mt-3">
                                    <CircularProgressbar
                                        value={percentage}
                                        text={`${finalScore}/10`}
                                        styles={{
                                            path: {
                                                stroke: "#10b981",
                                                strokeLinecap: "round",
                                                transition: "stroke-dashoffset 0.5s ease 0s",
                                            },
                                            trail: {
                                                stroke: "rgba(16, 185, 129, 0.12)",
                                            },
                                            text: {
                                                fill: "#ffffff",
                                                fontSize: "20px",
                                                fontWeight: "600",
                                            },
                                        }}
                                    />
                                </div>

                                <p className="mt-5 text-sm font-medium text-white">
                                    {performanceText}
                                </p>

                                <p className="mt-1 text-[10px] leading-5 text-slate-500">
                                    {shortTagline}
                                </p>
                            </div>
                        </motion.div>

                        {/* Skill Evaluation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="rounded-xl border border-emerald-500/20 bg-[#050c09] p-5"
                        >
                            <div className="mb-5 flex items-center gap-2">
                                <FaChartLine className="text-xs text-emerald-400" />

                                <h2 className="text-sm font-semibold text-white">
                                    Skill Evaluation
                                </h2>
                            </div>

                            <div className="space-y-5">
                                {skills.map((skill) => (
                                    <div key={skill.name}>
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-xs text-slate-300">
                                                {skill.name}
                                            </span>

                                            <span className="text-xs font-medium text-emerald-400">
                                                {skill.score}
                                            </span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{
                                                    width: `${skill.score * 10}%`,
                                                }}
                                                transition={{
                                                    duration: 1,
                                                    delay: 0.4,
                                                    ease: "easeOut",
                                                }}
                                                className="h-full rounded-full bg-emerald-500"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        {/* Performance Trend */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="rounded-xl border border-emerald-500/20 bg-[#050c09] p-5 sm:p-6"
                        >
                            <div className="mb-5 flex items-center gap-2">
                                <FaChartLine className="text-xs text-emerald-400" />

                                <h2 className="text-sm font-semibold text-white">
                                    Performance Trend
                                </h2>
                            </div>

                            {/* Area Chart */}
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={chartData}
                                        margin={{
                                            top: 10,
                                            right: 10,
                                            left: 5,
                                            bottom: 5,
                                        }}
                                    >
                                        <defs>
                                            <linearGradient
                                                id="performanceGradient"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="0%"
                                                    stopColor="#10b981"
                                                    stopOpacity={0.25}
                                                />
                                                <stop
                                                    offset="100%"
                                                    stopColor="#10b981"
                                                    stopOpacity={0.02}
                                                />
                                            </linearGradient>
                                        </defs>

                                        <CartesianGrid
                                            stroke="rgba(148,163,184,0.08)"
                                            strokeDasharray="3 3"
                                            vertical={false}
                                        />

                                        <XAxis
                                            dataKey="question"
                                            tick={{
                                                fill: "#64748b",
                                                fontSize: 10,
                                            }}
                                            axisLine={{
                                                stroke: "rgba(255,255,255,0.08)",
                                            }}
                                            tickLine={false}
                                        />

                                        <YAxis
                                            domain={[0, 10]}
                                            ticks={[0, 2, 4, 6, 8, 10]}
                                            tick={{
                                                fill: "#64748b",
                                                fontSize: 10,
                                            }}
                                            axisLine={false}
                                            tickLine={false}
                                        />

                                        <Tooltip
                                            cursor={{
                                                stroke: "rgba(16,185,129,0.25)",
                                                strokeWidth: 1,
                                            }}
                                            contentStyle={{
                                                backgroundColor: "#07110d",
                                                border: "1px solid rgba(16,185,129,0.25)",
                                                borderRadius: "10px",
                                                padding: "8px 10px",
                                                boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
                                            }}
                                            labelStyle={{
                                                color: "#cbd5e1",
                                                fontSize: "10px",
                                                marginBottom: "4px",
                                            }}
                                            itemStyle={{
                                                color: "#10b981",
                                                fontSize: "11px",
                                                fontWeight: 600,
                                            }}
                                            formatter={(value) => [`${value}/10`, "Score"]}
                                        />

                                        <Area
                                            type="monotone"
                                            dataKey="score"
                                            stroke="#10b981"
                                            strokeWidth={3}
                                            fill="url(#performanceGradient)"
                                            dot={{
                                                r: 4,
                                                fill: "#10b981",
                                                stroke: "#07110d",
                                                strokeWidth: 2,
                                            }}
                                            activeDot={{
                                                r: 6,
                                                fill: "#10b981",
                                                stroke: "#07110d",
                                                strokeWidth: 3,
                                            }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Question Breakdown */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.25 }}
                            className="rounded-xl border border-emerald-500/20 bg-[#050c09] p-5 sm:p-6"
                        >
                            <div className="mb-5 flex items-center gap-2">
                                <FaRobot className="text-xs text-emerald-400" />

                                <h2 className="text-sm font-semibold text-white">
                                    Question Breakdown
                                </h2>
                            </div>

                            {/* Question List */}
                            <div className="space-y-3">
                                {questions.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.3 + index * 0.08,
                                        }}
                                        className="rounded-lg border border-white/10 bg-black/10 p-4"
                                    >
                                        {/* Question Header */}
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <p className="text-[9px] text-slate-600">
                                                    Question {index + 1}
                                                </p>

                                                <p className="mt-1 text-xs font-medium leading-5 text-white">
                                                    {item.question}
                                                </p>
                                            </div>

                                            <span className="shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[9px] font-semibold text-emerald-400">
                                                {item.score}/10
                                            </span>
                                        </div>

                                        {/* Feedback */}
                                        <div className="mt-3 rounded-md border border-emerald-500/15 bg-emerald-500/5 p-3">
                                            <div className="flex items-center gap-1.5">
                                                <FaCircleCheck className="text-[9px] text-emerald-400" />

                                                <span className="text-[9px] font-semibold text-emerald-400">
                                                    AI Feedback
                                                </span>
                                            </div>

                                            <p className="mt-1.5 text-[10px] leading-5 text-slate-400">
                                                {item.feedback}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Step3Report;
