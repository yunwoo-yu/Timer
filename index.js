const hrsBtn = document.querySelector("#hrs");
const minBtn = document.querySelector("#min");
const secBtn = document.querySelector("#sec");
const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");

let timer = 0;
let timeHour = 0;
let timeMin = 0;
let timeSec = 0;

secBtn.textContent = timeSec;

const timerStart = () => {
  setInterval(() => {
    if (timeSec === 0) {
      clearInterval(timerStart);
    }
    timeSec -= 1;
    secBtn.textContent = timeSec;
  }, 1000);
};

secBtn.addEventListener("click", () => {
  timeSec += 10;
  secBtn.textContent = timeSec;
});

startBtn.addEventListener("click", () => {
  timerStart();
});
