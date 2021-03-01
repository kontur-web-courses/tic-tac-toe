const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
const dim = 3;
let field = [];
getField(dim);
let steps = 0;
let winnerCells = [];
let isWinnerExist;

function getField(dimension) {
    for (let i = 0; i < dimension; i++) {
        field[i] = []
        for (let j = 0; j < dimension; j++) {
            field[i][j] = null;
        }
    }
}

startGame();
addResetListener();

function startGame() {
    renderGrid(dim);
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
    let color;
    if (steps % 2 === 0) {
        if (field[row][col] === null && !isWinnerExist) {
            field[row][col] = 1;
            renderSymbolInCell(CROSS, row, col);
            isWinnerExist = isWinner(row, col);
            if (isWinnerExist) {
                for (const cell of winnerCells) {
                    renderSymbolInCell(CROSS, cell[0], cell[1], color = "#ff0000")
                }
                alert("Победил Cross")
            }
            steps++;
        }
    } else {
        if (field[row][col] === null && !isWinnerExist) {
            field[row][col] = 0;
            renderSymbolInCell(ZERO, row, col);
            isWinnerExist = isWinner(row, col);
            if (isWinnerExist) {
                for (const cell of winnerCells) {
                    renderSymbolInCell(ZERO, cell[0], cell[1], color = "#ff0000");
                }
                alert("Победил Zero");
            }
            steps++;
        }
    }

    if (steps === dim * dim && !isWinnerExist) {
        alert("Победила дружба");
    }
    console.log(`Clicked on cell: ${row}, ${col}`);
}

function isWinner(row, column) {
    let score = 0;

    if (checkHorizontal(score, row, column)) {
        return true;
    }
    score = 0;

    if (checkVertical(score, row, column)) {
        return true;
    }
    score = 0;

    if (checkDiagonal(score, row, column)) {
        return true;
    }
}

function checkHorizontal(score, row, column) {
    for (let i = 0; i < column; i++) {
        if (field[row][i] === field[row][column]) {
            score++;
            winnerCells.push([row, i]);
        }
    }
    for (let i = column + 1; i < field[row].length; i++) {
        if (field[row][i] === field[row][column]) {
            score++;
            winnerCells.push([row, i]);
        }
    }

    if (score === dim - 1) {
        winnerCells.push([row, column])
        return true;
    }
    winnerCells = []
}

function checkVertical(score, row, column) {
    for (let i = 0; i < row; i++) {
        if (field[i][column] === field[row][column]) {
            score++;
            winnerCells.push([i, column]);
        }
    }
    for (let i = row + 1; i < field.length; i++) {
        if (field[i][column] === field[row][column]) {
            score++;
            winnerCells.push([i, column]);
        }

    }

    if (score === dim - 1) {
        winnerCells.push([row, column])
        return true
    }
    winnerCells = []
}

function checkDiagonal(score, row, column) {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            if (i === j && field[i][j] === field[row][column]) {
                score++;
                winnerCells.push([i, j]);
            }
        }
    }
    for (let i = row + 1; i < field.length; i++) {
        for (let j = column + 1; j < field[row].length; j++) {
            if (i === j && field[i][j] === field[row][column]) {
                score++;
                winnerCells.push([i, j]);
            }
        }
    }

    if (score === dim - 1) {
        winnerCells.push([row, column])
        return true
    }
    score = 0;
    winnerCells = []

    for (let i = 0; i < row; i++) {
        for (let j = column + 1; j < field[row].length; j++) {
            if (field.length - i - 1 === j && field[i][j] === field[row][column]) {
                score++;
                winnerCells.push([i, j]);
            }
        }
    }
    for (let i = row + 1; i < field.length; i++) {
        for (let j = 0; j < field[row].length; j++) {
            if (field.length - i === j && field[i][j] === field[row][column]) {
                score++;
                winnerCells.push([i, j]);
            }
        }
    }

    if (score === dim - 1) {
        winnerCells.push([row, column])
        return true
    }
    score = 0
    winnerCells = []
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
    console.log('reset!');
    field = [[null, null, null], [null, null, null], [null, null, null]]
    steps = 0;
    winnerCells = [];
    isWinnerExist = null;
    startGame();
    addResetListener();
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
