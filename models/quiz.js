import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
  question: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  timer: { type: Number, required: true },
  options: { type: [String], required: true },
});

const quizSchema = new Schema({
  title: { type: String, required: true },
  questions: { type: [questionSchema], required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
});

// Export the Quiz model
export default mongoose.model("Quiz", quizSchema);
