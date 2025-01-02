import express from "express";
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/authMiddleware.js";
import Quiz from "../models/quiz.js";

const router = express.Router();

router.post(
  "/quizzes",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    const adminId = req.user.id;
    const { title, questions } = req.body;

    try {
      let quiz = await Quiz.findOne({ createdBy: adminId });
      //if exists
      if (quiz) {
        quiz.questions = [...quiz.questions, ...questions];
        await quiz.save();
        return res.status(200).json({
          message: "Questions added to the existing quiz successfully",
          quiz,
        });
      }

      //create a new
      quiz = new Quiz({ title, questions, createdBy: adminId });
      await quiz.save();

      res.status(201).json({
        message: "New quiz created successfully",
        quiz,
      });
    } catch (error) {
      console.error("Error saving quiz:", error);
      res.status(500).json({
        message: "Server error",
        error,
      });
    }
  }
);

export default router;
