require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.json());

// SIMPLE STORAGE (NO DATABASE)
const users = [];

// DEBUG
console.log("JWT SECRET =", process.env.JWT_SECRET);

/*
  REGISTER
*/
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  users.push({ username, password: hashed });

  res.json({ message: "User registered successfully" });
});

/*
  LOGIN
*/
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

/*
  AUTH MIDDLEWARE
*/
function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

/*
  PROTECTED ROUTE
*/
app.get("/api/protected", auth, (req, res) => {
  res.json({
    message: "Protected data accessed",
    user: req.user
  });
});

/*
  START SERVER
*/
app.listen(3000, () => {
  console.log("Server running on port 3000");
});