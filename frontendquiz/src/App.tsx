import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, redirect } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Home from "./pages/Home.tsx";
import Admin from "./pages/Admin.tsx";
import User from "./pages/User.tsx";
import { ThemeProvider } from "./utils/ThemeProvider.tsx";
import Header from "./components/Header.tsx";
import Cookies from "js-cookie";
import axios from "axios";
import LeaderBoard from "./pages/LeaderBoard.tsx";


// Set the base URL for axios
axios.defaults.baseURL = "http://localhost:5000";

const App: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const verifyTokens = async () => {
      const adminToken = Cookies.get("admin_token");
      const userToken = Cookies.get("user_token");

      if (!adminToken && !userToken) {
        setRole(null);
        setLoading(false);
        redirect("/login");
        return; 
      }
      const storedRole = Cookies.get("role");

      if (storedRole) {
        setRole(storedRole);
      } else {
        try {
          if (adminToken) {
            const res = await axios.get("/api/auth/verify-admin", {
              headers: { Authorization: `Bearer ${adminToken}` },
            });
            setRole("admin");
            console.log(res.data.username);
          } else if (userToken) {
           const res =  await axios.get("/api/auth/verify-user", {
              headers: { Authorization: `Bearer ${userToken}` },
            });
            setRole("user");
            console.log(res.data.username);
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          setRole(null); 
        }
      }

      setLoading(false); 
    };

    verifyTokens();
  }, []); 
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home role={role} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
