const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

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

function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function nextTurn() {
    turn = turn == CROSS ? ZERO : CROSS;
}

function checkWin(){
    for (let i = 0; i < 3; i++){
        if (checkLineWin(i, 0, 3, 3, 0, 1) || checkLineWin(0, i, 3, 3, 1, 0))
            return true;
    }
    if (checkLineWin(0, 0, 3, 3, 1, 1) || checkLineWin(0, 3, 3, 0, 1, -1))
        return true;
    return false;
}

function checkLineWin(stX, stY, endX, endY, dx, dy){
    if (isLineWin(stX, stY, endX, endY, dx, dy)){
        renderWonLine(stX, stY, endX, endY, dx, dy)
        return true;
    }
    return false;
}

function isLineWin(stX, stY, endX, endY, dx, dy){
    for (let i = stX; i < endX; i += dx) {
        for (let j = stY; j < endY; i += dy) {
            if (field[i][j] != turn)
                return false;
        }
    }
    return true;
}

function renderWonLine(stX, stY, endX, endY, dx, dy){
    for (let i = stX; i < endX; i += dx) {
        for (let j = stY; j < endY; i += dy) {
            renderSymbolInCell(field[i][j], i, j, '#FF0000');
        }
    }
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

function resetClickHandler () {
    console.log('reset!');
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
