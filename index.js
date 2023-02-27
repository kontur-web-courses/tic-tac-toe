const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const POSSIBLEDIMENSIONS = [3, 5, 10];
let field = [];
let dimensionIndex = 0;
let dimensionsCount = 3;
let isCross = true;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();
addChangeDimListener();

function startGame() {
    renderGrid(dimensionsCount);
    clearField();
}

function clearField() {
    for (let row = 0; row < dimensionsCount; row++) {
        field[row] = [];
        for (let col = 0; col < dimensionsCount; col++) {
            field[row][col] = EMPTY;
        }
    }
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
    if (field[row][col] === EMPTY) {
        const symbol = isCross ? CROSS : ZERO;

        renderSymbolInCell(symbol, row, col);
        field[row][col] = symbol;
        isCross = !isCross;
    }
    console.log(`Clicked on cell: ${row}, ${col}`);
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
    isCross = true;

    clearField();

    for (let row = 0; row < dimensionsCount; row++) {
        for (let col = 0; col < dimensionsCount; col++) {
            renderSymbolInCell(EMPTY, row, col);
        }
    }

    console.log('reset!');
}

function addChangeDimListener() {
    const dimButton = document.getElementById('changeDim');
    dimButton.addEventListener('click', changeDimHandler);
}

function changeDimHandler() {
    dimensionIndex += 1;
    dimensionIndex %= POSSIBLEDIMENSIONS.length;
    dimensionsCount = POSSIBLEDIMENSIONS[dimensionIndex];
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
