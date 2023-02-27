const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let step = 0;
let crosses = [];
let zeros = [];
let dimension = 3;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame() {
    dimension = prompt('Введите количество клеток') ?? dimension;
    step = 0;
    renderGrid(dimension);
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
    console.log(`Clicked on cell: ${row}, ${col}`);
    let cell = findCell(row, col);

    if (cell.textContent === EMPTY) {
        if (step % 2 === 0) {
            renderSymbolInCell(CROSS, row, col);
            crosses.push([row, col])
        } else {
            renderSymbolInCell(ZERO, row, col);
            zeros.push([row, col])
        }
        step++;
    }

    let winner = defineWinner();

    if (winner !== null) {
        alert(`WINNER - ${winner}`);
    }

    if (step === dimension * dimension) {
        alert('Поедила дружба');
    }
}

function defineWinner() {
    for (let i = 0; i < dimension; i++) {
        if (checkRowColumn(crosses, i))
            return 'CROSS';
        if (checkRowColumn(zeros, i))
            return 'ZERO';
    }
    if (checkDiagonals(crosses))
        return 'CROSS';
    if (checkDiagonals(zeros))
        return 'ZERO';
    return null;
}

function checkRowColumn(team, dim) {
    let rowCounter = 0;
    let colCounter = 0;
    for (const element of team) {
        rowCounter += element[0] === dim ? 1 : 0;
        colCounter += element[1] === dim ? 1 : 0;
        if (rowCounter === dimension || colCounter === dimension) {
            return true
        }
    }
    return false
}

function checkDiagonals(team) {
    let diagonalCounter = 0;
    let reverseDiagonalCounter = 0;
    for (let element of team) {
        diagonalCounter += element[0] === element[1]
        reverseDiagonalCounter += element[0] === dimension - element[1] - 1
    }

    return diagonalCounter === dimension || reverseDiagonalCounter === dimension;

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
