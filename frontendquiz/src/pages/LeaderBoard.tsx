import React, { useState, useEffect } from "react";
import { useTheme } from "../utils/ThemeProvider.tsx";

const LeaderBoard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    storedLeaderboard.sort((a, b) => b.score - a.score); // Sort leaderboard by score
    setLeaderboard(storedLeaderboard.slice(0, 5)); // Display top 5 scores
  }, []);

    useEffect(() => {
      // Prevent scrolling
      document.body.style.overflow = "hidden";
      document.body.style.minHeight = "100vh";  // Ensure the body takes the full height
  
      return () => {
        // Reset styles when component unmounts
        document.body.style.overflow = "";
        document.body.style.minHeight = "";
      };
    }, []);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center py-10 transition-all ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h2
        className={`text-5xl font-extrabold mb-8 tracking-wider text-center ${
          theme === "dark" ? "text-yellow-400" : "text-yellow-600"
        }`}
      >
        Top 5 Leaderboard
      </h2>
      <div
        className={`w-full max-w-2xl p-8 rounded-3xl shadow-2xl transition-all duration-300 ${
          theme === "dark" ? "bg-gray-800 shadow-gray-700" : "bg-white shadow-lg"
        }`}
      >
        <ul>
          {leaderboard.length > 0 ? (
            leaderboard.map((entry, index) => (
              <li
                key={index}
                className={`flex items-center justify-between py-4 px-6 mb-4 rounded-xl transition-all transform duration-300 ${
                  index === 0
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 scale-105"
                    : theme === "dark"
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                <span className="font-bold text-xl">{index + 1}. {entry.name}</span>
                <span className="text-lg font-semibold">Score: {entry.score}</span>
              </li>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500">No leaderboard data available</p>
          )}
        </ul>
      </div>
      <div className="mt-6 animate-bounce">
        <p
          className={`text-lg font-medium text-center ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Keep playing to see your name here!
        </p>
      </div>
    </div>
  );
};

export default LeaderBoard;
