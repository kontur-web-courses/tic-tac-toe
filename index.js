const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let gameField = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]
let currentPlayer = CROSS;

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
    if (gameField[row][col] === '') {
        renderSymbolInCell(currentPlayer, row, col);
        gameField[row][col] = currentPlayer;
        currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
    }
    if (!gameField.flat().includes('')) {
        alert('Победила дружба!');
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
    console.log('reset!');
}

function checkWinner(symbol) {
    for (let i = 0; i < SIZE; i++) {
        if (gameField[i].every(cell => cell === symbol)) return true; // Check rows
        if (gameField.every(row => row[i] === symbol)) return true; // Check columns
    }

    if (gameField.every((row, index) => row[index] === symbol)) return true; // Check diagonal
    if (gameField.every((row, index) => row[SIZE - 1 - index] === symbol)) return true; // Check reverse diagonal

    return false;
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
