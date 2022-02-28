const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let crossCells = [
    [false, false, false],
    [false, false, false],
    [false, false, false]];
let zeroCells = [
    [false, false, false],
    [false, false, false],
    [false, false, false]];

let isCross = true;
let counter = 0;
let win = false;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';
    cellsCount = dimension * dimension;

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

function cellClickHandler (row, col) {
    if (crossCells[row][col] || zeroCells[row][col] || win) {
        return;
    }
    if (isCross) {

        renderSymbolInCell(CROSS, row, col);
    } else {
        renderSymbolInCell(ZERO, row, col);
    }
    let playerArray = isCross ? crossCells : zeroCells;
    playerArray[row][col] = true;
    isCross = !isCross;
    counter++;
    if (counter === cellsCount)
        alert('Победила дружба')

    let winCells = getWinCells(playerArray, row, col);
    if (winCells != null) {
        win = true;
        for (let cell of winCells) {
            findCell(cell[0], cell[1]).style.color = '#f00';
        }
    }
}

function getWinCells (array, row, col) {
    let winInRow = true;
    let winInCol = true;
    for (let i = 0; i < 3; i++) {
        if (!array[row][i])
            winInRow = false;
        if (!array[i][col])
            winInCol = false;
    }
    if (winInRow)
        return [[row, 0], [row, 1], [row, 2]];
    if (winInCol)
        return [[0, col], [1, col], [2, col]];
    if (row === 1 && col !== 1 || row !== 1 && col === 1)
        return null;

    let win = true;
    if (row === col){
        for (let i = 0; i < 3; i++) {
            if (!array[i][i])
                win = false;
        }
        if (win)
            return [[0, 0], [1, 1], [2, 2]];
        if (row !== 1)
            return null;
    }

    for (let i = 0; i < 3; i++) {
        if (!array[i][i])
            return null;
    }
    return [[0, 2], [1, 1], [2, 0]];
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
