import { TasksService } from "../../../../../services/tasks.service";
import { TableBodyRow } from "../../../../main/components/table/components/table-body/component";

export function sortByWeek(e) {
    const inputId = e.target.control.id;
    localStorage.setItem('sorting', inputId);
    const tasksService = new TasksService();

    tasksService.getAllTasks()
    .then(tasks => {
        const fr = document.createDocumentFragment();
        const tableBody = document.querySelector('tbody');

        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentWeek = currentDate.getDay();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        tasks.sort((task1, task2) => task1.deadline - task2.deadline);

        switch (currentWeek) {
            case 0: {
                const taskForWeek = tasks.filter(task => {
                    const deadlineDate = new Date(task.deadline);
                    const deadlineDay = deadlineDate.getDate();                  
                    const deadlineMonth = deadlineDate.getMonth();
                    const deadlineYear = deadlineDate.getFullYear();

                    return (deadlineDay >= currentDay - 6) && (deadlineDay <= currentDay) && (currentMonth === deadlineMonth) && (currentYear === deadlineYear);                    
                });
                taskForWeek.forEach(task => {
                    fr.append(TableBodyRow(task));
                });

                tableBody.innerHTML = '';
                tableBody.prepend(fr);

                break;
            }                

            case 1: {
                const taskForWeek = tasks.filter(task => {
                    const deadlineDate = new Date(task.deadline);
                    const deadlineDay = deadlineDate.getDate();                   
                    const deadlineMonth = deadlineDate.getMonth();
                    const deadlineYear = deadlineDate.getFullYear();

                    return (deadlineDay >= currentDay) && (deadlineDay <= currentDay + 6) && (currentMonth === deadlineMonth) && (currentYear === deadlineYear);                    
                });
                taskForWeek.forEach(task => {
                    fr.append(TableBodyRow(task));
                });

                tableBody.innerHTML = '';
                tableBody.prepend(fr);

                break;
            }

            case 2: {
                const taskForWeek = tasks.filter(task => {
                    const deadlineDate = new Date(task.deadline);
                    const deadlineDay = deadlineDate.getDate();                   
                    const deadlineMonth = deadlineDate.getMonth();
                    const deadlineYear = deadlineDate.getFullYear();

                    return (deadlineDay >= currentDay - 1) && (deadlineDay <= currentDay + 5) && (currentMonth === deadlineMonth) && (currentYear === deadlineYear);                    
                });
                taskForWeek.forEach(task => {
                    fr.append(TableBodyRow(task));
                });

                tableBody.innerHTML = '';
                tableBody.prepend(fr);

                break;
            }

            case 3: {
                const taskForWeek = tasks.filter(task => {
                    const deadlineDate = new Date(task.deadline);
                    const deadlineDay = deadlineDate.getDate();                   
                    const deadlineMonth = deadlineDate.getMonth();
                    const deadlineYear = deadlineDate.getFullYear();

                    return (deadlineDay >= currentDay - 2) && (deadlineDay <= currentDay + 4) && (currentMonth === deadlineMonth) && (currentYear === deadlineYear);                    
                });
                taskForWeek.forEach(task => {
                    fr.append(TableBodyRow(task));
                });

                tableBody.innerHTML = '';
                tableBody.prepend(fr);

                break;
            }

            case 4: {
                const taskForWeek = tasks.filter(task => {
                    const deadlineDate = new Date(task.deadline);
                    const deadlineDay = deadlineDate.getDate();                   
                    const deadlineMonth = deadlineDate.getMonth();
                    const deadlineYear = deadlineDate.getFullYear();

                    return (deadlineDay >= currentDay - 3) && (deadlineDay <= currentDay + 3) && (currentMonth === deadlineMonth) && (currentYear === deadlineYear);                    
                });
                taskForWeek.forEach(task => {
                    fr.append(TableBodyRow(task));
                });

                tableBody.innerHTML = '';
                tableBody.prepend(fr);

                break;
            }

            case 5: {
                const taskForWeek = tasks.filter(task => {
                    const deadlineDate = new Date(task.deadline);
                    const deadlineDay = deadlineDate.getDate();                   
                    const deadlineMonth = deadlineDate.getMonth();
                    const deadlineYear = deadlineDate.getFullYear();

                    return (deadlineDay >= currentDay - 4) && (deadlineDay <= currentDay + 2) && (currentMonth === deadlineMonth) && (currentYear === deadlineYear);                    
                });
                taskForWeek.forEach(task => {
                    fr.append(TableBodyRow(task));
                });

                tableBody.innerHTML = '';
                tableBody.prepend(fr);

                break;
            }

            case 6: {
                const taskForWeek = tasks.filter(task => {
                    const deadlineDate = new Date(task.deadline);
                    const deadlineDay = deadlineDate.getDate();                   
                    const deadlineMonth = deadlineDate.getMonth();
                    const deadlineYear = deadlineDate.getFullYear();

                    return (deadlineDay >= currentDay - 5) && (deadlineDay <= currentDay + 1) && (currentMonth === deadlineMonth) && (currentYear === deadlineYear);                    
                });
                taskForWeek.forEach(task => {
                    fr.append(TableBodyRow(task));
                });

                tableBody.innerHTML = '';
                tableBody.prepend(fr);

                break;
            }
        }
    });
}