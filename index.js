const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let turn = 0;
let field = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
]

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
    let symbol = [CROSS, ZERO][turn];
    if (field[row][col] !== EMPTY){
        return;
    }
    field[row][col] = symbol;
    renderSymbolInCell(symbol, row, col);
    console.log(`Clicked on cell: ${row}, ${col}`);
    turn = (turn + 1) % 2;
    if (checkRow(row, symbol)) {
        colorRow(row);
    } else if (checkCol(col, symbol)) {
        colorCol(col);
    } else if (checkDiagonal(0, symbol)){
        colorDiagonal(0);
    } else if (checkDiagonal(1, symbol)){
        colorDiagonal(1)
    }
}

function colorRow(row) {
    for (let i = 0; i < 3; i++){
        renderSymbolInCell(field[row][i], row, i, color='#f00');
    }
}

function colorCol(col) {
    for (let i = 0; i < 3; i++){
        renderSymbolInCell(field[i][col], i, col, color='#f00');
    }
}

function colorDiagonal(diag) {
    if (diag === 0) {
        for (let i = 0; i < 3; i++){
            renderSymbolInCell(field[i][i], i, i, color='#f00');
        }
    } else if (diag === 1) {
        for (let i = 0; i < 3; i++){
            renderSymbolInCell(field[2 - i][i], 2 - i, i, color='#f00');
        }
    }
    
}

function checkRow(row, symbol) {
    return field[row][0] == symbol && field[row][1] == symbol && field[row][2] == symbol;
}

function checkCol(col, symbol) {
    return field[0][col] == symbol && field[1][col] == symbol && field[2][col] == symbol;
}

function checkDiagonal(diag, symbol) {
    return field[2*diag][0] == symbol && field[1][1] == symbol && field[2-2*diag][2] == symbol;    
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
    turn = 0;
    field = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]
    ];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            renderSymbolInCell(EMPTY, i, j);
        }
    }
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
