const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let step = 0;
let crosses = [];
let zeros = [];
const defaultDimension = 3;
let dimension = 3;
let isWin = false;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame() {
    let input = prompt('Введите количество клеток');
    dimension = parseInt(input === '' ? defaultDimension : input);
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

    if (cell.textContent === EMPTY && !isWin) {
        if (step % 2 === 0) {
            renderSymbolInCell(CROSS, row, col);
            crosses.push([row, col]);
        } else {
            renderSymbolInCell(ZERO, row, col);
            zeros.push([row, col]);
        }

        step++;
    }

    let winner = defineWinner();

    if (winner[0] !== null) {
        alert(`WINNER - ${winner}`);

        for (let i = 0; i < winner.length; i++) {
            if (i === 0) {
                continue;
            }
            renderSymbolInCell(winner[0], winner[i][0], winner[i][1], 'FF0000');
        }

        isWin = true;
    }

    if (step === dimension * dimension) {
        alert('Поедила дружба');
    }
}

function defineWinner() {
    for (let i = 0; i < dimension; i++) {
        if (checkRowColumn(crosses, i))
            return CROSS;
        if (checkRowColumn(zeros, i))
            return ZERO;
        let row = checkRowColumn(crosses, i)
        if (row)
            return ['CROSS', row];
        let column = checkRowColumn(zeros, i)
        if (column)
            return ['ZERO', column];
    }

    if (checkDiagonals(crosses))
        return CROSS;
    if (checkDiagonals(zeros))
        return ZERO;

    let diagonal = checkDiagonals(crosses)
    if (diagonal)
        return [diagonal, 'CROSS'];
    let reverseDiagonal = checkDiagonals(zeros)
    if (reverseDiagonal)
        return ['ZERO', reverseDiagonal];
    return null;
}

function checkRowColumn(team, dim) {
    let rowCounter = 0;
    let colCounter = 0;
    let rowWinners = []
    let colWinners = []
    for (const element of team) {
        if (element[0] === dim) {
            rowWinners.push(element)
            rowCounter += 1;
        }
        if (element[1] === dim) {
            colWinners.push(element)
            colCounter += 1;
        }
        if (rowCounter === dimension) {
            return rowWinners
        }
        if (colCounter === dimension) {
            return colWinners
        }
    }
    return null
}

function checkDiagonals(team) {
    let diagonalCounter = 0;
    let reverseDiagonalCounter = 0;
    let diagonalWinner = []
    let reverseDiagonalWinner = []
    for (let element of team) {
        if (element[0] === element[1]) {
            diagonalCounter += 1
            diagonalWinner.push(element)
        }
        if (element[0] === dimension - element[1] - 1) {
            reverseDiagonalCounter += 1
            reverseDiagonalWinner.push(element)
        }
    }

    if (diagonalCounter === dimension) {
        return diagonalWinner;
    }
    if (reverseDiagonalCounter === dimension) {
        return reverseDiagonalWinner;
    }
    return null;

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
