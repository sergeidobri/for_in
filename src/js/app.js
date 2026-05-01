import { getNewPosition } from "./gameLogic";

const rows = Array.from(document.querySelectorAll(".row"));

const cells = rows.map((row) => Array.from(row.children));

const n = cells.length;
const m = cells[0]?.length || 0;

const successContainer = document.getElementById("success");
const mistakesContainer = document.getElementById("mistakes");
const container = document.querySelector(".container");

let success = 0;
let mistakes = 0;
const successToWin = 5;
const mistakesToLose = 5;

let iActive = 0;
let jActive = 0;
let intervalId = null;

updateActiveCell(iActive, jActive);

startTimer();

function incrementMistakes() {
  mistakes++;
  mistakesContainer.innerText = mistakes;
}

function incrementSuccess() {
  success++;
  successContainer.innerText = success;
}

function startTimer() {
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    if (!checkIfEnded()) {
      moveCard();
      incrementMistakes();
    }
  }, 1000);
}

function updateActiveCell(i, j) {
  if (cells[iActive] && cells[iActive][jActive]) {
    cells[iActive][jActive].classList.remove("active");
  }
  if (cells[i] && cells[i][j]) {
    cells[i][j].classList.add("active");
  }
  iActive = i;
  jActive = j;
}

function moveCard() {
  const [newI, newJ] = getNewPosition(iActive, jActive, n, m);
  updateActiveCell(newI, newJ);
}

function checkIfEnded() {
  if (success >= successToWin) {
    alert("Победа!");
    clearInterval(intervalId);
    return true;
  }
  if (mistakes >= mistakesToLose) {
    alert("Поражение!");
    clearInterval(intervalId);
    return true;
  }
  return false;
}

function handleClick(e) {
  if (success >= successToWin || mistakes >= mistakesToLose) return;

  const cell = e.target.closest(".cell");
  if (!cell) return;

  clearInterval(intervalId);

  const isCorrect = cell === cells[iActive][jActive];

  if (isCorrect) {
    incrementSuccess();
  } else {
    incrementMistakes();
  }

  if (checkIfEnded()) {
    return;
  }

  moveCard();
  startTimer();
}

container.addEventListener("click", handleClick);
