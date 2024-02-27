const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();
dim = 1;
function startGame () {
    dim = prompt('Введите сколько на сколько будет поле', 3);
    renderGrid(dim);
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
let lastClick = ZERO;
let field = Array.from({length: dim* dim}, () => EMPTY);
let fin = false;
function cellClickHandler (row, col) {
    const index = (3 * row + col);
    if(field[index] === EMPTY && !fin){
        if(lastClick === ZERO){
            renderSymbolInCell(CROSS, row, col);
            lastClick = CROSS;
        } else{
            renderSymbolInCell(ZERO, row, col);
            lastClick = ZERO;
        }
        field[index] = lastClick;
    }
    console.log(`Clicked on cell: ${row}, ${col}`);

    const winner = hasWinner();
    console.log(winner);
    if(winner !== EMPTY){
        fin = true;
        setTimeout(alert, 1,`Победил ${winner === ZERO ? 'Нолик' : 'Крестик'}`);
    }
    if(field.indexOf(EMPTY) === -1){
        alert('Победила дружба!!!');
    }
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function hasWinner(){
    for(let i = 0; i <= 2 ; i++){
        if(field[i] === field[i + 3] && field[i] === field[i + 6]){
            renderSymbolInCell(field[i], 0, i, '#f00')
            renderSymbolInCell(field[i], 1, i, '#f00')
            renderSymbolInCell(field[i], 2, i, '#f00')
            return field[i];
        }
    }
    for(let i = 0; i <= 6; i += 3) {
        if (field[i] === field[i + 1] && field[i] === field[i + 2]) {
            renderSymbolInCell(field[i], i, 0, '#f00')
            renderSymbolInCell(field[i], i, 1, '#f00')
            renderSymbolInCell(field[i], i, 2, '#f00')
            return field[i];
        }
    }
    if(field[0] === field[4] && field[0] === field[8]){
        renderSymbolInCell(field[0], 0, 0, '#f00')
        renderSymbolInCell(field[0], 1, 1, '#f00')
        renderSymbolInCell(field[0], 2, 2, '#f00')
        return field[0];
    }
    if(field[2] === field[4] && field[2] === field[6]){
        renderSymbolInCell(field[2], 0, 2, '#f00')
        renderSymbolInCell(field[2], 1, 1, '#f00')
        renderSymbolInCell(field[2], 2, 0, '#f00')
        return field[2];
    }
    return EMPTY;
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
    field = Array.from({length: 9}, () => EMPTY);
    fin = false;
    renderGrid(3);
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
