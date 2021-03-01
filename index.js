const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const map = [];
let stepsCounter;
let dim;
let playerTurn = 0;
let gameIsOn = true;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';
    dim = dimension;
    stepsCounter = dimension * dimension;
    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        let tmpArray = [];
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            tmpArray.push(EMPTY);
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        map.push(tmpArray);
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    /* Пользоваться методом для размещения символа в клетке так: */
    if (map[row][col] !== EMPTY)
        return;

    stepsCounter--;
    if (playerTurn === 0){
        map[row][col] = ZERO;
        playerTurn = 1;
        renderSymbolInCell(ZERO, row, col);
    } else {
        map[row][col] = CROSS;
        playerTurn = 0;
        renderSymbolInCell(CROSS, row, col);
    }
    if (isWin(row, col))
        alert("Победа");
    if (stepsCounter <= 0) {
        alert('Победила дружба!');
        gameIsOn = false;
    }
}

function isWin(row, col){
    // if ((row === 0 && col === 0)
    //     || (row === dim - 1  && col === dim - 1)
    //     || (row === dim - 1  && col === 0)
    //     || (row === 0  && col === dim - 1)){
    // }
    let currentTurn = map[row][col];

    // По горизонтали
    let counter = 0;
    for (let i = Math.max(col - 2, 0); i < col; i++){
        if (map[row][i] == currentTurn)
            counter++;
    }

    alert(counter);
    if (counter >= 2)
        return true;

    /*
    for (let i = max(col - 1, 0); i <= min(col + 1, dimension); i++){

    }

    for (let i = col; i <= min(col + 2, dimension); i++){

    }
*/
    // 
}

function countNeighbours(row, col, ){
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){

        }
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
