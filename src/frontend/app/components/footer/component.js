import styles from './styles.module.scss';

export function Footer() {
    const footer = document.createElement('footer');

    footer.classList.add('container-fluid');

    footer.append(Owner());

    return footer;
}

function Owner() {
    const owner = document.createElement('div');

    owner.classList.add(styles.owner);
    owner.innerHTML = '&copy Siarhei Chekan, Homiel, 2021';
    return owner;
}