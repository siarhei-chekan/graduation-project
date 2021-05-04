import stylesButton from '../../../main/components/table/components/table-data/styles.module.scss';
import stylesTable from '../../../main/components/table/styles.module.scss';

export function ThemeSwitcher() {
    const div = document.createElement('div');
    div.classList.add('form-check', 'form-switch');

    const input = document.createElement('input');
    input.classList.add('form-check-input');
    input.type = 'checkbox';
    input.setAttribute('id', 'themeSwitcher');

    const labelDark = document.createElement('label');
    labelDark.classList.add('form-check-label');
    labelDark.setAttribute('for', 'themeSwitcher');
    labelDark.textContent = 'Light-Dark';

    div.append(input, labelDark);

    localStorage.setItem('theme', 'light');

    const switcher = div.querySelector('#themeSwitcher');
    switcher.addEventListener('click', changeTheme);

    return div;
}

function setDarkTheme() {
    const header = document.querySelector('header');
    const nav = header.querySelector('nav');
    const main = document.querySelector('main');
    const table = main.querySelector('table');
    const buttons = table.querySelectorAll('button');
    const footer = document.querySelector('footer');
    const divTable = document.querySelector('div[class*="table-responsive"]');

    localStorage.setItem('theme', 'dark');

    header.classList.add('bg-dark', 'text-white');
    nav.classList.add('navbar-dark');
    divTable.classList.add(stylesTable.fixedHeightDark);
    table.classList.add('table-dark', stylesTable.tableDarkOpacity);
    buttons.forEach(button => {
        button.classList.add(stylesButton.openTaskDark, stylesButton.btnLinkDark);
        button.classList.remove(stylesButton.openTask, stylesButton.btnLink);
    });
    footer.classList.add('bg-dark', 'text-white');

    nav.classList.remove('navbar-light', 'bg-light');
}

function setLightTheme() {
    const header = document.querySelector('header');
    const nav = header.querySelector('nav');
    const main = document.querySelector('main');
    const table = main.querySelector('table');
    const buttons = table.querySelectorAll('button');
    const footer = document.querySelector('footer');
    const divTable = document.querySelector('div[class*="table-responsive"]');


    localStorage.setItem('theme', 'light');
    
    nav.classList.add('navbar-light', 'bg-light');

    header.classList.remove('bg-dark', 'text-white');
    nav.classList.remove('navbar-dark');
    divTable.classList.remove(stylesTable.fixedHeightDark);
    table.classList.remove('table-dark', stylesTable.tableDarkOpacity);
    buttons.forEach(button => {
        button.classList.remove(stylesButton.openTaskDark, stylesButton.btnLinkDark);
        button.classList.add(stylesButton.openTask, stylesButton.btnLink);
    });
    footer.classList.remove('bg-dark', 'text-white');
}

function changeTheme({
    target: {
        checked
    }
}) {    
    if (checked) {
        setDarkTheme();
    } else {
        setLightTheme();        
    }
}