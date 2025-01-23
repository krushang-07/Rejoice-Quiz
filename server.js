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
  origin: "http://localhost:3000", // Correctly match frontend origin without trailing slash
  credentials: true, // Allow cookies and credentials
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Stop server on failure to connect to DB
  }
};

connectDB();

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Backend API is up and running!");
});
app.get("/api/get-microsoft-credentials", (req, res) => {
  res.json({
    data: [
      {
        email: "@shailesh312rejoicegmail.onmicrosoft.com",
        clientId: "9151c0d5-07d8-4b63-9636-8fb08417e666",
        authority:
          "https://login.microsoftonline.com/7e5f3926-3cba-4896-9658-d6f907769a67",
      },
      {
        email: "@rejoice.com",
        clientId: "9151c0d5-07d8-4b63-9636-8fb08417e666",
        authority:
          "https://login.microsoftonline.com/7e5f3926-3cba-4896-9658-d6f907769a60",
      },
    ],
  });
});

// Vercel specific export handler
export default app;

// Set up the server to listen on port 5000
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
