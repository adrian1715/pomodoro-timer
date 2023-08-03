const titleTag = document.querySelector("title");

const studyTimerBtn = document.getElementById("study-timer-btn");
const breakBtn = document.getElementById("break-btn");
const restartBtn = document.getElementById("restart-btn");
const timerDisplay = document.getElementById("timer");

const timerButtons = document.getElementsByClassName("timer-btn");

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
  restartBtn.disabled = false;
  for (let button of timerButtons) {
    button.disabled = true;
  }

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
      restartBtn.disabled = true;
      console.log("Timer stopped!");

      switch (timeInMin) {
        case 25:
          tetraSound.play();
          break;
        case 5:
          hurtSound.play();
          break;
      }
    }
  }, 1000);
}

function restart() {
  clearInterval(timer);
  for (let button of timerButtons) {
    button.disabled = false;
  }
  restartBtn.disabled = true;
  titleTag.innerText = "Timer";
  timerDisplay.innerText = "00:00";
}

studyTimerBtn.addEventListener("click", () => startTimer(25));
breakBtn.addEventListener("click", () => startTimer(5));

restartBtn.addEventListener("click", restart);
