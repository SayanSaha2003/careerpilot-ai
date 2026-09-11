import { motion } from "motion/react";
import { FaCheck } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Auth = () => {
    const dispatch = useDispatch();

    // Handle Google Authentication
    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            let User = response.user;
            let name = User.displayName;
            let email = User.email;

            // Send the user data to the backend for authentication
            const res = await axios.post(
                serverUrl + "/api/auth/google",
                { name, email },
                { withCredentials: true },
            );

            console.log(res.data);
            dispatch(setUserData(res.data));
        } catch (error) {
            console.log(error);
            dispatch(setUserData(null));
        }
    };

    return (
        <div className="relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative flex w-full max-w-85 overflow-hidden rounded-2xl border border-gray-700 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:max-w-110"
            >
                {/* Left Section */}
                <div className="hidden w-[42%] flex-col justify-between bg-[#020b07] px-5 py-8 sm:flex">
                    {/* Logo */}
                    <div className="flex flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl  ">
                            <img
                                src="/logo.png"
                                alt="CareerPilotAI logo"
                                className="h-full w-full object-contain"
                            />
                        </div>

                        <h2 className="mt-2 text-sm font-medium text-white">
                            CareerPilotAI
                        </h2>

                        <p className="mt-2 text-[10px] text-center leading-4 text-slate-400">
                            Your AI-powered companion for smarter career
                            preparation.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">
                                <FaCheck className="text-[9px] text-emerald-400" />
                            </div>
                            <span className="text-[10px] text-slate-300">
                                AI Interviews
                            </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">
                                <FaCheck className="text-[9px] text-emerald-400" />
                            </div>
                            <span className="text-[10px] text-slate-300">
                                Resume Analyser
                            </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">
                                <FaCheck className="text-[9px] text-emerald-400" />
                            </div>
                            <span className="text-[10px] text-slate-300">
                                Job Finder
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex w-full flex-col items-center justify-center px-7 py-9 sm:w-[58%]">
                    <div className="w-full">
                        <p className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                            Welcome back
                        </p>

                        <h1 className="mt-2 text-center text-[24px] font-bold tracking-tight text-slate-950">
                            Let's get started
                        </h1>

                        <p className="mt-2 text-center text-xs leading-5 text-slate-400">
                            Sign in to continue your
                            <br />
                            career journey.
                        </p>

                        {/* Google Button */}
                        <motion.button
                            onClick={handleGoogleAuth}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.2 }}
                            className="mt-7 flex h-10 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-800 shadow-lg transition hover:border-emerald-400 hover:bg-emerald-50/40"
                        >
                            <FcGoogle className="text-lg" />
                            <span>Continue with Google</span>
                        </motion.button>

                        <div className="my-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-slate-200" />
                            <span className="text-[9px] uppercase tracking-wider text-slate-400">
                                Secure login
                            </span>
                            <div className="h-px flex-1 bg-slate-200" />
                        </div>

                        <p className="text-center text-[10px] leading-4 text-slate-400">
                            By continuing, you agree to use CareerPilotAI
                            <br />
                            for your personal career preparation.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
