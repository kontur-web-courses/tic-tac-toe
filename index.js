const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let currentPlayer = CROSS;
let gameStarted = true;

let board = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
];


startGame();
addResetListener();

function startGame () {
    gameStarted = true;
    currentPlayer = CROSS;
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';
    board=[]
    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        board.push([])
        for (let j = 0; j < dimension; j++) {
            board[board.length-1].push(EMPTY)
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    if (!gameStarted){
        alert('fuck you, game ended');
        return;
    }
    if (board[row][col] === EMPTY) {
        const currentPlayer = getCurrentPlayer();
        board[row][col] = currentPlayer;
        renderSymbolInCell(currentPlayer, row, col);
        

        if (checkWinner()) {
            const winner = getCurrentPlayer() === CROSS ? "Крестики" : "Нолики";
            alert(`Победитель: ${winner}`);
            highlightWinningCells();
            disableClickHandlers();
        } else if (checkDraw()) {
            alert("Победила дружба");
        }
        nextTurn();
    }
}

function getCurrentPlayer() {
    return currentPlayer;
    const crosses = board.flat().filter(cell => cell === CROSS);
    const zeros = board.flat().filter(cell => cell === ZERO);
    return crosses.length === zeros.length ? CROSS : ZERO;
}

function nextTurn(){
    currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
    //alert(currentPlayer);
}

function checkWinner() {
    const lines = [
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]]
    ];

    for (let line of lines) {
        if (line.every(cell => cell === CROSS) || line.every(cell => cell === ZERO)) {
            return true;
        }
    }

    return false;
}

function checkDraw() {
    for (let row of board) {
        for (let cell of row) {
            if (cell === EMPTY) {
                return false;
            }
        }
    }
    return true;
}

function highlightWinningCells() {


}

function disableClickHandlers() {
    gameStarted = false;
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => cell.addEventListener('click', ''));
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

function resetClickHandler() {
    startGame();
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
