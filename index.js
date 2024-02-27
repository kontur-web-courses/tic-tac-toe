const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';


let step = 0;
const STEPS = [CROSS, ZERO];
let isRunning = true;
const dimension = 4;


let grid = []
for (let j = 0; j < dimension; j++) {
    let line = [];
    for (let i = 0; i < dimension;i++){
        line.push(EMPTY);
    }
    grid.push(line);
}



let verticalLineWins = false;
let horizontalLineWins = false;
let rightDiagonalWins = false;
let leftDiagonalWins = false;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(dimension);
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

function isVictory(row, col) {
    const symbol = grid[row][col];

    verticalLineWins = true;
    horizontalLineWins = true;
    rightDiagonalWins = true;
    leftDiagonalWins = true;

    for (let i = 0; i < dimension; i++) {
        if (grid[row][i] !== symbol) {
            verticalLineWins = false;
        }
        if (grid[i][col] !== symbol) {
            horizontalLineWins = false;
        }
        if (grid[i][i] !== symbol) {
            leftDiagonalWins = false;
        }
        if (grid[i][dimension - 1 - i] !== symbol) {
            rightDiagonalWins = false;
        }
    }

    return rightDiagonalWins || leftDiagonalWins || horizontalLineWins || verticalLineWins
}

function colourVictoryCombination(row, col) {
    for (let i = 0; i < dimension; i++) {
        if (verticalLineWins) {
            findCell(row, i).style.color = 'red';
        }
        if (horizontalLineWins) {
            findCell(i, col).style.color = 'red';
            horizontalLineWins = false;
        }
        if (leftDiagonalWins) {
            findCell(i, i).style.color = 'red';
        }
        if (rightDiagonalWins) {
            findCell(i, dimension - 1 - i).style.color = 'red';
        }
    }
}

function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);

    if (grid[row][col] === EMPTY && isRunning) {
        step++;
        let symbol = STEPS[step % 2];
        grid[row][col] = symbol;
        renderSymbolInCell(symbol, row, col);
        let res = isVictory(row, col)
        if (step === dimension * dimension && res === false) {
            alert('Победила дружба!');
        }
        if (res) {
            colourVictoryCombination(row, col);
            isRunning = false;
            alert(`${symbol} победил!`);
        }
    }
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
    for (let line of [0, 1, 2]) {
        for (const col of [0, 1, 2]) {
            grid[line][col] = EMPTY;
            renderSymbolInCell(EMPTY, line, col);
        }
    }
    isRunning = true;
    step = 0;
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
