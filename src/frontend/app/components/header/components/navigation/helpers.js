import { Button } from "../../../base/button/component";
import { FormAddTask } from "../../../main/components/form-add-task/component";
import { ModalForAddTask } from "../../../main/components/form-add-task/components/modal-for-add-task/component";
import { closeModal } from "../../../main/components/form-add-task/components/modal-for-add-task/helpers";
import { addTask } from "../../../main/components/form-add-task/helpers";

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