const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

let currentClick = ZERO
let field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]]

function resetField (field) {
    for (let y = 0; y < 3; y++){
        for (let x = 0; x < 3; x++){
            field[y][x] = EMPTY;
        }
    }
}

function checkForAvailable (field) {
    for (let y = 0; y < 3; y++){
        for (let x = 0; x < 3; x++){
            if (field[y][x] === EMPTY){
                return true;
            }
        }
    }
    return false;
}

function checkSequence(symbol, yIterator, xIterator, initialY, initalX){
    for (let y = initialY; y < 3; y = yIterator(y) ){
        for (let x = initalX; x < 3; x = xIterator(x)){
            if (field[y][x] !== symbol)
                return null;
            if (xIterator === null){
                break;
            }
        }
        if (yIterator === null){
            break;
        }
    }

    let arr = []
    for (let y = initialY; y < 3; y = yIterator(y) ){
        for (let x = initalX; x < 3; x = xIterator(x)){
            arr.push([y, x])
            if (xIterator === null){
                break;
            }
        }
        if (yIterator === null){
            break;
        }
    }
    return arr;
}

function checkRows(symbol){
    for (let i = 0; i < 3; i++){
        let sequence = checkSequence(symbol, null, x => x + 1, i, 0);
        if (sequence !== null)
            return sequence;
    }
    return null;
}

function checkColumns(symbol){
    for (let i = 0; i < 3; i++){
        let sequence = checkSequence(symbol, y => y + 1, null, 0, i);
        if (sequence !== null)
            return sequence;
    }
    return null;
}

function checkDiagonals(symbol){
    return checkSequence(symbol, y => y + 1, x => x + 1, 0, 0) || checkSequence(symbol, y => y + 1, x => x - 1, 0, 2)
}


function checkWinner(symbol){
    return checkColumns(symbol) || checkRows(symbol) || checkDiagonals(symbol)
}

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
    debugger;
    if (field[row][col] !== EMPTY)
        return;

    renderSymbolInCell(currentClick, row, col);
    
    field[row][col] = currentClick;
    currentClick = currentClick === ZERO ? CROSS : ZERO;
    
    let crossSequence = checkWinner(CROSS);
    let zeroSequence = checkWinner(ZERO);
    
    if (crossSequence !== null){
        for (cell of crossSequence){
            renderSymbolInCell(CROSS, cell[0], cell[1], color = '#FF0000');
        }
        alert('CROSS!!!!!');
        return;
    }
    if (zeroSequence !== null){
        for (cell of zeroSequence){
            renderSymbolInCell(ZERO, cell[0], cell[1], color = '#FF0000');
        }
        alert('ZERO!!!!!');
        return;
    }

    if (!checkForAvailable(field))
        alert('Победила дружба')

    console.log(`Clicked on cell: ${row}, ${col}`);


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
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
    resetField(field)
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
