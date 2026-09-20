import { useState } from "react";
import { motion } from "motion/react";
import { FaArrowLeft, FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Pricing() {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState("Starter Pack");
    const [loadingPlan, setLoadingPlan] = useState(null);
    const dispatch = useDispatch();

    const plans = [
        {
            id: "free",
            name: "Free",
            price: "0",
            credits: 100,
            description: "Perfect for beginners starting interview preparation.",
            badge: "Default",
            features: [
                "100 AI Interview Credits",
                "Basic Performance Report",
                "Voice Interview Access",
                "Limited History Tracking",
            ],
        },
        {
            id: "basic",
            name: "Starter Pack",
            price: "100",
            credits: 150,
            description: "Great for focused practice and skill improvement.",
            features: [
                "150 AI Interview Credits",
                "Detailed Feedback",
                "Performance Analytics",
                "Full Interview History",
            ],
            button: "Proceed to Pay",
        },
        {
            id: "pro",
            name: "Pro Pack",
            price: "500",
            credits: 650,
            description: "Best value for serious job preparation.",
            badge: "Best Value",
            features: [
                "650 AI Interview Credits",
                "Advanced AI Feedback",
                "Skill Trend Analysis",
                "Priority AI Processing",
            ],
            button: "Proceed to Pay",
        },
    ];

    const handlePayment = async (plan) => {
        try {
            setLoadingPlan(plan.id);

            // Create order on the server
            const result = await axios.post(
                serverUrl + "/api/payment/order",
                {
                    planId: plan.id,
                    amount: plan.price,
                    credits: plan.credits,
                },
                { withCredentials: true },
            );
            // console.log("Order Created:", result.data);

            // Razorpay payment options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: plan.price,
                currency: "INR",
                name: "CareerPilotAI",
                description: `${plan.name} - ${plan.credits} Credits`,
                order_id: result.data.id,

                // Payment handler (verify payment and update user's credits)
                handler: async function (response) {
                    // console.log("Payment Done:", response);
                    const verifyResponse = await axios.post(
                        serverUrl + "/api/payment/verify",
                        response,
                        {
                            withCredentials: true,
                        },
                    );
                    // console.log("Payment Verified:", verifyResponse.data);

                    // Update User's Credits after successful payment
                    if (verifyResponse.data.success) {
                        dispatch(setUserData(verifyResponse.data));
                        alert("Payment Successful 🎉 Credits Added!");
                        navigate("/");
                    }
                },

                theme: {
                    color: "#10B981",
                },
            };

            // Open Razorpay payment modal
            const rzp = new window.Razorpay(options);
            rzp.open();
            setLoadingPlan(null);
        } catch (error) {
            console.error("Error initiating payment:", error);
            setLoadingPlan(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#020807] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                {/* Back Button */}
                <motion.button
                    type="button"
                    onClick={() => navigate(-1)}
                    whileHover={{ scale: 1.05, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-emerald-500/20 bg-[#050c09] text-slate-400 transition hover:border-emerald-500/40 hover:text-emerald-400"
                >
                    <FaArrowLeft className="text-sm" />
                </motion.button>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mx-auto mt-8 max-w-2xl text-center"
                >
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400">
                        CareerPilotAI
                    </p>

                    <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                        Choose Your Plan
                    </h1>

                    <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                        Flexible pricing to match your interview preparation goals.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {plans.map((plan, index) => {
                        const isSelected = selectedPlan === plan.name;

                        return (
                            <motion.div
                                key={plan.name}
                                onClick={() => setSelectedPlan(plan.name)}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.12,
                                    ease: "easeOut",
                                }}
                                whileHover={{ y: -4 }}
                                className={`relative flex cursor-pointer flex-col rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${
                                    isSelected
                                        ? "border-emerald-500/50 bg-[#07110d] shadow-[0_0_35px_rgba(16,185,129,0.08)]"
                                        : "border-white/10 bg-[#050c09] hover:border-emerald-500/20"
                                }`}
                            >
                                {/* Badge */}
                                {plan.badge && (
                                    <div
                                        className={`absolute right-5 top-5 rounded-full px-3 py-1 text-[9px] font-medium ${
                                            plan.badge === "Best Value"
                                                ? "bg-emerald-500 text-black"
                                                : "bg-white/10 text-slate-400"
                                        }`}
                                    >
                                        {plan.badge}
                                    </div>
                                )}

                                {/* Plan Name */}
                                <h2 className="text-base font-semibold text-white">{plan.name}</h2>

                                {/* Price */}
                                <div className="mt-5">
                                    <span className="text-3xl font-bold text-emerald-400">
                                        ₹{plan.price}
                                    </span>

                                    <p className="mt-1 text-xs text-slate-500">{plan.credits}</p>
                                </div>

                                {/* Description */}
                                <p className="mt-5 min-h-10 text-xs leading-5 text-slate-400">
                                    {plan.description}
                                </p>

                                {/* Features */}
                                <div className="mt-6 space-y-3">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex items-start gap-2.5">
                                            <FaCheck className="mt-0.5 shrink-0 text-[10px] text-emerald-400" />

                                            <span className="text-xs text-slate-300">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Button */}
                                {plan.button && (
                                    <motion.button
                                        type="button"
                                        disabled={loadingPlan === plan.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (!isSelected) {
                                                setSelectedPlan(plan.name);
                                            } else {
                                                handlePayment(plan);
                                            }
                                        }}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`mt-8 h-11 w-full cursor-pointer rounded-lg text-xs font-semibold transition ${
                                            isSelected
                                                ? "bg-emerald-500 text-black hover:bg-emerald-400"
                                                : "border border-white/10 bg-white/5 text-slate-300 hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-400"
                                        }`}
                                    >
                                        {loadingPlan === plan.id ? "Processing..." : plan.button}
                                    </motion.button>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Pricing;
