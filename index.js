const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let board = [];
let currentPlayer = CROSS;
let movesLeft;
startGame();
addResetListener();

function startGame () {
    board = []
    renderGrid(3);
    movesLeft = 9;
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        board.push([]);
        for (let j = 0; j < dimension; j++) {
            board[i].push(EMPTY);
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    if (board[row][col] === EMPTY) {
        renderSymbolInCell(currentPlayer, row, col);
        board[row][col] = currentPlayer;
        --movesLeft;
        if (checkWinner()) {
            const winner = currentPlayer === CROSS ? 'Крестики' : 'Нолики';
            alert(`${winner} выиграли`);
        }
    }
    if (movesLeft === 0) {
        alert('Победила дружба');
    }
    currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === currentPlayer && board[i][1] === currentPlayer &&
            board[i][2] === currentPlayer || board[0][i] === currentPlayer &&
            board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
            return true;
        }
    }

    return board[0][0] === currentPlayer && board[1][1] === currentPlayer &&
        board[2][2] === currentPlayer || board[0][2] === currentPlayer &&
        board[1][1] === currentPlayer && board[2][0] === currentPlayer;
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
