import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
const db = new sqlite3.Database("./database.db");

app.use(cors());
app.use(express.json());


db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT)");


  const fruits = [
    [1, "Apple"],
    [2, "Watermelon"],
    [3, "Cherry"],
    [4, "Strawberry"],
    [5, "Orange"],
    [6, "Pineapple"],
    [7, "Grapes"],
    [8, "Kiwi"]
  ];

  const stmt = db.prepare("INSERT OR IGNORE INTO items (id, name) VALUES (?, ?)");
  fruits.forEach(([id, name]) => stmt.run(id, name));
  stmt.finalize();
});


app.get("/items", (req, res) => {
  db.all("SELECT * FROM items", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
