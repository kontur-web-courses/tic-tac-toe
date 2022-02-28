const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let game = [];
let isCross = true;
let win = false;

startGame();
addResetListener();

function startGame() {
    renderGrid(3);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        game.push([]);
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            game[i].push(EMPTY);
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {

    if (win) {
        return;
    }

    if (game[row][col] != EMPTY) {
        console.log("the cell is taken");
        return;
    }

    if (isCross) {
        game[row][col] = CROSS;
        renderSymbolInCell(CROSS, row, col);
        isCross = false;
    } else {
        game[row][col] = ZERO;
        renderSymbolInCell(ZERO, row, col);
        isCross = true;
    }
    console.log(`Clicked on cell: ${row}, ${col}`);

    checkGame();

    if (noFreeCells()) {
        alert('победила дружба');
    }

}

function noFreeCells() {
    for (const row of game) {
        for (const cell of row) {
            if (cell === EMPTY) {
                return false;
            }
        }
    }
    return true;
}

function checkGame() {
    let d = game.length;
    for (let i = 0; i < d; i++) {
        if (checkColumn(i, d)) {
            alert(`Winner is ${game[i][0]}`);
            win = true;
            //покрасить
            return;
        }
        if (CheckRow(i, d)) {
            alert(`Winner is ${game[i][0]}`);
            win = true;
            //покрасить
            return;
        }
    }
    if (CheckDiag1(d)) {
        alert(`Winner is ${game[0][0]}`);
        win = true;
        //покрасить
        return;
    }
    if (CheckDiag2(d)) {
        alert(`Winner is ${game[2][0]}`);
        win = true;
        //покрасить
        return;
    }
}

function checkColumn(row, d) {
    let e = game[row][0];
    for (let i = 1; i < d; i++) {
        if (e != game[row][i]) {
            return false;
        }
    }
    return e != EMPTY;
}

function CheckRow(col, d) {
    let e = game[0][col];
    for (let i = 1; i < d; i++) {
        if (e != game[i][col]) {
            return false;
        }
    }
    return e != EMPTY;
}

function CheckDiag1(d) {
    let e = game[0][0];
    for (let i = 1; i < d; i++) {
        if (e != game[i][i]) {
            return false;
        }
    }
    return e != EMPTY;
}

function CheckDiag2(d) {
    let e = game[d][0];
    for (let i = 1; i < d; i++) {
        if (e != game[d - i][i]) {
            return false;
        }
    }
    return e != EMPTY;
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
