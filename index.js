const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let currentPlayer = ZERO;
let isGameEnd = false;
let field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
let winPosition = [];

const container = document.getElementById('fieldWrapper');

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

function haveFiner (sign) {
    let result = true;
    for (let i = 0; i < 3; i++) {
        winPosition = [];
        result = true;
        for (let j = 0; j < 3; j++) {
            winPosition.push([i, j]);
            result = result && (field[i][j] === sign);
        }
        if (result) {
            return true;
        }
    }

    for (let j = 0; j < 3; j++) {
        result = true;
        winPosition = [];
        for (let i = 0; i < 3; i++) {
            winPosition.push([i, j]);
            result = result && (field[i][j] === sign);
        }
        if (result) {
            return true;
        }
    }

    result = true;
    winPosition = [];
    for (let j = 0; j < 3; j++) {
        winPosition.push([j, j]);
        result = result && (field[j][j] === sign);
    }
    if (result) {
        return true;
    }

    result = true;
    winPosition = [];
    for (let j = 0; j < 3; j++) {
        winPosition.push([2 - j, j]);
        result = result && (field[2 - j][j] === sign);
    }
    if (result) {
        return true;
    }
    return false;
}

function haveFreeSteps () {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
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
    }
    if (haveFiner(CROSS)){
        isGameEnd = true;
        alert("Победил второй игрок");
        for (const pair of winPosition) {
            renderSymbolInCell(currentPlayer, pair[0], pair[1], isWin=true);
        }
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
    field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
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
