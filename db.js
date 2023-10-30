const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://Veronika_admin:AxSdLsc0LqwBKmsF@atlascluster.muyei2o.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "wallet";

async function createTransaction(transactionData) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("transaction");
    const result = await col.insertOne(transactionData);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
}

async function getAllTransactions() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection("transaction");
      const result = await col.find().toArray();
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await client.close();
    }
  }


module.exports = {
    createTransaction,
    getAllTransactions
};
