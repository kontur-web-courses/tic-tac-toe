const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
const FIELD_SIZE = 3;
let FIELD = [];
let lastCheckRows = Array(FIELD_SIZE);
let lastCheckCols = Array(FIELD_SIZE);
let turn = CROSS;
let turnsLeft = FIELD_SIZE * FIELD_SIZE;
let gameOver = false;


startGame();
addResetListener();


function startGame () {
    resetGame();
    renderGrid(FIELD_SIZE);
}

function renderGrid(dimension) {
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

function cellClickHandler(row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (FIELD[row][col] !== EMPTY || gameOver) {
        return
    }
    FIELD[row][col] = turn;
    renderSymbolInCell(turn, row, col);
    moveToNextTurn();
    if(!gameOver){
        randomAIMove();
    }
}

function moveToNextTurn(){
    turn = turn === CROSS ? ZERO : CROSS;
    turnsLeft--;
    checkForWinner();
    if (!gameOver && turnsLeft === 0) {
        setTimeout(() => {
            alert('Победила дружба!');
        }, 20);
    }
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

function resetClickHandler() {
    console.log('reset!');
    startGame();
}

function colorCells(cellsRow, cellsColumn)
{
    for(let i = 0; i < cellsRow.length; i++) {
        let row = cellsRow[i];
        let col = cellsColumn[i];
        renderSymbolInCell(FIELD[row][col], row, col, 'red');
    }
}

function checkRow(rowIndex) {
    const type = FIELD[rowIndex][0];
    let result = true;
    if (type === EMPTY) {
        return false;
    }
    for (let i = 0;i < FIELD_SIZE; i++) {
        if (type !== FIELD[rowIndex][i]) {
            result = false;
        }
        lastCheckRows[i] = rowIndex;
        lastCheckCols[i] = i;
    }

    if(result) {
        return type;
    }

    return false;
}

function checkCol(colIndex) {
    const type = FIELD[0][colIndex];
    let result = true;
    if (type === EMPTY) {
        return false;
    }
    for (let i = 0; i < FIELD_SIZE; i++) {
        let item = FIELD[i][colIndex];
        if (type !== item) {
            result = false;
        }

        lastCheckRows[i] = i;
        lastCheckCols[i] = colIndex;
    }


    if(result) {
        return type;
    }

    return false;
}

function checkDiag(diagNum) {
    let dir = diagNum === 0 ? 1 : -1;
    let currentCol = diagNum === 0 ? 0 : FIELD_SIZE - 1;
    let result = true;
    const type = FIELD[0][currentCol];

    if (type === EMPTY) {
        return false;
    }

    for (let i = 0; i < FIELD_SIZE; i++) {
        if (FIELD[i][currentCol] !== type) {
            result = false;
        }

        lastCheckRows[i] = i;
        lastCheckCols[currentCol] = currentCol;
        currentCol += dir;
    }

    if(result) {
        return type;
    }

    return false;
}

function checkForWinner() {
    if(gameOver){
        return;
    }
    let possibleWinner = checkDiag(0) || checkDiag(1);

    for (let i = 0; i < FIELD_SIZE; i++) {
        possibleWinner ||= (checkCol(i) || checkRow(i));
        if (possibleWinner) {
            colorCells(lastCheckRows, lastCheckCols);
            setTimeout(() => {
                alert(`Победил ${possibleWinner}`);
            }, 20);
            gameOver = true;
            return;
        }
    }
}

function resetGame(){
    FIELD = [];
    for(let i = 0; i < FIELD_SIZE; i++)
    {
        let arr = [];
        for(let j = 0; j < FIELD_SIZE; j++){
            arr.push(EMPTY)
        }
        FIELD.push(arr);
    }
    gameOver = false;
    turnsLeft = FIELD_SIZE * FIELD_SIZE;
    turn = CROSS;
}

function randomAIMove()
{
    while(true){
        let x = Math.floor(Math.random() * (FIELD_SIZE-0.5));
        let y = Math.floor(Math.random() * (FIELD_SIZE-0.5));
        if(FIELD[x][y] === EMPTY && !gameOver){
            FIELD[x][y] = turn;
            renderSymbolInCell(turn, x, y);
            moveToNextTurn();
            break;
        }
    }

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
