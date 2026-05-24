import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

// ENV setup
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

// -------------------
// Home Route (IMPORTANT for Render)
// -------------------
app.get("/", (req, res) => {
  res.json({ message: "Secure API is running 🚀" });
});

// -------------------
// Login Route (mock auth)
// -------------------
app.post("/api/login", (req, res) => {
  const { username, role } = req.body;

  const token = jwt.sign(
    { username, role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// -------------------
// Middleware (JWT check)
// -------------------
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = user;
    next();
  });
}

// -------------------
// Protected Route
// -------------------
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({
    message: "Protected data accessed successfully 🔐",
    user: req.user
  });
});

// -------------------
// Start Server
// -------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});