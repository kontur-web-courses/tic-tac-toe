const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let size = 3;
let totalCells = size * size;
let usedCells = 0;
let side = CROSS;
let ended = false;

function createField(size) {
    const field = new Array(size)
    for (let i = 0; i < size; i++) {
        let row = new Array(size)
        for (let j = 0; j < size; j++) {
            row[j] = EMPTY
        }
        field[i] = row
    }

    return field;
}

let field = createField(size);


startGame();
addResetListener();

function startGame() {
    renderGrid(3);
    field = createField(size);
    usedCells = 0;
    side = CROSS;
    ended = false;
}

function changeSide() {
    side = side === CROSS ? ZERO : CROSS;
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
    if (usedCells === totalCells) {
        alert("Победила дружба");
    }

    if (ended || field[row][col] !== EMPTY) {
        return;
    }
    renderSymbolInCell(side, row, col);

    console.log(`Clicked on cell: ${row}, ${col}`);
    field[row][col] = side;
    checkWinners();
    changeSide();
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */

    usedCells++;
}

function checkWinners() {
    for (let i = 0; i < size; i++) {
        if (checkColumn(i) || checkRow(i) || checkLeftDiagonal() || checkRightDiagonal()) {
            alert(`winner is ${side}`);
            ended = true;
            return;
        }
    }
}

function checkColumn(column) {
    let winner = field[0][column];
    if (winner === EMPTY) {
        return false;
    }
    for (let j = 0; j < size; j++) {
        if (winner !== field[j][column]) {
            return false;
        }
    }

    let indexes = new Array(size);
    for (let j = 0; j < size; j++){
        indexes[i] = new Array(2);
        indexes[i][0] = j;
        indexes[i][1] = column;
    }

    paintWinner(indexes);
    return true;
}

function checkRow(row) {
    let winner = field[row][0];
    if (winner === EMPTY) {
        return false;
    }
    for (let j = 0; j < size; j++) {
        if (winner !== field[row][j]) {
            return false;
        }
    }

    let indexes = new Array(size);
    for (let j = 0; j < size; j++){
        indexes[j] = new Array(2);
        indexes[j][0] = row;
        indexes[j][1] = j;
    }

    paintWinner(indexes);
    return true;
}

function checkLeftDiagonal() {
    let winner = field[0][0];
    if (winner === EMPTY) {
        return false;
    }
    for (let j = 0; j < size; j++) {
        if (winner !== field[j][j]) {
            return false;
        }
    }

    let indexes = new Array(size);
    for (let j = 0; j < size; j++){
        indexes[j] = new Array(2);
        indexes[j][0] = j;
        indexes[j][1] = j;
    }

    paintWinner(indexes);
    return true;
}

function checkRightDiagonal() {
    let winner = field[0][size - 1];
    if (winner === EMPTY) {
        return false;
    }
    for (let j = 0; j < size; j++) {
        if (winner !== field[j][size - 1 - j]) {
            return false;
        }
    }

    let indexes = new Array(size);
    for (let j = 0; j < size; j++){
        indexes[j] = new Array(2);
        indexes[j][0] = j;
        indexes[j][1] = size - 1 - j;
    }

    paintWinner(indexes);
    return true;
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

function paintWinner(indexes){
    let tds = document.getElementsByTagName("td");
    for (let index of indexes){
        tds[index[0] * 3 + index[1]].style.color = "#ff0000";
    }
}

function resetClickHandler() {
    console.log('reset!');
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            renderSymbolInCell(EMPTY, i, j);
        }
    }
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
