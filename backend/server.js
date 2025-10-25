import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
const db = new sqlite3.Database("./database.db");

app.use(cors());
app.use(express.json());

// Skapa tabell och fyll data om den inte finns
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT)");
  db.run("INSERT OR IGNORE INTO items (id, name) VALUES (1, 'Apple'), (2, 'Banana'), (3, 'Cherry')");
});

// API-endpoint
app.get("/items", (req, res) => {
  db.all("SELECT * FROM items", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Starta servern
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
