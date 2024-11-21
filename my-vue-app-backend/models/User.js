// models/User.js
const bcrypt = require("bcryptjs");

class User {
  constructor(db) {
    this.db = db;
  }

  // Register a new user
  register(username, password, role, callback) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    const query = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    this.db.query(query, [username, hashedPassword, role], callback);
  }

  // Find a user by username
  findByUsername(username, callback) {
    const query = "SELECT * FROM users WHERE username = ?";
    this.db.query(query, [username], callback);
  }

  // Verify password
  verifyPassword(storedPassword, inputPassword) {
    return bcrypt.compareSync(inputPassword, storedPassword);
  }
}

module.exports = User;
