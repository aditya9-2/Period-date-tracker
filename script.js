const formElement = document.querySelector('form');
const dateInput = document.querySelector('#last-period');
const cycleLenthInput = document.querySelector('#cycle-length');
const submitBtn = document.querySelector('#btn');
const resultDiv = document.querySelector('#result')


function calculatePeriodDate() {

    let lastPeriodDate = new Date(dateInput.value);
    let cycle = parseInt(cycleLenthInput.value);

    // Mosly Logic won't come here for the required filed in input
    if (isNaN(lastPeriodDate.getTime()) || isNaN(cycle)) {
        alert(`Please Enter Valid number!`)
        return;
    }

    let nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(lastPeriodDate.getDate() + cycle);


    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `Next Period date: ${nextPeriodDate.toDateString()}`;


}


formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    calculatePeriodDate();

})



// calculatePeriodDate();