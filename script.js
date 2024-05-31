let timerSeconds = 0;
let totalTimerSeconds = 0;
let stopwatchSeconds = 0;
let isTimerRunning = false;
let isTimerPaused = false;
let timerInterval;
let stopwatchInterval;
let percentDisplay = document.getElementById('percentDisplay');

function startTimer() {
    let timeInput = parseFloat(document.getElementById('timeInput').value);
    if (!isNaN(timeInput) && timeInput>0 ) {
        totalTimerSeconds = Math.floor(timeInput * 1.2 * 60);
        timerSeconds = totalTimerSeconds;
        isTimerRunning = true;
        isTimerPaused = false;
        document.getElementById('pauseButton').disabled = false;
        document.getElementById('resetButton').disabled = false;
        document.getElementById('timeInput').disabled = true;
        clearInterval(timerInterval);
        clearInterval(stopwatchInterval);
        timerInterval = setInterval(updateTimer, 1000);
    } else {
        alert("Please enter a valid number.");
    }
}

function updateTimer() {
    if (timerSeconds >= 0 && isTimerRunning && !isTimerPaused) {
        let minutes = Math.floor(timerSeconds / 60);
        let seconds = timerSeconds % 60;
        document.getElementById('timerDisplay').innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        percentDisplay.innerText = "";
        timerSeconds -= 1;
    } else if (timerSeconds < 0 && isTimerRunning) {
        startStopwatch();
    }
}

function startStopwatch() {
    isTimerRunning = false;
    document.getElementById('timerDisplay').style.color = 'red';
    percentDisplay.innerText = "Time is up!";
    clearInterval(timerInterval);
    stopwatchInterval = setInterval(updateStopwatch, 1000);
}

function updateStopwatch() {
    if (!isTimerPaused) {
        let minutes = Math.floor(stopwatchSeconds / 60);
        let seconds = stopwatchSeconds % 60;
        document.getElementById('timerDisplay').innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        stopwatchSeconds += 1;
    }
}

function pauseTimer() {
    isTimerPaused = !isTimerPaused;
    if (isTimerPaused) {
        document.getElementById('pauseButton').innerText = "Resume";
        if (timerSeconds >= 0) {
            let percentRemaining = (timerSeconds / totalTimerSeconds) * 100;
            percentDisplay.innerText = `${percentRemaining.toFixed(0)}%`;
            updatePercentColor(percentRemaining);
        } else {
            let totalSeconds = totalTimerSeconds - timerSeconds + stopwatchSeconds;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            percentDisplay.innerText = `Total Time: ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
        clearInterval(timerInterval);
        clearInterval(stopwatchInterval);
    } else {
        document.getElementById('pauseButton').innerText = "Pause";
        percentDisplay.innerText = "";
        if (timerSeconds >= 0) {
            timerInterval = setInterval(updateTimer, 1000);
        } else {
            stopwatchInterval = setInterval(updateStopwatch, 1000);
        }
    }
}

function resetTimer() {
    isTimerRunning = false;
    isTimerPaused = false;
    timerSeconds = 0;
    totalTimerSeconds = 0;
    stopwatchSeconds = 0;
    document.getElementById('timerDisplay').innerText = "00:00";
    document.getElementById('timerDisplay').style.color = 'black';
    percentDisplay.innerText = "";
    document.getElementById('pauseButton').innerText = "Pause";
    document.getElementById('pauseButton').disabled = true;
    document.getElementById('resetButton').disabled = true;
    document.getElementById('timeInput').disabled = false;
    clearInterval(timerInterval);
    clearInterval(stopwatchInterval);
}

function updatePercentColor(percent) {
    if (percent >= 25) {
        percentDisplay.style.color = 'green';
    } else if (percent >= 10) {
        percentDisplay.style.color = 'yellow';
    } else {
        percentDisplay.style.color = 'red';
    }
}
