import { TasksService } from "../../../../../../services/tasks.service";
import { createReadableDeadlineDate, createReadebleDateOfCreation } from "../../../helpers";
import { TableData } from "../table-data";

export function TableBody() {
    const tableBody = document.createElement('tbody');

    const tasksService = new TasksService();

    tasksService.getAllTasks()
    .then(tasks => {
        tasks.forEach(task => {
            tableBody.prepend(TableBodyRow(task));
        });
    });

    return tableBody;
}

export function TableBodyRow(task) {
    const tableBodyRow = document.createElement('tr');
    const {heading, deadline, performer, status, dateOfCreation, taskId } = task;

    tableBodyRow.setAttribute('data-id', taskId);

    const arrayFromTaskProp = [heading, createReadableDeadlineDate(deadline), performer, status, createReadebleDateOfCreation(dateOfCreation)];

    arrayFromTaskProp.forEach(prop => {
        tableBodyRow.append(TableData({prop, status, taskId}));
    });

    return tableBodyRow;
}