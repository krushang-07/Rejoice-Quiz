import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../utils/ThemeProvider.tsx"; // Import the useTheme hook

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

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all ${
        theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={` p-8 rounded shadow-lg max-w-md w-full ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-2xl flex justify-center font-bold mb-4">Sign Up</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full  p-2 border rounded mb-4 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full  p-2 border rounded mb-4 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={`w-full  p-2 border rounded mb-4 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
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
  );
};

export default Signup;
