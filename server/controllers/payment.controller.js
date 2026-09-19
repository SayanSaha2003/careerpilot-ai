import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import razorpay from "../services/razorpay.service.js";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();    

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { planId, amount, credits } = req.body;
        
        // Order creation options
        const options = {
            amount: amount * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        // Create order using Razorpay
        const order = await razorpay.orders.create(options);

        // Save order details in the database
        const payment = new Payment({
            userId: req.userId,
            planId,
            amount,
            credits,
            razorpayOrderId: order.id,
            status: "created",
        });

        await payment.save();
        res.status(201).json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

// Verify payment
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Verify the payment signature
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");
        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid payment signature" });
        }

        // Find the payment record
        const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        if (payment.status === "paid") {
            return res.status(400).json({ message: "Payment already verified" });
        }

        // Update the payment
        payment.status = "paid";
        payment.razorpayPaymentId = razorpay_payment_id;
        await payment.save();

        // Update user's credits
        const updatedUser = await User.findByIdAndUpdate(
            payment.userId,
            { $inc: { credits: payment.credits } },
            { new: true },
        );

        res.json({ success: true, message: "Payment verified successfully", user: updatedUser });
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({ message: "Error verifying payment", error: error.message });
    }
};
