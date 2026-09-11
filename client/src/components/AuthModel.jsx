import { motion } from "motion/react";
import Auth from "../pages/Auth";
import { FaXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AuthModel = ({ onClose }) => {
    const {userData } = useSelector((state) => state.user);

    // Close the modal when userData is set (i.e., user is authenticated)
    useEffect(() => {
        if (userData) {
            onClose(); // Close the modal if userData is set
        }
    }, [userData, onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative"
            >
                {/* Close button */}
                <motion.button
                    onClick={onClose}
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-5 top-5 z-10 cursor-pointer text-slate-800"
                >
                    <FaXmark size={18} />
                </motion.button>
                <Auth  />
            </motion.div>
        </div>
    );
};

export default AuthModel;
