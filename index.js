const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let grid = []
const gridSize = 3
const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(gridSize);
    initGrid(gridSize);
}

function isThereFreeMoves(){
    for (let i = 0; i < gridSize; i++){
        for (let j = 0; j < gridSize; j++){
            if (grid[i][j] === EMPTY) return true
        }
    }
    return false
}

function initGrid(){
    for (let i = 0; i < gridSize; i++){
        grid.push([])
        for (let j = 0; j < gridSize; j++){
            grid[i].push(EMPTY)
        }
    }
}

function resetGrid(){
    initGrid(grid.length)
}

function isThereASymbol(row, col){
    return grid[row][col] !== EMPTY
}

function isThereWinner(){
    return isThereColumnWinner() || isThereRowWinner() || isThereDiagonalWinner();
}

function isThereColumnWinner(){
    for (let i = 0; i < gridSize; i++){
        let flag = true
        for (let j = 1; j < gridSize; j++){
            if (grid[i][j] !== grid[i][j - 1]) {
                flag = false;
                break;
            }
        }
    }
    return flag
}

function isThereRowWinner(){
    for (let j = 0; j < gridSize; j++){
        let flag = true
        for (let i = 1; i < gridSize; i++){
            if (grid[i][j] !== grid[i - 1][j]) {
                flag = false;
                break;
            }
        }
    }
    return flag
}

function isThereDiagonalWinner(){
    flag = true
    for (let j = 1; j < gridSize; j++){
        if(grid[j - 1][j - 1] !== grid[j][j]) {
            flag = false;
            break;
        }
    }
    if (flag) return true;
    flag = true;
    for (let j = 1; j < gridSize; j++){
        if(grid[j - 1][gridSize - j + 1] !== grid[j][gridSize - j]) {
            flag = false;
            break;
        }
    }

    return flag;
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

isZero = false
function cellClickHandler (row, col) {
    console.log('Clicked on cell: ${row}, ${col}');
    if (isThereASymbol(row, col)) return;
    if (!isZero)
    {
        grid[row][col] = 'X';
        isZero = true;
    }
    else
    {
        grid[row][col] = '0';
        isZero = false;
    }
    if (isThereWinner) alert(isZero ? 'Крестик' : 'Нолик');
    if (!isThereFreeMoves) alert('Победила дружба');
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
    resetGrid()
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

testWin()
