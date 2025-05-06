document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const millisecondsElement = document.getElementById('milliseconds');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsList = document.getElementById('laps');

    // Variables
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;
    let lapCount = 1;

    // Format time to always show 2 digits
    const formatTime = (time) => {
        return time.toString().padStart(2, '0');
    };

    // Format milliseconds to always show 2 digits
    const formatMilliseconds = (time) => {
        return time.toString().padStart(2, '0').slice(0, 2);
    };

    // Update the stopwatch display
    const updateDisplay = () => {
        const currentTime = Date.now() - startTime + elapsedTime;
        const totalMilliseconds = Math.floor(currentTime);
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);

        const milliseconds = totalMilliseconds % 1000;
        const seconds = totalSeconds % 60;
        const minutes = totalMinutes % 60;
        const hours = totalHours % 24;

        millisecondsElement.textContent = formatMilliseconds(milliseconds);
        secondsElement.textContent = formatTime(seconds);
        minutesElement.textContent = formatTime(minutes);
        hoursElement.textContent = formatTime(hours);
    };

    // Start the stopwatch
    const start = () => {
        if (!isRunning) {
            startTime = Date.now();
            timerInterval = setInterval(updateDisplay, 10);
            isRunning = true;
            startBtn.disabled = true;
            pauseBtn.disabled = false;
        }
    };

    // Pause the stopwatch
    const pause = () => {
        if (isRunning) {
            clearInterval(timerInterval);
            elapsedTime += Date.now() - startTime;
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    };

    // Reset the stopwatch
    const reset = () => {
        clearInterval(timerInterval);
        elapsedTime = 0;
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        millisecondsElement.textContent = '00';
        
        lapsList.innerHTML = '';
        lapCount = 1;
    };

    // Record a lap time
    const lap = () => {
        if (isRunning) {
            const lapTime = `${hoursElement.textContent}:${minutesElement.textContent}:${secondsElement.textContent}.${millisecondsElement.textContent}`;
            const lapItem = document.createElement('div');
            lapItem.className = 'lap-item';
            lapItem.innerHTML = `
                <span class="lap-number">Lap ${lapCount}</span>
                <span class="lap-time">${lapTime}</span>
            `;
            lapsList.prepend(lapItem);
            lapCount++;
        }
    };

    // Event Listeners
    startBtn.addEventListener('click', start);
    pauseBtn.addEventListener('click', pause);
    resetBtn.addEventListener('click', reset);
    lapBtn.addEventListener('click', lap);

    // Initialize buttons
    pauseBtn.disabled = true;
});