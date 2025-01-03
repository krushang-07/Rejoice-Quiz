// import React, { useState, useEffect } from "react";
// import { useTheme } from "../utils/ThemeProvider.tsx";

// const LeaderBoard: React.FC = () => {
//   const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([]);
//   const { theme } = useTheme(); // Assuming useTheme provides theme

//   useEffect(() => {
//     const storedLeaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]"); //retrieve stored leader board from local storage and parsed
//     storedLeaderboard.sort((a, b) => b.score - a.score); //sorting
//     setLeaderboard(storedLeaderboard.slice(0, 5)); //slice top 5 user
//   }, []);

//   return (
//     <div
//       className={`min-h-screen flex flex-col items-center justify-center transition-all ${
//         theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-gray-900"
//       }`}
//     >
//       <h2
//         className={`text-4xl font-extrabold mb-6 tracking-wider text-center ${
//           theme === "dark" ? "text-yellow-400" : "text-yellow-400"
//         }`}
//       >
//         Top 5 Leaderboard
//       </h2>
//       <div
//         className={`w-full max-w-xl p-6 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 ${
//           theme === "dark" ? "bg-black shadow-gray-700" : "bg-white shadow-gray-400"
//         }`}
//       >
//         {/* <h3 className="text-lg font-semibold text-center mb-4">
//           Scored out of <span className="font-bold">10</span>
//         </h3> */}
//         <ul>
//           {leaderboard.length > 0 ? (
//             leaderboard.map((entry, index) => (
//               <li
//                 key={index}
//                 className={`flex items-center justify-between py-3 px-5 mb-3 rounded-lg shadow-md transform transition-all duration-300 ${
//                   index === 0
//                     ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 scale-105"
//                     : theme === "dark"
//                     ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                     : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//                 }`}
//               >
//                 <span className="font-bold text-lg">{index + 1}. {entry.name}</span>
//                     <span className="text-sm font-semibold">Score : {entry.score}</span>
//               </li>
//             ))
//           ) : (
//             <p className="text-center text-sm text-gray-500">
//               No leaderboard data available
//             </p>
//           )}
//         </ul>
//       </div>
//       <div className="mt-6 animate-bounce">
//         <p
//           className={`text-sm font-medium text-center ${
//             theme === "dark" ? "text-gray-400" : "text-gray-600"
//           }`}
//         >
//           Keep playing to see your name here!
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LeaderBoard;


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

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-all ${theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <h2 className={`text-4xl font-extrabold mb-6 tracking-wider text-center ${theme === "dark" ? "text-yellow-400" : "text-yellow-400"}`}>
        Top 5 Leaderboard
      </h2>
      <div className={`w-full max-w-xl p-6 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 ${theme === "dark" ? "bg-black shadow-gray-700" : "bg-white shadow-gray-400"}`}>
        <ul>
          {leaderboard.length > 0 ? (
            leaderboard.map((entry, index) => (
              <li
                key={index}
                className={`flex items-center justify-between py-3 px-5 mb-3 rounded-lg shadow-md transform transition-all duration-300 ${index === 0 ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 scale-105" : theme === "dark" ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
              >
                <span className="font-bold text-lg">{index + 1}. {entry.name}</span>
                <span className="text-sm font-semibold">Score: {entry.score}</span>
              </li>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500">No leaderboard data available</p>
          )}
        </ul>
      </div>
      <div className="mt-6 animate-bounce">
        <p className={`text-sm font-medium text-center ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Keep playing to see your name here!
        </p>
      </div>
    </div>
  );
};

export default LeaderBoard;
