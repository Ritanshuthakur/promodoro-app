let workDuration = 25;
let breakDuration = 5;
let isWorking = true;
let isRunning = false;
let timer;
let timeRemaining = workDuration * 60;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const settingsButton = document.getElementById('settings-button');
const settingsPanel = document.getElementById('settings-panel');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');
const saveSettingsButton = document.getElementById('save-settings');

function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function toggleSettingsPanel() {
    settingsPanel.classList.toggle('hidden');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            timeRemaining--;
            updateDisplay();
            if (timeRemaining <= 0) {
                clearInterval(timer);
                isWorking = !isWorking;
                timeRemaining = (isWorking ? workDuration : breakDuration) * 60;
                updateDisplay();
                isRunning = false;
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeRemaining = workDuration * 60;
    isWorking = true;
    updateDisplay();
}

function saveSettings() {
    workDuration = parseInt(workDurationInput.value);
    breakDuration = parseInt(breakDurationInput.value);
    resetTimer();
    toggleSettingsPanel();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
settingsButton.addEventListener('click', toggleSettingsPanel);
saveSettingsButton.addEventListener('click', saveSettings);

updateDisplay();
