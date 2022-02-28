const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const dimension = 3;

const container = document.getElementById('fieldWrapper');
let isZeroTurn = false;
let field = []
let turnCount = 0;

startGame();
addResetListener();

function startGame () {
    renderGrid(dimension);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++){
        field.push(new Array(dimension).fill(0))
    }

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

    if (field[row][col] !== 0){
        return;
    }
    renderSymbolInCell(isZeroTurn ? ZERO : CROSS, row, col)
    isZeroTurn = !isZeroTurn;
    field[row][col] = isZeroTurn ? 2 : 1;
    turnCount++;
    let possibleWinner = checkIsWinnerExist()
    if (possibleWinner !== 0){
        alert(`Победили: ${possibleWinner === 2 ? 'крестики' : 'нолики'}`);
        return;
    }
    if (turnCount === 9)
        alert('Победила дружба');
    
    console.log(`Clicked on cell: ${row}, ${col}`);
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function checkIsWinnerExist(){
    for (let i = 0; i < dimension; i++){
        let check1 = checkIsWinnerInLine(i, false);
        let check2 = checkIsWinnerInLine(i, true);
        if(check1 !== 0)
            return check1;
        if(check2 !== 0)
            return check2;
    }
    return 0;
}

function checkIsWinnerInLine(lineNumber, isVertical){
    let arrayToCheck;
    if (isVertical){
        arrayToCheck = [];
        for (let i = 0; i < dimension; i++){
            arrayToCheck.push(field[i][lineNumber]);
        }
    } else {
        arrayToCheck = field[lineNumber];
    }
    return checkIsArrayElementsWinLine(arrayToCheck);
}

function checkIsArrayElementsWinLine(array){
    let first = array[0];
    for (let a of array)
        if (a !== first || first === 0)
            return 0;
    return first;
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
