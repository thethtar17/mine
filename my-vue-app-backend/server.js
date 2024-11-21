const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // To enable CORS for the front-end

const app = express();
const port = 3000;

// Set up CORS to allow communication between front-end and back-end
app.use(cors());
app.use(express.json()); // Middleware to handle JSON requests

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'thet', // Replace with your MySQL password
  database: 'my-vue-app-db',  // Replace with your database name
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
// Endpoint to update a task
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed , time} = req.body;

  // Check if all necessary fields are provided
  if (!text || !time || typeof completed === 'undefined') {
    return res.status(400).json({ error: 'Text, time, and completed status are required' });
  }

  console.log(`Updating task with ID: ${id}`);
  console.log(`Text: ${text}, Time: ${time}, Completed: ${completed}`);

  // Update the task in the database
  db.query(
    'UPDATE todos SET text = ?, completed = ?, time = ? WHERE id = ?',
    [text, completed, time, id],
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: err.message });
      }

      // If no rows were affected, that means the task ID wasn't found
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }

      console.log('Update successful:', results);
      res.json({ id, text, completed, time });
    }
  );

});
// Endpoint to delete a task
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  console.log('Deleting task with ID:', id);

  db.query('DELETE FROM todos WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error deleting task:', err);
      res.status(500).json({ error: 'Internal server error' }); // Return JSON on error
    } else if (results.affectedRows > 0) {
      res.json({ message: 'Task deleted successfully' }); // Return success message in JSON format
    } else {
      res.status(404).json({ error: 'Task not found' }); // Return JSON error if task not found
    }
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
