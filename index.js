// 사용한 각종 버튼, 이미지 변수
const hrsBtn = document.querySelector("#hrs");
const minBtn = document.querySelector("#min");
const secBtn = document.querySelector("#sec");
const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");
const startBtnImg = document.querySelector(".start-btn-img");
const resetBtnImg = document.querySelector(".reset-btn-img");
const stopBtn = document.querySelector(".stop-btn");

// 시간 관련 변수들
// time : 클릭한 전체시간을 초로 저장
// timer : 다른 함수에서 clearInterval을 사용하기 위해 전역변수로 선언 (나중에 setInterval 할당);
// timeHour : 시간계산
// timeMin : 분 계산
// timeSec : 초 계산
let time = 0;
let timer;
let timeHour = 0;
let timeMin = 0;
let timeSec = 0;

// 처음 textContent를 00으로 할당.
hrsBtn.textContent = timeSec.toString().padStart(2, "0");
minBtn.textContent = timeMin.toString().padStart(2, "0");
secBtn.textContent = timeHour.toString().padStart(2, "0");

//time이 0일 경우 버튼을 비활성화 처음에 비활성화로 시작하기 위함.
if (time === 0) {
  startBtn.disabled = true;
  resetBtn.disabled = true;
}

// 타이머 함수
const timerStart = () => {
  // 전역 변수 timer를 이용해서 할당해서 사용 (전역변수인 이유는 다른곳에서 함수를 정지시키거나 하기 위함)
  timer = setInterval(() => {
    time--;
    timeSec--;

    // 초가 10보다 작을경우 09, 08 식으로 0을 붙여서 나오게 하기
    if (timeSec < 10) {
      secBtn.textContent = timeSec.toString().padStart(2, "0");
    } else {
      secBtn.textContent = timeSec;
    }

    // 초가 0 이 됐을 때 분이 0 이상이면 분을 --; 하고 초를 60초로 할당.
    if (timeMin >= 1 && timeSec === 0) {
      timeMin--;

      // 분이 10보다 작을경우 09, 08 식으로 0을 붙여서 나오게 하기
      if (timeMin < 10) {
        minBtn.textContent = timeMin.toString().padStart(2, "0");
      } else {
        minBtn.textContent = timeMin;
      }

      timeSec = 60;
      secBtn.textContent = timeSec;
    }

    // 분만 있고 초가 없을 경우 바로 59로 가야하기에 첫 timeSec--; 를 하게 되면 -1인걸 이용해서 59초 할당.
    if (timeSec < 1 && timeMin >= 1) {
      timeMin--;

      // 분이 10보다 작을경우 09, 08 식으로 0을 붙여서 나오게 하기
      if (timeMin < 10) {
        minBtn.textContent = timeMin.toString().padStart(2, "0");
      } else {
        minBtn.textContent = timeMin;
      }

      timeSec = 59;
      secBtn.textContent = timeSec;
    }

    // 시간이 0 이상일때 시간을 제외한 분, 초가 0 일 경우 시간을 하나 줄이고 분과 초에 59 할당
    if (timeSec < 1 && timeMin < 1 && timeHour >= 1) {
      timeHour--;

      // 시간이 10보다 작을경우 09, 08 식으로 0을 붙여서 나오게 하기
      if (timeHour < 10) {
        hrsBtn.textContent = timeHour.toString().padStart(2, "0");
      } else {
        hrsBtn.textContent = timeHour;
      }

      // 분과 초를 59로 할당.
      timeMin = 59;
      minBtn.textContent = timeMin;
      timeSec = 59;
      secBtn.textContent = timeSec;
    }

    // 전부 0이 됐을경우 타이머를 멈추고 초기 상태로 되돌리기
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

// 리셋 누를경우 타이머 멈추고 모두 리셋
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

// 반복되는 구문 함수로 넣어놓고 사용하기 인자로 버튼과 변수만 넣어주면 됨.
const setBtnImg = (button, time) => {
  button.textContent = time.toString().padStart(2, "0");
  startBtn.disabled = false;
  resetBtn.disabled = false;
  startBtnImg.src = "/assets/icon-start.svg";
  resetBtnImg.src = "/assets/icon-reset.svg";
};

// type을 넣어서 반복구문 줄이고 addEventListener 깨끗하게 관리하기
const addTime = (type) => {
  // 초 일경우 실행
  if (type === "sec") {
    time += 10;
    timeSec = time % 60;
  }
  // 분 일경우 실행
  else if (type === "min") {
    timeMin++;

    if (timeMin > 60) {
      timeMin = 60;
    } else {
      time += 60;
    }
  }
  // 시간일 경우 실행
  else if (type === "hrs") {
    time += 3600;
    timeHour = Math.floor(time / 3600);
  }
};

// 초 증가 버튼 클릭 이벤트
secBtn.addEventListener("click", () => {
  addTime("sec");
  setBtnImg(secBtn, timeSec);
});

// 분 증가 버튼 클릭 이벤트
minBtn.addEventListener("click", () => {
  addTime("min");
  setBtnImg(minBtn, timeMin);
});

// 시간 증가 버튼 클릭 이벤트
hrsBtn.addEventListener("click", () => {
  addTime("hrs");
  setBtnImg(hrsBtn, timeHour);
});

// 스타트 버튼 클릭 시 타이머 시작되고 스타트버튼 숨기고 퍼즈버튼 보이게하기
startBtn.addEventListener("click", () => {
  stopBtn.classList.add("active");
  startBtn.classList.remove("active");
  timerStart();
});

// 리셋버튼 클릭 시 리셋
resetBtn.addEventListener("click", () => {
  timerReset();
});

// 퍼즈버튼 클릭 시 타이머 멈추고 다시 스타트 버튼 보이게 하기
stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  stopBtn.classList.remove("active");
  startBtn.classList.add("active");
});
