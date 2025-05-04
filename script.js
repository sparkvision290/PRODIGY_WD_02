document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const displayHours = document.getElementById('hours');
    const displayMinutes = document.getElementById('minutes');
    const displaySeconds = document.getElementById('seconds');
    const displayMilliseconds = document.getElementById('milliseconds');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const lapBtn = document.getElementById('lapBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapsContainer = document.getElementById('laps');

    // Variables
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;
    let interval;
    let isRunning = false;
    let lapCount = 1;

    // Event Listeners
    startBtn.addEventListener('click', startStopwatch);
    pauseBtn.addEventListener('click', pauseStopwatch);
    lapBtn.addEventListener('click', recordLap);
    resetBtn.addEventListener('click', resetStopwatch);

    // Functions
    function startStopwatch() {
        if (!isRunning) {
            interval = setInterval(updateTime, 10);
            isRunning = true;
            toggleButtons(true);
        }
    }

    function pauseStopwatch() {
        clearInterval(interval);
        isRunning = false;
        toggleButtons(false);
    }

    function resetStopwatch() {
        clearInterval(interval);
        isRunning = false;
        hours = 0;
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        lapCount = 1;
        updateDisplay();
        lapsContainer.innerHTML = '';
        toggleButtons(false);
    }

    function recordLap() {
        if (isRunning) {
            const lapTime = formatTime(hours, minutes, seconds, milliseconds);
            const lapItem = document.createElement('div');
            lapItem.className = 'lap-item';
            lapItem.innerHTML = `
                <span class="lap-number">Lap ${lapCount}</span>
                <span class="lap-time">${lapTime}</span>
            `;
            lapsContainer.prepend(lapItem);
            lapCount++;
        }
    }

    function updateTime() {
        milliseconds += 10;
        
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;
        }
        
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        
        updateDisplay();
    }

    function updateDisplay() {
        displayHours.textContent = padTime(hours);
        displayMinutes.textContent = padTime(minutes);
        displaySeconds.textContent = padTime(seconds);
        displayMilliseconds.textContent = padTime(milliseconds / 10);
    }

    function padTime(time) {
        return time.toString().padStart(2, '0');
    }

    function formatTime(h, m, s, ms) {
        return `${padTime(h)}:${padTime(m)}:${padTime(s)}.${padTime(ms / 10)}`;
    }

    function toggleButtons(running) {
        startBtn.disabled = running;
        pauseBtn.disabled = !running;
        lapBtn.disabled = !running;
    }
});