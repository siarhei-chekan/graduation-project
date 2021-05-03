import { TasksService } from "../../../../../services/tasks.service";
import { TableBodyRow } from "../../../../main/components/table/components/table-body/component";

export function sortByDay(e) {
    const inputId = e.target.control.id;
    localStorage.setItem('sorting', inputId);

    const tasksService = new TasksService();

    tasksService.getAllTasks()
    .then(tasks => {
        const fr = document.createDocumentFragment();
        const tableBody = document.querySelector('tbody');
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        tasks.forEach(task => {
            const deadlineDate = new Date(task.deadline);
            const deadlineDay = deadlineDate.getDate();
            const deadlineMonth = deadlineDate.getMonth();
            const deadlineYear = deadlineDate.getFullYear();

            if ((currentDay === deadlineDay) && (currentMonth === deadlineMonth) && (currentYear === deadlineYear)) {
                fr.prepend(TableBodyRow(task));
            }
        });

        tableBody.innerHTML = '';
        tableBody.prepend(fr);
    });
}