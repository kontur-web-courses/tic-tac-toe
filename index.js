const GAME_SIZE = 3;
const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

startGame(GAME_SIZE);
addResetListener();

let lastSymbol = EMPTY;
let field = new Array(GAME_SIZE ** 2).fill(EMPTY);

function startGame (size) {
    renderGrid(size);
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

function checkDiagonal(symbol) {
    let right = true;
    let left = true;
    for (let i = 0; i < GAME_SIZE; i++) {
        const ri = GAME_SIZE * i + i;
        const li = (GAME_SIZE - 1) * (i + 1);
        right &= field[ri] === symbol;
        left &= field[li] === symbol;
    }
    return right || left;
}

function checkLanes(symbol) {

    for (let col = 0; col < GAME_SIZE; col++)
    {
        let cols = true;
        let rows = true;
        for (let row = 0; row < GAME_SIZE; row++)
        {
            const x = GAME_SIZE * col + row;
            const y = GAME_SIZE * row + col;

            rows &= field[x] === symbol;
            cols &= field[y] === symbol;
        }

        if (cols || rows) return true;
    }

    return false;
}

function checkGame(symbol) {
    if (!field.includes(EMPTY))
        alert('Friendship win');
    else if (checkDiagonal(symbol))
        alert(`${symbol} win!`);
    else if (checkLanes(symbol))
        alert(`${symbol} win!`);
}

function cellClickHandler (row, col) {
    if (field[GAME_SIZE * row + col] !== EMPTY)
        return;
    let symbol = lastSymbol === CROSS ? ZERO : CROSS;
    lastSymbol = symbol;
    field[row * GAME_SIZE + col] = symbol;
    checkGame(symbol);
    renderSymbolInCell(symbol, row, col);
    console.log(`Clicked on cell: ${row}, ${col}`);
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
    renderGrid(GAME_SIZE);
    field = new Array(GAME_SIZE ** 2).fill(EMPTY);
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