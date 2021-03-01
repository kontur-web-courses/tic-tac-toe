const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const dimension = 3;
const grid = [];

let movesLeft;
let isWin;
let isCross;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    isWin = 0;
    movesLeft = dimension * dimension;
    isCross = 1;
    initGrid(dimension);
    renderGrid(dimension);
}

function initGrid (dimension) {
    grid.length = 0;
    for (let i = 0; i < dimension; i++) {
        grid.push([]);
        for (let j = 0; j < dimension; j++) {
            grid[i].push(EMPTY);
        }
    }
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
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (!isWin && grid[row][col] === EMPTY) {
        const current = isCross ? CROSS : ZERO;
        renderSymbolInCell(current, row, col);
        grid[row][col] = current;
        movesLeft -= 1;
        isCross = !isCross;
        if (checkWinner(row, col)) {
            isWin = 1;
            alert(`Победа ${current}`);
        } else if (movesLeft === 0) {
            alert("Победила дружба!");
        }
        if (current === CROSS) {
            doRandomMove();
        }
        return true;
    }
    return false;
}

function checkWinner (row, col) {
    const current = grid[row][col];
    const red = '#ff5c5c';
    for (let i = 0; i < dimension; i++) {
        if (grid[row][i] !== current) {
            break;
        }
        if (i === dimension - 1) {
            for (let j = 0; j < dimension; j++) {
                renderSymbolInCell(current, row, j, red);
            }
            return true;
        }
    }
    for (let i = 0; i < dimension; i++) {
        if (grid[i][col] !== current) {
            break;
        }
        if (i === dimension - 1) {
            for (let j = 0; j < dimension; j++) {
                renderSymbolInCell(current, j, col, red);
            }
            return true;
        }
    }
    if (row === col) {
        for (let i = 0; i < dimension; i++) {
            if (grid[i][i] !== current) {
                break;
            }
            if (i === dimension - 1) {
                for (let j = 0; j < dimension; j++) {
                    renderSymbolInCell(current, j, j, red);
                }
                return true;
            }
        }
    }
    if (row === dimension - 1 - col) {
        for (let i = 0; i < dimension; i++) {
            if (grid[i][dimension - 1 - i] !== current) {
                break;
            }
            if (i === dimension - 1) {
                for (let j = 0; j < dimension; j++) {
                    renderSymbolInCell(current, j, dimension - 1 - j, red);
                }
                return true;
            }
        }
    }
    return false;
}

function doRandomMove() {
    if (!isWin) {
        while (!cellClickHandler(Math.floor(Math.random() * dimension), Math.floor(Math.random() * dimension))) {}
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
    startGame();
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
