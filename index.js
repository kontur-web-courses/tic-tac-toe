const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let remainingSteps = field.length * field[0].length;
let diagLength = Math.min(field.length, field[0].length)

//console.log(field);
let field = getStartField()
let currentSymbol = CROSS;
let hasWinner = false;

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function getStartField(){
    return [[EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]]
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
    console.log(`Clicked on cell: ${row}, ${col}`);

    if (field[row][col] === EMPTY && !hasWinner) {
        field[row][col] = currentSymbol;
        renderSymbolInCell(currentSymbol, row, col);
        remainingSteps--;

        if (checkWinBy(currentSymbol)) {
            alert(`Winner ${currentSymbol}`);
        } else if (remainingSteps == 0) {
            alert("Draw");
        }

        currentSymbol = currentSymbol === CROSS ? ZERO : CROSS;
    }
}

function checkWinBy(player) {
    return checkRawWinBy(player) || checkColumnWinBy(player) || checkDiagWinBy(player);
}

function checkRawWinBy(player) {
    for (let i = 0; i < field.length; i++) {
        if (checkOneRaw(player, i)) {
            return true
        }
    }

    return false;
}

function checkColumnWinBy(player) {
    for (let i = 0; i < field.length; i++) {
        if (checkOneColumn(player, i)) {
            return true
        }
    }

    return false;
}

function checkOneRaw(player, index) {
    return checkFillingByKey(field[0].length, player, (i) => field[index][i])
}

function checkOneColumn(player, index) {
    return checkFillingByKey(field.length, player, (i) => field[i][index])
}

function checkDiagWinBy(player) {
    return checkMainDiagBy(player) || checkSideDiagBy(player);    
}

function checkMainDiagBy(player) {
    for (let i = 0; i < diagLength; i++) {
        if (field[i][i] !== player)
            return false;
    }

    return true;
}

function checkSideDiagBy(player) {
    for (let i = 0; i < diagLength; i++) {
        if (field[i][diagLength - i - 1] !== player)
            return false;
    }

    return true;
}

function checkFillingByKey(count, key, elementSelector) {
    for (let i = 0; i < count; i++) {
        if (elementSelector(i) !== key)
            return false;
    }

    return true;
}

function PaintWinnerCells(winSymbol, winCells){
    for (let cell of winCells){
        renderSymbolInCell(winSymbol, cell[0], cell[1], '#FF0000')
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
    field = getStartField();
    renderGrid(3);
    currentSymbol = CROSS;
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
