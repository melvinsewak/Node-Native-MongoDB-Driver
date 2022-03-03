const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb://localhost:27017/?maxPoolSize=20&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    const db = await client.db("fruitsDB");
    await db.command({ ping: 1 });
    console.log("Connected successfully to server");

    //Write Document
    await insert(db);

    //Read Documents
    const findResult = await db.collection('fruits').find({}).toArray();

    findResult.forEach(element => {
        console.log(element);
    });

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function insert(db){
    const collection = db.collection('fruits');

    const docs = [
        { "_id": 1, "name": "apple"},
        { "_id": 2, "name": "orange"},
        { "_id": 3, "name": "banana"},
        { "_id": 4, "name": "cherry"}
     ];
     const insertManyresult = await collection.insertMany(docs);
     let ids = insertManyresult.insertedIds;
     console.log(`${insertManyresult.insertedCount} documents were inserted.`);
}



run().catch(console.dir);
