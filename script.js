const formElement = document.querySelector('form');
const dateInput = document.querySelector('#last-period');
const cycleLenthInput = document.querySelector('#cycle-length');
const submitBtn = document.querySelector('#btn');
const resultDiv = document.querySelector('#result');


function calculatePeriodDate(isUserAction = false) {


    const savedDate = localStorage.getItem('lastPeriodDate');
    const savedCycle = localStorage.getItem('cycleLength');

    if (savedDate && savedCycle) {
        dateInput.value = savedDate;
        cycleLenthInput.value = savedCycle;
    }

    let lastPeriodDate = new Date(dateInput.value);
    let cycle = parseInt(cycleLenthInput.value);


    // Mosly Logic won't come here for the required filed in input

    if (isUserAction && (isNaN(lastPeriodDate.getTime()) || isNaN(cycle))) {
        alert('Please enter valid data and cycle length!');
        return;
    }

    if (!isNaN(lastPeriodDate.getTime()) && !isNaN(cycle)) {
        let nextPeriodDate = new Date(lastPeriodDate);
        nextPeriodDate.setDate(lastPeriodDate.getDate() + cycle);

        resultDiv.style.display = 'block';

        let showDate = nextPeriodDate.toDateString();
        resultDiv.innerHTML = `Next Period date: ${showDate}`;
    }

    localStorage.setItem('lastPeriodDate', dateInput.value);
    localStorage.setItem('cycleLength', cycleLenthInput.value);

}

document.addEventListener('DOMContentLoaded', () => {
    calculatePeriodDate();

});

formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    calculatePeriodDate(true);

});
