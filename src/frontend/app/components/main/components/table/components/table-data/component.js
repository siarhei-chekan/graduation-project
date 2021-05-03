import { Button } from "../../../../../base/button/component";
import { openTask } from "../table-body/helpers";

import styles from './styles.module.scss';

export function TableData({prop, status, taskId}) {
    const tableData = document.createElement('td');

    tableData.append(OpenTaskButton({prop, status, taskId}));

    return tableData;
}

function OpenTaskButton({prop, status, taskId}) {
    const btn = Button({
        classList: 'btn btn-link',
        content: prop,
        type: 'button',
        clickHandler: openTask
    });

    btn.setAttribute('data-id', taskId);
    const theme = localStorage.getItem('theme');

    switch (theme) {
        case 'light': {
            btn.classList.add(styles.btnLink);

            if (status === 'Done') {
                btn.classList.add(styles.finishedTask);
            } else {
                btn.classList.add(styles.openTask);
            }

            break;
        }

        case 'dark': {
            btn.classList.add(styles.btnLinkDark);

            if (status === 'Done') {
                btn.classList.add(styles.finishedTask);
            } else {
                btn.classList.add(styles.openTaskDark);
            }

            break;
        }
    }

    return btn;
}
