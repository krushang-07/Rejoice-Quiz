import express from "express";
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/authMiddleware.js";
import Quiz from "../models/quiz.js";

const router = express.Router();

// Get All Quizzes
router.get(
  "/quizzes",
  authenticateToken,
  authorizeRole("user"),
  async (req, res) => {
    try {
      const quizzes = await Quiz.find();
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
);

export default router;
