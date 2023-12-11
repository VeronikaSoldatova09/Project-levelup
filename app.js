const express = require("express");
const cors = require("cors");
const routeTransaction = require('./route/transaction')
const routeCategories = require('./route/categories.js')
const db = require('./db.js');
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/transaction', routeTransaction);
app.use('/categories', routeCategories);

app.get("/app", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;