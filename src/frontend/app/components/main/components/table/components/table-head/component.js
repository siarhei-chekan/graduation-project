import { HeaderCell } from "../header cell";

const columnsName = ['Name', 'Deadline', 'Performer', 'Status', 'Date of creation'];

export function TableHead() {
    const tableHead = document.createElement('thead');

    tableHead.append(TableHeadRow());

    return tableHead;
}

export function TableHeadRow() {
    const tableHeadRow = document.createElement('tr');

    columnsName.forEach(name => {
        tableHeadRow.append(HeaderCell(name));
    });

    return tableHeadRow;
}