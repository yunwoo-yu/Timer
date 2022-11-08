const hrsBtn = document.querySelector("#hrs");
const minBtn = document.querySelector("#min");
const secBtn = document.querySelector("#sec");
const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");

let timer = 0;
let timeHour = 0;
let timeMin = 0;
let timeSec = 0;

hrsBtn.textContent = timeHour;
minBtn.textContent = timeMin;
secBtn.textContent = timeSec;

const setTime = () => {
  const hours = Math.floor(timer / 3600);
  const min = Math.floor(timer / 60);
  const sec = timer % 60;
};

secBtn.addEventListener("click", () => {
  timer += 1000;
  timeSec += 10;
  secBtn.textContent = timeSec;
});

secBtn.addEventListener("click", () => {
  timer += 60000;
  timeMin += 1;
  minBtn.textContent = timeMin;
});
