import { motion } from "motion/react";
import { FaXmark, FaCheck, FaRobot } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";

const Auth = () => {
    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            console.log(response);
        }catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative flex w-full max-w-80 sm:max-w-120 overflow-hidden rounded-[20px] bg-white shadow-2xl"
            >
                {/* Close */}
                <motion.button
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-5 top-5 z-10 cursor-pointer text-slate-800"
                >
                    <FaXmark size={18} />
                </motion.button>

                {/* Left Section */}
                <div className="hidden w-[38%] flex-col bg-linear-to-b from-violet-200 via-violet-100 to-violet-300 px-5 py-10 sm:flex">
                    {/* Robot Logo */}
                    <div className="flex flex-col items-center">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-black text-white shadow-md">
                            <FaRobot size={21} />
                        </div>

                        <h2 className="mt-3 text-sm font-bold text-slate-950">
                            CareerPilotAI
                        </h2>
                    </div>

                    {/* Features */}
                    <div className="mt-10 space-y-6">
                        <div className="flex items-center gap-2">
                            <FaCheck size={15} className="text-slate-900" />
                            <span className="text-[11px] text-slate-800">
                                AI Interviews
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <FaCheck size={15} className="text-slate-900" />
                            <span className="text-[11px] text-slate-800">
                                Resume Analyser
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <FaCheck size={15} className="text-slate-900" />
                            <span className="text-[11px] text-slate-800">
                                Job Finder
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex w-full flex-col items-center justify-center px-7 py-10 sm:w-[62%]">
                    <h1 className="text-[25px] font-bold tracking-tight text-slate-950">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-center text-sm leading-5 text-slate-600">
                        Sign in to continue your
                        <br />
                        career journey.
                    </p>

                    {/* Google Button */}
                    <motion.button
                    onClick={handleGoogleAuth}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        className="mt-8 flex h-9 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-black px-4 text-sm text-white shadow-sm transition hover:bg-slate-900"
                    >
                        <FcGoogle className="text-lg" />
                        <span>Continue with Google</span>
                    </motion.button>

                    <p className="mt-8 text-center text-[11px] text-slate-500">
                        Let's build your future together.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;