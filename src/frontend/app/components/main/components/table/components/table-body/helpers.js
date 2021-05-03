import { TasksService } from "../../../../../../services/tasks.service";
import { Button } from "../../../../../base/button/component";
import { Modal } from "../../../../../base/modal/component";

export function openTask(e) {
    const taskId = e.target.dataset.id;
    
    const tasksService = new TasksService();

    tasksService.getTaskById(taskId)
    .then(task => {
        if (task) {
            document.body.append(Modal({
                taskId: task.taskId,
                status: task.status,
                title: task.heading,
                body: task.content,
                deadline: task.deadline,
                dateOfCreation: task.dateOfCreation,
                performer: task.performer,
                hasFooterStartButton: true,
                hasFooterFinishButton: true,
                hasFooterCloseButton: false,
                hasFooterEditButton: true,
                hasFooterDeleteButton: true,
                footerButtons: [
                    
                ]
            }));
        }
    })
    .catch(console.error);
}
