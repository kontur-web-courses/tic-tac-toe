// symbol
const CROSS = "X";
const ZERO = "O";
const EMPTY = " ";

// extra game status
const DRAW = CROSS + ZERO;
const NOT_FINISHED = " ";

const container = document.getElementById("fieldWrapper");
let currSymbol = undefined;
let field = undefined;
let gridSize = 3;
let cellsCount = gridSize ** 2;
let filledCellsCount = 0;
let gameStatus = NOT_FINISHED;


startGame();
addResetListener();
function addResetListener() {
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", resetClickHandler);
}

function resetClickHandler() {
    startGame();
}

function startGame() {
    gridSize = parseInt(prompt("Введите размер поля", "3")) || 3;
    gridSize = gridSize >= 3 ? gridSize : 3;
    gameStatus = NOT_FINISHED;
    cellsCount = gridSize ** 2;
    filledCellsCount = 0;
    currSymbol = CROSS;
    field = Array(gridSize).fill().map(() => Array(gridSize).fill(EMPTY));
    console.log(field);
    renderGrid(gridSize);
}

function renderGrid(dimension) {
    container.innerHTML = '';
    for (let i = 0; i < dimension; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement("td");
            cell.textContent = getSymbol(i, j);
            cell.addEventListener("click", () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function getSymbol(row, col) {
    if (row >= 0 && row < gridSize && col >= 0 && col < gridSize)
        return field[row][col];
    return EMPTY;
}

function canMakeMove(row, col) {
    return gameStatus === NOT_FINISHED && field[row][col] === EMPTY;
}

function makeMove(row, col) {
    field[row][col] = currSymbol;
    renderSymbolInCell(currSymbol, row, col);
    filledCellsCount++;
}

function updateGameStatus(gameStatus) {
    gameStatus = checkDraw(gameStatus);
    gameStatus = checkWin(gameStatus);
    return gameStatus;
}

function checkDraw(currentGameStatus) {
    return filledCellsCount >= cellsCount ? DRAW : currentGameStatus;
}

function checkWin(gameStatus) {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (field[row][col] !== currSymbol)
                continue;

            if (getSymbol(row - 1, col - 1) === currSymbol && getSymbol(row + 1, col + 1) === currSymbol) {
                colorizeWinLine(row - 1, col - 1, 1, 1);
                return currSymbol;
            }

            if (getSymbol(row - 1, col + 1) === currSymbol && getSymbol(row + 1, col - 1) === currSymbol) {
                colorizeWinLine(row - 1, col + 1, 1, -1);
                return currSymbol;
            }

            if (getSymbol(row - 1, col) === currSymbol && getSymbol(+row + 1, col) === currSymbol) {
                colorizeWinLine(row - 1, col, 1, 0);
                return currSymbol;
            }

            if (getSymbol(row, col - 1) === currSymbol && getSymbol(row, col + 1) === currSymbol) {
                colorizeWinLine(row, col - 1, 0, 1);
                return currSymbol;
            }
        }
    }
    return gameStatus;
}

function colorizeWinLine(startRow, startCol, rowShift, colShift) {
    for (let i = 0; i < 3; i++)
        colorizeCell("#CD5C5C", startRow + rowShift * i, startCol + colShift * i);
}

function cellClickHandler(row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);

    if (canMakeMove(row, col)) {
        makeMove(row, col);
        gameStatus = updateGameStatus(gameStatus);
        if (gameStatus !== NOT_FINISHED)
            alert(gameStatus); //todo replace alert with changing elements in layout
        else {
            expandFieldIfNeeded();
            currSymbol = currSymbol === CROSS ? ZERO : CROSS;
        }
    }
}

function expandFieldIfNeeded() {
    if ((filledCellsCount / cellsCount).toFixed(1) < 0.5)
        return;
    gridSize++;
    cellsCount = gridSize ** 2;
    field.forEach(row => row.push(EMPTY));
    field.push(Array(gridSize).fill(EMPTY));
    renderGrid(gridSize);
}

function renderSymbolInCell(symbol, row, col) {
    const targetCell = findCell(row, col);
    targetCell.textContent = symbol;
    targetCell.style.color = '#333';
}

function colorizeCell(color, row, col) {
    const targetCell = findCell(row, col);
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
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
