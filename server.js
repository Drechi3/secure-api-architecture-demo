import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

// ENV variables
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

// --------------------
// Home Route (IMPORTANT)
// --------------------
app.get("/", (req, res) => {
  res.json({ message: "API is working 🚀" });
});

// --------------------
// Login Route (mock JWT)
// --------------------
app.post("/api/login", (req, res) => {
  const { username = "user", role = "user" } = req.body;

  const token = jwt.sign(
    { username, role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// --------------------
// Middleware (JWT verify)
// --------------------
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

// --------------------
// Protected Route
// --------------------
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({
    message: "Protected data accessed successfully 🔐",
    user: req.user
  });
});

// --------------------
// Start Server
// --------------------
app.listen(PORT, () => {
  console.log(`Secure API running on port ${PORT}`);
});