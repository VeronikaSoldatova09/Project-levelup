const express = require("express");
const db = require("../db.js");
const router = express.Router();

router.get("/categories", async (req, res) => {
  try {
    const categories = await db.getAllCategories();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка при отриманні категорій" });
  }
});

router.post("/categories", async (req, res) => {
  try {
    const categoryData = req.body;
    const result = await db.createCategory(categoryData);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка при отриманні категорій" });
  }
});

router.put("/:id", async (req, res) => {
    try {
      const newValue = req.body.newValue;
      const id = req.params.id;
      const result = await db.upDateCategories(id, newValue);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Помилка при оновленні категорій" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await db.deleteCategories(id);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Помилка при видаленні категорій" });
    }
  });

router.get("/filter", async (req, res) => {
  try {
    console.log(req.query);
    const transactions = await db.getFilterCategories(req.query);
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка при фільтруванні категорій" });
  }
});

module.exports = router;