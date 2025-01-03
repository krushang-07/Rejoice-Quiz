import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables early
dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000", // React frontend running on port 3000
  "https://rejoice-quiz.vercel.app", // Deployed frontend
  "http://localhost:5000", // Backend itself during development
];

app.use(
  cors({
    origin: function (origin, callback) {
      // console.log("Incoming origin:", origin);
      if (
        allowedOrigins.includes(origin) || // Allow listed origins
        !origin || // Allow no origin for non-browser requests (e.g., Postman)
        origin.includes("localhost") // Allow localhost for development
      ) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS")); // Reject the origin
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware for parsing JSON bodies
app.use(express.json());

// Connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Stop the server if DB connection fails
  }
};

// Call connectDB function
connectDB();

// Define path for serving static files (React app)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "frontendquiz/build")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

// Catch-all route for frontend (React app)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontendquiz/build", "index.html"));
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Set up the server to listen on port 5000
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
