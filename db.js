const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://Veronika_admin:AxSdLsc0LqwBKmsF@atlascluster.muyei2o.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
 
 // Reference the database to use
 const dbName = "wallet";
                      
 async function run() {
    try {
        // Connect to the Atlas cluster
         await client.connect();
         const db = client.db(dbName);

         // Reference the "people" collection in the specified database
         const col = db.collection("transaction");

         // Create a new document                                                                                                                                           
         let transactionDocument = {
          id: 1, 
          description: "Покупка продуктів", 
          amount: -50.00, 
          date: new Date(), 
          category: "Їжа", 
          type: "expense" 
         }

         // Insert the document into the specified collection        
         const p = await col.insertOne(transactionDocument);

         // Find and return the document
         const filter = { "category": "Їжа" };
         const document = await col.findOne(filter);
        console.log("Transaction added:\n" + JSON.stringify(document));

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);
