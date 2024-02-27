const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let currentTurn = CROSS;
let winner = EMPTY;

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = EMPTY;
    }
}

let field = []


function createField(dimension){
    const field = [];

    for (let i = 0; i < dimension; i++) {
        field.push([])
        for (let j = 0; j < dimension; j++) {
            field[i].push(new Point(i, j));
        }
    }

    return field;
}

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame() {
    let dimension

    do {
        dimension = parseInt(prompt('Введите размер поля', '3'));
        field = createField(dimension);
        renderGrid(dimension);
    } while (isNaN(dimension) || dimension < 3 || dimension > 10);
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
    console.log(`Clicked on cell: ${row}, ${col}`);

    const point = field[row][col];

    if (winner !== EMPTY) {
        return;
    }

    if (point.color !== EMPTY) {
        return;
    }

    point.color = currentTurn;

    renderSymbolInCell(currentTurn, row, col);

    let winnerTriple = getWinnerTriple(field);
    if (winnerTriple) {
        renderSymbols(winnerTriple[0].color, winnerTriple, '#FF0000');
        winner = currentTurn
    }

    currentTurn = currentTurn === CROSS ? ZERO : CROSS;
}

function renderSymbols(symbol, points, color) {
    for (const point of points) {
        renderSymbolInCell(symbol,  point.x, point.y, color);
    }
}

function getWinnerTriple(field) {
    let rows = field;
    let columns = getColumns(field);
    let diagonals = getDiagonals(field);
    for (const arr of rows.concat(columns).concat(diagonals)) {
        const triple = getFilledTriple(arr);
        if (triple) {
            return triple;
        }
    }
}

function getFilledTriple(arr){
    let res = [];
    for (const point of arr) {
        res.push(point);
        if (res.length !== 3) {
            continue;
        }
        if (isFilled(res)) {
            return res;
        }
        res.shift();
    }
}

function isFilled(row) {
    let symbol = row[0];
    return row.every(x => x.color === symbol.color);
}

function getDiagonals(field) {
    let diagonals = [[], []];
    for (let i = 0; i < field.length; i++) {
        diagonals[0].push(field[i][i]);
        diagonals[1].push(field[i][field.length - i - 1])
    }
    return diagonals;
}

function getColumns(field) {
    let columns = [];
    for (let j = 0; j < field.length; j++) {
        columns.push([]);
        for (let i = 0; i < field.length; i++) {
            columns[j].push(field[j][i]);
        }
    }
    return columns;
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
    console.log('reset!');
    clearField();
    currentTurn = CROSS;
    winner = EMPTY;
}

function clearField() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            field[i][j] = EMPTY;
            renderSymbolInCell(EMPTY, i, j);
        }
    }
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
