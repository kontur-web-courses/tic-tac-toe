const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let isWin = false;
let currentStepQuery = 0;

startGame();
addResetListener();

let field = [[null, null, null], [null, null, null], [null, null, null]]

function startGame() {
    renderGrid(3);
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
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (!isWin) {
        if (currentStepQuery === 0 && !field[row][col]) {
            field[row][col] = 'x'
            renderSymbolInCell(CROSS, row, col);
            currentStepQuery = 1;
        }
        if (currentStepQuery === 1 && !field[row][col]) {
            field[row][col] = '0'
            renderSymbolInCell(ZERO, row, col);
            currentStepQuery = 0;
        }
        console.log(isWinner());
        if (isWinner()) {
            alert("Победил " + field[row][col]);
            isWin = true;
        }
    }
}

function isWinner() {
    if (field[0][0] === field[0][1] && field[0][1] === field[0][2] && field[0][0]) return true;
    if (field[1][0] === field[1][1] && field[1][1] === field[1][2] && field[1][0]) return true;
    if (field[2][0] === field[2][1] && field[2][1] === field[2][2] && field[2][0]) return true;
    if (field[0][0] === field[1][1] && field[1][1] === field[2][2] && field[0][0]) return true;
    if (field[2][0] === field[1][1] && field[1][1] === field[0][2] && field[2][0]) return true;
    if (field[0][0] === field[1][0] && field[1][0] === field[2][0] && field[0][0]) return true;
    if (field[0][1] === field[1][1] && field[1][1] === field[2][1] && field[0][1]) return true;
    if (field[0][2] === field[1][2] && field[1][2] === field[2][2] && field[0][2]) return true;
    return false;
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
    field = [[null, null, null], [null, null, null], [null, null, null]]
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            renderSymbolInCell(EMPTY, i, j);
        }
    }
    currentStepQuery = 0;
    isWin = false;
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
