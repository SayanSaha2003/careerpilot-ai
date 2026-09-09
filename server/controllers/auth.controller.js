import User from "../models/user.model.js";
import { genToken } from "../config/token.js";

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create(
                {
                    name,
                    email,
                },
                { timestamps: true },
            );
        }

        let token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: `google auth error: ${error}` });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: `logout error: ${error}` });
    }
};
