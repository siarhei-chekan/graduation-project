const { 
    MongoClient, 
    uri 
} = require("./mongo-driver.js");

async function deleteTask(req, res) {
    const client = new MongoClient(uri, {
            useUnifiedTopology: true
        });

    try {
        await client.connect();
        const db = client.db("myMongoDb");
        console.log(`Connected to database ${db.databaseName}`);

        const collection = db.collection("tasks");

        const query = req.params;
        const value = Number(Object.values(query));

        const deleting = await collection.deleteOne({ taskId: value });

        res.json(value);
    }
    catch (ex) {
        console.error(`Что-то пошло не так ${ex}`);
    }
    finally {
        await client.close();
    }
}

module.exports = {
    deleteTask,
};