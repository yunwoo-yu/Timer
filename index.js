const hrsBtn = document.querySelector("#hrs");
const minBtn = document.querySelector("#min");
const secBtn = document.querySelector("#sec");
const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");
const startBtnImg = document.querySelector(".start-btn-img");
const resetBtnImg = document.querySelector(".reset-btn-img");
const stopBtn = document.querySelector(".stop-btn");

let time = 0;
let timer;
let timeHour = 0;
let timeMin = 0;
let timeSec = 0;

hrsBtn.textContent = timeSec.toString().padStart(2, "0");
minBtn.textContent = timeMin.toString().padStart(2, "0");
secBtn.textContent = timeHour.toString().padStart(2, "0");

if (time === 0) {
  startBtn.disabled = true;
  resetBtn.disabled = true;
}

const timerStart = () => {
  timer = setInterval(() => {
    time--;
    timeSec--;

    if (timeSec < 10) {
      secBtn.textContent = timeSec.toString().padStart(2, "0");
    } else {
      secBtn.textContent = timeSec;
    }

    if (timeMin >= 1 && timeSec === 0) {
      timeMin--;

      if (timeMin < 10) {
        minBtn.textContent = timeMin.toString().padStart(2, "0");
      } else {
        minBtn.textContent = timeMin;
      }

      timeSec = 60;
      secBtn.textContent = timeSec;
    }

    if (timeSec < 1 && timeMin >= 1) {
      timeMin--;
      minBtn.textContent = timeMin;
      timeSec = 59;
      secBtn.textContent = timeSec;
    }

    if (timeSec < 1 && timeMin < 1 && timeHour >= 1) {
      timeHour--;

      if (timeHour < 10) {
        hrsBtn.textContent = timeHour.toString().padStart(2, "0");
      } else {
        hrsBtn.textContent = timeHour;
      }

      timeMin = 59;
      minBtn.textContent = timeMin;
      timeSec = 59;
      secBtn.textContent = timeSec;
    }

    if (timeSec < 1 && timeMin < 1 && timeHour < 1) {
      clearInterval(timer);

      startBtn.disabled = true;
      resetBtn.disabled = true;
      startBtnImg.src = "/assets/icon-start-disabled.svg";
      resetBtnImg.src = "/assets/icon-reset-disabled.svg";
      stopBtn.classList.remove("active");
      startBtn.classList.add("active");
    }
  }, 1000);
};

const timerReset = () => {
  clearInterval(timer);
  time = 0;
  timeHour = 0;
  timeMin = 0;
  timeSec = 0;
  hrsBtn.textContent = timeSec.toString().padStart(2, "0");
  minBtn.textContent = timeMin.toString().padStart(2, "0");
  secBtn.textContent = timeHour.toString().padStart(2, "0");
};

secBtn.addEventListener("click", () => {
  time += 10;
  timeSec = time % 60;
  secBtn.textContent = timeSec.toString().padStart(2, "0");
  startBtn.disabled = false;
  resetBtn.disabled = false;
  startBtnImg.src = "/assets/icon-start.svg";
  resetBtnImg.src = "/assets/icon-reset.svg";
});

minBtn.addEventListener("click", () => {
  timeMin++;

  if (timeMin > 60) {
    timeMin = 60;
  } else {
    time += 60;
  }

  minBtn.textContent = timeMin.toString().padStart(2, "0");
  startBtn.disabled = false;
  resetBtn.disabled = false;
  startBtnImg.src = "/assets/icon-start.svg";
  resetBtnImg.src = "/assets/icon-reset.svg";
});

hrsBtn.addEventListener("click", () => {
  time += 3600;
  timeHour = Math.floor(time / 3600);
  hrsBtn.textContent = timeHour.toString().padStart(2, "0");
  startBtn.disabled = false;
  resetBtn.disabled = false;
  startBtnImg.src = "/assets/icon-start.svg";
  resetBtnImg.src = "/assets/icon-reset.svg";
});

startBtn.addEventListener("click", () => {
  stopBtn.classList.add("active");
  startBtn.classList.remove("active");
  timerStart();
});

resetBtn.addEventListener("click", () => {
  timerReset();
});

stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  stopBtn.classList.remove("active");
  startBtn.classList.add("active");
});
