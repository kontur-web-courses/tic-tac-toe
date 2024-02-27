const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
startGame();
addResetListener();

let turnCounter = 0;
let board = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
];
let winner = null;

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

    if (board[row][col] === EMPTY && winner === null) {
        if (turnCounter % 2 === 1) {
            renderSymbolInCell(ZERO, row, col);
        } else {
            renderSymbolInCell(CROSS, row, col);
        }
    }

    winner = checkWinner();

    if (winner) {
        highlightWinnerCells(winner);
        container.removeEventListener('click', cellClickHandler);
        setTimeout(() => alert(`The winner is ${winner}!`), 1000);
        END_GAME = true;

    } else {
        turnCounter++;
        if (turnCounter === 9) {
            setTimeout(() => alert('Friendship wins!'), 1000);
            END_GAME = true;
        }
    }
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== EMPTY && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0];
        }
    }

    for (let i = 0; i < 3; i++) {
        if (board[0][i] !== EMPTY && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            return board[0][i];
        }
    }

    if (board[0][0] !== EMPTY && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    if (board[0][2] !== EMPTY && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }

    return null;
}

function highlightWinnerCells(winner) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === winner) {
                const cell = findCell(i, j);
                cell.style.color = 'red';
            }
        }
    }
}

function resetClickHandler() {
    turnCounter = 0;
    board = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]
    ];
    renderGrid(3);
    const cells = container.querySelectorAll('td');
    cells.forEach(cell => {
        cell.textContent = EMPTY;
        cell.style.color = '#333';
    });
    container.addEventListener('click', cellClickHandler);
}


function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    if (targetCell.textContent === EMPTY) {
        targetCell.textContent = symbol;
        board[row][col] = symbol;
    }
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
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
