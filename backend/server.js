const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',     
  database: 'react_auth'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).send({ message: 'Error creating user', error: err.code });
    }
    res.send({ message: 'Sign Up Successful!', userId: result.insertId });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('Login query error:', err);
      return res.status(500).send({ message: 'Server error', error: err.code });
    }

    if (result.length > 0) {
      res.send({ message: 'Login Successful', user: result[0] });
    } else {
      res.status(401).send({ message: 'Invalid email or password' });
    }
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
