import { TasksService } from "../../../../services/tasks.service";
import { FormEditTask } from "./component";
import { ModalForEditTask } from './modal-for-edit-task';
import { closeModalAfterEditTask } from "./modal-for-edit-task/helpers";
import { ModalSaveFooterButton } from './modal-for-edit-task/component';

export function editTask(e) {
    const taskId = e.target.dataset.id;
    
    const tasksService = new TasksService();

    tasksService.getTaskById(taskId)
    .then(task => {
        const form = FormEditTask();
        form.setAttribute('data-id', taskId);
        const modal = ModalForEditTask({
            title: `Editing a task : "${task.heading}"`,
            body: form,
            hasFooterCloseButton: false,
            footerButtons: [
                ModalSaveFooterButton()
            ]          
        });

        closeModalAfterEditTask();
        document.body.append(modal);

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const deadlineToString = new Date(task.deadline);
        const dayOfDeadline = deadlineToString.getDate();
        const monthOfDeadline = deadlineToString.getMonth();
        const yearOfDeadline = deadlineToString.getFullYear();
        const readebleDeadline = `${dayOfDeadline} ${months[monthOfDeadline]} ${yearOfDeadline}`;

        const headingEl = document.querySelector('.edit-task .heading-input');
        const contentEl = document.querySelector('.edit-task textarea');
        const performerEl = document.querySelector('.edit-task .performer-input');
        const deadlineEl = document.querySelector('.edit-task  .deadline-input');

        headingEl.value = task.heading;
        contentEl.value = task.content;
        performerEl.value = task.performer;
        deadlineEl.value = readebleDeadline;

        $( function() {
            $("#deadline").datepicker({
                dateFormat: "d MM yy"
            });
        });        
    })
    .catch(console.error);
}