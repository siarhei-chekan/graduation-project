const { 
    MongoClient, 
    uri 
} = require("./mongo-driver.js");

async function editTask(req, res) {
    const client = new MongoClient(uri, {
            useUnifiedTopology: true
        });

    try {
        await client.connect();
        const db = client.db("myMongoDb");
        console.log(`Connected to database ${db.databaseName}`);

        const collection = db.collection("tasks");

        const { id: unsafeId, deadline, ...changes } = req.body;

        const deadlineInMilliseconds = Date.parse(deadline);
        const query = req.params;
        const options = {
            projection: { _id: 0 },
        };
        const value = Number(Object.values(query));
        
        const updateDoc = {
            $set: {
                deadline: deadlineInMilliseconds,
                ...changes}
        };

        const editing = await collection.updateOne({ taskId: value }, updateDoc);
        const editedTask = await collection.findOne({ taskId: value }, options);

        res.status(200).json(editedTask);
    }
    catch (ex) {
        console.error(`Что-то пошло не так ${ex}`);
    }
    finally {
        await client.close();
    }
}

module.exports = {
    editTask,
};