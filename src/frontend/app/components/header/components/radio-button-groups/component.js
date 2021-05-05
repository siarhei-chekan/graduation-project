import { sortByDay } from "./helpers/sort-by-day";
import { sortByWeek } from './helpers/sort-by-week';
import { sortByMonth } from './helpers/sort-by-month';
import { sortByYear } from './helpers/sort-by-year';
import { getAll } from './helpers/get-all';

export function RadioButtonGroup() {
    const radioButtonGroup = document.createElement('div');

    radioButtonGroup.classList.add('btn-group');

    radioButtonGroup.append(
        RadioButtonForAll(),
        RadioButtonForCurrentDay(),
        RadioButtonForNextWeek(), 
        RadioButtonForNextMonth(),
        RadioButtonForNextYear()
        );

    localStorage.setItem('sorting', 'all');

    return radioButtonGroup;
}

function RadioButtonForCurrentDay() {
    const btn = document.createDocumentFragment();
    const input = document.createElement('input');
    const label = document.createElement('label');

    input.classList.add('btn-check');
    input.type = 'radio';
    input.name = 'btnradio';
    input.id = 'currentDay';
    input.autocomplete = 'off';
    input.checked;

    label.classList.add('btn', 'btn-outline-primary');
    label.setAttribute('for', 'currentDay');
    label.textContent = 'Current Day';
    label.addEventListener('click', sortByDay);

    btn.append(input, label);

    return btn;
}

function RadioButtonForNextWeek() {
    const btn = document.createDocumentFragment();
    const input = document.createElement('input');
    const label = document.createElement('label');

    input.classList.add('btn-check');
    input.type = 'radio';
    input.name = 'btnradio';
    input.id = 'nextWeek';
    input.autocomplete = 'off';
    input.checked;

    label.classList.add('btn', 'btn-outline-primary');
    label.setAttribute('for', 'nextWeek');
    label.textContent = 'Current Week';
    label.addEventListener('click', sortByWeek);

    btn.append(input, label);

    return btn;
}

function RadioButtonForNextMonth() {
    const btn = document.createDocumentFragment();
    const input = document.createElement('input');
    const label = document.createElement('label');

    input.classList.add('btn-check');
    input.type = 'radio';
    input.name = 'btnradio';
    input.id = 'nextMonth';
    input.autocomplete = 'off';
    input.checked;

    label.classList.add('btn', 'btn-outline-primary');
    label.setAttribute('for', 'nextMonth');
    label.textContent = 'Current Month';
    label.addEventListener('click', sortByMonth);

    btn.append(input, label);

    return btn;
}

function RadioButtonForNextYear() {
    const btn = document.createDocumentFragment();
    const input = document.createElement('input');
    const label = document.createElement('label');

    input.classList.add('btn-check');
    input.type = 'radio';
    input.name = 'btnradio';
    input.id = 'nextYear';
    input.autocomplete = 'off';
    input.checked;

    label.classList.add('btn', 'btn-outline-primary');
    label.setAttribute('for', 'nextYear');
    label.textContent = 'Current Year';
    label.addEventListener('click', sortByYear);

    btn.append(input, label);

    return btn;
}

function RadioButtonForAll() {
    const btn = document.createDocumentFragment();
    const input = document.createElement('input');
    const label = document.createElement('label');

    input.classList.add('btn-check');
    input.type = 'radio';
    input.name = 'btnradio';
    input.id = 'all';
    input.autocomplete = 'off';
    input.checked = true;

    label.classList.add('btn', 'btn-outline-primary');
    label.setAttribute('for', 'all');
    label.textContent = 'All';
    label.addEventListener('click', getAll);

    btn.append(input, label);

    return btn;
}