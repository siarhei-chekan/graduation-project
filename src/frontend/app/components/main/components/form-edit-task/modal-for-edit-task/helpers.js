import { TasksService } from '../../../../../services/tasks.service';
import { createReadableDeadlineDate } from '../../helpers';
import { formEditTaskSelector } from './../constants';

export function closeModal(e) {
    return e.target.closest('.modal').remove();
}

export function closeModalAfterEditTask() {
    return document.querySelector('.modal')?.remove();
}

export function saveTask(e) {
    e.preventDefault();

    const form = document.querySelector(formEditTaskSelector);
    const headingEl = document.querySelector('.edit-task .heading-input');
    const contentEl = document.querySelector('.edit-task textarea');
    const performerEl = document.querySelector('.edit-task .performer-input');
    const deadlineEl = document.querySelector('.edit-task  .deadline-input');
    
    const taskId = form.dataset.id;
    const heading = headingEl.value;
    const content = contentEl.value;
    const performer = performerEl.value;
    const deadline = deadlineEl.value;

    const tasksService = new TasksService();

    tasksService.editTask(taskId, {
        heading,
        content,
        performer,
        deadline
    }).then(task => {
        const updatedTabelBodyRow = document.querySelector(`tr[data-id="${taskId}"]`);
        
        updatedTabelBodyRow.cells[0].childNodes[0].childNodes[0].data = task.heading;
        updatedTabelBodyRow.cells[1].childNodes[0].childNodes[0].data = createReadableDeadlineDate(deadline);
        updatedTabelBodyRow.cells[2].childNodes[0].childNodes[0].data = task.performer;

        closeModal(e);

        $.alert({
            title: 'Task update!',
            closeIcon: true,
            content: `Task "${heading}" successfully saved!`,
            type: 'green',
            autoClose: 'ok|3000',
            backgroundDismiss: true
        });
    })
}