import { TasksService } from '../../../../services/tasks.service';
import { TableBodyRow } from '../table/components/table-body/component';
import { closeModalAfterAddedTask } from './components/modal-for-add-task/helpers';
import { formAddTaskSelector } from './constants';

export function addTask(e) {
    e.preventDefault();

    const form = document.querySelector(formAddTaskSelector);
    const headingInput = document.querySelector('.heading-input');
    const descriptionTextArea = document.querySelector('textarea');
    const performerInput = document.querySelector('.performer-input');
    const deadLineInput = document.querySelector('.deadline-input');
    const heading = headingInput.value;
    const content = descriptionTextArea.value;
    const performer = performerInput.value;
    const deadline = deadLineInput.value;

    closeModalAfterAddedTask();

    const tasksService = new TasksService();

    tasksService.createTask({
        heading,
        content,
        performer,
        deadline
    })
    .then(task => {
        const [ addedTask ] = task;
        document.querySelector('tbody').prepend(TableBodyRow(addedTask));

        closeModalAfterAddedTask();

        $.alert({
            title: 'Создание задачи!',
            closeIcon: true,
            content: `Task "${heading}" Created!`,
            type: 'green',
            autoClose: 'ok|3000',
            backgroundDismiss: true
        });
    });
}