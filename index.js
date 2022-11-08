const hrsBtn = document.querySelector("#hrs");
const minBtn = document.querySelector("#min");
const secBtn = document.querySelector("#sec");
const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");

let time = 0;
let timer;
let timeHour = 0;
let timeMin = 0;
let timeSec = 0;

hrsBtn.textContent = timeSec;
minBtn.textContent = timeMin;
secBtn.textContent = timeHour;

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
      minBtn.textContent = timeMin;
      timeSec = 60;
      secBtn.textContent = timeSec;
    }

    if (timeSec < 1 && timeMin >= 1) {
      timeMin--;
      minBtn.textContent = timeMin;
      timeSec = 59;
      secBtn.textContent = timeSec;
    }
    console.log(timeSec);
    if (timeSec < 1 && timeMin < 1 && timeHour >= 1) {
      timeHour--;
      hrsBtn.textContent = timeHour;
      timeMin = 59;
      minBtn.textContent = timeMin;
      timeSec = 59;
      secBtn.textContent = timeSec;
    }

    if (timeSec < 1 && timeMin < 1 && timeHour < 1) {
      clearInterval(timer);
    }
  }, 1000);
};

const timerReset = () => {
  clearInterval(timer);
  time = 0;
  timeHour = 0;
  timeMin = 0;
  timeSec = 0;
  hrsBtn.textContent = timeSec;
  minBtn.textContent = timeMin;
  secBtn.textContent = timeHour;
};

secBtn.addEventListener("click", () => {
  time += 10;
  timeSec = time % 60;
  secBtn.textContent = timeSec;
  startBtn.classList.add("active");
  resetBtn.classList.add("active");
});

minBtn.addEventListener("click", () => {
  timeMin++;
  if (timeMin > 60) {
    timeMin = 60;
  } else {
    time += 60;
  }
  console.log(time);
  minBtn.textContent = timeMin;
  startBtn.classList.add("active");
  resetBtn.classList.add("active");
});

hrsBtn.addEventListener("click", () => {
  time += 3600;
  timeHour = Math.floor(time / 3600);
  hrsBtn.textContent = timeHour;
  startBtn.classList.add("active");
  resetBtn.classList.add("active");
});

startBtn.addEventListener("click", () => {
  timerStart();
});

resetBtn.addEventListener("click", () => {
  timerReset();
});
