const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const GRID_SIZE = 3;
const grid = []
let isCrossTurn = true;
let isGameEnded = false;
let remainingFields = GRID_SIZE ** 2;
for (let i = 0; i < GRID_SIZE; ++i) {
    let col = []
    for (let j = 0; j < GRID_SIZE; ++j) {
        col.push(EMPTY)
    }
    grid.push(col);
}
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

function getWinner(grid) {
    outer: for (let i = 0; i < GRID_SIZE; ++i) {
        for (let j = 0; j < GRID_SIZE - 1; ++j) {
            if (grid[i][j] !== grid[i][j + 1] && grid[j][i] !== grid[j + 1][i]) {
                continue outer;
            }
        }
        return grid[i][i];
    }

    for (let i = 0; i < GRID_SIZE - 1; ++i) {
        if (grid[i][i] !== grid[i + 1][i + 1] && grid[i][GRID_SIZE - i - 1 !== grid[i + 1][GRID_SIZE - i - 2]])
            return EMPTY;
    }
    return grid[GRID_SIZE / 2][GRID_SIZE / 2];
}

function cellClickHandler(row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if(isGameEnded)
        return;
    let clickedSymbol = grid[row][col];
    if (clickedSymbol === EMPTY) {
        let symbol = isCrossTurn ? CROSS : ZERO;
        grid[row][col] = symbol;
        --remainingFields;
        renderSymbolInCell(symbol, row, col);
        isCrossTurn = !isCrossTurn;
    }

    if (getWinner(grid) !== EMPTY) {
        isGameEnded = true;
        let winner = isCrossTurn ? 'Cross' : 'Zero';
        alert(`${winner} won!`);
    } else {
        if (remainingFields === 0) {
            isGameEnded = true;
            alert('Победила дружба');
        }
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
    console.log('reset!');
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
