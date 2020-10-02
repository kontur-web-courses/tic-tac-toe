// symbol
const CROSS = "X";
const ZERO = "O";
const EMPTY = " ";

// game status
const CROSS_WIN = CROSS;
const ZERO_WIN = ZERO;
const DRAW = CROSS + ZERO;
const NOT_FINISHED = " ";

const container = document.getElementById("fieldWrapper");
let currentSymbol = undefined;
let field = undefined;
let gridSize = 3;
let cellsCount = gridSize ** 2;
let filledCellsCount = 0;
let gameStatus = NOT_FINISHED;

startGame();
addResetListener();

//testWin();

function startGame() {
    gridSize = parseInt(prompt("Введите размер поля", "3")) || 3;
    gameStatus = NOT_FINISHED;
    cellsCount = gridSize ** 2;
    filledCellsCount = 0;
    currentSymbol = CROSS;
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
            cell.textContent = EMPTY;
            cell.addEventListener("click", () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function canMakeMove(row, col) {
    return gameStatus === NOT_FINISHED && field[row][col] === EMPTY;
}

function makeMove(row, col) {
    field[row][col] = currentSymbol;
    renderSymbolInCell(currentSymbol, row, col);
    currentSymbol = currentSymbol === CROSS ? ZERO : CROSS;
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
    gameStatus = checkLines(gameStatus, true);
    gameStatus = checkLines(gameStatus, false);
    gameStatus = checkDiagonal(gameStatus, true);
    gameStatus = checkDiagonal(gameStatus, false);
    return gameStatus;
}

function colorizeWinLine(index, isHorizontal) {
    for (let j = 0; j < gridSize; j++) {
        if (isHorizontal)
            colorizeCell("#CD5C5C", index, j);
        else
            colorizeCell("#CD5C5C", j, index);
    }
}

function colorizeWinDiagonal(isMainDiagonal) {
    for (let i = 0; i < gridSize; i++)
        colorizeCell("#CD5C5C", i, isMainDiagonal ? i : gridSize - 1 - i);
}

function checkLines(gameStatus, isHorizontal) {
    for (let i = 0; i < gridSize; i++) {
        let symbol = isHorizontal ? field[i][0] : field[0][i];
        if (symbol === EMPTY) continue;
        let isWin = true;
        for (let j = 1; j < gridSize && isWin; j++) {
            let nextSymbol = isHorizontal ? field[i][j] : field[j][i];
            if (nextSymbol !== symbol) isWin = false;
        }
        if (isWin) {
            colorizeWinLine(i, isHorizontal);
            return symbol;
        }
    }
    return gameStatus;
}

function checkDiagonal(gameStatus, isMainDiagonal) {
    let symbol = isMainDiagonal ? field[0][0] : field[0][gridSize - 1];
    if (symbol === EMPTY) return gameStatus;
    let isWin = true;
    for (let i = 1; i < gridSize && isWin; i++) {
        let nextSymbol = isMainDiagonal ? field[i][i] : field[i][gridSize - 1 - i];
        if (nextSymbol !== symbol) isWin = false;
    }
    if (isWin)
        colorizeWinDiagonal(isMainDiagonal);
    return isWin ? symbol : gameStatus;
}

function cellClickHandler(row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (canMakeMove(row, col)) {
        makeMove(row, col);
        gameStatus = updateGameStatus(gameStatus);
        if (gameStatus !== NOT_FINISHED)
            alert(gameStatus); //todo replace alert with changing elements in layout
    }
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

function addResetListener() {
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", resetClickHandler);
}

function resetClickHandler() {
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
