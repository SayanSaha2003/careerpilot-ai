import {
    FaPlay,
    FaChartSimple,
    FaRobot,
    FaMicrophone,
    FaClock,
    FaFileLines,
    FaFilePdf,
    FaChartLine,
    FaCode,
    FaUserTie,
    FaCoins,
} from "react-icons/fa6";
import aiAns from "../assets/ai-ans.png";
import resume from "../assets/resume.png";
import pdf from "../assets/pdf.png";
import history from "../assets/history.png";
import HR from "../assets/HR.png";
import tech from "../assets/tech.png";
import confi from "../assets/confi.png";
import credit from "../assets/credit.png";

import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import AuthModel from "../components/AuthModel";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const {userData } = useSelector((state) => state.user);
    const navigate = useNavigate();
    // State to manage the visibility of the authentication modal
    const [showAuthModel, setShowAuthModel] = useState(false);

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Auth Model */}
            {showAuthModel && (
                <AuthModel onClose={() => setShowAuthModel(false)} />
            )}

            {/* Navbar */}
            <Navbar />

            <main className="relative min-h-[calc(100vh-80px)] overflow-hidden px-4 py-6 text-white sm:px-6 sm:py-8">
                {/* Background Glow */}
                <div className="pointer-events-none fixed left-1/2 top-1/2 -z-10 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-[100px] sm:h-100 sm:w-100 sm:blur-[120px]" />

                {/* Hero Section */}
                <section className="mx-auto grid max-w-5xl items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-6">
                    {/* LEFT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{
                            once: false,
                            amount: 0.3,
                        }}
                        transition={{ duration: 2 }}
                        className="relative z-10 px-10 text-center lg:text-left"
                    >
                        {/* Badge */}
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/5 px-6 py-1 text-xs font-medium text-emerald-400 sm:text-xs">
                            <span className="text-base">✦</span>
                            Powered by AI
                        </div>

                        {/* Heading */}
                        <h1 className="mx-auto max-w-xl text-3xl font-normal leading-[1.08] tracking-tight sm:text-4xl lg:mx-0 lg:text-5xl">
                            Meet your personal
                            <span className="block bg-linear-to-r from-emerald-300 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                                AI Interview Coach.
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mx-auto mt-5 max-w-md text-xs leading-6 text-slate-400 sm:text-sm lg:mx-0">
                            Realistic questions. Instant feedback.
                            <br />
                            Smarter preparation for a brighter tomorrow.
                        </p>

                        {/* Buttons */}
                        <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                            <motion.button
                                onClick={() => {
                                    if(!userData) {
                                        setShowAuthModel(true);
                                        return;
                                    }
                                    navigate("/interview");
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex cursor-pointer items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-xs font-semibold text-black shadow-[0_0_25px_rgba(52,211,153,0.2)] transition duration-300 hover:bg-emerald-300 hover:shadow-[0_0_35px_rgba(52,211,153,0.35)]"
                            >
                                <FaPlay className="text-xs" />
                                Start Interview
                            </motion.button>

                            <motion.button
                                onClick={() => {
                                    if(!userData) {
                                        setShowAuthModel(true);
                                        return;
                                    }
                                    navigate("/history");
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex cursor-pointer items-center gap-2 rounded-full border border-emerald-500/50 px-5 py-2.5 text-xs font-semibold text-white transition duration-300 hover:border-emerald-400 hover:bg-emerald-500/10"
                            >
                                <FaChartSimple className="text-emerald-400" />
                                View History
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* RIGHT VISUAL */}
                    <div className="relative flex h-70 items-center justify-center sm:h-80 lg:h-85">
                        {/* Robot Glow */}
                        <div className="absolute h-45 w-45 rounded-full                         drop-shadow-[0_0_30px_rgba(16,185,129,0.25)] sm:h-56 sm:w-56 sm:blur-[80px]" />

                        {/* Robot Image */}
                        <motion.img
                            initial={{ opacity: 0, scale: 0.95, x: 30 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: 0,
                                y: [0, -50, 0],
                            }}
                            transition={{
                                opacity: { duration: 0.8, ease: "easeOut" },
                                scale: { duration: 0.8, ease: "easeOut" },
                                x: { duration: 0.8, ease: "easeOut" },
                                y: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                },
                            }}
                            src="/hero-robot.png"
                            alt="AI Interview Coach"
                            className="relative z-10 w-[55%] max-h-70 object-contain mix-blend-screen sm:w-[50%] sm:max-h-80 lg:w-[60%] lg:max-h-85"
                        />
                    </div>
                </section>

                {/* How It Works */}
                <section className="mx-auto mt-16 max-w-5xl px-4 pb-16 sm:mt-20">
                    {/* Section Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="mb-10 text-center"
                    >
                        <h2 className="text-3xl font-normal tracking-tight text-white sm:text-3xl">
                            Prepare smarter.{" "}
                            <span className="text-emerald-400">
                                Perform better.
                            </span>
                        </h2>

                        <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-slate-400">
                            A simple AI-powered interview process designed to
                            help you practice, improve, and build confidence.
                        </p>
                    </motion.div>

                    {/* Steps */}
                    <div className="grid gap-5 md:grid-cols-3">
                        {[
                            {
                                icon: FaRobot,
                                step: "STEP 1",
                                title: "Choose Your Role",
                                description:
                                    "Select your job role and experience level for a personalized interview.",
                            },
                            {
                                icon: FaMicrophone,
                                step: "STEP 2",
                                title: "Practice With AI",
                                description:
                                    "Answer realistic questions with dynamic follow-ups based on your responses.",
                            },
                            {
                                icon: FaClock,
                                step: "STEP 3",
                                title: "Test Under Pressure",
                                description:
                                    "Experience a timed interview simulation and improve your performance.",
                            },
                        ].map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, y: 35 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{
                                        once: false,
                                        amount: 0.3,
                                    }}
                                    transition={{
                                        duration: 1,
                                        delay: index * 0.15,
                                        ease: "easeOut",
                                    }}
                                    whileHover={{
                                        y: -6,
                                        transition: { duration: 0.25 },
                                    }}
                                    className="group relative"
                                >
                                    {/* Glow */}
                                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-emerald-500/5 opacity-0 blur-xl transition duration-300 group-hover:opacity-100" />

                                    {/* Card */}
                                    <div className="relative h-full rounded-2xl border border-emerald-500/20 bg-[#03100b]/80 px-6 py-7 text-center backdrop-blur-sm transition duration-300 group-hover:border-emerald-400/50 group-hover:bg-emerald-500/4">
                                        {/* Icon */}
                                        <motion.div
                                            whileHover={{
                                                rotate: 5,
                                                scale: 1.08,
                                            }}
                                            transition={{ duration: 0.2 }}
                                            className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-500/5 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.08)]"
                                        >
                                            <Icon className="text-xl" />
                                        </motion.div>

                                        {/* Step */}
                                        <p className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-emerald-400">
                                            {item.step}
                                        </p>

                                        {/* Title */}
                                        <h3 className="text-base font-semibold text-white sm:text-lg">
                                            {item.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="mx-auto mt-3 max-w-xs text-xs leading-6 text-slate-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* Advanced AI Capabilities */}
                <section className="mx-auto mt-16 max-w-5xl px-4 pb-16 sm:mt-20">
                    {/* Section Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="mb-8 text-center"
                    >
                        <h2 className="text-2xl font-normal tracking-tight text-white sm:text-3xl">
                            Advanced AI{" "}
                            <span className="text-emerald-400">
                                Capabilities
                            </span>
                        </h2>

                        <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-slate-400 sm:text-xs">
                            Powerful AI features designed to make your interview
                            preparation smarter and more effective.
                        </p>
                    </motion.div>

                    {/* Capability Cards */}
                    <div className="grid gap-4 md:grid-cols-2">
                        {[
                            {
                                image: aiAns,
                                icon: FaChartSimple,
                                title: "AI Answer Evaluation",
                                description:
                                    "Scores communication, technical accuracy and confidence.",
                            },
                            {
                                image: resume,
                                icon: FaFileLines,
                                title: "Resume Based Interview",
                                description:
                                    "Project-specific questions based on your uploaded resume.",
                            },
                            {
                                image: pdf,
                                icon: FaFilePdf,
                                title: "Downloadable PDF Report",
                                description:
                                    "Detailed strengths, weaknesses and improvement insights.",
                            },
                            {
                                image: history,
                                icon: FaChartLine,
                                title: "History & Analytics",
                                description:
                                    "Track progress with performance graphs and topic analysis.",
                            },
                        ].map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{
                                        opacity: 0,
                                        y: 40,
                                        scale: 0.97,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    viewport={{
                                        once: false,
                                        amount: 0.25,
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: index * 0.15,
                                        ease: "easeOut",
                                    }}
                                    whileHover={{
                                        y: -5,
                                        transition: {
                                            duration: 0.3,
                                        },
                                    }}
                                    className="group relative"
                                >
                                    {/* Hover Glow */}
                                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-emerald-500/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />

                                    {/* Card */}
                                    <div className="relative flex min-h-45 items-center gap-5 overflow-hidden rounded-2xl border border-emerald-500/15 bg-[#020b07]/80 p-5 backdrop-blur-sm transition duration-500 group-hover:border-emerald-400/40 group-hover:bg-[#03120c]">
                                        {/* Image */}
                                        <div className="flex h-32 w-35 shrink-0 items-center justify-center sm:h-35 sm:w-40">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="min-w-0 flex-1">
                                            {/* Icon */}
                                            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-500/5 text-emerald-400 transition duration-300 group-hover:border-emerald-400/40 group-hover:bg-emerald-500/10">
                                                <Icon className="text-sm" />
                                            </div>

                                            <h3 className="text-sm font-semibold text-white sm:text-base">
                                                {item.title}
                                            </h3>

                                            <p className="mt-2 max-w-xs text-xs leading-5 text-slate-400 sm:text-xs">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* Interview Modes */}
                <section className="mx-auto mt-10 max-w-5xl px-4 pb-16 sm:mt-14">
                    {/* Section Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="mb-8 text-center"
                    >
                        <h2 className="text-2xl font-normal tracking-tight text-white sm:text-3xl">
                            Multiple Interview{" "}
                            <span className="text-emerald-400">Modes</span>
                        </h2>

                        <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-slate-400 sm:text-xs">
                            Practice different interview scenarios and prepare
                            for real-world opportunities.
                        </p>
                    </motion.div>

                    {/* Mode Cards */}
                    <div className="grid gap-4 md:grid-cols-2">
                        {[
                            {
                                icon: FaUserTie,
                                title: "HR Interview Mode",
                                description:
                                    "Behavioral and communication focused interview practice.",
                                image: HR,
                            },
                            {
                                icon: FaCode,
                                title: "Technical Mode",
                                description:
                                    "Role-specific technical questions designed to test your knowledge.",
                                image: tech,
                            },
                            {
                                icon: FaChartLine,
                                title: "Confidence Detection",
                                description:
                                    "Analyze your responses and identify areas for improvement.",
                                image: confi,
                            },
                            {
                                icon: FaCoins,
                                title: "Credits System",
                                description:
                                    "Use credits to unlock AI-powered interview sessions.",
                                image: credit,
                            },
                        ].map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{
                                        opacity: 0,
                                        y: 40,
                                        scale: 0.96,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    viewport={{
                                        once: false,
                                        amount: 0.25,
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: index * 0.12,
                                        ease: "easeOut",
                                    }}
                                    whileHover={{
                                        y: -5,
                                        transition: { duration: 0.25 },
                                    }}
                                    className="group relative"
                                >
                                    {/* Hover Glow */}
                                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-emerald-500/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />

                                    {/* Card */}
                                    <div className="relative flex min-h-40 items-center justify-between overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#03100b]/80 px-5 py-5 backdrop-blur-sm transition-all duration-300 group-hover:border-emerald-400/50 group-hover:bg-emerald-500/4 sm:px-6">
                                        {/* Content */}
                                        <div className="relative z-10 max-w-[65%]">
                                            {/* Icon */}
                                            <motion.div
                                                whileHover={{
                                                    rotate: 6,
                                                    scale: 1.08,
                                                }}
                                                transition={{ duration: 0.25 }}
                                                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/5 text-emerald-400"
                                            >
                                                <Icon className="text-base" />
                                            </motion.div>

                                            {/* Title */}
                                            <h3 className="text-base font-semibold text-white sm:text-lg">
                                                {item.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="mt-2 text-xs leading-5 text-slate-400 sm:text-xs">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Illustration */}
                                        <motion.img
                                            src={item.image}
                                            alt={item.title}
                                            whileHover={{ scale: 1.08 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative z-10 w-28 object-contain opacity-90 sm:w-32"
                                        />

                                        {/* Bottom Glow */}
                                        <div className="pointer-events-none absolute -bottom-10 right-10 h-24 w-24 rounded-full bg-emerald-500/10 blur-3xl" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};
export default Home;
