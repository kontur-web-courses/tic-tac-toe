const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let board = undefined
let turn = CROSS

createTicTacToeBoard()
startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function createTicTacToeBoard() {
    let n = prompt("Введите количество полей для игры в крестики-нолики:", "3"); // Запрашиваем у пользователя размер доски
    n = parseInt(n, 10); // Преобразуем введенное значение в число

    if (isNaN(n) || n <= 0) {
        console.error("Некорректный ввод. Пожалуйста, введите положительное число.");
        return;
    }

    board = Array.from({ length: n }, () => Array(n).fill(EMPTY)); // Создаем массив n*n, инициализируя каждый элемент EMPTY

    console.log(board);
    return board;
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (board[row][col] !== EMPTY) {
        return;
    }
    board[row][col] = turn
    renderSymbolInCell(turn, row, col);
    if (isFinished(board)){
        alert("Победила дружба");
    }
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
    resetField()
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

function isFinished(board){
    return !board.some(subArray => subArray.includes(EMPTY));
}

function resetField(){
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (board[i][j] !== EMPTY) {
                board[i][j] = EMPTY
                renderSymbolInCell(EMPTY, i, j);
            }
        }
    }
}