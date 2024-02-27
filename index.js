const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const boardTemplate = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
];
let board = boardTemplate;

const container = document.getElementById('fieldWrapper');

let turn = 0, currentPlayer = CROSS;
let gameOver = false;

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

function checkTie(){
    return board.every(row => row.every(cell => cell !== EMPTY));
}

function cellClickHandler (row, col) {
    if (!gameOver) {
        console.log(`Clicked on cell: ${row}, ${col}`);
        if (board[row][col] !== EMPTY) {
            return null;
        } else if (turn % 2 === 0) {
            renderSymbolInCell(currentPlayer, row, col);
            board[row][col] = currentPlayer;
        } else {
            renderSymbolInCell(currentPlayer, row, col);
            board[row][col] = currentPlayer;
        }
        turn++;

        if (checkWinner(row, col)) {
            alert(`Игрок ${currentPlayer} победил!`);
            gameOver = true;
            return;
        }

        if (checkTie()) {
            alert('Победила Дружба');
        }

        currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
    }
}

function checkWinner(row, col) {
    const symbol = board[row][col];

    let rowWin = true;
    let colWin = true;
    for (let i = 0; i < 3; i++) {
        if (board[row][i] !== symbol) {
            rowWin = false;
        }
        if (board[i][col] !== symbol) {
            colWin = false;
        }
    }
    if (rowWin || colWin) {
        return true;
    }

    if (row === col || row + col === 2) {
        let diag1Win = true;
        let diag2Win = true;
        for (let i = 0; i < 3; i++) {
            if (board[i][i] !== symbol) {
                diag1Win = false;
            }
            if (board[i][2 - i] !== symbol) {
                diag2Win = false;
            }
        }
        if (diag1Win || diag2Win) {
            return true;
        }
    }
    return false;
}

function makeAIMove(board) {
    const emptyCells = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === '') {
                emptyCells.push({ row: i, col: j });
            }
        }
    }

    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomCell.row][randomCell.col] = 'O';
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
    turn = 0;
    board = boardTemplate;
    renderGrid(3);
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
