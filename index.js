// здесь был Денчик

const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let field = [];

let OCCUPIED_CELLS = 0;
let BOARD_SIZE = 3;
let PLAYER = CROSS;


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

function cellClickHandler(row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);

    field[row][col] = PLAYER;
    PLAYER = PLAYER === CROSS ? ZERO : CROSS;
    OCCUPIED_CELLS++;

    let cells = BOARD_SIZE * BOARD_SIZE;
    if (OCCUPIED_CELLS >= Math.floor(cells / 2)) {
        expandBoard();
        renderGrid();
    }
    renderBoard();
}

function renderBoard() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            renderSymbolInCell(field[i][j], i, j);
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
