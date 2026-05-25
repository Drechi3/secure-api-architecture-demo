const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

/*
=========================
DEBUG ENV
=========================
*/
console.log("MONGO_URI:", process.env.MONGO_URI);

/*
=========================
USER MODEL
=========================
*/
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

/*
=========================
ROOT ROUTE
=========================
*/
app.get("/", (req, res) => {
  res.json({
    message: "API is running successfully 🚀",
    status: "healthy",
  });
});

/*
=========================
REGISTER ROUTE
=========================
*/
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

/*
=========================
LOGIN ROUTE
=========================
*/
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

/*
=========================
PROTECTED ROUTE (FIXED)
=========================
*/
app.get("/dashboard", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({
      message: "Welcome to secure dashboard 🔐",
      user: decoded,
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

/*
=========================
404 HANDLER
=========================
*/
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

/*
=========================
CONNECT DB + START SERVER
=========================
*/
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log("MongoDB Connected Successfully 🚀");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err.message);
  });