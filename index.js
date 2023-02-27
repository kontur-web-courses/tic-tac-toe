const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let boardSize;
let arr;
startGame();
addResetListener();

function startGame () {
    boardSize = parseInt(prompt('Размер', 3))
    renderGrid(boardSize);
    arr = new Array(boardSize);            // создаем пустой массив длины `M`
    for (let i = 0; i < boardSize; i++) {
        arr[i] = new Array(boardSize);        // делаем каждый элемент массивом
        for(let j = 0; j < boardSize; j++){
            arr[i][j] = EMPTY;
        }
    }
    for(let a of arr){
        console.log(a);
    }
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

winner = "";

let turn = 0;

function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if(winner !== "")
    {
        return;
    }
    if(arr[row][col] !== EMPTY){
        return;
    }
    if(turn%2){
        renderSymbolInCell(ZERO, row, col);
    }
    else{
        renderSymbolInCell(CROSS, row, col);
    }
    let a = checkWinner();
    if(a !== EMPTY && a !== undefined){
        alert(`Победил  ${a}`);
        winner = a;
        return;
    }
    if(turn === boardSize*boardSize){
        return;
    }
    if(turn===boardSize*boardSize-1){
        alert("Победила дружба");
    }
    turn++;

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkWinner(){
    for(let j = 0; j < boardSize; j++){
        let t = true;
        if(arr[j][0] === ' ')
            continue;
        for(let i = 0; i < boardSize-1; i++){
            t = t && arr[j][i] === arr[j][i+1]; 
        }
        if(t){
            for(let i = 0; i < boardSize; i++){
                renderSymbolInCell(arr[j][i], j, i, color = '#f00');
            }
            return arr[j][0];
        }
    }

    for(let j = 0; j < boardSize; j++){
        if(arr[0][j] === ' ')
            continue;
        let t = true;
        for(let i = 0; i < boardSize - 1; i++){
            t = t && arr[i][j] === arr[i+1][j]; 
        }
        if(t){
            for(let i = 0; i < boardSize; i++){
                renderSymbolInCell(arr[i][j], i, j, color = '#f00');
            }
            return arr[0][j];
        }
    }

    let t = true;
    for(let i = 0; i < boardSize-1; i++){
        t = t && arr[i][i] === arr[i+1][i+1];
    }
    if(t){
        for(let i = 0; i < boardSize; i++){
            renderSymbolInCell(arr[i][i], i, i, color = '#f00');
        }
        return arr[0][0];
    }

    t = true;
    for(let i = 0; i < boardSize-1; i++){
        t = t && arr[i][boardSize-1 - i] === arr[i+1][boardSize-2 - i];
    }
    if(t){
        for(let i = 0; i < boardSize; i++){
            renderSymbolInCell(arr[i][boardSize-1-i], i, boardSize-1-i, color = '#f00');
        }
        return arr[0][2];
    }
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);
    arr[row][col] = symbol;

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
    winner = "";
    turn = 0
    startGame ();
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
