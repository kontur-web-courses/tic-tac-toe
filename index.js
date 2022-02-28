const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const container = document.getElementById('fieldWrapper');

let grid = [];
let isZeroNow = true;

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        grid.push([]);
        for (let j = 0; j < dimension; j++) {
            grid[i].push(EMPTY);
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
    console.log(grid);
}

function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);
    let symbol = isZeroNow ? ZERO : CROSS;
    if (grid[row][col] === EMPTY) {
        renderSymbolInCell(symbol, row, col);
        grid[row][col] = symbol;
        isZeroNow = !isZeroNow;
        let winner = findWinner();
        if (winner !== undefined) {
            alert(winner);
        }
    }
}

function findWinner() {
    for(let row = 0; row < grid.length; row++) {
        let zeroCount = 0;
        let crossCount = 0;
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === ZERO) zeroCount++;
            if (grid[row][col] === CROSS) crossCount++;
        }
        if (zeroCount === grid.length)
            return ZERO;
        if (crossCount === grid.length)
            return CROSS;
    }

    for (let col = 0; col < grid.length; col++) {
        let zeroCount = 0;
        let crossCount = 0;
        for (let row = 0; row < grid.length; row++) {
            if (grid[row][col] === ZERO) zeroCount++;
            if (grid[row][col] === CROSS) crossCount++;
        }
        if (zeroCount === grid.length)
            return ZERO;
        if (crossCount === grid.length)
            return CROSS;
    }
    let zeroCount = 0;
    let crossCount = 0;
    for (let row = 0; row < grid.length; row++) {
        if (grid[row][row] === ZERO) zeroCount++;
        if (grid[row][row] === CROSS) crossCount++;
    }
    if (zeroCount === grid.length)
        return ZERO;
    if (crossCount === grid.length)
        return CROSS;

    zeroCount = 0;
    crossCount = 0;
    for (let row = 0; row < grid.length; row++) {
        if (grid[row][grid.length - 1 - row] === ZERO) zeroCount++;
        if (grid[row][grid.length - 1 - row] === CROSS) crossCount++;
    }
    if (zeroCount === grid.length)
        return ZERO;
    if (crossCount === grid.length)
        return CROSS;

    let isDraw = true;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (isDraw && grid[row][col] === EMPTY) isDraw = false;
        }
    }
    if (isDraw) {
        return "Победила дружба";
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
