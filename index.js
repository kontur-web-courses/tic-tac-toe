const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let desk = null;
let turnNumber = 0;
let size = 3;
let isEnd = false;

startGame();
addResetListener();
addResizeArray();

function startGame() {
    renderGrid(size);
    turnNumber = 0;
    isEnd = false;
    createDesk()
}

function createDesk() {
    desk = new Array(size);
    for (let i = 0; i < size; i++) {
        desk[i] = new Array(size);
    }
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

function cellClickHandler(row, col) {

    if (desk[row][col] !== undefined) {
        return;
    }

    if (isEnd === true)
        return;

    if (turnNumber % 2 === 0) {
        renderSymbolInCell(ZERO, row, col);
        desk[row][col] = ZERO;
        turnNumber += 1;
    } else {
        renderSymbolInCell(CROSS, row, col);
        desk[row][col] = CROSS;
        turnNumber += 1;
    }

    console.log(`Clicked on cell: ${row}, ${col}`);
    console.log(desk);

    if (checkWin(row, col)) {
        if (turnNumber % 2 === 0)
            {
                alert('Победил первый игрок')
            }
        else {
            alert('Победил второй игрок')
        }
        isEnd = true;
    }
    if (turnNumber === size * size)
        alert('Победила дружба');
}

function checkWin(row, col) {
    let winHorizontal = checkWinHorizontal(row, col)
    let winVertical = checkWinVertical(row, col)
    let winDiagonalFirst = checkWinDiagonalFirst(row, col)
    let winDiagonalSecond = checkWinDiagonalSecond(row, col)

    if (winHorizontal) {
        for (let i = 0; i < size; i++) {
            renderSymbolInCell(desk[row][i], row, i, '#ff0000')
        }
    }

    if (winVertical) {
        for (let i = 0; i < size; i++) {
            renderSymbolInCell(desk[i][col], i, col, '#ff0000')
        }
    }

    if (winDiagonalFirst) {
        for (let i = 0; i < size; i++) {
            renderSymbolInCell(desk[i][i], i, i, '#ff0000')
        }
    }
    if (winDiagonalSecond) {
        let maxSize = size - 1;
        for (let i = 0; i < size; i++) {
            renderSymbolInCell(desk[maxSize][i], maxSize, i, '#ff0000')
            maxSize -= 1;
        }
    }

    return winHorizontal || winVertical || winDiagonalFirst || winDiagonalSecond
}

function checkWinHorizontal(row, col) {
    for (let i = 0; i < size; i++) {
        if (desk[row][i] !== desk[row][col])
            return false;
    }
    return true;
}

function checkWinVertical(row, col) {
    for (let i = 0; i < size; i++) {
        if (desk[i][col] !== desk[row][col])
            return false;
    }
    return true;
}

function checkWinDiagonalFirst(row, col) {
    for (let i = 0; i < size; i++) {
        if (desk[i][i] !== desk[row][col])
            return false;
    }
    return true;
}

function checkWinDiagonalSecond(row, col) {
    let maxSize = size - 1;
    for (let i = 0; i < size; i++) {
        if (desk[maxSize][i] !== desk[row][col])
            return false;
        maxSize -= 1;
    }
    return true;
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

function addResizeArray() {
    const resizeButton = document.getElementById('resize');
    resizeButton.addEventListener('click', resizeClickHandler);
}

function resetClickHandler() {
    console.log('reset!');
    startGame(size);
}

function resizeClickHandler() {
    size = parseInt(prompt("Введите размер поля:", [3]));
    startGame(size);
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
