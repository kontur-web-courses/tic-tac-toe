const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let grid = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
]

let step = 0;
const STEPS = [CROSS, ZERO];

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

function isVictory() {
    let combs = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let comb of combs) {
        if (
            grid[Math.floor(comb[0] / 3)][comb[0] % 3] === grid[Math.floor(comb[1] / 3)][comb[1] % 3] &&
            grid[Math.floor(comb[1] / 3)][comb[1] % 3] === grid[Math.floor(comb[2] / 3)][comb[2] % 3] &&
            grid[Math.floor(comb[0] / 3)][comb[0] % 3] !== EMPTY
        ) {
            return true;
        }
    }
    return false;
}


function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);

    if (grid[row][col] === EMPTY) {
        step++;
        let symbol = STEPS[step % 2];
        grid[row][col] = symbol;
        renderSymbolInCell(symbol, row, col);
        let res = isVictory()
        if (step === 9 && res === false) {
            alert('Победила дружба!');
        }
        if (isVictory()) {
            alert(`${symbol} победил!`)
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
    console.log('reset!');
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
