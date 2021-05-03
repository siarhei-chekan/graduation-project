export function closeModal(e) {
    return e.target.closest('.modal').remove();
}

export function closeModalAfterAddedTask() {
    return document.querySelector('.modal')?.remove();
}