const users = require("../data/users");

function loginRoute(req, res) {
  const { username, password } = req.body;

  if (!users[username] || users[username].password !== password) {
    return res.status(401).send("invalid credentials");
  }

  const token = "token_" + Math.random().toString(36).slice(2);

  res.json({ token });
}

module.exports = loginRoute;
