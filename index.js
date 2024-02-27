const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const COLOR_RED = '#ff0000';
let FIELD = [];
let NUMBER_OF_MOVES_LEFT = 9;
let FIELD_SIZE = 3;
let GAME_RESULT = EMPTY;
const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(FIELD_SIZE);
    NUMBER_OF_MOVES_LEFT = FIELD_SIZE * FIELD_SIZE;
    GAME_RESULT = EMPTY;
    fillField(FIELD_SIZE);
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

function getRandomNumber(maxPossible) {
    return Math.floor(Math.random() * maxPossible);
}

function makeRandomAIMove(symbol) {
    while (true) {
        let randomRow = getRandomNumber(FIELD_SIZE);
        let randomColumn = getRandomNumber(FIELD_SIZE);
        if (FIELD[randomRow][randomColumn] === EMPTY) {
            FIELD[randomRow][randomColumn] = symbol;
            renderSymbolInCell(symbol, randomRow, randomColumn);
            NUMBER_OF_MOVES_LEFT--;
            return;
        }
    }
}

function fillField(size){
    for (let i = 0; i < size; i++) {
        FIELD[i] = [];
        for (let j = 0; j < size; j++) {
            FIELD[i][j] = EMPTY;
        }
    }
}



function checkWinByDiag(symbol){
    let tmp = true;
        for (let i = 0; i < FIELD_SIZE; i++) {
            if (FIELD[i][i] !== symbol) {
                tmp = false;
                break;
            }
        }
        if (tmp === true) {
            getWinnerLine(0, 0, "mainD", symbol);
            return true;
        }

        for (let i = 0; i < FIELD_SIZE; i++) {
            if (FIELD[FIELD_SIZE - i - 1][i] !== symbol) {
                return false;
            }
        }
        getWinnerLine(FIELD_SIZE, 0, "NmainD", symbol)
        return true;
}

function checkWin(row, col, symbol)
{
    if (row == 0) {
        for (let i = 0; i < FIELD_SIZE; i++) {
            if (FIELD[i][col] !== symbol) {
                return false;
            }
        }
        return true;
    }
    if (col == 0) {
        for (let i = col; i < FIELD_SIZE; i++) {
            if (FIELD[row][i] !== symbol) {
                return false;
            }
        }
        return true;
    }
}

function getWinnerLine(row, col, type, symbol)
{
    if (type === "mainD") {
        //красим главную диагональ
        for (let i = 0; i < FIELD_SIZE; i++) {
            renderSymbolInCell(symbol, i, i, COLOR_RED);
        }
    } else if (type === "NmainD") {
        //красим побочную диагональ
        for (let i = 0; i < FIELD_SIZE; i++) {
            renderSymbolInCell(symbol, FIELD_SIZE - i - 1, i, COLOR_RED);
        }
        
    } else if (row === 0) { 
        // красим столбец col
        for (let i = 0; i < FIELD_SIZE; i++) {
            renderSymbolInCell(symbol, i, col, COLOR_RED);
        }
    } else {
        // красим строку row
        for (let i = 0; i < FIELD_SIZE; i++) {
            renderSymbolInCell(symbol, row, i, COLOR_RED);
        }
    }
}

function checkEndGame() {
    if (checkWinByDiag(CROSS) || checkWinByDiag(ZERO)) {
        return true;
    }
    for (let col = 0; col < FIELD_SIZE; col++) {
        if (checkWin(0, col, CROSS) || checkWin(0, col, ZERO)) {
            getWinnerLine(0, col, "", FIELD[0][col]);
            return true;
        }
    }
    for (let row = 0; row < FIELD_SIZE; row++) {
        if (checkWin(row, 0, CROSS) || checkWin(row, 0, ZERO)) {
            getWinnerLine(row, 0, "", FIELD[row][0]);
            return true;
        }
    }
    
    return false;
}

function cellClickHandler (row, col) {
    let sign = NUMBER_OF_MOVES_LEFT % 2 == 0 ? ZERO : CROSS
    if (FIELD[row][col] !== EMPTY || GAME_RESULT !== EMPTY) {
        return;
    }
    FIELD[row][col] = sign;
    renderSymbolInCell(sign, row, col);
    NUMBER_OF_MOVES_LEFT--;

    if (isDraw()) {
        alert('Победила дружба!');
        return;
    }
    if (checkEndGame()){
        alert(`Победил ${sign}`);
        GAME_RESULT = sign;
    }
    
    
    console.log(`Clicked on cell: ${row}, ${col}`);
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function isDraw() {
    return NUMBER_OF_MOVES_LEFT === 0;
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
    startGame();
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
