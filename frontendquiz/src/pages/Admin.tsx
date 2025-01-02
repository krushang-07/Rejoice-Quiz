  // import React, { useState } from "react";
  // import { useTheme } from "../utils/ThemeProvider.tsx";
  // import axios from "axios";
  // import Cookies from "js-cookie"; // Import js-cookie for cookie management

  // // Types for Quiz, Question, and Options
  // type Question = {
  //   question: string;
  //   options: string[];
  //   correctAnswer: string;
  //   timer: number;
  // };

  // type Quiz = {
  //   title: string;
  //   questions: Question[];
  // };

  // const Admin: React.FC = () => {
  //   const [quiz, setQuiz] = useState<Quiz>({ title: '', questions: [] });
  //   const { theme } = useTheme();

  //   const [question, setQuestion] = useState<string>('');
  //   const [options, setOptions] = useState<string[]>(['', '', '', '']);
  //   const [correctAnswer, setCorrectAnswer] = useState<string>('');
  //   const [timer, setTimer] = useState<number>(10); // Default timer in seconds

  //   const addQuestion = () => {
  //     const newQuestion: Question = { question, options, correctAnswer, timer };
  //     setQuiz((prevQuiz) => ({
  //       ...prevQuiz,
  //       questions: [...prevQuiz.questions, newQuestion],
  //     }));
  //     setQuestion('');
  //     setOptions(['', '', '', '']);
  //     setCorrectAnswer('');
  //     setTimer(10);
  //   };

  //   const saveQuiz = async () => {
  //     const token = Cookies.get("admin_token");
    
  //     if (!token) {
  //       alert("You must be logged in as an admin to save a quiz!");
  //       return;
  //     }
    
  //     try {
  //       // Send the quiz data (title and questions) to the backend
  //       const response = await axios.post(
  //         "http://localhost:5000/api/admin/quizzes",
  //         quiz,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
    
  //       alert(response.data.message);
  //       setQuiz({ title: quiz.title, questions: [] });
  //     } catch (error) {
  //       console.error("Error saving quiz:", error.response?.data || error.message);
  //       alert("Error saving quiz. Please try again.");
  //     }
  //   };
    

  //   return (
  //     <div className={`min-h-screen p-6 ${theme === 'light' ? 'bg-gradient-to-r from-white to-white' : 'bg-black'} text-white`}>
  //       <div className={`max-w-3xl mx-auto p-8 rounded-lg shadow-lg ${theme === 'light' ? 'bg-white text-black' : 'bg-black-800 text-white'}`}>
  //         <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wide animate-bounce">
  //           QuizHub Admin Dashboard
  //         </h1>
  //         <input
  //           type="text"
  //           placeholder="Quiz Title"
  //           value={quiz.title}
  //           onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
  //           className={`border p-3 my-4 w-full text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
  //         />
  //         <div className={`p-6 rounded-lg shadow-md ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
  //           <input
  //             type="text"
  //             placeholder="Question"
  //             value={question}
  //             onChange={(e) => setQuestion(e.target.value)}
  //             className={`border p-3 my-4 w-full text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
  //           />
  //           {options.map((option, index) => (
  //             <input
  //               key={index}
  //               type="text"
  //               placeholder={`Option ${index + 1}`}
  //               value={option}
  //               onChange={(e) => {
  //                 const newOptions = [...options];
  //                 newOptions[index] = e.target.value;
  //                 setOptions(newOptions);
  //               }}
  //               className={`border p-3 my-4 w-full text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
  //             />
  //           ))}
  //           <input
  //             type="text"
  //             placeholder="Correct Answer"
  //             value={correctAnswer}
  //             onChange={(e) => setCorrectAnswer(e.target.value)}
  //             className={`border p-3 my-4 w-full text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
  //           />
  //           <input
  //             type="number"
  //             placeholder="Timer for this question (seconds)"
  //             value={timer}
  //             onChange={(e) => setTimer(Number(e.target.value))}
  //             className={`border p-3 my-4 w-full rounded-lg focus:outline-none focus:ring-2 text-gray-500 focus:ring-gray-500 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
  //           />
  //           <button
  //             onClick={addQuestion}
  //             className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
  //           >
  //             Add Question
  //           </button>
  //         </div>
  //         <button
  //           onClick={saveQuiz}
  //           className="bg-green-600 text-white px-6 py-2 mt-6 rounded-lg shadow-lg w-full hover:bg-green-700 transition-transform transform hover:scale-105"
  //         >
  //           Save Quiz
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  // export default Admin;


  import React, { useState } from "react";
import { useTheme } from "../utils/ThemeProvider.tsx";
import axios from "axios";
import Cookies from "js-cookie";

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
  const [currentOption, setCurrentOption] = useState<string>(""); // Current option input
  const [options, setOptions] = useState<string[]>([]); // Array of options
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [timer, setTimer] = useState<number>(10);

  const addOption = () => {
    if (currentOption.trim() === "") {
      alert("Option cannot be empty.");
      return;
    }
    if (options.length >= 4) {
      alert("You can only add a maximum of 4 options.");
      return;
    }
    setOptions((prevOptions) => [...prevOptions, currentOption]);
    setCurrentOption(""); // Clear input field
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
      const response = await axios.post(
        "http://localhost:5000/api/admin/quizzes",
        quiz,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.message);
      setQuiz({ title: quiz.title, questions: [] });
    } catch (error) {
      console.error("Error saving quiz:", error.response?.data || error.message);
      alert("Error saving quiz. Please try again.");
    }
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "light" ? "bg-gradient-to-r from-white to-white" : "bg-black"
      } text-white`}
    >
      <div
        className={`max-w-3xl mx-auto p-8 rounded-lg shadow-lg ${
          theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
      >
        <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wide">
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
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Add an Option"
              value={currentOption}
              onChange={(e) => setCurrentOption(e.target.value)}
              className={`border p-3 my-4 w-full text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                theme === "light" ? "bg-white" : "bg-gray-900"
              }`}
            />
            <button
              onClick={addOption}
              disabled={options.length >= 4}
              className={`px-4 py-2 rounded shadow ${
                options.length >= 4
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Add Option
            </button>
          </div>
          <ul className="list-none list-inside mb-4">
            {options.map((option, index) => (
              <li key={index} className="text-gray-300">
                {index + 1}. {option}
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
          className="bg-green-600 text-white px-6 py-2 mt-6 rounded-lg shadow-lg w-full hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          Save Quiz
        </button>
      </div>
    </div>
  );
};

export default Admin;
