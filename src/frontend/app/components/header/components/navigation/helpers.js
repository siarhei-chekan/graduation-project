import { TasksService } from "../../../../services/tasks.service";
import { Button } from "../../../base/button/component";
import { FormAddTask } from "../../../main/components/form-add-task/component";
import { ModalForAddTask } from "../../../main/components/form-add-task/components/modal-for-add-task/component";
import { closeModal } from "../../../main/components/form-add-task/components/modal-for-add-task/helpers";
import { addTask } from "../../../main/components/form-add-task/helpers";
import { TableBodyRow } from "../../../main/components/table/components/table-body/component";

export function openModalToAddTask(e) {
    const modal = ModalForAddTask({
        title: 'Creating a new task',
        body: FormAddTask(),
        footerButtons: [
            Button({
                classList: 'btn btn-primary',
                content: 'Set a task',
                type: 'submit',
                clickHandler: addTask
            }),
            Button({
                classList: 'btn btn-secondary',
                content: 'Cancel',
                clickHandler: closeModal           
            })
        ]
    });

    document.body.append(modal);

    $( function() {
        $("#deadline").datepicker({
            dateFormat: "d MM yy"
        });
    });

    return modal;
}

export function search(e) {
    const sorting = {
        all: 'all',
        currentDay: 'currentDay',
        nextWeek: 'nextWeek',
        nextMonth: 'nextMonth',
        nextYear: 'nextYear'
    };

    const q = e.target.value.toLowerCase();
    const tasksService = new TasksService();

    const sortingValue = localStorage.getItem('sorting');

    switch (sortingValue) {
        case sorting.all: {
            if (q.length > 1) {
                tasksService.getAllTasks()
                .then(tasks => {
                    const tableBody = document.querySelector('tbody');
                    const fr = document.createDocumentFragment();
        
                    tasks.forEach(task => {                
                        if ((task.heading).toLowerCase().includes(q)) {
                            fr.append(TableBodyRow(task));
                        }          
                    });
        
                    tableBody.innerHTML = '';
                    tableBody.append(fr);
                });
            } else if (q === '') {
                tasksService.getAllTasks()
                .then(tasks => {
                    const tableBody = document.querySelector('tbody');
                    const fr = document.createDocumentFragment();
        
                    tasks.forEach(task => {                
                        fr.prepend(TableBodyRow(task));    
                    });
        
                    tableBody.innerHTML = '';
                    tableBody.append(fr);
                });
            }
            break;
        }

        case sorting.currentDay: {
            if (q.length > 1) {
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

                        if ((task.heading).toLowerCase().includes(q) && (currentDay === deadlineDay) && (currentMonth === deadlineMonth) && (currentYear === deadlineYear)) {
                            fr.append(TableBodyRow(task));
                        }          
                    });
        
                    tableBody.innerHTML = '';
                    tableBody.append(fr);
                });
            } else if (q === '') {
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
                    tableBody.append(fr);
                });
            }
            break;
        }

        case sorting.nextWeek: {
            if (q.length > 1) {                
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
                                if ((task.heading).toLowerCase().includes(q)) {
                                    fr.append(TableBodyRow(task));
                                }                                
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
                                if ((task.heading).toLowerCase().includes(q)) {
                                    fr.append(TableBodyRow(task));
                                }
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
                                if ((task.heading).toLowerCase().includes(q)) {
                                    fr.append(TableBodyRow(task));
                                }
                            });

                            tableBody.innerHTML = '';
                            tableBody.prepend(fr);

                            break;
                        }

                        case 3: {
                            console.log('работает: 3!');
                            const taskForWeek = tasks.filter(task => {
                                const deadlineDate = new Date(task.deadline);
                                const deadlineDay = deadlineDate.getDate();                   
                                const deadlineMonth = deadlineDate.getMonth();
                                const deadlineYear = deadlineDate.getFullYear();

                                return (deadlineDay >= currentDay - 2) && (deadlineDay <= currentDay + 4) && (currentMonth === deadlineMonth) && (currentYear === deadlineYear);                    
                            });
                            taskForWeek.forEach(task => {
                                if ((task.heading).toLowerCase().includes(q)) {
                                    fr.append(TableBodyRow(task));
                                }
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
                                if ((task.heading).toLowerCase().includes(q)) {
                                    fr.append(TableBodyRow(task));
                                }
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
                                if ((task.heading).toLowerCase().includes(q)) {
                                    fr.append(TableBodyRow(task));
                                }
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
                                if ((task.heading).toLowerCase().includes(q)) {
                                    fr.append(TableBodyRow(task));
                                }
                            });

                            tableBody.innerHTML = '';
                            tableBody.prepend(fr);

                            break;
                        }
                    }
                });
            } else if (q === '') {
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
            break;
        }

        case sorting.nextMonth: {
            if (q.length > 1) {
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

                        if ((task.heading).toLowerCase().includes(q) && (currentMonth === deadlineMonth) && (currentYear === deadlineYear)) {
                            fr.append(TableBodyRow(task));
                        }
                    });

                    tableBody.innerHTML = '';
                    tableBody.append(fr);
                });
            } else if (q === '') {
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
            break;
        }
        case sorting.nextYear: {
            if (q.length > 1) {
                tasksService.getAllTasks()
                .then(tasks => {                    
                    const fr = document.createDocumentFragment();
                    const tableBody = document.querySelector('tbody');
                    const currentDate = new Date();
                    const currentYear = currentDate.getFullYear();
                    tasks.sort((task1, task2) => task1.deadline - task2.deadline);

                    tasks.forEach(task => {
                        const deadlineDate = new Date(task.deadline);
                        const deadlineYear = deadlineDate.getFullYear();

                        if ((task.heading).toLowerCase().includes(q) && (currentYear === deadlineYear)) {
                            fr.prepend(TableBodyRow(task));
                        }
                    });

                    tableBody.innerHTML = '';
                    tableBody.prepend(fr);
                });
            } else if (q === '') {
                tasksService.getAllTasks()
                .then(tasks => {
                    const fr = document.createDocumentFragment();
                    const tableBody = document.querySelector('tbody');
                    const currentDate = new Date();
                    const currentYear = currentDate.getFullYear();
                    tasks.sort((task1, task2) => task1.deadline - task2.deadline);

                    tasks.forEach(task => {
                        const deadlineDate = new Date(task.deadline);
                        const deadlineYear = deadlineDate.getFullYear();

                        if (currentYear === deadlineYear) {
                            fr.prepend(TableBodyRow(task));
                        }
                    });

                    tableBody.innerHTML = '';
                    tableBody.prepend(fr);
                });
            }
            break;
        }
    }    
}