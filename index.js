const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let gameStarted = true;
let currentPlayer = CROSS;

let dimension = 4;

let board = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
];


startGame();
addResetListener();

function startGame () {
    let user_dimension = prompt("Введите размерность поля", '3');
    if (user_dimension === null){
        return;
    }
    if (user_dimension < 3){
        alert("Размерность поля не может быть меньше 3");
        return;
    }
    dimension = +user_dimension;
    gameStarted = true;
    currentPlayer = CROSS;
    renderGrid(dimension);
}

function renderGrid (dimension) {
    container.innerHTML = '';
    board[0].push(0);
    board=[]
    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        board.push([])
        for (let j = 0; j < dimension; j++) {
            board[board.length-1].push(EMPTY)
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    if (!gameStarted){
        return;
    }
    if (board[row][col] === EMPTY) {
        const currentPlayer = getCurrentPlayer();
        board[row][col] = currentPlayer;
        renderSymbolInCell(currentPlayer, row, col);

        if (checkWinner()) {
            const winner = getCurrentPlayer() === CROSS ? "Крестики" : "Нолики";
            alert(`Победитель: ${winner}`);
            disableClickHandlers();
        } else if (checkDraw()) {
            alert("Победила дружба");
        }
        nextTurn();
    }
}

function getCurrentPlayer() {
    return currentPlayer;
}

function nextTurn(){
    console.log(currentPlayer);
    currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
}

function checkWinner() {
    const symbols = [CROSS, ZERO];
    for (let i = 0; i < dimension; i++) {
        if (symbols.some(symbol => checkLine(i, 0, 0, 1, symbol))) {
            return true;
        }
        if (symbols.some(symbol => checkLine(0, i, 1, 0, symbol))) {
            return true;
        }
    }
    if (symbols.some(symbol => checkLine(0, 0, 1, 1, symbol)))
    {
        return true;
    }
    return symbols.some(symbol => checkLine(0, dimension -1, 1, -1, symbol));
}

function highlightWinningCells(startRow, startCol, rowInc, colInc) {
    for (let i = 0; i < dimension; i++) {
        const row = startRow + i * rowInc;
        const col = startCol + i * colInc;
        findCell(row, col).style.backgroundColor = 'red';
    }
}

function checkLine(startRow, startCol, rowInc, colInc, symbol) {
    for (let i = 0; i < dimension; i++) {
        const row = startRow + i * rowInc;
        const col = startCol + i * colInc;
        if (board[row][col] !== symbol) {
            return false;
        }
    }
    highlightWinningCells(startRow, startCol, rowInc, colInc);
    return true;
}

function checkDraw() {
    for (let row of board) {
        for (let cell of row) {
            if (cell === EMPTY) {
                return false;
            }
        }
    }
    return true;
}

function disableClickHandlers() {
    gameStarted = false;
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => cell.addEventListener('click', () => {}));
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

function resetClickHandler() {
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
