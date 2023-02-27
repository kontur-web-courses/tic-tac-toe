const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let currentPlayer = CROSS;
let gameTable = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
];

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

function paintRow(i, color = '#ff0000') {
    for (let j = 0; j < 3; j++) {
        renderSymbolInCell(currentPlayer, i, j, color);
    }
}

function paintCol(i, color = '#ff0000') {
    for (let j = 0; j < 3; j++) {
        renderSymbolInCell(currentPlayer, j, i, color);
    }
}

function paintDiag(i, color = '#ff0000') {
    for (let j = 0; j < 3; j++) {
        renderSymbolInCell(currentPlayer, j, i === 0 ? j : 2 - j, color);
    }
}

function checkWin() {
    const rows = gameTable;
    const cols = [[], [], []];
    const diags = [[], []];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            cols[i][j] = gameTable[j][i];
            if (i === j) {
                diags[0][i] = gameTable[i][j];
            }
            if (i + j === 2) {
                diags[1][i] = gameTable[i][j];
            }
        }
    }

    for (let i = 0; i < 3; i++) {
        if (rows[i].every(cell => cell === currentPlayer)) {
            paintRow(i);
            return true;
        }
        if (cols[i].every(cell => cell === currentPlayer)) {
            paintCol(i);
            return true;
        }

    }
    for (let i = 0; i < 2; i++) {
        if (diags[i].every(cell => cell === currentPlayer)) {
            paintDiag(i);
            return true;
        }
    }
}

function resetGame() {
    currentPlayer = CROSS;
    gameTable = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
    ];
    renderGrid(3);
}

function checkFullness() {
    return gameTable.every(row => row.every(cell => cell !== EMPTY));
}

function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);

    if (gameTable[row][col] === EMPTY) {
        renderSymbolInCell(currentPlayer, row, col);

        gameTable[row][col] = currentPlayer;

        if (checkWin()) {
            setTimeout(() => {
                alert(`Победили ${currentPlayer}!`);
                resetGame();
            }, 0);
        } else if (checkFullness()) {
            setTimeout(() => {
                alert('Победила дружба!');
                resetGame();
            }, 0);
        } else {
            currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
            if (currentPlayer === ZERO) {
                aiTurn();
            }
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
    resetGame();
}

function aiTurn() {
    let row = Math.floor(Math.random() * 3);
    let col = Math.floor(Math.random() * 3);

    while (gameTable[row][col] !== EMPTY) {
        row = Math.floor(Math.random() * 3);
        col = Math.floor(Math.random() * 3);
    }

    cellClickHandler(row, col);
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
