const RED = '#ed52c3';

const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let isGameEnded = false;

const container = document.getElementById('fieldWrapper');
let crossTurn = true;
const field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]]


function changeField(row_index, column_index, value){
    if (field[row_index][column_index] === EMPTY) {
        field[row_index][column_index] = value;
        return true;
    }
    return false;
}

function checkGameState(){

    for (let i = 0; i < field.length; i++){
        if (field[i][0] === field[i][1] && field[i][1] === field[i][2]){
            if (field[i][0] === CROSS){
                alert('First win')
                isGameEnded = true;
                for (let j=0; j < field[i].length; j++)
                    renderSymbolInCell(CROSS, i, j, RED)
            }
            else if (field[i][0] === ZERO){
                alert('Second win')
                isGameEnded = true;
                for (let j=0; j < field[i].length; j++)
                    renderSymbolInCell(ZERO, i, j, RED)
            }
        }
    }

    for (let i= 0; i<field.length; i++){
        if (field[0][i] === field[1][i] && field[1][i] === field[2][i]){
            if (field[0][i] === CROSS){
                alert('First win')
                isGameEnded = true;
                for (let j=0; j < field[0].length; j++)
                    renderSymbolInCell(CROSS, j, i, RED)
            }
            else if (field[0][i] === ZERO){
                alert('Second win')
                isGameEnded = true;
                for (let j=0; j < field[0].length; j++)
                    renderSymbolInCell(ZERO, j, i, RED)
            }
        }
    }

    if (field[0][0] === field[1][1] && field[1][1] === field[2][2]){
        if (field[0][0] === CROSS){
            alert('First win')
            isGameEnded = true
            renderSymbolInCell(CROSS, 0, 0, RED);
            renderSymbolInCell(CROSS, 1, 1, RED);
            renderSymbolInCell(CROSS, 2, 2, RED);
        }
        else if (field[0][0] === ZERO){
            alert('Second win')
            isGameEnded = true
            renderSymbolInCell(ZERO, 0, 0, RED);
            renderSymbolInCell(ZERO, 1, 1, RED);
            renderSymbolInCell(ZERO, 2, 2, RED);
        }
    }

    if (field[0][2] === field[1][1] && field[1][1] === field[2][0]){
        if (field[0][2] === CROSS){
            alert('First win')
            isGameEnded = true
            renderSymbolInCell(CROSS, 0, 2, RED);
            renderSymbolInCell(CROSS, 1, 1, RED);
            renderSymbolInCell(CROSS, 2, 0, RED);
        }
        else if (field[0][2] === ZERO){
            alert('Second win')
            isGameEnded = true
            renderSymbolInCell(ZERO, 0, 2, RED);
            renderSymbolInCell(ZERO, 1, 1, RED);
            renderSymbolInCell(ZERO, 2, 0, RED);
        }
    }
    if (!isGameEnded) {
        let count = 0
        for (const row of field) {
            for (const value of row) {
                if (value !== EMPTY) {
                    count++
                }
            }
        }
        if (count === 9) {
            alert('Draw')
        }
    }
}

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
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (crossTurn){
        if (changeField(row, col, CROSS)){
            renderSymbolInCell(CROSS, row, col);
            crossTurn = false;
        }
    }
    else{
        if (changeField(row, col, ZERO)){
            renderSymbolInCell(ZERO, row, col);
            crossTurn = true;
        }
    }
    checkGameState()
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
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            field[i][j] = EMPTY;
            renderSymbolInCell(EMPTY, i, j)
        }
    }
    crossTurn = true;
    alert('Game reseted')
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
