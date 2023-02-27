const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();
testDraw();

let board = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
let turn = CROSS;
let GameFinish = false;

function startGame () {

    board = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
    renderGrid(3);
    turn = CROSS;
    GameFinish = false;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            renderSymbolInCell(board[i][j], i, j, '#333');
        }
    }
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

function canMove() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === EMPTY) {
                return true;
            }
        }
    }

    return false;
}

function paintHorizontal(row){
    for (let i = 0; i < board[row].length; i++){
        renderSymbolInCell(board[row][i], row, i, 'red');
    }
}

function paintVertical(col){
    for (let i = 0; i < 3; i++){
        renderSymbolInCell(board[i][col], i, col, 'red');
    }
}

function paintMainDiagonal() {
    renderSymbolInCell(board[0][0], 0, 0, 'red');
    renderSymbolInCell(board[1][1], 1, 1, 'red');
    renderSymbolInCell(board[2][2], 2, 2, 'red');
}

function paintUnmainDiagonal() {
    renderSymbolInCell(board[0][2], 0, 0, 'red');
    renderSymbolInCell(board[1][1], 1, 1, 'red');
    renderSymbolInCell(board[2][0], 2, 2, 'red');
}

function checkWinner(row, col) {
    if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
        return 'row';
    }

    if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
        return 'col';
    }

    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== EMPTY) {
        return 'mainDiagonal';
    }

    if (board[0][2] === board[1][1] && board[2][0] === board[1][1] && board[2][0] !== EMPTY) {
        return 'unmainDiagonal';
    }

    return false;
}

function move (row, col) {
    if (board[row][col] !== EMPTY) {
        return false;
    }

    board[row][col] = turn;
    renderSymbolInCell(turn, row, col);
    return true;
}

function cellClickHandler (row, col) {
    // Пиши код тут
    if (GameFinish) {
        return;
    }

    let move = move();
    if (move) {
        let winnerMove = checkWinner(row, col);

        if (winnerMove !== false) {
            alert(turn);
            switch (winnerMove) {
                case 'col':
                    paintVertical(col);
                    break;
                case 'row':
                    paintVertical(row);
                    break;
                case 'mainDiagonal':
                    paintMainDiagonal();
                    break;
                case 'unmainDiagonal':
                    paintUnmainDiagonal();
                    break;
            }
        }

        if (!canMove() && winnerMove === false) {
            alert('Победила дружба');
            return;
        }
    }

    turn = turn === CROSS ? ZERO : CROSS;
    console.log(`Clicked on cell: ${row}, ${col}`);

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
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
