const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let gameField;
let counter;
let hasWinner;

startGame();
addResetListener();

function initGameField(dimension) {
    gameField = [];
    counter = 0;
    hasWinner = false;
    for (let i = 0; i < dimension; i++) {
        gameField[i] = new Array(dimension);
        for (let j = 0; j < dimension; j++) {
            gameField[i][j] = EMPTY;
        }
    }
    console.log(gameField, 'initialized field');
}

function startGame (dimension = 3) {
    let dim = Number(prompt("Введите ширину поля"));
    initGameField(dim);
    renderGrid(dim);
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

function makeStringFixed(symbol, length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += symbol;
    }
    return result;
}

function isFieldFull () {
    let dimension = gameField.length;
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            if (gameField[i][j] === EMPTY) return false;
        }
    }
    return true;
}

function paintCell (row, col, color) {
    const targetCell = findCell(row, col);
    targetCell.style.color = color;
}

function isWinnerVertical (symbol) {
    let checkString = '';
    let dimension = gameField.length;
    let winnerStreak = symbol === CROSS ? makeStringFixed(CROSS, dimension) : makeStringFixed(ZERO, dimension);
    for (let j = 0; j < dimension; j++) {
        checkString = '';
        for (let i = 0; i < dimension; i++) {
            checkString += gameField[i][j];
        }
        if (checkString === winnerStreak) {
            for (let i = 0; i < dimension; i++) {
                paintCell(i, j, '#ff0000');
            }
            return true;
        }
    }
    return false;
}

function isWinnerHorizontal (symbol) {
    let checkString = '';
    let dimension = gameField.length;
    let winnerStreak = symbol === CROSS ? makeStringFixed(CROSS, dimension) : makeStringFixed(ZERO, dimension);
    for (let i = 0; i < dimension; i++) {
        checkString = '';
        for (let j = 0; j < dimension; j++) {
            checkString += gameField[i][j];
        }
        if (checkString === winnerStreak) {
            for (let j = 0; j < dimension; j++) {
                paintCell(i, j, '#ff0000');
            }
            return true;
        }
    }
    return false;
}

function isWinnerDiagonal (symbol) {
    let checkStringMain = '';
    let checkStringSide = '';
    let dimension = gameField.length;
    let winnerStreak = symbol === CROSS ? makeStringFixed(CROSS, dimension) : makeStringFixed(ZERO, dimension);
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            if (i === j) {
                checkStringMain += gameField[i][j];
                checkStringSide += gameField[i][dimension - j - 1];
            }
        }
    }
    if (checkStringMain === winnerStreak) {
        for (let i = 0; i < dimension; i++) {
            paintCell(i, i, '#ff0000');
        }
        return true;
    }
    else if (checkStringSide === winnerStreak) {
        for (let i = 0; i < dimension; i++) {
            paintCell(i, dimension - i - 1, '#ff0000');
        }
        return true;
    }
    else return false;
}

function isWinner (symbol) {
    return isWinnerDiagonal(symbol) || isWinnerVertical(symbol) || isWinnerHorizontal(symbol);
}

function getRandomInRange(max) {
    return Math.round(Math.random() * 10000000000) % max;
}

function computerMove () {
    let row = 0;
    let col = 0;
    let dimension = gameField.length;
    let flag = true;
    while (flag) {
        row = getRandomInRange(dimension);
        col = getRandomInRange(dimension);
        if (gameField[row][col] === EMPTY) {
            flag = false
        }
    }
    gameField[row][col] = ZERO;
    renderSymbolInCell(ZERO, row, col);
    console.log(`Computer put ZERO on cell: ${row}, ${col}`);
    if (isWinner(ZERO)) {
        alert(`Победили ${ZERO}`);
        hasWinner = true;
    }
    else if (isFieldFull()) {
        alert('Победила дружба');
    }
}

function cellClickHandler (row, col) {
    if (hasWinner) return;
    if (gameField[row][col] !== EMPTY) {
        console.log(`Cell [${row},${col}] is already marked`)
        return;
    }
    let symbol = CROSS;
    //counter++;
    gameField[row][col] = symbol;
    renderSymbolInCell(symbol, row, col);
    //console.log(`Clicked on cell: ${row}, ${col}, ${symbol}`);
    console.log(`Player put CROSS on cell: ${row}, ${col}`);
    if (isWinner(symbol)) {
        alert(`Победили ${symbol}`);
        hasWinner = true;
    }
    else if (isFieldFull()) {
        alert('Победила дружба');
    }
    else {
        setTimeout(computerMove, 500);
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
