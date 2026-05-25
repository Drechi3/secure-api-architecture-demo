const express = require("express");
const app = express();

app.use(express.json());

// Root route (health check)
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running successfully 🚀",
    status: "healthy",
  });
});

// Example test route
app.get("/test", (req, res) => {
  res.json({
    message: "Test route working",
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});