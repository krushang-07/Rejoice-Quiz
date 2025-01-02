import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useTheme } from "../utils/ThemeProvider.tsx";

const Home: React.FC = () => {
  const [role, setRole] = useState<string | null>(null); // Track role
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const theme = useTheme()?.theme;
  const navigate = useNavigate();

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
    <div className={`min-h-screen flex items-center justify-center ${
      theme === "light" ? "bg-white text-black" : "bg-black text-white" }`}>
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to QuizHub</h1>
        {role === "admin" ? (
          <>
            <p className="text-lg mb-10">Create and manage quizzes as an Admin</p>
            <button
              onClick={() => navigate("/admin")}
              className="bg-gray-800 hover:bg-black text-white font-bold py-4 px-8 rounded shadow-md transform hover:scale-105 transition-transform"
            >
              Create Quiz
            </button>
          </>
        ) : (
          <>
            <p className="text-lg mb-10">Play exciting quizzes as a User</p>
            <button
              onClick={() => navigate("/user")}
              className="bg-gray-800 hover:bg-black text-white font-bold py-4 px-8 rounded shadow-md transform hover:scale-105 transition-transform mr-5"
            >
              Play Quiz
              </button> 
              <button
                onClick={() => navigate('/leaderboard')}
                className="bg-gray-800 hover:bg-black text-white font-bold py-4 px-8 rounded shadow-md transform hover:scale-105 transition-transform">
                LeaderBoard
              </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
