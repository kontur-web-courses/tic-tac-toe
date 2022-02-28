const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let field = [];
let move = 0;
let symbols = [CROSS, ZERO];
let moves = 0;
let dimensions = 3;
let finished = false;
let free = []
startGame();
addResetListener();

function startGame() {
    let dim = prompt("введите размер поля")
    renderGrid(+dim);
}

function myAlert(message) {
    setTimeout(() => alert(message), 100);
}

function renderGrid(dimension) {
    finished = false;
    moves = 0;
    dimensions = dimension;
    container.innerHTML = '';
    move = 0;
    field = [];
    for (let i = 0; i < dimension; i++) {
        field.push(new Array(dimension).fill(0));
    }

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
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (finished) {
        return;
    }
    if (field[row][col] === 0) {
        renderSymbolInCell(symbols[move], row, col);
        field[row][col] = move + 1;
        moves++;
        checkWin();
        move ^= 1;
        if (finished) {
            return;
        }
        botMove();
        moves++;
        checkWin();
        move ^= 1;
    }
}

function checkWin() {
    let checkSymbol = move + 1;
    for (let i = 0; i < dimensions; i++) {
        let ans = [];
        let count = 0;
        for (let j = 0; j < dimensions; j++) {
            if (checkSymbol === field[i][j]) {
                count += 1;
                ans.push(j);
            }
        }
        if (count === dimensions) {
            for (let a of ans) {
                console.log(1);
                renderSymbolInCell(symbols[move], i, a, "#ff0000");
            }
            myAlert(`Win ${symbols[move]}`);
            finished = true;
            return;
        }
    }

    for (let i = 0; i < dimensions; i++) {
        let count = 0;
        let ans = [];
        for (let j = 0; j < dimensions; j++) {
            if (checkSymbol === field[j][i]) {
                ans.push(j);
                count += 1;
            }
        }
        if (count === dimensions) {
            for (let a of ans) {
                console.log(1);
                renderSymbolInCell(symbols[move], a, i, "#ff0000");
            }
            myAlert(`Win ${symbols[move]}`);
            finished = true;
            return;
        }
    }

    if (dimensions % 2 === 1) {
        let ans = [];
        let count = 0;
        for (let i = 0; i < dimensions; i++) {
            if (checkSymbol === field[i][i]) {
                ans.push(i);
                count += 1;
            }
        }
        if (count === dimensions) {
            for (let a of ans) {
                renderSymbolInCell(symbols[move], a, a, "#ff0000");

            }
            finished = true;
            myAlert(`Win ${symbols[move]}`);
        }
    }
    if (moves === dimensions * dimensions) {
        myAlert("Победила дружба!");
    }
}
function botMove() {
    let cell = Math.floor(Math.random() * (dimensions * dimensions - moves));
    let cur = 0;
    for (let i = 0; i < dimensions; i++) {
        for (let j = 0; j < dimensions; j++) {
            if (cell === cur && field[i][j] === 0) {
                field[i][j] = move + 1;
                console.log(field);
                renderSymbolInCell(symbols[move], i, j);
                return;
            }
            if (field[i][j] === 0) {
                cur++;
            }
        }
    }
    console.log(cell)
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
    renderGrid(dimensions);
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
