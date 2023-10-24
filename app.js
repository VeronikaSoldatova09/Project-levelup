const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
 const app = express();

app.use(cors());
app.use(express.json());

const url = 'mongodb+srv://Veronika_admin:AxSdLsc0LqwBKmsF@atlascluster.muyei2o.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url, { useUnifiedTopology: true });

app.post('/add-transaction', async (req, res) => {
  try {
     
      await client.connect();
      const db = client.db('wallet');
      const col = db.collection('transaction');

      
      const transactionData = req.body;

      
      const result = await col.insertOne(transactionData);

      
      res.status(201).json(result.ops[0]);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Помилка при додаванні транзакції' });
  } finally {
      await client.close();
  }
});

app.get("/app", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
