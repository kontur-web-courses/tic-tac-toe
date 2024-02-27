const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let player = CROSS

const START_GRID = 3

let field = Array(START_GRID).fill(Array(START_GRID).fill(' '));

function check_winner(field, sym) {
    for (let el = 0; el < field.length; el++) {
        const element = array[el];
        
    }
}

function switchPlayers() {
    player = player === CROSS ? ZERO : CROSS 
}
 

startGame();
addResetListener();

function startGame () {
    renderGrid(START_GRID);
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
    const targetCell = findCell(row, col);

    // Проверяем, что ячейка еще не заполнена
    if (targetCell.textContent === EMPTY) {
        console.log(`Clicked on cell: ${row}, ${col}`);
        renderSymbolInCell(player, row, col);
        switchPlayers();
    } else {
        console.log(`Cell ${row}, ${col} is already filled`);
    }

    
    /* Пользоваться методом для размещения символа в клетке так:
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
