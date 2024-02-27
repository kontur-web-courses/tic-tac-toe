const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
const field = [
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]
        ];

let currentSymbol = CROSS;
let N = 3;

startGame();
addResetListener();

function startGame () {
    renderGrid(n);
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

function checkNoMoreMoves() {
    for (const row of field) {
        for (const cell of row) {
            if (cell == EMPTY) {
                return false;
            }
        }
    }
    return true;
}

function findWinLine(symbol){
    for (let i = 0; i < N; i++){
        for (let j = 0; j < N - 2; j++){
            if (field[i][j] === symbol && field[i][j+1] === symbol && field[i][j+2] === symbol){
                return true;
            }
            if (field[j][i] === symbol && field[j+1][i] === symbol && field[j+2][i] === symbol){
                return true;
            }
        }
    }
    for (let i = 0; i < N - 2; i++){
        for (let j = 0; j < N - 2; j++){
            if (field[i][j] === symbol && field[i+1][j+1] === symbol && field[i+2][j+2] === symbol){
                return true;
            }
        }
    return false;
    }
}

function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (field[row][col] != EMPTY) return;
    field[row][col] = current;
    renderSymbolInCell(current, row, col);
    currentSymbol = currentSymbol === ZERO ? CROSS : ZERO;
    if (findWinLine(CROSS)){
        alert("CROSS");
    } else if (findWinLine(ZERO)){
            alert("ZERO");
    } else if (checkNoMoreMoves()) {
        alert('Победила дружба');
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
