const CROSS = "X";
const ZERO = "O";
const EMPTY = " ";

const container = document.getElementById("fieldWrapper");

let cells;
let currentTurnSymbol;
let isGameOver;
let fieldSize;
let isOpponentBot = true;

startGame();
addResetListener();

function startGame() {
  let size = prompt("Set field size", 3);

  if (isNaN(size)) {
    alert("Size should be a number");
    startGame();
    return;
  }

  isGameOver = false;
  cells = {};
  currentTurnSymbol = ZERO;
  fieldSize = +size;
  renderGrid(+size);
  makeBotTurn();
}

function renderGrid(dimension) {
  container.innerHTML = "";
  for (let i = 0; i < dimension; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < dimension; j++) {
      const cell = document.createElement("td");
      cell.textContent =
        i in cells && j in cells[i] ? (cell.textContent = cells[i][j]) : EMPTY;
      cell.addEventListener("click", () => cellClickHandler(i, j));
      row.appendChild(cell);
    }
    container.appendChild(row);
  }
}

function cellClickHandler(row, col) {
  if (isGameOver) {
    return;
  }
  
  console.log(`Clicked on cell: ${row}, ${col}`);

  if (row in cells && col in cells[row]) {
    console.log("Эта клетка уже занята!");
    return;
  }

  processSelectedCell(row, col);

  if (!isGameOver) {
    console.log(isGameOver);
    makeBotTurn();
  }
}

function makeBotTurn() {
  let freeCells = Array.from(Array(fieldSize).keys()).flatMap((rowIndex) =>
  Array.from(Array(fieldSize).keys()).map((columnIndex) => {
      let cell = {};
      cell.row = rowIndex;
      cell.column = columnIndex;
      return cell;
    })
  ).filter(cell => !(cell.row in cells && cell.column in cells[cell.row]));

  let cellToClick = freeCells[getRandomInt(freeCells.length)];
  processSelectedCell(cellToClick.row, cellToClick.column);
}

function processSelectedCell(row, col)
{
  if (!(row in cells)) {
    cells[row] = {};
  }

  cells[row][col] = currentTurnSymbol;
  renderSymbolInCell(currentTurnSymbol, row, col);

  if (isCurrentPlayerWinner()) {
    processWin(currentTurnSymbol);
    return;
  }

  if (
    Object.keys(cells).flatMap((row) => Object.keys(cells[row])).length ===
    Math.ceil((fieldSize * fieldSize) / 2)
  ) {
    expandField();
  }

  changeTurnSymbol();
}

function isCurrentPlayerWinner() {
  return Object.keys(cells).some((rowIndex) =>
    Object.keys(cells[rowIndex]).some((columnIndex) => {
      if (getCellSymbol(rowIndex, columnIndex) !== currentTurnSymbol)
        return false;

      if (
        getCellSymbol(rowIndex - 1, columnIndex - 1) === currentTurnSymbol &&
        getCellSymbol(+rowIndex + 1, +columnIndex + 1) === currentTurnSymbol
      ) {
        return true;
      }

      if (
        getCellSymbol(rowIndex - 1, +columnIndex + 1) === currentTurnSymbol &&
        getCellSymbol(+rowIndex + 1, columnIndex - 1) === currentTurnSymbol
      ) {
        return true;
      }

      if (
        getCellSymbol(rowIndex - 1, columnIndex) === currentTurnSymbol &&
        getCellSymbol(+rowIndex + 1, columnIndex) === currentTurnSymbol
      ) {
        return true;
      }

      if (
        getCellSymbol(rowIndex, columnIndex - 1) === currentTurnSymbol &&
        getCellSymbol(rowIndex, +columnIndex + 1) === currentTurnSymbol
      ) {
        return true;
      }
    })
  );
}

function processWin(winnerSymbol) {
  isGameOver = true;
  alert(`Победил ${currentTurnSymbol}`);
  colorSymbols(winnerSymbol, "red");
}

function expandField() {
  fieldSize += 1;
  console.log(fieldSize);
  renderGrid(fieldSize);
}

function colorSymbols(symbolToColor, color) {
  Object.keys(cells).forEach((rowIndex) =>
    Object.keys(cells[rowIndex]).forEach((columnIndex) => {
      if (getCellSymbol(rowIndex, columnIndex) === symbolToColor) {
        let cellObj = findCell(rowIndex, columnIndex);
        cellObj.style.color = color;
      }
    })
  );
}

function changeTurnSymbol() {
  currentTurnSymbol = currentTurnSymbol === ZERO ? CROSS : ZERO;
}

function getCellSymbol(row, column) {
  return row in cells && column in cells[row] ? cells[row][column] : EMPTY;
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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function resetClickHandler() {
  startGame();
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
