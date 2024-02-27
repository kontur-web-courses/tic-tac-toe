const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let currentPlayer = CROSS;

const board = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
];


startGame();
addResetListener();

function startGame () {
    renderGrid(3);
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

function cellClickHandler(row, col) {
    if (board[row][col] === EMPTY) {
        const currentPlayer = getCurrentPlayer();
        board[row][col] = currentPlayer;
        renderSymbolInCell(currentPlayer, row, col);

        if (checkWinner()) {
            const winner = getCurrentPlayer() === ZERO ? "Крестики" : "Нолики";
            alert(`Победитель: ${winner}`);
            highlightWinningCells();
            disableClickHandlers();
        } else if (checkDraw()) {
            alert("Победила дружба");
        }
    }
}

function getCurrentPlayer() {
    const crosses = board.flat().filter(cell => cell === CROSS);
    const zeros = board.flat().filter(cell => cell === ZERO);
    return crosses.length === zeros.length ? CROSS : ZERO;
}

function checkWinner() {
    const lines = [
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]]
    ];

    for (let line of lines) {
        if (line.every(cell => cell === CROSS) || line.every(cell => cell === ZERO)) {
            return true;
        }
    }

    return false;
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

function highlightWinningCells() {

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

function disableClickHandlers() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => cell.removeEventListener('click', () => cellClickHandler(cell.dataset.row, cell.dataset.col)));
}

function resetClickHandler() {
    // Сброс игрового поля и состояния
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = EMPTY;
            renderSymbolInCell(EMPTY, i, j); // Очистка ячеек от символов и цвета
        }
    }
    // Включение обработчиков кликов
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => cell.addEventListener('click', () => cellClickHandler(cell.dataset.row, cell.dataset.col)));
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
