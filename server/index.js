import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

// Routes
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    connectDb();
});
