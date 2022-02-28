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

const container = document.getElementById('fieldWrapper');

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

function cellClickHandler (row, col) {
    if (crossCells[row][col] || zeroCells[row][col])
        alert();
}

function winCheck (array, row, col) {
    //let win = false;
    let winInRow = true;
    let winInCol = true;
    for (let i = 0; i < 3; i++) {
        if (!array[row][i])
            winInRow = false;
        if (!array[i][col])
            winInCol = false;
    }
    if (winInRow || winInCol || row === 1 && col !== 1 || row !== 1 && col === 1)
        return winInRow || winInCol;

    let win = true;
    if (row === col){
        for (let i = 0; i < 3; i++) {
            if (!array[i][i])
                win = false;
        }
        if (win || row !== 2)
            return win
    }

    for (let i = 0; i < 3; i++) {
        if (!array[i][i])
            return false;
    }
    return true;
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
