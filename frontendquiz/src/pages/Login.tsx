import React, {useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../utils/ThemeProvider.tsx"; // Assuming useTheme hook is in utils/ThemeProvider.tsx
import Cookies from "js-cookie"; // Import js-cookie for cookie management
import PreventScrolling from "../custom/PreventScrolling.tsx";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { theme } = useTheme(); // Access the current theme

  const handleLogin = async () => {
    try {
      const response = await axios.post<{ role: string; token: string }>(
        "/api/auth/login",
        { username, password },
        { withCredentials: true }
      );

      const { role, token } = response.data;
 

      if (role === "admin") {
        Cookies.set("admin_token", token, { expires: 7, path: "" });  
        Cookies.set("role", "admin", { expires: 7, path: "" }); 
        Cookies.set("username", username, { expires: 7, path: "" });
      } else {
        Cookies.set("user_token", token, { expires: 7, path: "" }); 
        Cookies.set("role", "user", { expires: 7, path: "" });  
        Cookies.set("username", username, { expires: 7, path: "" });
      }
      navigate("/"); 
    } catch (err) {
      setError("Invalid username or password.");
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
            alt="Login"
            className="w-full h-full object-cover rounded-l-lg"
            style={{ width: "100%", height: "100%" }} // Explicitly set width and height to 100%
          />
        </div>

        {/* Right side with the login form */}
        <div
          className={`flex justify-center items-center p-8 rounded-r-lg shadow-lg w-full md:w-1/2 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}
        >
          <div className="w-full max-w-md">
            <h2 className="text-3xl text-center font-bold mb-6 tracking-wide">Login to Your Account</h2>

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
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white p-3 rounded-lg hover:scale-105 transition-transform"
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
      </div>
    </div>
  );
};

export default Login;
