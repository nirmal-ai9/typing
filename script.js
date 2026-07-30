const Timer = document.querySelector(".timer");
const resetBtn = document.querySelector(".restart-button");
const testArea = document.querySelector("#testArea");
// const Textorigin = document.querySelector("#testText").innerHTML
const Textorigin2 = document.querySelector(".testText2");
const TextHolder = document.querySelector("#typing-area textarea");
const TextChangerBtn = document.querySelector("#changeExample");
const SaveTestTextBtn = document.querySelector("#save_lock");
let clearIntervall;
let isPressedFirstLetter = false;
let milisecond = 0;

function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}
function runTimer() {
  milisecond += 10;

  let minutes = Math.floor(milisecond / 60000);
  let seconds = Math.floor((milisecond % 60000) / 1000);
  let hundredth = Math.floor((milisecond % 1000) / 10);

  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");
  hundredth = String(hundredth).padStart(2, "0");
  Timer.innerHTML = `${minutes}:${seconds}:${hundredth}`;
}

function Start() {
  let testAreaLength = testArea.value.length;
  if ((testAreaLength == 0) & !isPressedFirstLetter) {
    clearIntervall = setInterval(runTimer, 10);
    isPressedFirstLetter = true;
  }
}

function SpellCheck() {
  let TextEntered = testArea.value;
  let Textorigin = Textorigin2.value;
  let TextMatch = Textorigin.substring(0, TextEntered.length);

  if (TextEntered == Textorigin) {
    TextHolder.style.borderColor = "green";

    clearInterval(clearIntervall);
  } else {
    if (TextEntered == TextMatch) {
      TextHolder.style.borderColor = "yellow";
    } else {
      TextHolder.style.borderColor = "red";
    }
  }
}
function reset() {
  clearInterval();
  clearIntervall = null;
  timeHolder = [0, 0, 0, 0];
  Timer.innerHTML = "00:00:00";
  testArea.value = "";
  TextHolder.style.borderColor = "#514c4c";
  isPressedFirstLetter = false;
}
function changeText() {
  Textorigin2.removeAttribute("readonly");
  Textorigin2.focus();
  SaveTestTextBtn.style.backgroundColor = "green";
}
function lockText() {
  Textorigin2.setAttribute("readonly", true);
  SaveTestTextBtn.style.backgroundColor = "white";
  reset();
}
testArea.addEventListener("keypress", Start);
testArea.addEventListener("keyup", SpellCheck);
resetBtn.addEventListener("click", reset);
TextChangerBtn.addEventListener("click", changeText);
SaveTestTextBtn.addEventListener("click", lockText);
