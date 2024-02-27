const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const DIMENSION = 3;

const container = document.getElementById('fieldWrapper');

let grid;
let currSymbol = CROSS;
let stepsCount = DIMENSION * DIMENSION;
let winner = EMPTY


startGame();
addResetListener();

function startGame () {
    createGrid()
    renderGrid();
}

function createGrid () {
    grid = [];
    for (let i = 0; i < DIMENSION; i++) {
        grid[i] = [];
        for (let j = 0; j < DIMENSION; j++) {
            grid[i][j] = EMPTY;
        }
    }
}

function renderGrid () {
    container.innerHTML = '';

    for (let i = 0; i < DIMENSION; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < DIMENSION; j++) {
            const cell = document.createElement('td');
            cell.textContent = grid[i][j];
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    
    console.log(`Clicked on cell: ${row}, ${col}`);

    if (grid[row][col] != EMPTY) {
        return;
    }

    renderSymbol(row, col);

    stepsCount -= 1;

    checkWinner();
}

function renderSymbol(row, col) {
    renderSymbolInCell(currSymbol, row, col);
    grid[row][col] = currSymbol;

    switch (currSymbol) {
        case ZERO:
            currSymbol = CROSS;
            break;
        case CROSS:
            currSymbol = ZERO;
            break;
    }
}

function checkWinner() {
    for (let i = 0; i < DIMENSION; i++) {
        if (grid[i][0] == grid[i][1] == grid[i][2] && grid[i][0] != EMPTY) {
            winner = grid[i][0];
            return;
        }
            
        if (grid[0][i] == grid[1][i] == grid[2][i] && grid[0][i] != EMPTY) {
            winner = grid[0][i]
            return;
        }
    }

    if (grid[0][0] == grid[1][1] == grid[2][2] && grid[0][0] != EMPTY) {
        winner = grid[0][0]
        return;
    }

    if (grid[0][2] == grid[1][1] == grid[2][0] && grid[0][0] != EMPTY) {
        winner = grid[0][0]
        return;
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
