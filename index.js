const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let field;
let rows;
let cols;
let mainDiag;
let antiDiag;
let xTurn;
let endState;

let dim;

startGame();
addResetListener();

function startGame () {
    dim = Number(prompt("Enter dimension", 3));
    field = [];
    for (let i = 0; i < dim; i++)
        field.push(new Array(dim).fill(EMPTY));
    rows = new Array(dim).fill(0);
    cols = new Array(dim).fill(0);
    xTurn = true;
    endState = false;
    turnCount = 0;
    mainDiag = 0;
    antiDiag = 0;
    renderGrid(dim);
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
    // Пиши код тут

    if (!endState && field[row][col] == EMPTY) {

        renderSymbolInCell(xTurn ? CROSS : ZERO, row, col);
        turnCount += 1;

        let modifier = xTurn ? 1 : -1;

        rows[row] += modifier;
        cols[col] += modifier;

        if (row == col)
            mainDiag += modifier;
        
        if (dim - 1 - row == col)
            antiDiag += modifier;
        
        if (Math.abs(rows[row]) == dim || Math.abs(cols[col]) == dim || Math.abs(mainDiag) == dim || Math.abs(antiDiag) == dim) {
            alert(`${xTurn ? "X" : "O"} won!`);
            endState = true;
            return;
        } else if (turnCount == dim ** 2) {
            alert("Friendship won!");
            endState = true;
            return;
        }

        xTurn = !xTurn;
        field[row][col] = xTurn ? CROSS : ZERO;

        console.log(`Clicked on cell: ${row}, ${col}, Values: ${rows}, ${cols}, Diags: ${mainDiag}, ${antiDiag}`);

    }


    /* Пользоваться методом для размещения символа в клетке так:
        
     */
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
    startGame()
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
