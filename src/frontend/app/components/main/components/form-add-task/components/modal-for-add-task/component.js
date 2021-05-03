import { Button } from '../../../../../base/button/component';
import { closeModal } from './helpers';
import styles from './styles.module.scss';

export function ModalForAddTask({
    title,
    body,
    hasFooterCloseButton,
    footerButtons = []
}) {

    const modal = document.createElement('div');

    modal.classList.add('modal', styles.show);
    modal.setAttribute('tabindex', '-1');

    modal.append(ModalDialog( {title, body, hasFooterCloseButton, footerButtons}));

    return modal;
}

function ModalDialog({
    title,
    body,
    hasFooterCloseButton,
    footerButtons
}) {
    const modalDialog = document.createElement('div');

    modalDialog.classList.add('modal-dialog', 'modal-lg');

    modalDialog.append(ModalContent({ title, body, hasFooterCloseButton, footerButtons }));

    return modalDialog;
}

function ModalContent({
    title, 
    body,
    hasFooterCloseButton,
    footerButtons
}) {
    const modalContent = document.createElement('div');

    const theme = localStorage.getItem('theme');

    switch (theme) {
        case 'light': {
            modalContent.classList.add('modal-content');

            break;
        }

        case 'dark': {
            modalContent.classList.add('modal-content', 'bg-dark', 'text-white');

            break;
        }
    }

    modalContent.append(ModalHeader(title), ModalBody({ body}), ModalFooter({ hasFooterCloseButton, footerButtons }));

    return modalContent;
}

function ModalHeader(title) {
    const modalHeader = document.createElement('div');

    modalHeader.classList.add('modal-header');

    modalHeader.append(ModalTitle(title), ModalCloseHeaderButton());

    return modalHeader;
}

function ModalBody({ body }) {
    const modalBody = document.createElement('div');

    modalBody.classList.add('modal-body');

    modalBody.append(Container({ body}));

    return modalBody;
}

function Container({ body }) {
    const container = document.createElement('div');

    container.classList.add('container-fluid');
    container.append(ContainerRow({ body }));

    return container;
}

function ContainerRow({ body, deadline, dateOfCreation, performer }) {
    const containerRow = document.createElement('div');

    containerRow.classList.add('row');
    containerRow.append(ContainerRowColForContent(body));

    return containerRow;
}

function ContainerRowColForContent(body) {
    const containerRowColForContent = document.createElement('div');

    containerRowColForContent.classList.add('col-12');

    if (typeof body === 'string' ) {
        containerRowColForContent.innerHTML = body;
    } else {
        containerRowColForContent.append(body);
    }

    return containerRowColForContent;
}

function ModalFooter({
    hasFooterCloseButton,
    footerButtons
}) {
    const modalFooter = document.createElement('div');

    modalFooter.classList.add('modal-footer');

    if (hasFooterCloseButton) {
        modalFooter.append(ModalCloseFooterButton());
    }

    footerButtons.forEach(button => {
        modalFooter.append(button);
    });

    return modalFooter;
}

function ModalTitle(title) {
    const modalTitle = document.createElement('h5');

    modalTitle.classList.add('modal-title');
    modalTitle.textContent = title;

    return modalTitle;
}

function ModalCloseHeaderButton() {
    const btn = Button({ 
        classList: 'btn-close'
    });

    btn.addEventListener('click', closeModal);

    return btn;
}

function ModalCloseFooterButton() {
    const btn = Button({ 
        classList: 'btn btn-secondary',
        content: 'Close'
    });

    btn.addEventListener('click', closeModal);

    return btn;
}