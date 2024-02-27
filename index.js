const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let dimension = 3;
const redColor = '#FF0000'
const AI = true;

const container = document.getElementById('fieldWrapper');


askDimension();
startGame();


// -------- Board methods ---------
function createBoard(){
    return {
        currentMove: CROSS,
        board: [],
        end: false,
    };
}

function setEmptyBoard(board){
    board.board = []
    board.currentMove = CROSS;
    board.end = false;
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

function checkWin(board){
    // Диагональ

    for (let i = 0; i < dimension; i++) {
        let sum = '';
        let pairs = [];
        for (let j = 0; j < dimension; j++) {
            sum += board.board[i][j];
            pairs.push([i, j]);
        }
        let checkLine = checkLineWin(sum);
        if (checkLine !== undefined){
            return [checkLine, pairs];
        }
    }

    // Горизонталь
    for (let i = 0; i < dimension; i++) {
        let sum = '';
        let pairs = [];
        for (let j = 0; j < dimension; j++) {
            sum += board.board[j][i];
            pairs.push([j, i]);
        }
        let checkLine = checkLineWin(sum);
        if (checkLine !== undefined){
            return [checkLine, pairs];
        }
    }

    // Диагональ (0,0) -> (d, d)
    let sum = '';
    let pairs = [];
    for (let i = 0; i < dimension; i++) {
        sum += board.board[i][i];
        pairs.push([i, i]);
    }
    let checkLine = checkLineWin(sum);
    if (checkLine !== undefined){
        return [checkLine, pairs];
    }


    // Диагональ (d, 0) -> (0, d)
    pairs = [];
    sum = '';
    for (let i = 0; i < dimension; i++) {
        sum += board.board[i][dimension - 1 - i];
        pairs.push([i][dimension - 1 - i]);
    }
    checkLine = checkLineWin(sum);
    if (checkLine !== undefined){
        return [checkLine, pairs];
    }
}

function checkLineWin(sum){
    if (sum === CROSS.repeat(dimension))
        return CROSS;
    if (sum === ZERO.repeat(dimension))
        return ZERO;
}

function getEmptyCells(board){
    let answer = [];
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            if (board.board[i][j] === EMPTY){
                answer.push([i, j]);
            }
        }
    }
    return answer;
}

// ---------- Board Methods End -------

function askDimension(){
    let a = prompt('Введи размер поля');
    let num =  Number(a);
    if (!isNaN(num)){
        dimension = num;
    }else {
        askDimension();
    }
}

function startGame () {
    let board = createBoard()
    createBoard(board);
    setEmptyBoard(board);
    addResetListener(board);
    renderGrid(dimension, board);
}


function renderGrid (dimension, board) {
    container.innerHTML = '';

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
    if(board.board[row][col] === EMPTY && !board.end){
        board.board[row][col] = board.currentMove;
        renderSymbolInCell(board.currentMove, row, col);
        nextCurrentMove(board)
    }
    if(board.currentMove === ZERO && AI){
        let emptyCells = getEmptyCells(board);
        console.log(emptyCells.length)
        if (emptyCells.length > 0){
            let clickCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
            cellClickHandler(clickCell[0], clickCell[1], board);
            return
        }
    }
    if (!board.end){
        let win = checkWin(board);
        if(win !== undefined){
            for (let winElementElement of win[1]) {
                renderSymbolInCell(win[0], winElementElement[0], winElementElement[1], redColor);
            }
            alert(`Победил ${win[0]}`)
            board.end = true;
        }else if (!haveMoves(board)){
            alert("Победила дружба!")
            board.end = true;
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

function addResetListener (board) {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click',() => resetClickHandler(board));
}

function resetClickHandler (board) {
    console.log('reset!');
    for (let row = 0; row < dimension; row++) {
        for (let column = 0; column < dimension; column++) {
            renderSymbolInCell(EMPTY, row, column);
        }
    }
    setEmptyBoard(board);
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
