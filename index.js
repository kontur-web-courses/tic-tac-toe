const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let is_zero = false;

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

const field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let is_win = false;

function cellClickHandler(row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (!isFill(row, col)){
        if(is_zero) {
            renderSymbolInCell(ZERO, row, col);
            is_zero = false;
        } else {
            renderSymbolInCell(CROSS, row, col);
            is_zero = true;
        }
    if (is_win) {
        return;
    }
    if (is_zero) {
        renderSymbolInCell(ZERO, row, col);
        is_zero = false;
    } else {
        renderSymbolInCell(CROSS, row, col);
        is_zero = true;
    }
    field[row][col] = is_zero ? 2 : 1;
    let current_turn = is_zero ? 2 : 1;
    if (field[row][0] === current_turn && field[row][1] === current_turn && field[row][2] === current_turn) {
        alert(is_zero ? CROSS : ZERO);
        is_win = true;
        return;
    }
    if (field[0][col] === current_turn && field[1][col] === current_turn && field[2][col] === current_turn) {
        alert(is_zero ? CROSS : ZERO);
        is_win = true;
        return;
    }
}

function onDiag(row, col) {
    return row === col || row === 0 && (col === 0 || col === 2) || row === 3 && (col === 0 || col === 2);
}

function isFill (row, col) {
    const targetCell = findCell(row, col);

    return targetCell.textContent !== EMPTY
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
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
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            field[i][j] = 0;
            is_win = false;
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
