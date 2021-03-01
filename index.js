const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let field;
let clickCounter = 0;
let role = CROSS;
let isGameOver = false;
let n;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(5);
}

function renderGrid (dimension) {
    n = dimension;
    container.innerHTML = '';
    field = new Array(dimension);
    for (let i = 0; i < dimension; i++) {
        field[i] = new Array(dimension);
        field[i].fill(EMPTY);
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

function sayFriendship() {
    if (clickCounter === n * n && !isGameOver)
            endGame('Победила дружба');
}

function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (field[row][col] === EMPTY && !isGameOver) {
        renderSymbolInCell(role, row, col);
        field[row][col] = role;
        role = role === CROSS ? ZERO : CROSS;
        clickCounter++;
        setTimeout(checkWinner, 200);
        setTimeout(sayFriendship, 200);
    }
}

function endGame(str){
    alert(str);
    isGameOver = true;
}

function paintWinner(indexes){
    let tds = document.getElementsByTagName("td");
    for(const index of indexes)
        tds[index[0] * n + index[1]].style.color = "#FF0000";
}

function checkWinner(){
    let mainDiagonalIndexes = [];
    let otherDiagonalIndexes = [];
    for (let i = 0; i < n; i++) {
        if (field[i][i] !== field[0][0] || field[i][i] === EMPTY)
            break;
        mainDiagonalIndexes.push([i, i]);
    }
    if (mainDiagonalIndexes.length === n){
        paintWinner(mainDiagonalIndexes);
        endGame(field[0][0]);
        return;
    }
    for (let i = 0; i < n; i++) {
        if (field[i][n - 1 - i] !== field[0][n - 1] || field[i][n - 1 - i] === EMPTY)
            break;
        otherDiagonalIndexes.push([i, n - 1 - i]);
    }
    if (otherDiagonalIndexes.length === n){
        paintWinner(otherDiagonalIndexes);
        endGame(field[0][n - 1]);
        return;
    }
    for (let i = 0; i < n; i++) {
        let rowIndexes = [];
        let colIndexes = [];
        for (let j = 0; j < n; j++) {
            if (field[i][j] !== field[i][0] || field[i][j] === EMPTY) break;
            rowIndexes.push([i, j]);
        }
        if (rowIndexes.length === n){
            paintWinner(rowIndexes);
            endGame(field[i][0]);
            return;
        }
        for (let j = 0; j < n; j++) {
            if (field[j][i] !== field[0][i] || field[j][i] === EMPTY) break;
            colIndexes.push([j, i]);
        }
        if (colIndexes.length === n){
            paintWinner(colIndexes);
            endGame(field[0][i]);
            return;
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
    clickCounter = 0;
    role = CROSS;
    isGameOver = false;
    renderGrid(n);
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
