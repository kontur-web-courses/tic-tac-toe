const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let firstPlayer = true;
let gameField = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
];
let countEmptyCells = 9;
let gameOver = false;

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
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
    if (gameOver){
        return;
    }

    if (countEmptyCells === 1){
        alert("Победила дружба!");
    }

    if (gameField[row][col] === EMPTY) {
        if (firstPlayer) {
            renderSymbolInCell(ZERO, row, col);
            gameField[row][col] = ZERO;
        } else {
            renderSymbolInCell(CROSS, row, col);
            gameField[row][col] = CROSS;
        }
        firstPlayer = !firstPlayer;
        countEmptyCells--;
    }

    let winner = checkWinner();
    if (winner !== EMPTY){
        alert(`Победил вот он: ${winner}!`)
        gameOver = true;
    }

    console.log(`Clicked on cell: ${row}, ${col}`);
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkWinner(){
    for (let i = 0; i < 3; i++){
        if ((gameField[i][0] === gameField[i][1] && gameField[i][1] === gameField[i][2]) &&
            (EMPTY !== gameField[i][1] && gameField[i][1] !== EMPTY)){
            renderSymbolInCell(gameField[i][1], i, 0, "red")
            renderSymbolInCell(gameField[i][1], i, 1, "red")
            renderSymbolInCell(gameField[i][1], i, 2, "red")
            return gameField[i][1];
        }
        if ((gameField[0][i] === gameField[1][i] && gameField[1][i] === gameField[2][i]) &&
            (EMPTY !== gameField[1][i] && gameField[1][i] !== EMPTY)){
            renderSymbolInCell(gameField[0][i], 0, i, "red")
            renderSymbolInCell(gameField[1][i], 1, i, "red")
            renderSymbolInCell(gameField[2][i], 2, i, "red")
            return gameField[1][i];
        }
    }
    if ((gameField[2][0] === gameField[1][1] && gameField[1][1] === gameField[0][2]) &&
        (EMPTY !== gameField[1][1])){
        renderSymbolInCell(gameField[1][1], 1, 1, "red")
        renderSymbolInCell(gameField[2][0], 2, 0, "red")
        renderSymbolInCell(gameField[0][2], 0, 2, "red")
        return gameField[1][1];
    }

    if (gameField[0][0] === gameField[1][1] && gameField[1][1] === gameField[2][2] &&
        (EMPTY !== gameField[1][1])){
        renderSymbolInCell(gameField[1][1], 1, 1, "red")
        renderSymbolInCell(gameField[0][0], 0, 0, "red")
        renderSymbolInCell(gameField[2][2], 2, 2, "red")
        return gameField[1][1];
    }
    return EMPTY;
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
    gameOver = false;
    firstPlayer = true;
    countEmptyCells = 9;
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            gameField[i][j] = EMPTY;
        }
    }
    renderGrid(3);
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
