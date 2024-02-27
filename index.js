const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
const FIELD_SIZE = 3;
const FIELD = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
let turn = CROSS;
let turnsLeft = FIELD_SIZE * FIELD_SIZE;
let gameOver = false;

startGame();
addResetListener();


function startGame () {
    renderGrid(FIELD_SIZE);
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
    if(FIELD[row][col] !== EMPTY || gameOver)
    {
        return
    }
    FIELD[row][col] = turn;
    renderSymbolInCell(turn, row, col);
    turn = turn === CROSS ? ZERO : CROSS;
    turnsLeft--;
    checkForWinner();
    if (turnsLeft === 0) {
        setTimeout(() => { alert('Победила дружба!'); }, 20);
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
}

function checkRow(rowIndex)
{
    const type = FIELD[rowIndex][0];
    if(type === EMPTY){
        return false;
    }
    for(const item of FIELD[rowIndex]){
        if(type !== item){
            return false;
        }
    }
    return type;
}

function checkCol(colIndex)
{
    const type = FIELD[0][colIndex];
    if(type === EMPTY){
        return false;
    }
    for(let i = 0; i < FIELD_SIZE; i++){
        let item = FIELD[i][colIndex];
        if(type !== item){
            return false;
        }
    }
    return type;
}

function checkDiag(diagNum){
    let dir = diagNum === 0 ? 1 : -1;
    let currentCol = diagNum === 0 ? 0 : FIELD_SIZE - 1;
    const type = FIELD[0][currentCol];

    if(type === EMPTY){
        return false;
    }

    for(let i = 0; i < FIELD_SIZE; i++) {
        if(FIELD[i][currentCol] !== type) {
            return false;
        }

        currentCol += dir;
    }

    return type;
}

function checkForWinner() {
    let possibleWinner = checkDiag(0) || checkDiag(1);
    for(let i = 0; i < FIELD_SIZE; i++) {
        possibleWinner ||= (checkCol(i) || checkRow(i));
        if (possibleWinner) {
            alert(`Победил ${possibleWinner}`);
            gameOver = true;
            return;
        }
    }
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
