// routes/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

module.exports = (db) => {
  const userModel = new User(db);

  const router = require("express").Router();

  // Register Route
  router.post("/register", (req, res) => {
    const { username, password, role } = req.body;
    userModel.findByUsername(username, (err, result) => {
      if (result.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }
      userModel.register(username, password, role, (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Error registering user" });
        }
        res.status(201).json({ message: "User created successfully" });
      });
    });
  });

  // Login Route
  router.post("/login", (req, res) => {
    const { username, password } = req.body;
    userModel.findByUsername(username, (err, result) => {
      if (err || result.length === 0) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const user = result[0]; // Assuming result is an array with a single user
      if (!userModel.verifyPassword(user.password, password)) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id, role: user.role }, "yourSecretKey", { expiresIn: '1h' });
      res.json({ token });
    });
  });

  return router;
};
