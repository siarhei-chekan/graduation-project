import { Button } from "../../../base/button/component";
import { debounce } from "../../../base/helpers";
import { openModalToAddTask, search } from "./helpers";
import { RadioButtonGroup } from "../radio-button-groups/component";
import { ThemeSwitcher } from "../theme-switcher";

import styles from './styles.module.scss';

export function Navbar() {
    const navbar = document.createElement('nav');

    navbar.classList.add('navbar', 'navbar-light', 'bg-light');

    navbar.append(Container());

    return navbar;
}

export function Container() {
    const container = document.createElement('div');
    const navbarBrand = document.createElement('a');

    container.classList.add('container-fluid');
    navbarBrand.classList.add('navbar-brand', styles.title);

    navbarBrand.innerText = 'My tasks';

    container.append(navbarBrand, Button({
        classList: 'btn btn-primary',
        content: 'Add task',
        clickHandler: openModalToAddTask,
    }), RadioButtonGroup(), ThemeSwitcher(), Form());

    return container;
}

export function Form() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');

    form.classList.add('d-flex');

    input.classList.add('form-control', 'me-2');
    input.setAttribute('type', 'search');
    input.setAttribute('placeholder', 'Search');

    button.classList.add('btn', 'btn-outline-success');
    button.setAttribute('type', 'submit');
    button.innerText = 'Search';

    const debouncedSearch = debounce(search, 500);
    input.addEventListener('keyup', debouncedSearch);

    form.append(input);

    return form;
}