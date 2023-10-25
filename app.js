const titleTag = document.querySelector("title");

const studyTimerBtn = document.getElementById("study-timer-btn");
const breakBtn = document.getElementById("break-btn");
const pauseBtn = document.getElementById("pause-btn");
const restartBtn = document.getElementById("restart-btn");
const timerDisplay = document.getElementById("timer");

const timerButtons = document.getElementsByClassName("timer-btn");

const pomodoros = document.getElementById("pomodoros");
let pomodorosQty = 0;

const hurtSound = document.getElementById("hurt-sound");
const tetraSound = document.getElementById("tetra-sound");

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

let timer;
function startTimer(timeInMin) {
  pauseBtn.disabled = false;
  restartBtn.disabled = false;
  for (let button of timerButtons) {
    button.disabled = true;
  }

  // let seconds = 2;
  let seconds = timeInMin * 60; // change it to test
  timer = setInterval(() => {
    seconds--;

    titleTag.innerText = `Timer (${formatTime(seconds)})`;
    timerDisplay.innerText = formatTime(seconds);

    // when the timer is over
    if (seconds <= 0) {
      clearInterval(timer);
      for (let button of timerButtons) {
        button.disabled = false;
      }
      pauseBtn.disabled = true;
      restartBtn.disabled = true;
      console.log("Timer stopped!");

      switch (timeInMin) {
        case 25:
          tetraSound.play();
          pomodorosQty++;
          pomodoros.innerText = pomodorosQty;
          break;
        case 5:
          hurtSound.play();
          break;
      }
    }
  }, 1000);
}

let isPaused = false;
function pause() {
  if (isPaused) {
    const currentTime = timerDisplay.innerText.split(":");
    currentSeconds = currentTime[0] * 60 + parseInt(currentTime[1]);
    startTimer(currentSeconds / 60); // startTimer converting seconds to minutes
    pauseBtn.innerText = "Pause";
  } else if (!isPaused) {
    clearInterval(timer);
    pauseBtn.innerText = "Resume";
  }
  isPaused = !isPaused;
}

function restart() {
  clearInterval(timer);
  for (let button of timerButtons) {
    button.disabled = false;
  }
  isPaused = false;
  pauseBtn.disabled = true;
  restartBtn.disabled = true;
  titleTag.innerText = "Timer";
  timerDisplay.innerText = "00:00";
}

studyTimerBtn.addEventListener("click", () => startTimer(25));
breakBtn.addEventListener("click", () => startTimer(5));

pauseBtn.addEventListener("click", pause);
restartBtn.addEventListener("click", restart);
