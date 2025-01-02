import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../utils/ThemeProvider.tsx"; // Assuming useTheme hook is in utils/ThemeProvider.tsx
import Cookies from "js-cookie"; // Import js-cookie for cookie management

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { theme } = useTheme(); // Access the current theme

  const handleLogin = async () => {
    try {
      const response = await axios.post<{ role: string; token: string }>(
        "http://localhost:5000/api/auth/login",
        { username, password },
        { withCredentials: true }
      );

      const { role, token } = response.data;

      if (role === "admin") {
        Cookies.set("admin_token", token, { expires: 7, path: "" });  
        Cookies.set("role", "admin", { expires: 7, path: "" }); 
      } else {
        Cookies.set("user_token", token, { expires: 7, path: "" }); 
        Cookies.set("role", "user", { expires: 7, path: "" });  
  
      }
      navigate("/"); 
    } catch (err) {
      setError("Invalid username or password.");
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
        <h2 className="text-2xl flex justify-center font-bold mb-4">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
