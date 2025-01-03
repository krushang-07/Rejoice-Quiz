import React, { useState } from "react";
import { useTheme } from "../utils/ThemeProvider.tsx";
import axios from "axios";
import Cookies from "js-cookie";
import { FaPlus, FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md"; // Added delete icon
import PreventScrolling from "../custom/PreventScrolling.tsx";

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
  timer: number;
};

type Quiz = {
  title: string;
  questions: Question[];
};

const Admin: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz>({ title: "", questions: [] });
  const { theme } = useTheme();

  const [question, setQuestion] = useState<string>("");
  const [currentOption, setCurrentOption] = useState<string>(""); 
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [timer, setTimer] = useState<number>(10);

  const addOption = () => {
    if (currentOption.trim() === "") {
      alert("Option cannot be empty.");
      return;
    }
    if (options.includes(currentOption.trim())) {
      alert("Duplicate options are not allowed.");
      return;
    }
    if (options.length >= 4) {
      alert("You can only add a maximum of 4 options.");
      return;
    }
    setOptions((prevOptions) => [...prevOptions, currentOption.trim()]);
    setCurrentOption(""); 
  };

  const updateOption = (index: number, value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue === "") {
      alert("Option cannot be empty.");
      return;
    }
    const updatedOptions = [...options];
    updatedOptions[index] = trimmedValue;
    setOptions(updatedOptions);
  };

  const deleteOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const addQuestion = () => {
    if (!question.trim() || options.length < 2 || !correctAnswer.trim()) {
      alert("Please fill in all fields and add at least two options.");
      return;
    }
    const newQuestion: Question = { question, options, correctAnswer, timer };
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [...prevQuiz.questions, newQuestion],
    }));
    setQuestion("");
    setOptions([]);
    setCorrectAnswer("");
    setTimer(10);
  };

  const saveQuiz = async () => {
    const token = Cookies.get("admin_token");
    if (!token) {
      alert("You must be logged in as an admin to save a quiz!");
      return;
    }

    try {
      const response = await axios.post("/api/admin/quizzes", quiz, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert(response.data.message);
      setQuiz({ title: "", questions: [] });
    } catch (error) {
      console.error("Error saving quiz:", error.response?.data || error.message);
      alert("Error saving quiz. Please try again.");
    }
  };
  PreventScrolling();

  return (
    <div
      className={`min-h-screen p-6 transition-all ease-in-out duration-300 ${
        theme === "light" ? "bg-gradient-to-r from-white to-white" : "bg-black"
      } text-white`}
    >
      <div
        className={`max-w-3xl mx-auto p-8 rounded-lg shadow-lg ${
          theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
      >
        <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wide text-gradient">
          QuizHub Admin Dashboard
        </h1>
        <input
          type="text"
          placeholder="Quiz Title"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          className={`border p-3 my-4 w-full text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        />
        <div
          className={`p-6 rounded-lg shadow-md ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={`border p-3 my-4 w-full text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              theme === "light" ? "bg-white" : "bg-gray-900"
            }`}
          />
          <div className="flex gap-2 items-center mb-4">
            <input
              type="text"
              placeholder="Add an Option"
              value={currentOption}
              onChange={(e) => setCurrentOption(e.target.value)}
              className={`border p-3 w-full text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                theme === "light" ? "bg-white" : "bg-gray-900"
              }`}
            />
            <button
              onClick={addOption}
              disabled={options.length >= 4}
              className={`px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out ${
                options.length >= 4
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-800"
              }`}
            >
              <FaPlus />
            </button>
          </div>
          <ul className="list-none list-inside mb-4">
            {options.map((option, index) => (
              <li key={index} className="flex items-center gap-2 mb-2 transition-all duration-300">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  className={`border p-3 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                    theme === "light" ? "bg-white" : "bg-gray-900"
                  }`}
                />
                <button
                  onClick={() => deleteOption(index)}
                  className="text-red-500 hover:text-red-700 transition-all"
                >
                  <MdDelete />
                </button>
                <button
                  onClick={() => updateOption(index, option)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition-all"
                >
                  <FaCheck />
                </button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Correct Answer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className={`border p-3 my-4 w-full text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              theme === "light" ? "bg-white" : "bg-gray-900"
            }`}
          />
          <input
            type="number"
            placeholder="Timer for this question (seconds)"
            value={timer}
            onChange={(e) => setTimer(Number(e.target.value))}
            className={`border p-3 my-4 w-full rounded-lg focus:outline-none focus:ring-2 text-gray-500 focus:ring-gray-500 ${
              theme === "light" ? "bg-white" : "bg-gray-900"
            }`}
          />
          <button
            onClick={addQuestion}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
          >
            Add Question
          </button>
        </div>
        <button
          onClick={saveQuiz}
          className="bg-green-600 text-white px-6 py-2 mt-6 rounded-lg shadow-lg w-full hover:bg-green-700 transition-all transform hover:scale-105"
        >
          Save Quiz
        </button>
      </div>
    </div>
  );
};

export default Admin;
