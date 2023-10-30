const express = require("express");
const cors = require("cors");
const db = require('./db.js');
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post("/transaction", async (req, res) => {
  try {
    const transactionData = req.body;
    const result = await db.createTransaction(transactionData);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка при додаванні транзакції" });
  }
});

app.get("/app", (req, res) => {
  res.send("Hello World!");
});

app.get("/transaction", async (req, res) => {
  try {
    const transactions = await db.getAllTransactions();
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка при отриманні транзакцій" });
  }
});

module.exports = app;