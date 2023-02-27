const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let field;
let filledCells;
let isCrossStep;
let gameFinished;

startGame();
addResetListener();

function startGame() {
    field = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]
    filledCells = 0;
    isCrossStep = true;
    gameFinished = false;
    renderGrid(3);
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
    if (field[row][col] !== ' ' || gameFinished) return;

    filledCells++;

    let symbol = (isCrossStep) ? CROSS : ZERO;
    field[row][col] = symbol

    renderSymbolInCell(symbol, row, col, '#333');

    if (filledCells > 4) {
        if (checkForWinner(symbol, row, col)) {
            alert(`Победили ${isCrossStep ? "крестики" : "нолики"}.`);
            gameFinished = true;
        } else if (filledCells === field.length ** 2) {
            alert('Победила дружба!');
            gameFinished = true;
        }
    }
    isCrossStep = !isCrossStep;
}

function checkForWinner(symbol, x, y) {
    let col = 0;
    let row = 0;
    let diag = 0;
    let rdiag = 0;
    let n = field.length
    for (let i = 0; i < n; i++) {
        if (field[x][i] === symbol) col++;
        if (field[i][y] === symbol) row++;
        if (field[i][i] === symbol) diag++;
        if (field[i][n - i + 1] === symbol) rdiag++;
    }
    console.log(n, row, col, diag, rdiag);
    if (row === n) {
        console.log("Зашли")
        for (let i = 0; i < n; i++) {
            console.log(i, y);
            findCell(i, y).style.color = '#F00';
        }
    }
    else if (col === n) {
        for (let i = 0; i < n; i++) {
            console.log(x, i);
            findCell(x, i).style.color = '#F00';
        }
    } else if (diag === n)
        for (let i = 0; i < n; i++)
            findCell(i, i).style.color = '#F00';
    else if (rdiag === n)
        for (let i = 0; i < n; i++)
            findCell(i, n - i + 1).style.color = '#F00';

    return (row === n || col === n || diag === n || rdiag === n);
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
