import React from "react";
import { useTheme } from "../utils/ThemeProvider.tsx";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import Cookies for cookie management

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
      className={`sticky top-0 z-50 p-4 shadow-md ${
        theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Link to="/" className="text-xl font-bold">QuizHub</Link>
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold">
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </span>
          {/* Toggle Switch */}
          <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="theme-toggle"
              className="hidden"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <div
              className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
                theme === "dark" ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                  theme === "dark" ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </div>
          </label>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
