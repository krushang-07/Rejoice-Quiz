import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import { useTheme } from "../utils/ThemeProvider.tsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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

const User: React.FC = () => {
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [timer, setTimer] = useState<number>(10);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = Cookies.get("user_token");
        const response = await axios.get<Quiz[]>("http://localhost:5000/api/user/quizzes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizList(response.data);
      } catch (err) {
        console.error("Failed to fetch quiz data:", err);
        setError("Failed to load quizzes. Please try again.");
      }
    };
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (quizStarted && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsTimeUp(true);
    }
  }, [timer, quizStarted]);

  const handleAnswer = (answer: string) => {
    if (!isTimeUp && !selectedAnswer) {
      setSelectedAnswer(answer);
      setAnswers((prev) => [...prev, answer]);
    }
  };

  const skipQuestion = () => {
    setAnswers((prev) => [...prev, null]);
    setSelectedAnswer(null);
    goToNextQuestion();
  };

  const currentQuizIndex = 0;
  const goToNextQuestion = () => {
    const currentQuiz = quizList[currentQuizIndex];
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setTimer(currentQuiz.questions[nextIndex].timer);
      setIsTimeUp(false);
      setSelectedAnswer(null);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const currentQuiz = quizList[currentQuizIndex];
    const score = currentQuiz.questions.reduce(
      (acc, question, index) => acc + (question.correctAnswer === answers[index] ? 1 : 0),
      0
    );
    setScore(score);
    setQuizCompleted(true);
    // Get username from cookies or user token
  const username = Cookies.get("username") || "Anonymous";

  // Save score to localStorage
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  leaderboard.push({ name: username, score });
  leaderboard.sort((a, b) => b.score - a.score);
  if (leaderboard.length > 5) {
    leaderboard.pop(); // Keep only top 5 scores
  }
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

  alert("Your score has been added to the leaderboard!");
  };

  if (!quizList.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-semibold">Loading your quiz, please wait...</p>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </div>
    );
  }

  const currentQuiz = quizList[currentQuizIndex];
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  const quizLength = quizList[0].questions.length;

console.log(`Number of questions in the quiz: ${quizLength}`);


  return (
    <>
      {quizCompleted && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
          recycle={false}
        />
      )}
      {!quizStarted ? (
        <div
          className={`flex flex-col items-center justify-center min-h-screen ${
            theme === "light" ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          <h1 className="text-4xl font-bold mb-6">Welcome to QuizHub</h1>
          <button
            onClick={() => setQuizStarted(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-center min-h-screen ${
            theme === "light" ? "bg-gray-100" : "bg-black"
          }`}
        >
          <div
            className={`w-full max-w-2xl p-8 rounded-lg shadow-md ${
              theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-white"
            }`}
          >
            <h1 className="text-2xl font-bold mb-4 flex justify-center">{currentQuiz.title}</h1>
            <div>
              <h3 className="font-semibold">Question {currentQuestionIndex + 1}:</h3>
              <p>{currentQuestion.question}</p>
              <div className="mt-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-4 mb-2 text-left rounded-lg ${
                      selectedAnswer === option
                        ? theme === "light"
                          ? "bg-blue-500 text-white"
                          : "bg-blue-700 text-white"
                        : theme === "light"
                        ? "bg-gray-300 text-gray-800"
                        : "bg-gray-600 text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {isTimeUp && <p className="text-red-500">Time's up!</p>}
              <p className="mt-4">Time left: {timer} seconds</p>
            </div>
            <button
              onClick={skipQuestion}
              className={`px-6 mr-3 py-2 mt-4 rounded-lg ${
                theme === "light"
                  ? "bg-gray-500 text-white hover:bg-gray-600"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              Skip Question
            </button>
            <button
              onClick={goToNextQuestion}
              className={`px-6 py-2 mt-4 rounded-lg ${
                theme === "light"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-green-700 text-white hover:bg-green-600"
              }`}
            >
              Next Question
              </button>
            </div>
           {quizCompleted && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold">Quiz Completed!!🎉 </h2>
                <h2 className="text-xl font-bold">Your Score: {score}/{quizLength }🏆</h2>
                <button
              onClick={() => navigate('/leaderboard')}
              className="bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded shadow-md transform hover:scale-105 transition-transform mt-3">
             Go to LeaderBoard
            </button>
              </div>
          )}
          </div>
      )}
    </>
  );
};

export default User;
