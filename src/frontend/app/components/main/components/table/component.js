import { TableBody } from "./components/table-body";
import { TableHead } from "./components/table-head/component";

import styles from './styles.module.scss';

export function Table() {
    const divForResponsiveTable = document.createElement('div');
    const tableOfTasks = document.createElement('table');

    divForResponsiveTable.classList.add('table-responsive');
    tableOfTasks.classList.add('table', 'table-hover', styles.table);

    tableOfTasks.append(TableHead(), TableBody());
    divForResponsiveTable.append(tableOfTasks);

    return divForResponsiveTable;
}

