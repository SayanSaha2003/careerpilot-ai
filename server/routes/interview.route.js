import express from "express";
import { analyzeResume, finishInterview, generateQuestion, getInterviewReport, getMyInterviews, submitAnswer } from "../controllers/interview.controller.js";
import { upload } from "../middlewares/multer.js";
import isAuth from "../middlewares/isAuth.js";

const interviewRouter = express.Router();

interviewRouter.post("/resume",isAuth, upload.single("resume"), analyzeResume) // multer middleware upload the resume in the public folder temporarily
interviewRouter.post("/generate-questions", isAuth, generateQuestion);
interviewRouter.post("/submit-answer", isAuth, submitAnswer);
interviewRouter.post("/finish", isAuth, finishInterview);

interviewRouter.get("/get-interviews", isAuth, getMyInterviews);
interviewRouter.get("/report/:id", isAuth, getInterviewReport);

export default interviewRouter;
