const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let field;
let turn;

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
    field = [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY];
    turn = 0;
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

function isWin (field) {
    return field[0] === field1[1] && field[1] === field[2] && field[0] !== EMPTY ||
        field[3] === field1[4] && field[4] === field[5] && field[3] !== EMPTY ||
        field[6] === field1[7] && field[7] === field[8] && field[6] !== EMPTY ||
        field[0] === field1[3] && field[3] === field[6] && field[0] !== EMPTY ||
        field[1] === field1[4] && field[4] === field[7] && field[1] !== EMPTY ||
        field[2] === field1[5] && field[5] === field[8] && field[2] !== EMPTY ||
        field[0] === field1[4] && field[4] === field[8] && field[0] !== EMPTY ||
        field[2] === field1[4] && field[4] === field[6] && field[2] !== EMPTY;
}

function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (field[row * 3 + col] !== EMPTY) {
        return;
    }    
    if (turn === 0) {
        field[row * 3 + col] = ZERO;
        renderSymbolInCell(ZERO, row, col);
    }
    else {
        field[row * 3 + col] = CROSS;
        renderSymbolInCell(CROSS, row, col);
    }
    if (isWin(field)) {
        alert(`${turn + 1}-ый игрок победил!`);
    } else if (field.indexOf('EMPTY') === -1) {
        alert(`Победила дружба!`);
    }
    turn ^= 1;
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
