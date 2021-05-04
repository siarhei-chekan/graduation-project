import { Navbar } from "./components/navigation";

export function Header() {
    const header = document.createElement('header');

    header.classList.add('header', 'container-fluid');

    header.append(Navbar());

    return header;
}