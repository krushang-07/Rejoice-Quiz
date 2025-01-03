import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // Allow credentials (cookies, HTTP authentication)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       console.log("Incoming origin:", origin);
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true); // Allow the request from the allowed origins
//       } else {
//         callback(new Error("Not allowed by CORS")); // Reject requests from other origins
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

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
