const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const RED = "#FF0000";

const container = document.getElementById('fieldWrapper');
let currentStepSymbol = CROSS;
let isPlayable = true;
let stepsCount = 0;

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
    if (!isPlayable) return;
    var cell = findCell(row, col);
    if (cell.textContent === EMPTY){
        renderSymbolInCell(currentStepSymbol, row, col)
        if (isAllCellsInColumnHaveSameContent(col))
        {
            for (let i = 0; i < 3; i++)
            {
                renderSymbolInCell(cell.textContent, i, col, RED);
                isPlayable = false;
            }
            return;
        } else if (isAllCellsInRowHaveSameContent(row))
        {
            for (let i = 0; i < 3; i++)
            {
                renderSymbolInCell(cell.textContent, row, i, RED);
                isPlayable = false;
            }
            return;
        } else if (isAllCellsInMainDiagonalHaveSameContent())
        {
            for (let i = 0; i < 3; i++)
            {
                renderSymbolInCell(cell.textContent, i, i, RED);
                isPlayable = false;
            }
            return;
        } else if (isAllCellsInNotMainDiagonalHaveSameContent())
        {
            for (let i = 0; i < 3; i++)
            {
                renderSymbolInCell(cell.textContent, i, 2 - i, RED);
                isPlayable = false;
            }
            return;
        }
    }
    stepsCount++;
    if (stepsCount == 9){
        alert("Победила дружба");
    }
    if (currentStepSymbol === CROSS)
        currentStepSymbol = ZERO;
    else
        currentStepSymbol = CROSS;
}

function printWinner()
{
    if (!isPlayable) {
        alert(currentStepSymbol);
        return true;
    }
    return false;
}

function isAllCellsInColumnHaveSameContent(col)
{
    let cell = findCell(0, col);
    for (let i = 1; i < 3; i++) {
        columnCell = findCell(i, col);
        if (!(columnCell.textContent == cell.textContent))
            return false;
    }
    return true;
}

function isAllCellsInMainDiagonalHaveSameContent()
{
    let cell = findCell(0, 0);
    if (cell.textContent == EMPTY) return false;
    for (let i = 1; i < 3; i++) {
        columnCell = findCell(i, i);
        if (!(columnCell.textContent == cell.textContent))
            return false;
    }
    return true;
}

function isAllCellsInNotMainDiagonalHaveSameContent()
{
    let cell = findCell(0, 2);
    if (cell.textContent == EMPTY) return false;
    for (let i = 1; i < 3; i++) {
        columnCell = findCell(i, 2 - i);
        if (!(columnCell.textContent == cell.textContent))
            return false;
    }
    return true;
}

function isAllCellsInRowHaveSameContent(row)
{
    let cell = findCell(row, 0);
    for (let i = 1; i < 3; i++) {
        columnCell = findCell(row, i);
        if (!(columnCell.textContent == cell.textContent))
            return false;
    }
    return true;
}

function checkLine(row){
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
    isPlayable = true;
    stepsCount = 0;
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
