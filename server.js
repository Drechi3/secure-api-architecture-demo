const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

app.use(express.json());

/**
 * HOME ROUTE
 */
app.get("/", (req, res) => {
  res.send("Secure API (JWT + Docker + DevSecOps Ready) 🚀");
});

/**
 * PUBLIC ROUTE
 */
app.get("/api/home", (req, res) => {
  res.json({
    message: "Welcome to Secure DevSecOps API",
  });
});

/**
 * LOGIN ROUTE (REAL JWT)
 */
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "alice" && password === "password123") {
    const token = jwt.sign(
      {
        username,
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
});

/**
 * AUTH MIDDLEWARE
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
}

/**
 * PROTECTED ROUTE
 */
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "Protected data accessed successfully 🔐",
    user: req.user,
  });
});

/**
 * HEALTH CHECK
 */
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

/**
 * START SERVER
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});