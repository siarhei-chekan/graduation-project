import { Button } from '../button/component';
import { closeModal } from './helpers';
import { editTask } from './../../main/components/form-edit-task/helpers';
import { TasksService } from '../../../services/tasks.service';
import { closeModalAfterDeleteTask } from './helpers';
import { createReadableDeadlineDate, createReadebleDateOfCreation } from '../../main/components/helpers';

import styles from './styles.module.scss';
import stylesBtn from './../../main/components/table/components/table-data/styles.module.scss';

export function Modal({
    taskId,
    title,
    body,
    status,
    deadline,
    dateOfCreation,
    performer,
    hasFooterStartButton,
    hasFooterFinishButton,
    hasFooterCloseButton,
    hasFooterEditButton,
    hasFooterDeleteButton,
    footerButtons = []
}) {
    document.querySelector('.modal')?.remove();

    const modal = document.createElement('div');

    modal.classList.add('modal', styles.show);
    modal.setAttribute('tabindex', '-1');

    modal.append(ModalDialog( {
        taskId, 
        title, 
        body,
        status,
        deadline, 
        performer, 
        dateOfCreation, 
        hasFooterStartButton, 
        hasFooterFinishButton, 
        hasFooterCloseButton, 
        hasFooterEditButton, 
        hasFooterDeleteButton, 
        footerButtons
    }));

    return modal;
}

function ModalDialog({
    taskId,
    title,
    body,
    status,
    deadline,
    dateOfCreation,
    performer,
    hasFooterStartButton,
    hasFooterFinishButton,
    hasFooterCloseButton,
    hasFooterEditButton,
    hasFooterDeleteButton,
    footerButtons
}) {
    const modalDialog = document.createElement('div');

    modalDialog.classList.add('modal-dialog', 'modal-lg');

    modalDialog.append(ModalContent({ 
        taskId, 
        title, 
        body,
        status, 
        deadline, 
        dateOfCreation, 
        performer,
        hasFooterStartButton,
        hasFooterFinishButton,
        hasFooterCloseButton, 
        hasFooterEditButton, 
        hasFooterDeleteButton, 
        footerButtons 
    }));

    return modalDialog;
}

function ModalContent({
    taskId,
    title, 
    body,
    status,
    deadline,
    dateOfCreation,
    performer,
    hasFooterStartButton,
    hasFooterFinishButton,
    hasFooterCloseButton,
    hasFooterEditButton,
    hasFooterDeleteButton,
    footerButtons
}) {
    const modalContent = document.createElement('div');

    const theme = localStorage.getItem('theme');

    switch (theme) {
        case 'light': {
            modalContent.classList.add('modal-content');

            break;
        }

        case 'dark': {
            modalContent.classList.add('modal-content', 'bg-dark', 'text-white');

            break;
        }
    }

    modalContent.append(ModalHeader(title, status), 
    ModalBody({ body, deadline, dateOfCreation, performer }), 
    ModalFooter({
        taskId,
        status,
        hasFooterStartButton,
        hasFooterFinishButton,
        hasFooterCloseButton, 
        hasFooterEditButton, 
        hasFooterDeleteButton, 
        footerButtons 
    }));

    return modalContent;
}

function ModalHeader(title, status) {
    const modalHeader = document.createElement('div');

    modalHeader.classList.add('modal-header');

    switch (status) {
        case ('In Progress'): {
            modalHeader.classList.add(styles.inProgress);
            }            
            break;
        
        case ('To Do'): {
            modalHeader.classList.add(styles.toDo);
            }
            break;
            
        case ('Postponed'): {
            modalHeader.classList.add(styles.postponed);
            break;
        }

        case ('Done'): {
            modalHeader.classList.add(styles.done);
            }
            break;
    }

    modalHeader.append(ModalTitle(title), ModalCloseHeaderButton());

    return modalHeader;
}

function ModalBody({ body, deadline, dateOfCreation, performer }) {
    const modalBody = document.createElement('div');

    modalBody.classList.add('modal-body');

    modalBody.append(Container({ body, deadline, dateOfCreation, performer }));

    return modalBody;
}

function Container({ body, deadline, dateOfCreation, performer }) {
    const container = document.createElement('div');

    container.classList.add('container-fluid');
    container.append(ContainerRow({ body, deadline, dateOfCreation, performer }));

    return container;
}

function ContainerRow({ body, deadline, dateOfCreation, performer }) {
    const containerRow = document.createElement('div');

    containerRow.classList.add('row');
    containerRow.append(ContainerRowColForContent(body), 
    ContainerRowColForDeadline({ deadline, dateOfCreation, performer }));

    return containerRow;
}

function ContainerRowColForContent(body) {
    const containerRowColForContent = document.createElement('div');

    containerRowColForContent.classList.add('col-8', styles.content);

    if (typeof body === 'string' ) {
        containerRowColForContent.innerHTML = body;
    } else {
        containerRowColForContent.append(body);
    }


    return containerRowColForContent;
}

function ContainerRowColForDeadline({ deadline, dateOfCreation, performer }) {
    const containerRowColForDeadline = document.createElement('div');
    const colDeadline = document.createElement('p');
    const colDateOfCreation = document.createElement('p');
    const colPerformer = document.createElement('p');
    const readebleDateOfCreation = createReadebleDateOfCreation(dateOfCreation);
    const readebleDeadline = createReadableDeadlineDate(deadline);

    containerRowColForDeadline.classList.add('col-4', 'ms-auto', styles.colForDeadline);
    colDeadline.classList.add('deadline');
    colDateOfCreation.classList.add('date-of-creation');
    colPerformer.classList.add('performer');

    colDeadline.textContent = `Deadline: ${readebleDeadline}`;
    colDateOfCreation.textContent = `Date of creation : ${readebleDateOfCreation}`;
    colPerformer.textContent = `Performer: ${performer}`;

    containerRowColForDeadline.append(colDeadline, colDateOfCreation, colPerformer);

    return containerRowColForDeadline;
}

function ModalFooter({
    taskId,
    status,
    hasFooterStartButton,
    hasFooterFinishButton,
    hasFooterCloseButton,
    hasFooterEditButton,
    hasFooterDeleteButton,
}) {
    const modalFooter = document.createElement('div');

    modalFooter.classList.add('modal-footer');

    switch (status) {
        case 'In Progress': {
            if (hasFooterStartButton) {
                modalFooter.append(PostponedTaskButton(taskId));
            }
            if (hasFooterFinishButton) {
                modalFooter.append(FinishTaskButton(taskId));
            }
            break;
        }

        default: {
            if (hasFooterStartButton) {
                modalFooter.append(StartTaskButton(taskId));
            }            
            break;
        }
    }

    if (hasFooterCloseButton) {
        modalFooter.append(ModalCloseFooterButton());
    }

    if (hasFooterEditButton) {
        modalFooter.append(EditTaskButton(taskId));
    }

    if (hasFooterDeleteButton) {
        modalFooter.append(DeleteTaskButton(taskId));
    }

    return modalFooter;
}

function ModalTitle(title) {
    const modalTitle = document.createElement('h5');

    modalTitle.classList.add('modal-title');
    modalTitle.textContent = title;

    return modalTitle;
}

function ModalCloseHeaderButton() {
    const btn = Button({ 
        classList: 'btn-close'
    });

    btn.addEventListener('click', closeModal);

    return btn;
}

function ModalCloseFooterButton() {
    const btn = Button({ 
        classList: 'btn btn-secondary',
        content: 'Close'
    });

    btn.addEventListener('click', closeModal);

    return btn;
}

function EditTaskButton(taskId) {
    const btn = Button({
        classList: 'btn btn-secondary',
        content: 'Edit',
        type: 'button',
        clickHandler: editTask
    });

    btn.setAttribute('data-id', taskId);

    return btn;
}

function deleteTask(e) {
    const taskId = e.target.dataset.id;

    $.confirm({
        title: 'Deleting a task!',
        content: 'Are you sure you want to delete this task?',
        type: 'red',
        buttons: {
            yes: {
                btnClass: 'btn-red',
                action: function() {
                    const tasksService = new TasksService();
                    tasksService.deleteTask(taskId).then(deletedTaskId => {
                        document.querySelector(`tr[data-id="${deletedTaskId}"]`)?.remove();
                        closeModalAfterDeleteTask();

                        $.alert({
                            title: 'Deleted!',
                            closeIcon: true,
                            content: `The task has been deleted!`,
                            type: 'green',
                            autoClose: 'ok|3000',
                            backgroundDismiss: true
                        });
                    });
                }
            },
            no: {}
        }
    });
}

function DeleteTaskButton(taskId) {
    const btn = Button({
        classList: 'btn btn-danger',
        content: 'Delete',
        type: 'button',
        clickHandler: deleteTask
    });

    btn.setAttribute('data-id', taskId);

    return btn;
}

function StartTaskButton(taskId) {
    const btn = Button({
        classList: 'btn btn-primary btn-start',
        content: 'Start',
        type: 'button',
        clickHandler: startTask
    });

    btn.setAttribute('data-id', taskId);

    return btn;
}

function startTask(e) {
    const taskId = e.target.dataset.id;
    const modalContent = e.target.closest('.modal-content');
    const modalHeader = modalContent.querySelector('.modal-header');
    const updatedTabelBodyRow = document.querySelector(`tr[data-id="${taskId}"]`);
    const deadlineEl = modalContent.querySelector('.deadline');
    const btnList = updatedTabelBodyRow.querySelectorAll('button');
    const status = 'In Progress';
    const modalFooter = modalContent.querySelector('.modal-footer');
    const startBtn = modalFooter.querySelector('.btn-start');
    const finishBtn = modalFooter.querySelector('.btn-finish');

    const deadline = deadlineEl.textContent;

    const tasksService = new TasksService();
    
    tasksService.editTask(taskId, {
        status, 
        deadline
    })
    .then(task => {
        if (task) {
            modalHeader.classList.remove(styles.toDo);
            modalHeader.classList.remove(styles.postponed);
            modalHeader.classList.remove(styles.done);
            updatedTabelBodyRow.cells[3].childNodes[0].childNodes[0].data = task.status;
            modalHeader.classList.add(styles.inProgress);

            startBtn.remove();

            if (finishBtn) {
                finishBtn.remove();
            }            
            modalFooter.prepend(PostponedTaskButton(taskId), FinishTaskButton(taskId));

            btnList.forEach(btn => {
                btn.classList.remove(stylesBtn.finishedTask);
                btn.classList.add(stylesBtn.openTask);
            });            

            $.alert({
                title: 'Task started!',
                closeIcon: true,
                content: `Task status changed to "${status}"!`,
                type: 'orange',
                autoClose: 'ok|3000',
                backgroundDismiss: true
            });
        }      
    });
}

function FinishTaskButton(taskId) {
    const btn = Button({
        classList: 'btn btn-primary btn-finish',
        content: 'Finish',
        type: 'button',
        clickHandler: finishTask
    });

    btn.setAttribute('data-id', taskId);

    return btn;
}

function finishTask(e) {
    const taskId = e.target.dataset.id;
    const modalContent = e.target.closest('.modal-content');
    const modalHeader = modalContent.querySelector('.modal-header');
    const updatedTabelBodyRow = document.querySelector(`tr[data-id="${taskId}"]`);
    const btnList = updatedTabelBodyRow.querySelectorAll('button');
    const deadlineEl = modalContent.querySelector('.deadline');
    const status = 'Done';
    const modalFooter = modalContent.querySelector('.modal-footer');
    const startBtn = modalFooter.querySelector('.btn-start');
    const finishBtn = modalFooter.querySelector('.btn-finish');
    const postponeBtn = modalFooter.querySelector('.btn-postpone');

    const deadline = deadlineEl.textContent;
    
    const tasksService = new TasksService();

    tasksService.editTask(taskId, {
        status, 
        deadline
    })
    .then(task => {
        if (task) {
            modalHeader.classList.remove(styles.inProgress);
            updatedTabelBodyRow.cells[3].childNodes[0].childNodes[0].data = task.status;
            modalHeader.classList.add(styles.done);

            finishBtn.remove();

            if (postponeBtn) {
                postponeBtn.remove();
            }
            
            if (startBtn) {
                startBtn.remove();
            }

            modalFooter.prepend(StartTaskButton(taskId));

            btnList.forEach(btn => {
                btn.classList.remove(stylesBtn.openTask);
                btn.classList.add(stylesBtn.finishedTask);
            });
            
            $.alert({
                title: 'Task done!',
                closeIcon: true,
                content: `Task status changed to "${status}"!`,
                type: 'green',
                autoClose: 'ok|3000',
                backgroundDismiss: true
            });
        }        
    });
}

function PostponedTaskButton(taskId) {
    const btn = Button({
        classList: 'btn btn-primary btn-postpone',
        content: 'Postpone',
        type: 'button',
        clickHandler: postponeTask
    });

    btn.setAttribute('data-id', taskId);

    return btn;
}

function postponeTask(e) {
    const taskId = e.target.dataset.id;
    const modalContent = e.target.closest('.modal-content');
    const modalHeader = modalContent.querySelector('.modal-header');
    const updatedTabelBodyRow = document.querySelector(`tr[data-id="${taskId}"]`);
    const deadlineEl = modalContent.querySelector('.deadline');
    const status = 'Postponed';
    const modalFooter = modalContent.querySelector('.modal-footer');
    const postponeBtn = modalFooter.querySelector('.btn-postpone');

    const deadline = deadlineEl.textContent;

    const tasksService = new TasksService();

    tasksService.editTask(taskId, {
        status,
        deadline
    })
    .then(task => {
        if (task) {
            modalHeader.classList.remove(styles.inProgress);
            updatedTabelBodyRow.cells[3].childNodes[0].childNodes[0].data = task.status;
            modalHeader.classList.add(styles.postponed);

            postponeBtn.remove();
            modalFooter.prepend(StartTaskButton(taskId));

            $.alert({
                title: 'Task postponed!',
                closeIcon: true,
                content: `Task status changed to "${status}"!`,
                type: 'dark',
                autoClose: 'ok|3000',
                backgroundDismiss: true
            });
        } 
    });
}