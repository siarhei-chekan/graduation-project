import { TasksService } from "../../../../../services/tasks.service";
import { TableBodyRow } from "../../../../main/components/table/components/table-body/component";

export function sortByMonth(e) {
    const inputId = e.target.control.id;
    localStorage.setItem('sorting', inputId);
    const tasksService = new TasksService();

    tasksService.getAllTasks()
    .then(tasks => {
        const fr = document.createDocumentFragment();
        const tableBody = document.querySelector('tbody');

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        tasks.sort((task1, task2) => task1.deadline - task2.deadline);

        tasks.forEach(task => {
            const deadlineDate = new Date(task.deadline);
            const deadlineMonth = deadlineDate.getMonth();
            const deadlineYear = deadlineDate.getFullYear();

            if ((currentMonth === deadlineMonth) && (currentYear === deadlineYear)) {
                fr.append(TableBodyRow(task));
            }
        });

        tableBody.innerHTML = '';
        tableBody.append(fr);
    });
}