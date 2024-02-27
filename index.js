const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let currentPlayer = ZERO;
let isGameEnd = false;
let field = [];
let winPosition = [];
let size = 3;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function generateMatrix(n) {
    const matrix = [];
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            matrix[i][j] = EMPTY;
        }
    }
    return matrix;
}

function startGame () {
    let dimension = prompt('Введите размер поля (не меньше 1):', 3);
    while (dimension <= 0){
        dimension = prompt('Введите размер поля (не меньше 1):', 3);
    }
    size = dimension;
    field = generateMatrix(dimension);
    renderGrid(dimension);
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

function haveFiner (sign) {
    let result = true;
    for (let i = 0; i < size; i++) {
        winPosition = [];
        result = true;
        for (let j = 0; j < size; j++) {
            winPosition.push([i, j]);
            result = result && (field[i][j] === sign);
        }
        if (result) {
            return true;
        }
    }

    for (let j = 0; j < size; j++) {
        result = true;
        winPosition = [];
        for (let i = 0; i < size; i++) {
            winPosition.push([i, j]);
            result = result && (field[i][j] === sign);
        }
        if (result) {
            return true;
        }
    }

    result = true;
    winPosition = [];
    for (let j = 0; j < size; j++) {
        winPosition.push([j, j]);
        result = result && (field[j][j] === sign);
    }
    if (result) {
        return true;
    }

    result = true;
    winPosition = [];
    for (let j = 0; j < size; j++) {
        winPosition.push([size - 1 - j, j]);
        result = result && (field[size - 1 - j][j] === sign);
    }
    if (result) {
        return true;
    }
    return false;
}

function haveFreeSteps () {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (field[i][j] === EMPTY) {
                return true;
            }
        }
    }
    return false;
}

function cellClickHandler (row, col) {
    if (isGameEnd) {
        return;
    }

    if (field[row][col] === EMPTY) {
        field[row][col] = currentPlayer;
        currentPlayer = currentPlayer == ZERO ? CROSS : ZERO;
        console.log(`Clicked on cell: ${row}, ${col}`);

        renderSymbolInCell(currentPlayer, row, col);
    }

    if (haveFiner(ZERO)){
        isGameEnd = true;
        alert("Победил первый игрок");
        for (const pair of winPosition) {
            renderSymbolInCell(currentPlayer, pair[0], pair[1], isWin=true);
        }
        return;
    }
    if (haveFiner(CROSS)){
        isGameEnd = true;
        alert("Победил второй игрок");
        for (const pair of winPosition) {
            renderSymbolInCell(currentPlayer, pair[0], pair[1], isWin=true);
        }
        return;
    }

    if (!haveFreeSteps()) {
        isGameEnd = true;
        alert("Победила дружба");
    }
}

function renderSymbolInCell (symbol, row, col, isWin = false, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
    if (isWin) {
        targetCell.style.backgroundColor = 'red';
    }
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
    currentPlayer = ZERO;
    isGameEnd = false;
    winPosition = [];

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
