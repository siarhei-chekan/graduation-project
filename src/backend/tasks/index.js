const {Router} = require('express');
const router = Router();

const {getAllTasks} = require('./get-all-tasks');
const {getTaskById} = require('./get-task-by-id');
const {createTask} = require('./create-task');
const {editTask} = require('./edit-task');
const {deleteTask} = require('./delete-task');

router.get('/tasks', getAllTasks)
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.put('/tasks/:id', editTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;