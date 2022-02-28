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
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (FIELD[row][col] === EMPTY) {
        FIELD[row][col] = SYMBOLS[TURN];
        TURN_COUNTER+=1
        renderSymbolInCell(SYMBOLS[TURN], row, col);
        TURN += 1;
        TURN %= 2;
        console.log(TURN_COUNTER)
    }
    if (TURN_COUNTER >= SIZE) {
        alert("Победила дружба")
    }
    if(defineWin()) alert('wow');
    //defineWin();

}

function defineWin() {
    //row
    for (let i = 0; i < FIELD.length; ++i) {
        let initCell = FIELD[i][0];
        let isWin = true;
        for (const cell of FIELD[i]) {
            if (cell === EMPTY || cell !== initCell) isWin = false;
        }
        if (isWin) return isWin;
    }

    //col
    for (let i = 0; i < FIELD.length; ++i) {
        let initCell = FIELD[0][i];
        let isWin = true;
        for (const cell of FIELD[i]) {
            if (cell === EMPTY || cell !== initCell) isWin = false;
        }
        if (isWin) return isWin;
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
