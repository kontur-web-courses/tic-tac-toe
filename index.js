const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let isZero = false;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

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

const field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let isWin = false;

function cellClickHandler(row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (isWin) {
        return;
    }
    if (isFill(row, col)) {
        return;
    }
    if (isZero) {
        renderSymbolInCell(ZERO, row, col);
        isZero = false;
    } else {
        renderSymbolInCell(CROSS, row, col);
        isZero = true;
    }
    field[row][col] = isZero ? 2 : 1;
    let current_turn = isZero ? 2 : 1;
    if (hasWinner(col, row, current_turn)) {
        alert(isZero ? CROSS : ZERO);
        isWin = true;
        return;
    }
    if (checkFieldFilled()) {
        alert("Победила дружба");
        isWin = true;
        return;
    }

    if (is_zero) {
        botTurn();
    }
}

function botTurn() {
    while (1) {
        let row = getRandomInt(2);
        let column = getRandomInt(2);
        if (field[row][column] === 0) {
            cellClickHandler(row, column);
            return;
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function hasWinner(col, row, current_turn) {
    if (field[0][col] === current_turn && field[1][col] === current_turn && field[2][col] === current_turn) {
        colorWinnerColumn(col, current_turn === 1 ? ZERO : CROSS);
        return true;
    }
    if (field[row][0] === current_turn && field[row][1] === current_turn && field[row][2] === current_turn) {
        colorWinnerRow(row, current_turn === 1 ? ZERO : CROSS);
        return true;
    }
    if (field[0][0] === current_turn && field[1][1] === current_turn && field[2][2] === current_turn) {
        colorWinnerRightDiag(current_turn === 1 ? ZERO : CROSS);
        return true;
    }
    if (field[0][2] === current_turn && field[1][1] === current_turn && field[2][0] === current_turn) {
        colorWinnerLeftDiag(current_turn === 1 ? ZERO : CROSS);
        return true;
    }
    return false;
}

function colorWinnerRow(row, symbol) {
    for (let j = 0; j < 3; j++) {
        renderSymbolInCell(symbol, row, j, "#FF0000")
    }
}

function colorWinnerColumn(col, symbol) {
    for (let j = 0; j < 3; j++) {
        renderSymbolInCell(symbol, j, col, "#FF0000")
    }
}

function colorWinnerRightDiag(symbol) {
    for (let j = 0; j < 3; j++) {
        renderSymbolInCell(symbol, j, j, "#FF0000")
    }
}

function colorWinnerLeftDiag(symbol) {
    for (let j = 0; j < 3; j++) {
        renderSymbolInCell(symbol, j, 2 - j, "#FF0000")
    }
}

function checkFieldFilled() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (field[i][j] === 0)
                return false;
        }
    }
    return true;
}

function isFill(row, col) {
    const targetCell = findCell(row, col);

    return targetCell.textContent !== EMPTY
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
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            field[i][j] = 0;
            isWin = false;
            renderSymbolInCell(EMPTY, i, j);
        }
    }
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
