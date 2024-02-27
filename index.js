const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const xo = [ZERO, CROSS];
let curr_step = 1;
let map = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
let isEnd = false;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    isEnd = false;
    renderGrid(3);
    curr_step = 1;
    map = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
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
    if (map[row][col] !== EMPTY || isEnd)
        return;
    console.log(`Clicked on cell: ${row}, ${col}`);

    if (curr_step >= 3 * 3) {
        alert(`Победила дружба`);
        isEnd = true;
        return;
    }

    const curr_symbol = xo[curr_step % 2];
    renderSymbolInCell(curr_symbol, row, col);
    map[row][col] = curr_symbol;
    curr_step++;
    checkWinner(curr_symbol);

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkDiagonalWinner(diagonal) {
    let diag = [];
    for (let i = 0; i < map.length; i++) {
        diag[i] = diagonal ? map[i][i] : map[map.length - i - 1][i];
    }
    return diag.every(element => element === diag[0] && element !== EMPTY);
}

function checkWinner(cell){
    const isWinRow = map.some(row => row.every(element => element === row[0] && element !== EMPTY));
    let isWinCol = false;
    for (let j = 0; j < map.length; j++) {
        let col = [];
        for (let i = 0; i < map.length; i++) {
            col[i] = [map[i][j], [i, j]];
        }
        isWinCol = col.every(element => element === col[0] && element !== EMPTY);
        if (isWinCol) {
            break;
        }

    }

    const isWinDiag1 = checkDiagonalWinner(false);
    const isWinDiag2 = checkDiagonalWinner(true);

    if (isWinRow || isWinCol || isWinDiag1 || isWinDiag2){
        alert(`Победил ${cell}!`)
        isEnd = true;
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
    startGame();
    console.log(`reset!, ${curr_step}`);
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
