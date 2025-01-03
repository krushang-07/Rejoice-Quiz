import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // Allow credentials (cookies, HTTP authentication)
};

app.use(cors(corsOptions));
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
