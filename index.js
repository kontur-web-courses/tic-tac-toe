const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
const GameDimension = 5;
const field = createEmptyField(GameDimension);
let currentSymbol = ZERO;
let isGameOver = false;

startGame();
addResetListener();

function createEmptyField(dimension) {
    const field = [];
    for (let i =  0; i < dimension; i++) {
        const row = new Array(dimension).fill(EMPTY);
        field.push(row);
    }
    return field;
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

function checkRowState(row, symbol) {
    return field[row].every(it => it === symbol);
}

function checkColState(col, symbol) {
    for (const row of field) {
        if (row[col] !== symbol)
            return false;
    }
    return true;
}

function checkMainDiag(symbol) {
    for (let i = 0; i < GameDimension; i++) {
        if (field[i][i] !== symbol)
            return false;
    }
    return true;
}

function checkSideDiag(symbol) {
    for (let i = 0; i < GameDimension; i++) {
        if (field[i][GameDimension - 1 - i] !== symbol)
            return false;
    }
    return true;
}

function checkGameState(currentSymbol) {
    const currentSymbolRus = currentSymbol === ZERO ? 'нолик' : 'крестик';
    for (let i = 0; i < GameDimension; i++) {
        if (checkColState(i, currentSymbol)) {
            alert(`Выиграл ${currentSymbolRus}!`);
            for (let j = 0; j < GameDimension; j++) {
                renderSymbolInCell(currentSymbol, j, i, '#ff0000');
            }
            isGameOver = true;
        } else if (checkRowState(i, currentSymbol)) {
            alert(`Выиграл ${currentSymbolRus}!`);
            for (let j = 0; j < GameDimension; j++) {
                renderSymbolInCell(currentSymbol, i, j, '#ff0000');
            }
            isGameOver = true;
        }
    }
    if (checkMainDiag(currentSymbol)) {
        alert(`Выиграл ${currentSymbolRus}!`);
        for (let i = 0; i < GameDimension; i++) {
            renderSymbolInCell(currentSymbol, i, i, '#ff0000');
        }
        isGameOver = true;
    }
    if (checkSideDiag(currentSymbol)) {
        alert(`Выиграл ${currentSymbolRus}!`);
        for (let i = 0; i < GameDimension; i++) {
            renderSymbolInCell(currentSymbol, i, GameDimension - 1 - i, '#ff0000');
        }
        isGameOver = true;
    }
    if (getIndexesOfSymbol(EMPTY).length === 0) {
        alert("Победила дружба");
    }
}

function getIndexesOfSymbol(symbol) {
    let currentIndex = 0;
    const symbolIndexes = [];

    for (const row of field) {
        for (const element of row) {
            if (element === symbol) {
                symbolIndexes.push(currentIndex);
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
