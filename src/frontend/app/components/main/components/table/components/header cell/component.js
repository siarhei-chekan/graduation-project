export function HeaderCell(text) {
    const headerCell = document.createElement('th');

    headerCell.setAttribute('scope', 'col');
    headerCell.innerText = text;

    return headerCell;
}