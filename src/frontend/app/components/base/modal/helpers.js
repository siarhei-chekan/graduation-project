export function closeModal(e) {
    return e.target.closest('.modal').remove();
}

export function closeModalAfterDeleteTask() {
    return document.querySelector('.modal')?.remove();
}