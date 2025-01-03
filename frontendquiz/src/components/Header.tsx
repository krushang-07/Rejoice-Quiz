import React from "react";
import { useTheme } from "../utils/ThemeProvider.tsx";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    Cookies.remove("admin_token");
    Cookies.remove("user_token");
    Cookies.remove("role");
    navigate("/login");
  };

  return (
    <header
      className={`sticky top-0 z-50 p-4 shadow-md transition-all duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Link to="/" className="text-3xl font-extrabold text-center sm:text-left">QuizHub</Link>
        <div className="flex items-center space-x-6">
          <span className="text-lg font-semibold">{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
          
          {/* Theme Toggle Switch */}
          <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="theme-toggle"
              className="hidden"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <div
              className={`w-12 h-7 flex items-center rounded-full p-1 transition-all ${
                theme === "dark" ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  theme === "dark" ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </label>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
