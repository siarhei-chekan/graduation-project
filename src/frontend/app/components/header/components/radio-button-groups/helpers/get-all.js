import { TasksService } from "../../../../../services/tasks.service";
import { TableBodyRow } from "../../../../main/components/table/components/table-body/component";

export function getAll(e) {
    const inputId = e.target.control.id;
    localStorage.setItem('sorting', inputId);
    const tasksService = new TasksService();

    tasksService.getAllTasks()
    .then(tasks => {
        const fr = document.createDocumentFragment();
        const tableBody = document.querySelector('tbody');
        tasks.forEach(task => {
            fr.prepend(TableBodyRow(task));            
        });

        tableBody.innerHTML = '';
        tableBody.append(fr);
    });
}