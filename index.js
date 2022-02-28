const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const container = document.getElementById('fieldWrapper');

let grid = [];
let isZeroNow = true;
let isWinnerFound = false;

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
    if (grid[row][col] === EMPTY && !isWinnerFound) {
        renderSymbolInCell(symbol, row, col);
        grid[row][col] = symbol;
        isZeroNow = !isZeroNow;
        let cells = findWinnerCells();
        if (cells !== undefined) {
            if (cells === null)
                alert('Победила дружба!')
            else {
                let symbol = grid[cells[0][0]][cells[0][1]];
                for (let cell of cells)
                    renderSymbolInCell(symbol, cell[0], cell[1], '#F00')
                alert(symbol);
            }
            isWinnerFound = true;
        }
    }
}

function findWinnerCells() {
    for(let row = 0; row < grid.length; row++) {
        let zeros = [];
        let crosses = [];
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === ZERO)
                zeros.push([row, col])
            if (grid[row][col] === CROSS)
                crosses.push([row, col])
        }
        if (zeros.length === grid.length)
            return zeros;
        if (crosses.length === grid.length)
            return crosses;
    }

    for (let col = 0; col < grid.length; col++) {
        let zeros = [];
        let crosses = [];
        for (let row = 0; row < grid.length; row++) {
            if (grid[row][col] === ZERO)
                zeros.push([row, col]);
            if (grid[row][col] === CROSS)
                crosses.push([row, col])
        }
        if (zeros.length === grid.length)
            return zeros;
        if (crosses.length === grid.length)
            return crosses;
    }
    let zeros = [];
    let crosses = [];
    for (let row = 0; row < grid.length; row++) {
        if (grid[row][row] === ZERO)
            zeros.push([row, row]);
        if (grid[row][row] === CROSS)
            crosses.push([row, row])
    }
    if (zeros.length === grid.length)
        return zeros;
    if (crosses.length === grid.length)
        return crosses;

    zeros = [];
    crosses = [];
    for (let row = 0; row < grid.length; row++) {
        let index = grid.length - 1 - row;
        if (grid[row][index] === ZERO)
            zeros.push([row, index]);
        if (grid[row][index] === CROSS)
            crosses.push([row, index])
    }
    if (zeros.length === grid.length)
        return zeros;
    if (crosses.length === grid.length)
        return crosses;

    let isDraw = true;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (isDraw && grid[row][col] === EMPTY) isDraw = false;
        }
    }
    if (isDraw) {
        return null;
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
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid.length; col++) {
            renderSymbolInCell(EMPTY, row, col);
            grid[row][col] = EMPTY;
        }
    }
    isWinnerFound = false;
    isZeroNow = true;
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
