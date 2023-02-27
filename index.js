const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

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
function IsEnd(arr){
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (arr[i][j] === EMPTY){
                return false;

            }
        }
    }
    return true;
}

function CheckWinner(field){
    for (let i = 0; i < 3; i++) {
        if ((field[0][i] === field[1][i] === field[2][i]) && field[0][i] !== EMPTY){
            return field[0][i];
        }
        if ((field[i][0] === field[i][1] === field[i][2]) && field[i][0] !== EMPTY){
            return field[0][1];
        }
    }
    if ((field[0][2] === field[1][1] === field[2][0]) && field[0][2] !== EMPTY){
        return field[0][2];
    }
    if ((field[0][0] === field[1][1] === field[2][2]) && field[0][0] !== EMPTY){
        return field[0][0];
    }
    return false;
}

let current_player = CROSS
let field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]]
function cellClickHandler (row, col) {
    // Пиши код тут
    if (field[row][col] === EMPTY){
        field[row][col] = current_player;
        renderSymbolInCell(current_player, row, col);
        current_player = current_player === CROSS ? ZERO : CROSS;
    }
    let winner = CheckWinner(field)
    if (winner){
        alert(winner);
    }
    if (IsEnd(field)){
        alert('Победила дружба');
    }
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
