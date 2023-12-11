const express = require("express");
const db = require("../db.js");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", async (req, res) => {
  try {
    const transactions = await db.getAllTransactions();
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка при отриманні транзакцій" });
  }
});

router.post("/", async (req, res) => {
  try {
    const transactionData = req.body;
    const result = await db.createTransaction(transactionData);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка при додаванні транзакції" });
  }
});

router.put('/', async (req, res) => {
    try {
        const newValue = req.body.newValue;
        const id = req.body.id;
        const result = await db.upDateTransaction(id, newValue);
        res.status(201).json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Помилка при оновленні транзакції" });
      }
});

router.delete('/', async (req, res) => {
  try {
    const id = req.body.id;
    const result = await db.deleteTransaction(id);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка при видаленні транзакції" });
  }
});

router.get("/filter", async (req, res) => {
  try {
    console.log(req.query);
    const transactions = await db.getFilterTransactions(req.query);
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка при фільтруванні транзакцій" });
  }
});

module.exports = router;
