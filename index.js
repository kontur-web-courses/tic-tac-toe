const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let FIELD = [[EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]]
let SIZE = FIELD.length * FIELD[0].length
let SYMBOLS = [CROSS, ZERO]
let TURN = 0;
let TURN_COUNTER = 0
let WIN = false;
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

function cellClickHandler(row, col) {
    // Пиши код тут
    if(!WIN) {
        console.log(`Clicked on cell: ${row}, ${col}`);
        if (FIELD[row][col] === EMPTY) {
            FIELD[row][col] = SYMBOLS[TURN];
            renderSymbolInCell(SYMBOLS[TURN], row, col);
            TURN += 1;
            TURN %= 2;
            TURN_COUNTER += 1
            console.log(TURN_COUNTER)
        }
        if (TURN_COUNTER >= SIZE) {
            alert("Победила дружба")
        }
        WIN = defineWin();
        if (WIN) alert(TURN);
    }
}

function defineWin() {
    //row
    for (let i = 0; i < FIELD.length; ++i) {
        let initCell = FIELD[i][0];
        let isWin = true;
        for (let j = 0; j < FIELD[i].length; ++j) {
            if (FIELD[i][j] === EMPTY || FIELD[i][j] !== initCell) isWin = false;
        }
        if (isWin) return isWin;
    }

    //col
    for (let i = 0; i < FIELD.length; ++i) {
        let initCell = FIELD[0][i];
        let isWin = true;
        for (let j = 0; j < FIELD[i].length; ++j) {
            if (FIELD[j][i] === EMPTY || FIELD[j][i] !== initCell) isWin = false;
        }
        if (isWin) return isWin;
    }

    // diag
    let isWin = true;
    for (let i = 0; i < FIELD.length; ++i) {
        let initCell = FIELD[0][0];
        if (FIELD[i][i] === EMPTY || FIELD[i][i] !== initCell) {
            isWin = false;
        }
    }
    if (isWin) return isWin;

    isWin = true;
    for (let i = 0; i < FIELD.length; ++i) {
        let initCell = FIELD[0][FIELD.length - 1];
        if (FIELD[i][FIELD.length - i - 1] === EMPTY || FIELD[i][FIELD.length - i - 1] !== initCell) {
            isWin = false;
        }
    }
    if (isWin) return isWin;
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
    FIELD = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]];
    TURN = 1

    for (let i = 0; i<FIELD.length; i++){
        for (let j = 0; j<FIELD.length; j++){
            renderSymbolInCell(EMPTY, i, j)
        }
    }
    WIN = false
    TURN_COUNTER = 0
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
