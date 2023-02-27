// здесь был Денчик

const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let field = [];

let OCCUPIED_CELLS = 0;
let BOARD_SIZE = 3;
let PLAYER = CROSS;
let WINNER = null;

resetGame();
startGame();
addResetListener();

function startGame() {
    renderGrid(3);
}


function expandBoard() {
    BOARD_SIZE += 2;
    let newBoard = [];
    for (let k = 0; k < BOARD_SIZE; k++) {
        newBoard.push(new Array(BOARD_SIZE).fill(EMPTY));
        for (let i = 0; i < BOARD_SIZE - 2; i++) {
            for (let j = 0; j < BOARD_SIZE - 2; j++) {
                newBoard[i + 1][j + 1] = field[i][j];
            }
        }
    }

    field = newBoard;
}

function renderGrid(dimension) {
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

function checkWinner() {
    const WIN_LENGTH = 3;

    // Проверка по горизонтали
    for (let i = 0; i < BOARD_SIZE; i++) {
        let count = 0;
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (field[i][j] === PLAYER) {
                count++;
            } else {
                count = 0;
            }
            if (count === WIN_LENGTH) {
                return PLAYER;
            }
        }
    }

    // Проверка по вертикали
    for (let i = 0; i < BOARD_SIZE; i++) {
        let count = 0;
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (field[j][i] === PLAYER) {
                count++;
            } else {
                count = 0;
            }
            if (count === WIN_LENGTH) {
                return PLAYER;
            }
        }
    }

    // Проверка по диагонали
    let count = 0;
    for (let i = 0; i < BOARD_SIZE; i++) {
        if (field[i][i] === PLAYER) {
            count++;
        } else {
            count = 0;
        }
        if (count === WIN_LENGTH) {
            return PLAYER;
        }
    }

    // Проверка по диагонали
    count = 0;
    for (let i = 0; i < BOARD_SIZE; i++) {
        if (field[i][BOARD_SIZE - 1 - i] === PLAYER) {
            count++;
        } else {
            count = 0;
        }
        if (count === WIN_LENGTH) {
            return PLAYER;
        }
    }

    return null;
}

function cellClickHandler(row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);

    if (field[row][col] !== EMPTY) {
        return;
    }

    field[row][col] = PLAYER;
    PLAYER = PLAYER === CROSS ? ZERO : CROSS;
    OCCUPIED_CELLS++;

    WINNER = checkWinner();

    let cells = BOARD_SIZE * BOARD_SIZE;
    if (WINNER === null && OCCUPIED_CELLS >= Math.floor(cells / 2)) {
        expandBoard();
        renderGrid();
    }
    renderBoard();
}

function renderBoard() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            renderSymbolInCell(field[i][j], i, j, WINNER === field[i][j] ? 'red' : '#333');
        }
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
    console.log('reset!');

    resetGame();
}

function resetGame() {
    field = [];
    BOARD_SIZE = 3;
    for (let i = 0; i <= BOARD_SIZE; i++) {
        field.push(new Array(BOARD_SIZE).fill(EMPTY));
    }

    PLAYER = CROSS;
    OCCUPIED_CELLS = 0;
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
