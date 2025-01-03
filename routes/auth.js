import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js"; // Assuming User model is already created
import {
  authenticateAdminToken,
  authenticateUserToken,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    //  console.log(newUser.username);

    // Generate a token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, "aaaaaaa", {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User created successfully",
      token,
      role: newUser.role,
      username,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, "aaaaaaa", {
      expiresIn: "1h",
    });
    if (user.role === "admin") {
      res.status(200).json({
        token,
        role: "admin",
        message: "Admin logged in successfully",
      });
    } else {
      res.status(200).json({
        token,
        role: "user",
        message: "User logged in successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/verify-admin", authenticateAdminToken, (req, res) => {
  res.status(200).json({ role: "admin", username });
});

router.get("/verify-user", authenticateUserToken, (req, res) => {
  res.status(200).json({ role: "user", username });
});

export default router;
