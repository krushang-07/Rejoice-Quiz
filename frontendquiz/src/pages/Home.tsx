import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useTheme } from "../utils/ThemeProvider.tsx";
import PreventScrolling from "../custom/PreventScrolling.tsx";

const Home: React.FC = () => {
  const [role, setRole] = useState<string | null>(null); // Track role
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const theme = useTheme()?.theme;
  const navigate = useNavigate();
  PreventScrolling();

  useEffect(() => {
    const adminToken = Cookies.get("admin_token");
    const userToken = Cookies.get("user_token");

    if (!adminToken && !userToken) {
      navigate("/login");
      return;
    }

    // Verify tokens if any exist
    const verifyRole = async () => {
      try {
        if (adminToken) {
          setRole("admin");
        } else if (userToken) {
          setRole("user");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    verifyRole();
  }, [navigate]);

  useEffect(() => {
    if (loading) return;
    if (role === null) {
      navigate("/login");
      return;
    }
  }, [role, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme === "light"
          ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white"
          : "bg-gradient-to-r from-gray-800 to-black text-white"
      } transition-all`}
    >
      <div className="text-center p-8 md:p-12 bg-opacity-80 rounded-lg max-w-2xl w-full shadow-xl">
        <h1 className="text-6xl font-extrabold mb-6 leading-tight tracking-tight animate__animated animate__fadeIn">
          Welcome to QuizHub
        </h1>

        {role === "admin" ? (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Admin Dashboard</h2>
              <p className="text-lg mb-6">
                As an Admin, you have full control over quiz creation and management. You can view and edit existing quizzes, as well as create new ones to challenge users.
              </p>
              <button
                onClick={() => navigate("/admin")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:bg-gradient-to-r hover:from-purple-700 hover:to-blue-700 text-white py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                Create Quiz
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">User Dashboard</h2>
              <p className="text-lg mb-6">
                As a User, you can test your knowledge by participating in fun and challenging quizzes. Earn points, track your progress, and challenge your friends on the leaderboard!
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate("/user")}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-orange-600 text-white py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                >
                  Play Quiz
                </button>
                <button
                  onClick={() => navigate("/leaderboard")}
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:bg-gradient-to-r hover:from-green-600 hover:to-teal-600 text-white py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                >
                  View Leaderboard
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
