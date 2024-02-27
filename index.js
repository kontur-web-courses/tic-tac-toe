const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let Player = 1;

const container = document.getElementById('fieldWrapper');
let gameBoard = [];

startGame();
addResetListener();

function startGame() {
    gameBoard = initializeBoard(3);
    renderGrid(3);
}

function initializeBoard(dimension) {
    const board = [];
    for (let i = 0; i < dimension; i++) {
        const row = [];
        for (let j = 0; j < dimension; j++) {
            row.push(EMPTY);
        }
        board.push(row);
    }
    return board;
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = gameBoard[i][j];
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    if (gameBoard[row][col] === EMPTY) {
        const symbol = Player === 1 ? ZERO : CROSS;
        renderSymbolInCell(symbol, row, col);
        gameBoard[row][col] = symbol;
        Player = Player === 1 ? 2 : 1;
    }
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    Player = 1;
    gameBoard = initializeBoard(3);
    renderGrid(3);
}

/* Test Function */
/* Win for the first player */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Draw */
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
