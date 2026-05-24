const express = require("express");
const app = express();

app.use(express.json());

// fake users
const users = {
  alice: { password: "password123", role: "admin" },
  bob: { password: "hunter2", role: "viewer" }
};

// home route
app.get("/api/home", (req, res) => {
  res.send("Secure API Running");
});

// login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!users[username] || users[username].password !== password) {
    return res.status(401).send("invalid credentials");
  }

  const token = "token_" + Math.random().toString(36).substring(2);

  res.json({ token });
});

// auth middleware
function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) return res.status(401).send("unauthorized");

  const token = header.split(" ")[1];

  if (!token || !token.startsWith("token_")) {
    return res.status(401).send("invalid token");
  }

  next();
}

// protected route
app.get("/api/protected", auth, (req, res) => {
  res.send("protected data accessed");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
