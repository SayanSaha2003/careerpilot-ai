import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        let varifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!varifiedToken) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.userId = varifiedToken.id;
        next();

    } catch (error) {
        return res.status(500).json({ message: `isAuth error: ${error}` });
    }
};

export default isAuth;