const formElement = document.querySelector('form');
const dateInput = document.querySelector('#last-period');
const cycleLenthInput = document.querySelector('#cycle-length');
const submitBtn = document.querySelector('#btn');
const resultDiv = document.querySelector('#result');


function calculatePeriodDate(isUserAction = false) {

    const lastPeriodDateValue = dateInput.value;
    const cycleLengthValue = cycleLenthInput.value;

    let lastPeriodDate = new Date(lastPeriodDateValue);
    let cycle = parseInt(cycleLengthValue);

    const savedDate = localStorage.getItem('lastPeriodDate');
    const savedCycle = localStorage.getItem('cycleLength');



    if (savedDate && savedCycle) {
        dateInput.value = savedDate;
        cycleLenthInput.value = savedCycle;
    }

    if (isUserAction && (isNaN(lastPeriodDate.getTime()) || isNaN(cycle))) {
        alert('Please enter valid data and cycle length!');
        return;
    }

    if (!isNaN(lastPeriodDate.getTime()) && !isNaN(cycle)) {
        let nextPeriodDate = new Date(lastPeriodDate);
        nextPeriodDate.setDate(lastPeriodDate.getDate() + cycle);

        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `Next Period date: ${nextPeriodDate.toDateString()}`;

        localStorage.setItem('lastPeriodDate', lastPeriodDateValue);
        localStorage.setItem('cycleLength', cycleLengthValue);
        localStorage.setItem('nextPeriodDate', nextPeriodDate.toISOString());

        // NOTIFICATION
        scheduleNotification(nextPeriodDate);

    }

}


//  But the problem is when the user iis in the browser at that time
// Then it will work, I have to think alternative solution....
function scheduleNotification(nextPeriodDate) {
    const now = new Date();
    const calculateTimeDifference = nextPeriodDate.getTime() - now.getTime();

    // 24 hours (86400000 milliseconds) before the next period date
    const notificationTime = calculateTimeDifference - 86400000;

    if (notificationTime > 0) {
        setTimeout(() => {
            alert('Reminder: Your next period date is in 24 hours.');
        }, notificationTime)
    }
}


formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    calculatePeriodDate(true);

});

document.addEventListener('DOMContentLoaded', () => {

    const savedDate = localStorage.getItem('lastPeriodDate');
    const savedCycle = localStorage.getItem('cycleLength');
    const savedNextPeriodDate = localStorage.getItem('nextPeriodDate');

    if (savedDate && savedCycle && savedNextPeriodDate) {

        dateInput.value = savedDate;
        cycleLenthInput.value = savedCycle;

        const nextPeriodDate = new Date(savedNextPeriodDate);
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `Next Period date: ${nextPeriodDate.toDateString()}`;

        scheduleNotification(nextPeriodDate);
    }

});
