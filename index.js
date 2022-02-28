const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const RED = "#FF0000";

const container = document.getElementById('fieldWrapper');
let currentStepSymbol = CROSS;

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
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);

    var cell = findCell(row, col);
    if (cell.textContent === EMPTY){
        renderSymbolInCell(currentStepSymbol, row, col)
        if (currentStepSymbol === CROSS)
            currentStepSymbol = ZERO;
        else
            currentStepSymbol = CROSS;
        for (let i = 0; i < 3; i++){
            columnCell = findCell(i, col);
            if (!columnCell.textContent == cell.textContent)
                isGood = false;
        }
    }
}

function checkLine(){
    const targetRow = container.querySelectorAll('tr')[row];
    const symbol = targetRow[0].textContent;
    for(cell of targetRow){
        if(cell.textContent !== symbol){
            return false;
        }
    }
    return true;
}

function checkMainDiagonal(){
    const symbol = findCell(0, 0);
    for(let i = 0; i<3; i++){
        if(findCell(i, i) !== symbol)
            return false;
    }
    return true;
}

function checkSecondaryDiagonal(){
    const symbol = findCell(0, 2);
    for(let i = 0; i<3; i++){
        if(findCell(0+i, 2-i) !== symbol)
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
    currentStepSymbol = CROSS;
    renderGrid(3);
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
