import { motion } from "motion/react";
import { FaCoins } from "react-icons/fa6";
import { FaUserAstronaut } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import AuthModel from "./AuthModel";

const Navbar = () => {
    const { userData } = useSelector((state) => state.user);
    const [showCreditPopup, setShowCreditPopup] = useState(false);
    const [showUserPopup, setShowUserPopup] = useState(false);

    // State to control the visibility of the AuthModel
    const [showAuthModel, setShowAuthModel] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Logout function to clear user data and navigate to home page
    const handleLogout = async () => {
        try {
            await axios.get(serverUrl + "/api/auth/logout", {
                withCredentials: true,
            });
            dispatch(setUserData(null));
            setShowCreditPopup(false);
            setShowUserPopup(false);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <motion.nav
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative mx-auto mt-4 flex w-[calc(100%-2rem)] max-w-4xl items-center justify-between rounded-xl border border-green-500/20 bg-transparent px-5 py-2"
            >
                {/* Logo */}
                <div className="flex items-center gap-1">
                    <img
                        src="/logo.png"
                        alt="CareerPilotAI"
                        className="h-9 w-9 rounded-lg"
                    />

                    <span className="text-lg font-medium tracking-tight text-white">
                        CareerPilot
                        <span className="text-green-400">AI</span>
                    </span>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Credits */}
                    <motion.button
                        onClick={() => {
                            if(!userData) {
                                setShowAuthModel(true);
                                return;
                            }
                            setShowCreditPopup(!showCreditPopup);
                            setShowUserPopup(false);
                        }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex cursor-pointer items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/5 px-5 py-2.5 text-xs font-medium text-green-400 transition hover:border-green-500/40 hover:bg-green-500/10"
                    >
                        <FaCoins className="text-[11px]" />
                        <span>{userData?.user?.credits || 0}</span>
                    </motion.button>

                    {/* Credits Popup */}
                    {showCreditPopup && (
                        <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="absolute right-16 top-14 z-20 w-60 rounded-2xl border border-emerald-500/20 bg-[#020b07]/95 p-4 text-white shadow-[0_10px_40px_rgba(16,185,129,0.12)] backdrop-blur-xl"
                        >
                            <p className="text-sm font-medium text-white">
                                Need more credits?
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                                Continue your AI interview practice.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate("/pricing")}
                                className="mt-4 w-full rounded-xl bg-emerald-400 px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-emerald-300 cursor-pointer"
                            >
                                Buy More Credits
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Avatar */}
                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            if(!userData) {
                                setShowAuthModel(true);
                                return;
                            }
                            setShowUserPopup(!showUserPopup);
                            setShowCreditPopup(false);
                        }}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 text-xs font-semibold text-green-400 transition hover:border-green-400 hover:bg-green-500/20"
                    >
                        {userData ? (
                            userData.user.name?.charAt(0)?.toUpperCase()
                        ) : (
                            <FaUserAstronaut className="text-sm" />
                        )}
                    </motion.button>

                    {/* User Popup */}
                    {userData && showUserPopup && (
                        <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="absolute right-5 top-14 z-20 w-60 rounded-2xl border border-emerald-500/20 bg-[#020b07]/95 p-4 text-white shadow-[0_10px_40px_rgba(16,185,129,0.12)] backdrop-blur-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-sm font-semibold text-emerald-400">
                                    {userData?.user?.name
                                        ?.charAt(0)
                                        ?.toUpperCase()}
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-white">
                                        {userData?.user?.name}
                                    </p>

                                    <p className="text-xs text-slate-400">
                                        {userData?.user?.email}
                                    </p>
                                </div>
                            </div>
                            <div className="my-3 h-px bg-emerald-500/10" />
                            {/* View Interview History */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate("/history")}
                                className="w-full rounded-xl border border-emerald-500/15 bg-emerald-500/5 px-4 py-2.5 text-left text-xs font-medium text-slate-200 transition hover:border-emerald-500/30 hover:bg-emerald-500/10 cursor-pointer"
                            >
                                View Interview History
                            </motion.button>
                            {/* Logout */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleLogout}
                                className="mt-2 flex w-full items-center rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-2.5 text-xs font-medium text-red-400 transition hover:border-red-500/20 hover:bg-red-500/10 cursor-pointer"
                            >
                                <CiLogout className="mr-2 text-sm" />
                                Log out
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </motion.nav>

            {/* Auth Model */}
            {showAuthModel && (
                <AuthModel onClose={() => setShowAuthModel(false)} />
            )}

        </div>
    );
};

export default Navbar;
