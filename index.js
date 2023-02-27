const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let end = false;
let turn = CROSS;
let field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];

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

function getOppositeTurn(){
    if (turn === CROSS)
        return ZERO;
    return CROSS;
}

function findFreeCells(){
    let res = [];
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++)
        {
            if (field[i][j] === EMPTY)
                res.push([i, j]);
        }
    }
    return res;
}

function hasOtherMoves(){
    return findFreeCells().length > 0;
}

function paintHorizontal(row){
    for (let i = 0; i < field[row].length; i++){
        renderSymbolInCell(field[row][i], row, i, 'red');
    }
}

function paintVertical(col){
    for (let i = 0; i < 3; i++){
        renderSymbolInCell(field[i][col], i, col, 'red');
    }
}

function makeMove(row, col){
    if (field[row][col] !== EMPTY)
        return false;

    field[row][col] = turn;
    renderSymbolInCell(turn, row, col);

    turn = getOppositeTurn();

    if (!hasOtherMoves()) {
        alert("Победила дружба");
        return false;
    }

    let kek = checkWinner();
    if (kek !== undefined) {
        let dim = kek[0];
        let ind = kek[1];

        if (dim === 'hor') {
            alert(field[ind][0]);
            paintHorizontal(ind);
        }
        if (dim === 'ver') {
            alert(field[0][ind]);
            paintVertical(ind);
        }
        end = true;
        return false;
    }
    return true
}

function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (end)
        return;
    let exodus = makeMove(row, col);
    if (exodus){
        let freeCells = findFreeCells();
        let i = Math.floor(Math.random() * freeCells.length);
        let row1 = freeCells[i][0];
        let col1 = freeCells[i][1];
        console.log(`kek ${row1} ${col1}`);
        makeMove(row1, col1);
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
    end = false;
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++)
        {
            field[i][j] = EMPTY;
            renderSymbolInCell(EMPTY, i, j)
        }
    }
    return false;
}

function isAllEqual(allEqual, arr) {
    for (let i = 0; i < arr.length; i++)
        if (allEqual(arr[i]) && arr[i][0] !== EMPTY)
            return i
}

function checkWinner() {
    const allEqual = arr => arr.every(v => v === arr[0])
    let ind;

    ind = isAllEqual(allEqual, field)
    if (ind !== undefined)
        return ['hor', ind];

    let verticals = [];
    for (let j = 0; j < field.length; j++) {
        verticals.push([])
        for (let i = 0; i < field[j].length; i++) {
            verticals[j].push(field[i][j])
        }
    }
    ind = isAllEqual(allEqual, verticals)
    if (ind !== undefined)
        return ['ver', ind];
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
