const timer = document.querySelector(".timer");
const resetBtn = document.querySelector(".restart-button");
const testArea = document.getElementById("testArea");
const testText = document.querySelector(".testText2");
const typingArea = document.querySelector("#typing-area textarea");
const changeBtn = document.getElementById("changeExample");
const saveBtn = document.getElementById("save_lock");

let interval = null;
let started = false;
let milliseconds = 0;

function runTimer() {
  milliseconds += 10;
  
  const minutes = String(Math.floor(milliseconds / 60000)).padStart(2, "0");
  const seconds = String(Math.floor(milliseconds % 60000 / 1000)).padStart(2, "0");
  const hundredths = String(Math.floor(milliseconds % 1000 / 10)).padStart(2, "0");
  
  timer.textContent = `${minutes}:${seconds}:${hundredths}`;
}

function startTimer() {
  if (started) return;
  
  started = true;
  interval = setInterval(runTimer, 10);
}

function spellCheck() {
  const entered = testArea.value;
  const original = testText.value;
  
  if (entered === original) {
    typingArea.style.borderColor = "green";
    clearInterval(interval);
    return;
  }
  
  typingArea.style.borderColor =
    entered === original.slice(0, entered.length) ?
    "gold" :
    "red";
}

function reset() {
  clearInterval(interval);
  interval = null;
  started = false;
  milliseconds = 0;
  
  timer.textContent = "00:00:00";
  testArea.value = "";
  typingArea.style.borderColor = "#514c4c";
}

function changeText() {
  testText.readOnly = false;
  testText.focus();
  saveBtn.style.backgroundColor = "green";
}

function lockText() {
  testText.readOnly = true;
  saveBtn.style.backgroundColor = "white";
  reset();
}

testArea.addEventListener("input", startTimer);
testArea.addEventListener("keyup", spellCheck);

resetBtn.addEventListener("click", reset);
changeBtn.addEventListener("click", changeText);
saveBtn.addEventListener("click", lockText);
