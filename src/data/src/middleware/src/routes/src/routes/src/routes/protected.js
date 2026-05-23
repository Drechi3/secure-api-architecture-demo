function protectedRoute(req, res) {
  res.send("protected data");
}

module.exports = protectedRoute;
