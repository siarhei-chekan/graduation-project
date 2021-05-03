const { 
    MongoClient, 
    uri 
} = require("./mongo-driver.js");

async function getTaskById(req, res) {
    const client = new MongoClient(uri, {
            useUnifiedTopology: true
        });

    try {
        await client.connect();
        const db = client.db("myMongoDb");
        console.log(`Connected to database ${db.databaseName}`);

        const collection = db.collection("tasks");

        const query = req.params;
        const options = {
            projection: { _id: 0 },
        };
        const value = Number(Object.values(query));    
        const task = await collection.findOne({ taskId: value }, options);

        res.json(task);
    }
    catch (ex) {
        console.error(`Что-то пошло не так ${ex}`);
    }
    finally {
        await client.close();
    }
}

module.exports = {
    getTaskById,
};