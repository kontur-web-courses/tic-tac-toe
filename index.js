const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const dimension = 3;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame() {
    renderGrid(dimension);
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


let turn = 0;
let field = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]];
let gameEnded = false;

function cellClickHandler(row, col) {
    if (gameEnded) {
        return;
    }
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (field[row][col] !== EMPTY) {
        return;
    }

    let symbol = turn ? CROSS : ZERO;
    turn ^= 1;
    field[row][col] = symbol;
    renderSymbolInCell(symbol, row, col);

    let combo = findWinner(field);

    if (combo.length === 0 && !existFreeSpaces(field))
    {
        alert("Победила дружба");
    }

    if (combo.length === 0) {
        return;
    }

    for (let coord of combo) {
        let row = coord[0], col = coord[1];
        renderSymbolInCell(field[row][col], row, col, '#FFC0CB')
    }

    alert(`Победил ${field[row][col]}`);
    gameEnded = true;
}

function existFreeSpaces(field) {
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            if (field[i][j] === EMPTY) {
                return true;
            }
        }
    }

    return false;
}

function findWinner(field) {
    for (let i = 0; i < dimension; i++) {
        if (checkLine(field, i)) {
            return createLine(i);
        }
        if (checkColumn(field, i))
        {
            return createColumn(i);
        }
        for (let j = 0; j < dimension; i++) {
            if (checkMainDiagonal(field, i, j)) {
                return createMainDiagonal(i, j);
            }
            if (checkSideDiagonal(field, i, j)) {
                return createSideDiagonal(i, j);
            }
        }
    }

    return [];
}

function checkLine(field, row) {
    let symbol = field[row][0];
    if (symbol === EMPTY) {
        return false;
    }
    for (let i = 0; i < dimension; i++) {
        if (symbol !== field[row][i]) {
            return false;
        }
    }

    return true;
}

function checkColumn(field, col) {
    let symbol = field[0][col];
    if (symbol === EMPTY) {
        return false;
    }
    for (let i = 0; i < dimension; ++i) {
        if (symbol !== field[i][col]) {
            return false;
        }
    }

    return true;
}

function checkMainDiagonal(field, row, col) {
    let symbol = field[row][col];
    if (symbol === EMPTY) {
        return false;
    }
    for (let i = 0; row + i < dimension && col + i < dimension; i++) {
        if (symbol !== field[row + i][ col + i]) {
            return false;
        }
    }
    for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
        if (symbol !== field[row + i][ col + i]) {
            return false;
        }
    }
    return true;
}

function checkSideDiagonal(field, row, col) {
    let symbol = field[row][col];
    if (symbol === EMPTY) {
        return false;
    }
    for (let i = 0; row + i < dimension && col - i >= 0; i++) {
        if (symbol !== field[row + i][ col - i]) {
            return false;
        }
    }
    for (let i = 1; row - i >= 0 && col + i < dimension; i++) {
        if (symbol !== field[row - i][ col + i]) {
            return false;
        }
    }
    return true;
}


function createLine(row) {
    let line = [];
    for (let i = 0; i < dimension; i++) {
        line[i] = [row, i];
    }
    return line;
}

function createColumn(col) {
    let column =[];
    for (let i = 0; i < dimension; i++) {
        column[i] = [i, col];
    }
    return column;
}

function createMainDiagonal(field, row, col) {
    let line = [];
    for (let i = 0; row + i < dimension && col + i < dimension; i++) {
        line[i] = [row + i, col + i];
    }
    for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
        line[i] = [row - i, col - i];
    }
    return line;
}

function createSideDiagonal(field, row, col) {
    let line = [];
    for (let i = 0; row + i < dimension && col - i >= 0; i++) {
        line[i] = [row + i, col - i];
    }
    for (let i = 1; row - i >= 0 && col + i < dimension; i++) {
        line[i] = [row - i, col + i];
    }
    return line;
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
    turn = 0;
    gameEnded = 0;
    for (let i = 0; i < dimension; ++i) {
        for (let j = 0; j < dimension; ++j) {
            field[i][j] = EMPTY;
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
