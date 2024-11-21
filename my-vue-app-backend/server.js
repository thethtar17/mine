const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 3000;
// Define a secret key for JWT
const JWT_SECRET = 'your-secret-key'; //
// const moneyRoutes = require('./routes/money');
const { authenticateToken } = require('./routes/auth'); 
// Set up CORS to allow communication between front-end and back-end
app.use(cors());
app.use(express.json()); // Middleware to handle JSON requests
// app.use('/api/money', moneyRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'thet' , // Replace with your MySQL password from .env
  database: 'my-vue-app-db',
});

// Create the 'todos' table if it doesn't exist
db.query(`
  CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255),
    completed BOOLEAN,
    time DATETIME DEFAULT NULL
  );
`);

// Create the 'users' table if it doesn't exist
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
   role ENUM('user', 'admin') DEFAULT 'user'
  );
`);


app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username are required.' });
  }

  // Check if the username exists in the database
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error.' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid  password.' });
    }

    const user = results[0];

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, JWT_SECRET, {
      expiresIn: '1h', // Set an expiration time for the token
    });

    // Return the token in the response
    res.status(200).json({ message: 'Login successful', token });
  });
});

// Endpoint to get all tasks
app.get('/api/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Endpoint to add a task
app.post('/api/todos', (req, res) => {
  const { text, completed, time } = req.body;
  db.query('INSERT INTO todos (text, completed, time) VALUES (?, ?, ?)', [text, completed, time], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: results.insertId, text, completed, time });
    }
  });
});

// Endpoint to update a task
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed, time } = req.body;

  if (!text || !time || typeof completed === 'undefined') {
    return res.status(400).json({ error: 'Text, time, and completed status are required' });
  }

  db.query(
    'UPDATE todos SET text = ?, completed = ?, time = ? WHERE id = ?',
    [text, completed, time, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ id, text, completed, time });
    }
  );
});

// Endpoint to delete a task
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM todos WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.affectedRows > 0) {
      res.json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  });
});
// Register route
app.post('/api/auth/register', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required.' });
  }

  // Check if the username already exists
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error.' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Username is already taken.' });
    }

    try {
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      db.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, hashedPassword, role],
        (err, results) => {
          if (err) {
            return res.status(500).json({ message: 'Error registering user.' });
          }

          // Return success message
          res.status(201).json({ message: 'User registered successfully!' });
        }
      );
    } catch (error) {
      return res.status(500).json({ message: 'Error hashing password.' });
    }
  });
});


app.get('/api/user', authenticateToken, (req, res) => {
  const userName = req.user.name; // Assuming the name is stored in the token payload
  res.json({ name: userName });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
