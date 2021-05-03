import { Table } from "./components/table";

export function Main() {
    const main = document.createElement('main');

    main.append(Table());

    return main;
}