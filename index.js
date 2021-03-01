const CROSS = "X";
const ZERO = "O";
const EMPTY = " ";

const container = document.getElementById("fieldWrapper");

startGame();
addResetListener();

function startGame() {
  renderGrid(3);
}

function renderGrid(dimension) {
  container.innerHTML = "";

  for (let i = 0; i < dimension; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < dimension; j++) {
      const cell = document.createElement("td");
      cell.textContent = EMPTY;
      cell.addEventListener("click", () => cellClickHandler(i, j));
      row.appendChild(cell);
    }
    container.appendChild(row);
  }
}

let turnCount = 0;
let field = [
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY],
];
let isGameOver = false;

function cellClickHandler(row, col) {
  console.log(`Clicked on cell: ${row}, ${col}`);
  if (!isGameOver && findCell(row, col).textContent === EMPTY) {
    let currentSymbol = turnCount % 2 != 0 ? ZERO : CROSS;
    renderSymbolInCell(currentSymbol, row, col);
    field[row][col] = currentSymbol;
    turnCount++;
    if (isWin()) {
      if (currentSymbol === CROSS) {
        sendXWinner();
        fillWinner(CROSS, row, col);
      } else {
        sendOWinner();
        fillWinner(ZERO, row, col);
      }

      isGameOver = true;
    } else if (isOver()) {
      sendOver();
      isGameOver = true;
    }
  }
}

function fillWinner(symb, row, col) {
  renderSymbolInCell(symb, row, col, "#FF4500");
}

function isOver() {
  return turnCount === 9;
}

function sendOver() {
  alert("Победила дружба");
}

function sendXWinner() {
  alert("Победили крестики");
}

function sendOWinner() {
  alert("Победили нолики");
}

function isWin() {
  return checkDiagonales() || checkLines();
}

function checkDiagonales() {
  return checkDiagonaleForSymb(ZERO) || checkDiagonaleForSymb(CROSS);
}
function checkDiagonaleForSymb(symb) {
  let isMatchLeft = true;
  let isMatchRight = true;
  for (let i = 0; i < field.length; i++) {
    isMatchLeft &= field[i][i] == symb;
    isMatchRight &= field[field.length - i - 1][i] == symb;
  }
  return isMatchLeft || isMatchRight;
}

const transpose = (matrix) =>
  matrix[0].map((col, i) => matrix.map((row) => row[i]));

function checkLines() {
  const fieldTranspose = transpose(field);
  console.log(fieldTranspose);
  return isMatchSymbolsInLine(field) || isMatchSymbolsInLine(fieldTranspose);
}

function isMatchSymbolsInLine(field) {
  for (const line of field) {
    if (
      line.every((cell) => cell === CROSS) ||
      line.every((cell) => cell === ZERO)
    )
      return true;
  }
  return false;
}

function renderSymbolInCell(symbol, row, col, color = "#333") {
  const targetCell = findCell(row, col);

  targetCell.textContent = symbol;
  targetCell.style.color = color;
}

function findCell(row, col) {
  const targetRow = container.querySelectorAll("tr")[row];
  return targetRow.querySelectorAll("td")[col];
}

function addResetListener() {
  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", resetClickHandler);
}

function resetClickHandler() {
  for (let row = 0; row < field.length; row++) {
    for (let col = 0; col < field[row].length; col++) {
      field[row][col] = EMPTY;
      renderSymbolInCell(EMPTY, row, col);
    }
  }
  isGameOver = false;
  turnCount = 0;
}

/* Test Function */
/* Победа первого игрока */
function testWin() {
  clickOnCell(0, 2);
  clickOnCell(0, 0);
  clickOnCell(2, 0);
  clickOnCell(1, 1);
  clickOnCell(2, 2);
  clickOnCell(1, 2);
  clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
  clickOnCell(2, 0);
  clickOnCell(1, 0);
  clickOnCell(1, 1);
  clickOnCell(0, 0);
  clickOnCell(1, 2);
  clickOnCell(1, 2);
  clickOnCell(0, 2);
  clickOnCell(0, 1);
  clickOnCell(2, 1);
  clickOnCell(2, 2);
}

function clickOnCell(row, col) {
  findCell(row, col).click();
}
