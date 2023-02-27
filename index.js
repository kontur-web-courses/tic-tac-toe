const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let board = [];
let currentSymbol = CROSS;
let currentDimension = 0;
let moveCounter = 0;

startGame();
addResetListener();

function startGame() {
    renderGrid(3);
}

function renderGrid(dimension) {
    container.innerHTML = '';
    currentDimension = dimension;

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        board[i] = []
        for (let j = 0; j < dimension; j++) {
            board[i][j] = EMPTY
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    // Пиши код тут

    if (board[row][col] === EMPTY) {
        board[row][col] = getCurrentSymbol()
        moveCounter++;
    }
    console.log(board);
    renderSymbolInCell(board[row][col], row, col)
    console.log(`Clicked on cell: ${row}, ${col}`);


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
    let result = isVictory()
    if (result){
        console.log(result)
        for (const r in result){
            renderSymbolInCell(board[r[0]][r[1]],r[0], r[1], 'red');
        }
    }
    if (moveCounter === currentDimension * currentDimension && !isVictory()) {
        alert("Победила дружба");
    }
}

function isVictory() {
    let a = checkVictoryHorizontal(board);
    let b = CheckVertical(board);
    let c = CheckDiagWin(board);

    return a || b || c;
}

function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function CheckVertical(board){
    let results = checkVictoryHorizontal(transpose(board));
    let final_results = []
    for (const ans of results){
        final_results.push([ans[1], ans[0]]);
    }
    return final_results;
}

function checkVictoryHorizontal(board) {
    for (let i = 0; i < currentDimension; i++) {
        let counter = 1;
        let prevSymbol = board[i][0];
        let winCells = [[i, 0]]
        for (let j = 1; j < currentDimension; j++) {
            if (board[i][j] === prevSymbol && board[i][j] !== EMPTY) {
                counter++;
                winCells.push([i,j])
            } else {
                prevSymbol = board[i][j];
                winCells = [[i ,j]]
            }
        }
        if (counter >= 3) {
            alert(`Победитель ${prevSymbol}`);
            return winCells;
        }
    }
    return [];
}

function CheckDiagWinMini(board) {
    let combos = [[0, 4, 8], [2, 4, 6]];
    let board1array = board.flat(1);
    for (const combo of combos) {
        if (board1array[combo[0]] === board1array[combo[1]]
            && board1array[combo[1]] === board1array[combo[2]]
            && board1array[combo[0]] !== EMPTY) {
            alert(`${board1array[combo[0]]}`)
            return combo;
        }
    }
    return [];
}

function CheckDiagWin(board) {
    for (let i = 0; i < currentDimension - 2; i++) {
        for (let j = 0; j < currentDimension - 2; j++) {
            let arr = [[board[i][j], board[i][j + 1], board[i][j + 2]],
                [board[i + 1][j], board[i + 1][j + 1], board[i + 1][j + 2]],
                [board[i + 2][j], board[i + 2][j + 1], board[i + 2][j + 2]]];
            let result = CheckDiagWinMini(arr);
            if (!result) {
                let final_res = []
                let tmp_arr = arr.flat(1)
                for (let i of result){
                    final_res.push(tmp_arr[i])
                }
                return final_res
            }
        }
    }
    return [];
}

function getCurrentSymbol() {
    if (currentSymbol === CROSS) {
        currentSymbol = ZERO
        return currentSymbol
    }
    currentSymbol = CROSS
    return currentSymbol
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

function resetClickHandler () {
    for (let arr of board){
        for(let cell of arr){
            cell = EMPTY
        }
    }
    for (let i = 0; i < currentDimension; i++){
        for (let j = 0; j < currentDimension; j++){
            renderSymbolInCell(EMPTY, i, j)
        }
    }
    console.log('reset!');
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
