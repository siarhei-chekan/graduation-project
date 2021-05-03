export function createReadableDeadlineDate(deadline) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const deadlineToString = new Date(deadline);
    const dayOfDeadline = deadlineToString.getDate();
    const monthOfDeadline = deadlineToString.getMonth();
    const yearOfDeadline = deadlineToString.getFullYear();
    const readebleDeadline = `${dayOfDeadline} ${months[monthOfDeadline]} ${yearOfDeadline}`;

    return readebleDeadline;
}

export function createReadebleDateOfCreation(dateOfCreation) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateOfCreationToString = new Date(dateOfCreation);
    const dayOfCreation = dateOfCreationToString.getDate();
    const monthOfCreation = dateOfCreationToString.getMonth();
    const yearOfCreation = dateOfCreationToString.getFullYear();
    const hourOfCreation = dateOfCreationToString.getHours();
    let minuteOfCreation = dateOfCreationToString.getMinutes().toString();

    if (minuteOfCreation.length !== 2) {
        minuteOfCreation = `0${minuteOfCreation}`;
    }
    const readebleDateOfCreation = `${dayOfCreation} ${months[monthOfCreation]} ${yearOfCreation}, ${hourOfCreation}:${minuteOfCreation}`;

    return readebleDateOfCreation;
}