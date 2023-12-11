const { MongoClient, ObjectId } = require("mongodb");

const url =
  "mongodb+srv://Veronika_admin:AxSdLsc0LqwBKmsF@atlascluster.muyei2o.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "wallet";

async function createTransaction(transactionData) {
  try {
    transactionData.date = new Date().toString();

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

async function createCategory(categoryData) {
  try {
    categoryData.date = new Date().toString();
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("categories");
    const result = await col.insertOne(categoryData);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
}

async function getAllCategories() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("categories");
    const result = await col.find().toArray();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
}

async function upDateTransaction(id, newValue) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("transaction");
    const myquery = { _id: new ObjectId(id) };
    const newvalues = { $set: newValue };
    await col.findOneAndUpdate(myquery, newvalues);
    return "ok";
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
}

async function deleteTransaction(id) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("transaction");
    const myquery = { _id: new ObjectId(id) };
    await col.findOneAndDelete(myquery);
    return "ok";
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
}

async function getFilterTransactions(filter) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("transaction");
    const result = await col.find(filter).toArray();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
}

async function upDateCategories(id, newValue) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("categories");
    const myquery = { _id: new ObjectId(id) };
    const newvalues = { $set: newValue };
    await col.findOneAndUpdate(myquery, newvalues);
    return "ok";
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
}

async function deleteCategories(id) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("categories");
    const myquery = { _id: new ObjectId(id) };
    await col.findOneAndDelete(myquery);
    return "ok";
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
}

async function getFilterCategories(filter) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("categories");
    const result = await col.find(filter).toArray();
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
  getAllTransactions,
  createCategory,
  getAllCategories,
  upDateTransaction,
  deleteTransaction,
  getFilterTransactions,
  getFilterCategories,
  deleteCategories,
  upDateCategories
};
