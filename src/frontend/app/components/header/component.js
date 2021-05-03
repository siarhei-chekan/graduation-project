import { Navbar } from "./components/navigation";

export function Header() {
    const header = document.createElement('header');

    header.classList.add('header');

    header.append(Navbar());

    return header;
}