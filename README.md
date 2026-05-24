import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Secure API is running inside Docker");
});

// Public API route
app.get("/api/home", (req, res) => {
  res.json({
    message: "Welcome to the Secure DevSecOps API Project",
  });
});

// Mock login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "alice" && password === "password123") {
    return res.json({
      token: "mock-jwt-token",
      role: "admin",
    });
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
});

// Protected route
app.get("/api/protected", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  if (authHeader !== "Bearer mock-jwt-token") {
    return res.status(403).json({
      message: "Invalid token",
    });
  }

  res.json({
    message: "Protected data accessed successfully",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});