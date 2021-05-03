function byPath(path) {
    const SERVER_URL = `http://localhost:3000`;

    return SERVER_URL + path;
}

function readAsJson(res) {
    return res.json();
}

export class TasksService {

    getTaskById(taskId) {
        return fetch(byPath(`/tasks/${taskId}`)).then(readAsJson);
    }

    getAllTasks(query) {
        const q = query ? `?q=${query}`: '';
        return fetch(byPath('/tasks/' + q)).then(readAsJson);
    }

    createTask(task) {
        const t = {
            heading: task.heading,
            content: task.content,
            performer: task.performer,
            deadline: new Date(task.deadline)
        };

        return fetch(byPath('/tasks'), {
            method: 'POST',
            body: JSON.stringify(t),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(readAsJson);
    }

    editTask(taskId, taskChanges) {
        const t = {
            status: taskChanges.status,
            heading: taskChanges.heading,
            content: taskChanges.content,
            performer: taskChanges.performer,
            deadline: taskChanges.deadline
        };

        return fetch(byPath(`/tasks/${taskId}`), {
            method: 'PUT',
            body: JSON.stringify(t),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(readAsJson);
    }

    deleteTask(taskId) {
        return fetch(byPath(`/tasks/${taskId}`), {
            method: 'DELETE',
        })
        .then(readAsJson);
    }
}