export function Button({
    classList = 'btn btn-primary',
    content = '',
    clickHandler,
    type = 'button',
}) {
    const button = document.createElement('button');

    button.classList.add(...classList.split(' '));
    button.setAttribute('type', type);
    button.innerHTML = content;

    if (clickHandler) {
        button.addEventListener('click', clickHandler);
    }

    return button;
}