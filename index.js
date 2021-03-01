const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let FIELD = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
];
let QUEUE = 1;
const FIELD_SIZE = 3;
let IS_END = false;

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

function cellClickHandler (row, col) {
    if (FIELD[row][col] === EMPTY && !IS_END) {
        if (QUEUE % 2 === 1){
            FIELD[row][col] = CROSS;
            renderSymbolInCell(CROSS, row, col);
        } else {
            FIELD[row][col] = ZERO;
            renderSymbolInCell(ZERO, row, col);
        }
        QUEUE++;
        checkWinner(row, col);
    }

    if (QUEUE === FIELD_SIZE * FIELD_SIZE + 1) {
        IS_END = true;
        alert('Победила дружба');
    }

    console.log(`Clicked on cell: ${row}, ${col}`);
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
    FIELD = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]];
    QUEUE = 1;
    IS_END = false;

    for (let i = 0; i < FIELD_SIZE; i++) {
        for (let j = 0; j < FIELD_SIZE; j++) {
            renderSymbolInCell(EMPTY, i, j);
        }
    }
    console.log('reset!');
}

function checkWinner (row, col) {
    let line = [];
    for (let i = 0; i < FIELD_SIZE; i++) {
        line.push([FIELD[row][i], row, i]);
    }
    checkLine(line);
    checkColumn(col);
    if (row === col || row === FIELD_SIZE - col - 1) {
        checkDiagonal();
    }
}


function checkLine(line) {
    let allInLine = true;
    const first = line[0][0];
    for (let el of line) {
        if (el[0] !== first) {
            allInLine = false;
        }
    }

    if (allInLine) {

        for (let el of line) {
            renderSymbolInCell(el[0], el[1], el[2], color = "red");
        }

        if (first === CROSS) {
            IS_END = true;
            alert('CROSS');
        }

        if (first === ZERO) {
            IS_END = true;
            alert('ZERO');
        }
    }
}

function checkColumn(col) {
    let column = [];
    for (let i = 0; i < FIELD_SIZE; i++) {
        column.push([FIELD[i][col], i, col]);
    }

    checkLine(column);
}

function checkDiagonal() {
    let mainDia = [];
    let secondaryDia = [];
    for (let i = 0; i < FIELD_SIZE; i++) {
        mainDia.push([FIELD[i][i], i, i]);
        secondaryDia.push([FIELD[i][FIELD_SIZE - i - 1], i, FIELD_SIZE - i - 1]);
    }

    checkLine(mainDia);
    checkLine(secondaryDia);
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
