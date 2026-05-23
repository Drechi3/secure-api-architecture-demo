function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).send("unauthorized");

  const token = auth.split(" ")[1];

  if (!token || !token.startsWith("token_")) {
    return res.status(401).send("invalid token");
  }

  next();
}

module.exports = authMiddleware;
