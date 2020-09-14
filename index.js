const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const SIZE = 3;
let field = [];
let currentMark = ZERO;
for (let i = 0; i < SIZE; i++){
    field[i] = [];
    for (let j = 0; j < SIZE; j++){
        field[i][j] = EMPTY;
    }
}
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
    if (field[row][col] === EMPTY){
        currentMark = (currentMark === ZERO) ? CROSS : ZERO;
        field[row][col] = currentMark;
        renderSymbolInCell(currentMark, row, col);
        checkStatus();
    }
    console.log(`Clicked on cell: ${row}, ${col}`);
}

function checkStatus(){
    if (!checkEmpty()) alert("Friendship won!");
    if (checkHorizontals(currentMark) || checkVerticals(currentMark) || checkDiagonals(currentMark)){
       alert(`${currentMark} won!`);

    }
}

function checkEmpty(){
    for (let i = 0; i < SIZE; i++){
        for (let j = 0; j < SIZE; j++){
            if (field[i][j] == EMPTY){
               return true; 
            }
        }
    }
    return false;
}

function checkHorizontals(mark){
    for (let i = 0; i < SIZE; i++){
        let count = 0;
        for (let j = 0; j < SIZE; j++){
            if(field[i][j] === mark){
                count++;
            }
        }
        if (count === SIZE){
            for (let j = 0; j < SIZE; j++){
                renderSymbolInCell(mark, i, j, '#ff0000');
            }
            return true;
        }
    }
    return false;
}

function checkVerticals(mark){
    for (let i = 0; i < SIZE; i++){
        let count = 0;
        for (let j = 0; j < SIZE; j++){
            if (field[j][i] === mark){
                count++;
            }
        }
        if (count === SIZE){
            for (let j = 0; j < SIZE; j++){
                renderSymbolInCell(mark, j, i, '#ff0000');
            }
            return true;
        }
    }
    return false;
}

function checkDiagonals(mark){
    let count = 0;
    for (let i = 0; i < SIZE; i++){
        if (field[i][i] === mark){
            count++;
        }
    }
    if (count === SIZE){
        for (let i = 0; i < SIZE; i++){
            renderSymbolInCell(mark, i, i, '#ff0000');
        }
        return true;
    }
    let j = SIZE - 1;
    count = 0;
    for (let i = 0; i < SIZE; i++){
        if (field[i][j] === mark){
            count++;
        }
        j--;
    }
    if (count === SIZE){
        j = SIZE - 1;
        for (let i = 0; i < SIZE; i++){
            renderSymbolInCell(mark, i, j, '#ff0000');
            j--;
        }
        return true;
    }
    return false;
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
    for (let i = 0; i < SIZE; i++){
        for (let j = 0; j < SIZE; j++){
            field[i][j] = EMPTY;
            renderSymbolInCell(EMPTY, i, j);
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
