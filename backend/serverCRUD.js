const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",     
    database: "crud"
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

app.post('/add', (req, res) => {
    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    const values = [req.body.name, req.body.email];
    db.query(sql, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "User added successfully", data });
    });
});

app.get('/user/:id', (req, res) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result);
    });
});


app.put('/update/:id', (req, res) => {
    const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    const values = [req.body.name, req.body.email, req.params.id];
    db.query(sql, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "User updated successfully", data });
    });
});

app.delete('/user/:id', (req, res) => {
    const sql = "DELETE FROM users WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => { 
        if (err) return res.status(500).json(err);
        return res.json({ message: "Deleted Successfully", data });
    });
});


app.listen(8081, () => {
    console.log("listening");
});
