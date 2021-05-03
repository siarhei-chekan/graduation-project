import { formEditTaskClassName } from "./constants";

export function FormEditTask() {
    const form = document.createElement('form');

    form.classList.add(formEditTaskClassName);    

    form.append(ContainerForTaskDescription(), ContainerForPerformer(), ContainerForDeadLine());

    return form;
}

function ContainerForTaskDescription() {
    const containerForTaskDescription = document.createElement('div');

    containerForTaskDescription.classList.add('mb-3');
    containerForTaskDescription.append(HeadingInput(), ContentInput());

    return containerForTaskDescription;
}

function HeadingInput() {
    const headingInput = document.createElement('input');

    headingInput.classList.add('form-control', 'heading-input');
    headingInput.setAttribute('placeholder', 'Enter task name');
    headingInput.setAttribute('type', 'text');
    headingInput.setAttribute('id', 'heading');
    headingInput.setAttribute('autocomplete', 'off');

    return headingInput;
}

function ContentInput() {
    const contentInput = document.createElement('textarea');

    contentInput.classList.add('form-control');
    contentInput.setAttribute('placeholder', 'Enter task description');
    contentInput.setAttribute('autocomplete', 'off');

    return contentInput;
}

function ContainerForPerformer() {
    const containerForPerformer = document.createElement('div');
    const containerForPerformerInput = document.createElement('div');


    containerForPerformer.classList.add('mb-3','row');
    containerForPerformerInput.classList.add('col-sm-10');

    containerForPerformerInput.append(PerformerInput());
    containerForPerformer.append(PerformerLabel(), containerForPerformerInput);

    return containerForPerformer;
}

function PerformerLabel() {
    const performerLabel = document.createElement('label');

    performerLabel.textContent = 'Performer';
    performerLabel.classList.add('col-sm-2', 'col-form-label');
    performerLabel.setAttribute('for', 'performer');

    return performerLabel;
}

function PerformerInput() {
    const performerInput = document.createElement('input');

    performerInput.classList.add('form-control', 'performer-input');
    performerInput.setAttribute('placeholder', 'Enter performer');
    performerInput.setAttribute('type', 'text');
    performerInput.setAttribute('id', 'performer');
    performerInput.setAttribute('autocomplete', 'off');

    return performerInput;
}

function ContainerForDeadLine() {
    const containerForDeadLine = document.createElement('div');
    const containerForDeadlineInput = document.createElement('div');

    containerForDeadLine.classList.add('mb-3','row');
    containerForDeadlineInput.classList.add('col-sm-10');

    containerForDeadlineInput.append(DeadLineInput());
    containerForDeadLine.append(DeadLineLabel(), containerForDeadlineInput);

    return containerForDeadLine;
}

function DeadLineLabel() {
    const deadLineLabel = document.createElement('label');

    deadLineLabel.textContent = 'Deadline';
    deadLineLabel.classList.add('col-sm-2', 'col-form-label');
    deadLineLabel.setAttribute('for', 'deadline');

    return deadLineLabel;
}

function DeadLineInput() {
    const deadLineInput = document.createElement('input');

    deadLineInput.classList.add('form-control', 'deadline-input');
    deadLineInput.setAttribute('placeholder', 'Enter the deadline');
    deadLineInput.setAttribute('type', 'text');
    deadLineInput.setAttribute('id', 'deadline');
    deadLineInput.setAttribute('autocomplete', 'off');

    return deadLineInput;
}