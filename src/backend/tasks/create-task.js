const { 
    MongoClient, 
    uri 
} = require("./mongo-driver.js");

async function createTask(req, res) {
    const client = new MongoClient(uri, {
            useUnifiedTopology: true
        });

    try {
        await client.connect();
        const db = client.db("myMongoDb");
        console.log(`Connected to database ${db.databaseName}`);

        const collection = db.collection("tasks");

        const cursor = await collection.find();
        const allTasks = await cursor.toArray();

        const lastTask = allTasks[allTasks.length - 1];
        const numberOfLastTask = lastTask.taskId;
        const newTaskNumber = numberOfLastTask + 1;
        const options = {
            projection: { _id: 0 },
        };
        
        const {deadline, ...restReqParams} = req.body;
        const deadlineInMilliseconds = Date.parse(deadline);

        const doc = Object.assign({}, restReqParams, {
            taskId: newTaskNumber,
            dateOfCreation: Date.now(),
            status: "To Do",
            deadline: deadlineInMilliseconds
        });

        const task = await collection.insertOne(doc);

        res.json(task.ops);
    }
    catch (ex) {
        console.error(`Что-то пошло не так ${ex}`);
    }
    finally {
        await client.close();
    }
}

module.exports = {
    createTask,
};