const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
const field = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
];
const GameDimension = 3;
const winCombinations = [
    new Set([0, 1, 2]),
    new Set([3, 4, 5]),
    new Set([6, 7, 8]),

    new Set([0, 3, 6]),
    new Set([1, 4, 7]),
    new Set([2, 5, 8]),

    new Set([0, 4, 8]),
    new Set([2, 4, 6]),
];

let currentSymbol = ZERO;
let isGameOver = false;

startGame();
addResetListener();

function setIsEquals(xs, ys) {
    return xs.size === ys.size && [...xs].every((x) => ys.has(x));
}

function startGame() {
    renderGrid(GameDimension);
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

function checkGameState(currentSymbol) {
    if (getIndexesOfSymbol(EMPTY).size === 0) {
        alert("Победила дружба");
    }

    const winState = haveGameWinState(currentSymbol);

    if (winState) {
        alert(`Выиграл ${currentSymbol === ZERO ? 'нолик' : 'крестик'}!`);
        for (const index of winState) {
            renderSymbolInCell(
                currentSymbol,
                Math.floor(index / 3),
                index % 3,
                '#ff0000'
            );
        }
        isGameOver = true;
    }
}

function haveGameWinState(symbol) {
    const indexes = getIndexesOfSymbol(symbol);

    for (const winCombination of winCombinations) {
        if (setIsEquals(winCombination, indexes)) {
            return indexes;
        }
    }

    return false;
}

function getIndexesOfSymbol(symbol) {
    let currentIndex = 0;
    const symbolIndexes = new Set();

    for (const row of field) {
        for (const element of row) {
            if (element === symbol) {
                symbolIndexes.add(currentIndex);
            }
            currentIndex++;
        }
    }

    return symbolIndexes;
}

function cellClickHandler(row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (field[row][col] === EMPTY && !isGameOver) {
        renderSymbolInCell(currentSymbol, row, col);
        field[row][col] = currentSymbol;
        checkGameState(currentSymbol);
        currentSymbol = currentSymbol === ZERO ? CROSS : ZERO;
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
    for (let i = 0; i < GameDimension; i++) {
        for (let j = 0; j < GameDimension; j++) {
            renderSymbolInCell(EMPTY, i, j);
            field[i][j] = EMPTY;
            isGameOver = false;
        }
    }
    startGame();
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
