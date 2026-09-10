function padNumber(num) {
    return num.toString().padStart(2, '0');
}

function formatWithSpaces(numberString) {
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function updateCountdownFormatted() {
    const targetDate = new Date('2026-09-10T08:00:00');
    const now = new Date();
    let difference = targetDate - now;


    if (difference <= 0) {

        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.getElementById('pureseconds').textContent = '00';
    
    } else {

        const totalSeconds = Math.floor(difference / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;

        document.getElementById('days').textContent = padNumber(totalDays);
        document.getElementById('hours').textContent = padNumber(hours);
        document.getElementById('minutes').textContent = padNumber(minutes);
        document.getElementById('seconds').textContent = padNumber(seconds);
        document.getElementById('pureseconds').textContent = formatWithSpaces(padNumber(totalSeconds));

    }
}

let previousValues = {days: 0, hours: 0, minutes: 0, seconds: 0, pureseconds: 0};

function updateCountdownAnimated() {
    updateCountdownFormatted();
    const currentValues = {
        days: document.getElementById('days').textContent,
        hours: document.getElementById('hours').textContent,
        minutes: document.getElementById('minutes').textContent,
        seconds: document.getElementById('seconds').textContent,
        pureseconds: document.getElementById('pureseconds').textContent
    };
    Object.keys(currentValues).forEach(key => {
        if (currentValues[key] !== previousValues[key]) {
            const element = document.getElementById(key);
            element.style.transform = 'scale(1.1)';
            setTimeout(() => { element.style.transform = 'scale(1)' }, 200)
        }
    })
    previousValues = currentValues;
}

document.addEventListener('DOMContentLoaded', () => {
    updateCountdownAnimated();
    setInterval(updateCountdownAnimated, 200);
});