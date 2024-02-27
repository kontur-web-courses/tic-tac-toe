const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const dimension = 3;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();


// -------- Board methods ---------
function createBoard(){
    return {
        currentMove: CROSS,
        board: []
    };
}

function setEmptyBoard(board){
    board.board = []
    for (let i = 0; i < dimension; i++) {
        let arr = []
        for (let j = 0; j < dimension; j++) {
            arr.push(EMPTY)
        }
        board.board.push(arr)
    }
}

function nextCurrentMove(board){
    if (board.currentMove === ZERO){
        board.currentMove = CROSS
    } else{
        board.currentMove = ZERO
    }
}

function haveMoves(board){
   for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            if (board.board[i][j] === EMPTY){
                return true;
            }
        }
    }
   return false;
}

// ---------- Board Methods End -------

function startGame () {
    let board = createBoard()
    createBoard(board);
    setEmptyBoard(board);
    renderGrid(dimension, board);
}

function renderGrid (dimension, board) {
    container.innerHTML = '';
    console.log(board)


    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = board.board[i][j];
            cell.addEventListener('click', () => cellClickHandler(i, j, board));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}



function cellClickHandler (row, col, board) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if(board.board[row][col] === EMPTY){
        board.board[row][col] = board.currentMove;
        renderSymbolInCell(board.currentMove, row, col);
        nextCurrentMove(board)
    }
    if (!haveMoves(board)){
        alert("Победила дружба!")
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
    for (let row = 0; row < dimension; row++) {
        for (let column = 0; column < 3; column++) {
            renderSymbolInCell(EMPTY, row, column);
        }
    }
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
