// symbol
const CROSS = "X";  // player symbol
const ZERO = "O";  // ai symbol
const EMPTY = " ";

// extra game status
const DRAW = CROSS + ZERO;
const NOT_FINISHED = " ";

const WIN_CHECK_MATRIX = [
    {first_row: 0, first_col: -1, second_row: 0, second_col: 1, row_shift: 0, col_shift: 1},//'0^0' row
    {first_row: -1, first_col: 0, second_row: 1, second_col: 0, row_shift: 1, col_shift: 0},//'0^0' col
    {first_row: -1, first_col: -1, second_row: 1, second_col: 1, row_shift: 1, col_shift: 1},//'0^0' main diag
    {first_row: 1, first_col: -1, second_row: -1, second_col: 1, row_shift: -1, col_shift: 1},//'0^0' side diag
];

const AI_SMART_MOVE_MATRIX = [
    {first_row: 0, first_col: 1, second_row: 0, second_col: 2},//'^00' row
    {first_row: 0, first_col: -1, second_row: 0, second_col: 1},//'0^0' row
    {first_row: 0, first_col: -2, second_row: 0, second_col: -1},//'00^' row

    {first_row: 1, first_col: 0, second_row: 2, second_col: 0},//'^00' col
    {first_row: -1, first_col: 0, second_row: 1, second_col: 0},//'0^0' col
    {first_row: -2, first_col: 0, second_row: -1, second_col: 0},//'00^' col

    {first_row: 1, first_col: 1, second_row: 2, second_col: 2},//'^00' main diag
    {first_row: -1, first_col: -1, second_row: 1, second_col: 1},//'0^0' main diag
    {first_row: -2, first_col: -2, second_row: -1, second_col: -1},//'00^' main diag

    {first_row: -1, first_col: 1, second_row: -2, second_col: 2},//'^00' side diag
    {first_row: 1, first_col: -1, second_row: -1, second_col: 1},//'0^0' side diag
    {first_row: 2, first_col: -2, second_row: 1, second_col: -1},//'00^' side diag
];

const ALERT_TEXT = new Map([[DRAW, "Победила дружба"], [CROSS, "Победили крестики"], [ZERO, "Победили нолики"]]);

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
    return gameStatus === NOT_FINISHED && field[row][col] === EMPTY && currSymbol === CROSS;
}

function makeMove(row, col) {
    field[row][col] = currSymbol;
    renderSymbolInCell(currSymbol, row, col);
    filledCellsCount++;
}

function updateGameStatus(gameStatus) {
    gameStatus = checkDraw(gameStatus);
    gameStatus = checkWin(gameStatus);
    if (gameStatus !== NOT_FINISHED)
        alert(ALERT_TEXT.get(gameStatus));
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

            let isWin = WIN_CHECK_MATRIX.some(s => {
                    if (getSymbol(row + s.first_row, col + s.first_col) === currSymbol
                        && getSymbol(row + s.second_row, col + s.second_col) === currSymbol) {
                        colorizeWinLine(row + s.first_row, col + s.first_col, s.row_shift, s.col_shift);
                        return true;
                    }
                }
            );
            if (isWin)
                return currSymbol;
        }
    }
    return gameStatus;
}

function colorizeWinLine(startRow, startCol, rowShift, colShift) {
    for (let i = 0; i < 3; i++)
        colorizeCell("#CD5C5C", startRow + rowShift * i, startCol + colShift * i);
}

function makeRandomMoveAI() {
    let row, col;
    do {
        row = Math.floor(Math.random() * gridSize);
        col = Math.floor(Math.random() * gridSize);
    } while (field[row][col] !== EMPTY);
    makeMove(row, col);
}

function makeMoveAI() {
    let isSmartMoveMade = makeSmartMoveAI();
    if (!isSmartMoveMade)
        makeRandomMoveAI();
}

// returns true if smart move possible, returns false if not
function makeSmartMoveAI() {
    let isSmartMoveMade = false;
    for (let row = 0; row < gridSize && !isSmartMoveMade; row++) {
        for (let col = 0; col < gridSize && !isSmartMoveMade; col++) {
            if (field[row][col] !== EMPTY)
                continue;
            isSmartMoveMade = AI_SMART_MOVE_MATRIX.some(shifts => {
                    if (getSymbol(row + shifts.first_row, col + shifts.first_col) === currSymbol
                        && getSymbol(row + shifts.second_row, col + shifts.second_col) === currSymbol) {
                        makeMove(row, col);
                        return true;
                    }
                }
            );
        }
    }
    return isSmartMoveMade;
}

function changeCurrentSymbol() {
    currSymbol = currSymbol === CROSS ? ZERO : CROSS;
}

function cellClickHandler(row, col) {
    if (!canMakeMove(row, col))
        return;
    makeMove(row, col);
    gameStatus = updateGameStatus(gameStatus);
    if (gameStatus !== NOT_FINISHED)
        return;
    changeCurrentSymbol();
    expandFieldIfNeeded();
    makeMoveAI();
    gameStatus = updateGameStatus(gameStatus);
    if (gameStatus !== NOT_FINISHED)
        return;
    changeCurrentSymbol();
    expandFieldIfNeeded();
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