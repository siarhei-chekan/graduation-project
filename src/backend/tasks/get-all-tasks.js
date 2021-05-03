const { 
    MongoClient, 
    uri 
} = require("./mongo-driver.js");

async function getAllTasks(req, res) {
    const client = new MongoClient(uri, {
            useUnifiedTopology: true
        });

    try {
        await client.connect();
        const db = client.db("myMongoDb");
        console.log(`Connected to database ${db.databaseName}`);

        const collection = db.collection("tasks");

        const cursor = await collection.find();
        const tasks = await cursor.toArray();        
        
        res.json(tasks);
    }
    catch (ex) {
        console.error(`Что-то пошло не так ${ex}`);
    }
    finally {
        await client.close();
    }
}

module.exports = {
    getAllTasks,
};