const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let dimension = undefined;

const container = document.getElementById('fieldWrapper');

let field = initField(dimension); //TODO const
let turn = CROSS;
let turnsLeft = dimension * dimension;
let gameOver = false;

startGame();
addResetListener();

function initField(n) {
    const field = [];
    for (let i = -2; i < n + 2; i++) {
        let row = []
        for (let j = -2; j < n + 2; j++) {
            row[j] = ((i >= 0 && i < n && j >= 0 && j < n) ? EMPTY : undefined);
        }
        field[i] = row;

    }
    return field;
}

function startGame() {
    dimension = +prompt('Введите размер поля (e.g. 3)', '3');
    gameOver = false;
    turnsLeft = dimension * dimension;
    field = initField(dimension);
    turn = CROSS;
    renderGrid(dimension);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) { //i - row, j - column
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
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (field[row][col] !== EMPTY) return;

    field[row][col] = turn;
    turnsLeft--;

    let winningLine = tryFindWinningLine(row, col);
    if (winningLine) {
        for (let winningCell of winningLine) {
            renderSymbolInCell(turn, winningCell[0], winningCell[1], color = '#ff0000');
        }
        gameOver = true;
        if (turn === CROSS) alert('Cross win');
        else if (turn === ZERO) alert('Zero win');
    } else {
        if (turnsLeft === 0) alert('tie');
        renderSymbolInCell(turn, row, col);
        changeTurn();
    }
}

function tryFindWinningWindow(leftmostrow, leftmostcol, leftrow, leftcol, centerrow, centercol, rightrow, rightcol, rightmostrow, rightmostcol) {
    let leftmost = field[leftmostrow][leftmostcol];
    let left = field[leftrow][leftcol];
    let center = field[centerrow][centercol];
    let right = field[rightrow][rightcol];
    let rightmost = field[rightmostrow][rightmostcol];

    if (left === center) {
        if (leftmost === center) {
            return [
                [leftmostrow, leftmostcol],
                [leftrow, leftcol],
                [centerrow, centercol]
            ];
        }
        if (right === center) {
            return [
                [leftrow, leftcol],
                [centerrow, centercol],
                [rightrow, rightcol]
            ];
        }
    }
    if (right === center && rightmost === center) {
        return [
            [centerrow, centercol],
            [rightrow, rightcol],
            [rightmostrow, rightmostcol]
        ];
    }
    return false;
}

function tryFindWinningLine(row, col) {
    let hor = tryFindWinningWindow(row, col - 2, row, col - 1, row, col, row, col + 1, row, col + 2);
    if (hor) return hor;

    let vert = tryFindWinningWindow(row - 2, col, row - 1, col, row, col, row + 1, col, row + 2, col);
    if (vert) return vert;

    let mainDiag = tryFindWinningWindow(row - 2, col - 2, row - 1, col - 1, row, col, row + 1, col + 1, row + 2, col + 2);
    if (mainDiag) return mainDiag;

    let sideDiag = tryFindWinningWindow(row - 2, col + 2, row - 1, col + 1, row, col, row + 1, col - 1, row + 2, col - 2);
    if (sideDiag) return sideDiag;

    return false;
}

function changeTurn() {
    turn = (turn === CROSS) ? ZERO : CROSS;
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
    startGame()
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