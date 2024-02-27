const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let Player = 1;
const dimension = 3;

const container = document.getElementById('fieldWrapper');
let gameBoard = [];

startGame();
addResetListener();

function startGame() {
    gameBoard = initializeBoard(dimension);
    renderGrid(dimension);
}

function initializeBoard(dimension) {
    const board = [];
    for (let i = 0; i < dimension; i++) {
        const row = [];
        for (let j = 0; j < dimension; j++) {
            row.push(EMPTY);
        }
        board.push(row);
    }
    return board;
}

function renderGrid() {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = gameBoard[i][j];
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    if (gameBoard[row][col] === EMPTY) {
        const symbol = Player === 1 ? ZERO : CROSS;
        renderSymbolInCell(symbol, row, col);
        gameBoard[row][col] = symbol;
        if (isWinnerOnBoard(dimension))
            alert(`Победил игрок ${Player}`);
        Player = Player === 1 ? 2 : 1;
    }
}

function isWinnerOnBoard(dimension) {
    function isWinnerOnBoard(board) {
        const dimension = board.length;
        let rows, cols, diag, antiDiag;

        for (let i = 0; i < dimension; i++) {
            rows = true;
            cols = true;
            for (let j = 0; j < dimension - 1; j++) {
                if (board[i][j] === '' || board[i][j] !== board[i][j + 1]) {
                    rows = false;
                }
                if (board[j][i] === '' || board[j][i] !== board[j + 1][i]) {
                    cols = false;
                }
            }
            if (rows || cols)
                return true;
        }

        diag = true;
        for (let i = 0; i < dimension - 1; i++) {
            if (board[i][i] === '' || board[i][i] !== board[i + 1][i + 1]) {
                diag = false;
                break;
            }
        }

        antiDiag = true;
        for (let i = 0; i < dimension - 1; i++) {
            if (board[i][dimension - i - 1] === '' || board[i][dimension - i - 1] !== board[i + 1][dimension - i - 2]) {
                antiDiag = false;
                break;
            }
        }

        return diag || antiDiag;
    }

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
    Player = 1;
    gameBoard = initializeBoard(3);
    renderGrid(3);
}

/* Test Function */
/* Win for the first player */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Draw */
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
