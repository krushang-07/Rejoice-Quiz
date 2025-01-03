import React, {useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../utils/ThemeProvider.tsx"; // Import the useTheme hook
import PreventScrolling from "../custom/PreventScrolling.tsx";

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { theme } = useTheme(); // Access the current theme

  const handleSignup = async () => {
    try {
      if (role !== "user" && role !== "admin") {
        setError("Invalid role selected.");
        return;
      }
      const response = await axios.post("/api/auth/register", { username, password, role });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError("Failed to create account. Please try again.");
    }
  };


  PreventScrolling();
  
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-r ${
        theme === "dark" ? "from-gray-800 to-black text-white" : "from-blue-500 to-teal-500 text-white"
      } transition-all`}
    >
      {/* Container for both image and form */}
      <div className="flex w-full max-w-6xl">
        
        {/* Left side with image */}
        <div className="hidden md:block w-1/2 h-full relative">
          <img
            src="/sign.jpeg"
            alt="Sign Up"
            className="w-full h-full object-cover rounded-l-lg"
            style={{ width: "100%", height: "100%" }} // Explicitly set width and height to 100%
          />
        </div>

        {/* Right side with the signup form */}
        <div
          className={`flex justify-center items-center p-8 rounded-r-lg shadow-lg w-full md:w-1/2 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}
        >
          <div className="w-full max-w-md">
            <h2 className="text-3xl text-center font-bold mb-6 tracking-wide">Create an Account</h2>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-3 border rounded-lg mb-4 transition-all ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border rounded-lg mb-4 transition-all ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full p-3 border rounded-lg mb-4 transition-all ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={handleSignup}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white p-3 rounded-lg hover:scale-105 transition-transform"
            >
              Sign Up
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Log In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
