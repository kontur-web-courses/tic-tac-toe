const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let NUMBER = 0;
let FIELD = [];
let SIZE = 3;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function makeSimpleAiTurn() {
    while (true) {
        row = getRandomInt(SIZE);
        col = getRandomInt(SIZE);
        if (FIELD[row][col] == EMPTY){
            FIELD[row][col] = ZERO;
            renderSymbolInCell(ZERO, row, col);
            break;
        }
    }
    console.log('make')
}

function fillField(){
    for (let i = 0; i < SIZE; i++){
        FIELD[i] = [];
        for (let j = 0; j < SIZE; j++){
            FIELD[i][j] = EMPTY;
        }
    }
}

function startGame () {
    SIZE = parseInt(prompt('Size?'));
    let AI = prompt('Play with AI? (yes/no)') === 'yes' ? true : false;
    renderGrid(SIZE, AI);
    fillField(SIZE);
}

function renderGrid (dimension, AI) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j, AI));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function checkIfSymbolWins(symbol){
    let won = true;
    for (let i = 0; i < SIZE; i++) {
        won = true;
        for (let j = 0; j < SIZE; j++) {
            if (FIELD[i][j] !== symbol) {
                won = false;
            }
        }
        if (won) {
            for (let j = 0; j < SIZE; j++) {
                renderSymbolInCell(symbol, i, j, 'red');
            }
            return true;
        }
    }

    for (let i = 0; i < SIZE; i++) {
        won = true;
        for (let j = 0; j < SIZE; j++) {
            if (FIELD[j][i] !== symbol) {
                won = false;
            }
        }
        if (won) {
            for (let j = 0; j < SIZE; j++) {
                renderSymbolInCell(symbol, j, i, 'red');
            }
            return true;
        }
    }

    won = true;
    for (let i = 0; i < SIZE; i++) {

        if (FIELD[i][i] !== symbol)
            won = false;
    }
    if (won){
        for (let i = 0; i < SIZE; i++) {
            renderSymbolInCell(symbol, i, i, 'red');
        }
        return true;
    }
    

    won = true;
    for (let i = 0; i < SIZE; i++) {

        if (FIELD[i][SIZE - i - 1] !== symbol)
            won = false;
    }
    if (won){
        for (let i = 0; i < SIZE; i++) {
            renderSymbolInCell(symbol, i, SIZE - i - 1, 'red');
        }
        return true;
    }
    return false;
}

function checkIfFriendsWins(){
    return NUMBER === SIZE * SIZE;
}

function cellClickHandler (row, col, AI=false) {
    let currentSymbol = EMPTY;
    if (NUMBER % 2 === 0){
        currentSymbol = CROSS;
    }
    else{   
        currentSymbol = ZERO;
    }
    if (FIELD[row][col] === EMPTY){
        renderSymbolInCell(currentSymbol, row, col);
        FIELD[row][col] = currentSymbol;

        if (checkIfSymbolWins(CROSS)){
            alert('Cross Wins');
            return;
        }
        if (checkIfSymbolWins(ZERO)){
            alert('Zero Wins');
            return;
        }

        NUMBER ++;
        if (checkIfFriendsWins()){
            alert('Победила дружба');
            return;
        }
    }
    if (AI === true){
        makeSimpleAiTurn();
        if (checkIfSymbolWins(ZERO)){
            alert('Zero Wins');
            return;
        }
        NUMBER++;
        if (checkIfFriendsWins()){
            alert('Победила дружба');
            return;
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
    startGame();
    NUMBER = 0;
    fillField();
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

