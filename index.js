const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');


const GAME_IN_PROGRESS = 0;
const DRAW = 1;
const CROSS_WIN = 2;
const ZERO_WIN = 3;

let game_stage = GAME_IN_PROGRESS;
let counter = 0;
let field;
let n = 3;

function init_game_model() {
    field = [];
    for (let i = 0; i < n; i++) {
        field.push([])
        for (let j = 0; j < n; j++) {
            field[i].push(EMPTY);
        }
    }
    counter = 0;
    game_stage = GAME_IN_PROGRESS;
}

function get_figure() {
    a = [CROSS, ZERO];
    return a[counter++ % 2];
}

init_game_model();
startGame();
addResetListener();

function startGame() {
    renderGrid(3);
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
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);

    if (game_stage === GAME_IN_PROGRESS && field[row][col] === EMPTY){
        let figure = get_figure();
        field[row][col] = figure;
        renderSymbolInCell(figure, row, col);
    }
    

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function colorSymbols(symbol, color='#ff0000'){
    for (let row = 0; row < n; row++){
        const row_arr = field[row];
        for (let col = 0; col < n; col++){
            if (row_arr[col] === symbol){
                findCell(row, col).style.color = color;
            }
        }
    }
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
    renderGrid();
    init_game_model();
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
