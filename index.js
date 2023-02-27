const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let boardSize;
let board;
let currentPlayer;
let isGameOver;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    boardSize = 3;
    board = createBoard(boardSize);
    currentPlayer = CROSS;
    isGameOver = false;
    renderGrid(boardSize);
}

function createBoard(size) {
  result = Array(size);
  for (let i = 0; i < size; i++) {
    result[i] = Array(size);
    for (let j = 0; j < size; j++) {
      result[i][j] = EMPTY;
    }
  }
  return result;
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = board[i][j]
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if(board[row][col] !== EMPTY || isGameOver)
      return;
    board[row][col] = currentPlayer;
    renderSymbolInCell(currentPlayer, row, col);
    checkWinner();
    registerNumberOfClicks();
    currentPlayer = getNextPlayer(currentPlayer);

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function getNextPlayer(player) {
  return player === CROSS ? ZERO : CROSS;
}

function registerNumberOfClicks () {
    numberOfClicks++;
    if (numberOfClicks === boardSize * boardSize) {
        alert('Победила дружба!');
    }
}

function checkWinner () {
    const winner = getWinner();

    if (winner) {
        alert(`Победили ${winner}`);
    }
}

function getMostFrequentElement(row) {
    let elFrequencies = new Map();
    let mostFrequentElement = row[0];
    let counter = 0;
    for (let i = 0; i < row.length; i++) {
        if (elFrequencies.has(row[i])) {
            elFrequencies.set(row[i], elFrequencies.get(row[i]) + 1);
        } else {
            elFrequencies.set(row[i], 1);
        }
        if (elFrequencies.get(row[i]) > counter) {
            counter = elFrequencies.get(row[i]);
            mostFrequentElement = row[i];
        }
    }
    return mostFrequentElement;
}

function checkRows() {
    for (let i = 0; i < boardSize; i++) {
        const row = board[i];
        const winner = getMostFrequentElement(row);
        if (winner !== EMPTY) {
            return winner;
        }
    }

    return null
}

function checkColumns() {
    for (let i = 0; i < boardSize; i++) {
        const column = [];
        for (let j = 0; j < boardSize; j++) {
            column.push(board[j][i]);
        }
        const winner = getMostFrequentElement(column);
        if (winner !== EMPTY) {
            return winner;
        }
    }

    return null
}

function checkDiagonals() {
    const diagonal1 = [];
    const diagonal2 = [];

    for (let i = 0; i < boardSize; i++) {
        diagonal1.push(board[i][i]);
        diagonal2.push(board[i][boardSize - i - 1]);
    }
    const winner1 = getMostFrequentElement(diagonal1);
    const winner2 = getMostFrequentElement(diagonal2);
    if (winner1 !== EMPTY) {
        return winner1;
    }
    if (winner2 !== EMPTY) {
        return winner2;
    }

    return null;
}

function getWinner() {
    return checkRows() || checkColumns() || checkDiagonals();
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
    startGame();
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
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

function clickOnCell (row, col) {
    findCell(row, col).click();
}
