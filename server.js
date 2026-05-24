import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// HOME ROUTE (this is what Render needs)
app.get("/", (req, res) => {
  res.json({ message: "API is working 🚀" });
});

// LOGIN
app.post("/api/login", (req, res) => {
  const token = jwt.sign(
    { user: req.body.user || "test" },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// PROTECTED
app.get("/api/protected", (req, res) => {
  res.json({ message: "Protected route working 🔐" });
});

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});