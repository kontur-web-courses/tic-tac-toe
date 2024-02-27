const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let isWin = false;
let currentStepQuery = 0;
let stepNumber = 0;

let field = [[null, null, null], [null, null, null], [null, null, null]]

startGame();
addResetListener();

function startGame() {
    renderGrid(3);
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
    if (!isWin) {
        if (!field[row][col]) {
            field[row][col] = 'x'
            renderSymbolInCell(CROSS, row, col);
            stepNumber++;
            basicAIStep();

        }
        stepNumber++;
        let winner = findWinner();
        if (winner) {
            alert("Победил " + field[row][col]);
            isWin = true;
            winner.forEach(element => {
                renderSymbolInCell(field[row][col], element[0], element[1], '#e60026');
            });
        }
        if (stepNumber === field.length ** 2) {
            alert("Победила дружба");
            isWin = true;
        }
    }
}

function basicAIStep() {
    let row = 0;
    let col = 0;
    while (field[row][col]) {
        row = Math.floor(Math.random() * 3);
        col = Math.floor(Math.random() * 3);
    }
    field[row][col] = '0'
    renderSymbolInCell(ZERO, row, col);
}

function getNeighbors(arr, row, col) {
    const rows = arr.length;
    const cols = arr[0].length;
    const neighbors = [];

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !(i === 0 && j === 0)) {
                neighbors.push(arr[newRow][newCol]);
            }
        }
    }

    return neighbors;
}

function findWinner() {
    if (field[0][0] === field[0][1] && field[0][1] === field[0][2] && field[0][0]) return [[0, 0], [0, 1], [0, 2]];
    if (field[1][0] === field[1][1] && field[1][1] === field[1][2] && field[1][0]) return [[1, 0], [1, 1], [1, 2]];
    if (field[2][0] === field[2][1] && field[2][1] === field[2][2] && field[2][0]) return [[2, 0], [2, 1], [2, 2]];
    if (field[0][0] === field[1][1] && field[1][1] === field[2][2] && field[0][0]) return [[0, 0], [1, 1], [2, 2]];
    if (field[2][0] === field[1][1] && field[1][1] === field[0][2] && field[2][0]) return [[2, 0], [1, 1], [0, 2]];
    if (field[0][0] === field[1][0] && field[1][0] === field[2][0] && field[0][0]) return [[0, 0], [1, 0], [2, 0]];
    if (field[0][1] === field[1][1] && field[1][1] === field[2][1] && field[0][1]) return [[0, 1], [1, 1], [2, 1]];
    if (field[0][2] === field[1][2] && field[1][2] === field[2][2] && field[0][2]) return [[0, 2], [1, 2], [2, 2]];
    return false;
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
    field = [[null, null, null], [null, null, null], [null, null, null]]
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            renderSymbolInCell(EMPTY, i, j);
        }
    }
    currentStepQuery = 0;
    isWin = false;
}


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
