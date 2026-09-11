import { motion } from "motion/react";

const Footer = () => {
    return (
        <footer className="px-4 pb-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="mx-auto max-w-7xl rounded-2xl border border-emerald-500/20 bg-transparent px-5 py-5 text-center shadow-[0_0_30px_rgba(16,185,129,0.04)] sm:px-8"
            >
                {/* Brand */}
                <div className="flex items-center justify-center gap-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg  bg-transparent">
                        <img
                            src="/logo.png"
                            alt="CareerPilotAI logo"
                            className="h-full w-full object-contain"
                        />
                    </div>

                    <h2 className="text-lg font-bold">
                        <span className="text-white">CareerPilot</span>
                        <span className="text-emerald-400">AI</span>
                    </h2>
                </div>

                {/* Description */}
                <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-slate-400 sm:text-xs">
                    AI-powered interview preparation designed to improve your
                    communication, technical skills, and professional
                    confidence.
                </p>

                {/* Divider */}
                <div className="mx-auto mt-4 h-px max-w-lg bg-emerald-500/10" />

                {/* Bottom */}
                <div className="mt-3 flex flex-col items-center justify-between gap-2 text-[11px] text-slate-500 sm:flex-row sm:text-xs">
                    <p>
                        © {new Date().getFullYear()} CareerPilotAI. All rights
                        reserved.
                    </p>

                    <p>
                        Practice{" "}
                        <span className="mx-1 text-emerald-400">•</span>
                        Improve <span className="mx-1 text-emerald-400">•</span>
                        Get Hired
                    </p>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
