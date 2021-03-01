const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let FIELD = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]]
let currentPlayer = CROSS
let gameIsOver = false;
let size = 3
const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame() {
    renderGrid(size);
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

function swapPlayer() {
    currentPlayer = currentPlayer === ZERO ? CROSS : ZERO;
}
function paintWinner(c1, c2, c3){
    c1.style.color = '#FF0000';
    c2.style.color = '#FF0000';
    c3.style.color = '#FF0000';

}
function showResult(text){
    alert(text)
}
function getWinner() {
    for (let i = 0; i < FIELD.length; i++) {
        if (FIELD[i][0] === FIELD[i][1] && FIELD[i][1] === FIELD[i][2] && FIELD[i][1] !== EMPTY){
            paintWinner(findCell(i, 0), findCell(i, 1), findCell(i,2));
            setTimeout(showResult(`Победили: ${currentPlayer}`), 1000)
            gameIsOver = true;
            return;
        }
    }
    if (FIELD[0][0] === FIELD[1][1] && FIELD[1][1] === FIELD[2][2] && FIELD[1][1] !== EMPTY){
        setTimeout(showResult(`Победили: ${currentPlayer}`), 1000)
        paintWinner(findCell(0, 0), findCell(1, 1), findCell(2,2));
        gameIsOver = true;
        return;
    }
    if (FIELD[0][2] === FIELD[1][1] && FIELD[1][1] === FIELD[2][0] && FIELD[1][1] !== EMPTY){
        setTimeout(showResult(`Победили: ${currentPlayer}`), 1000)
        paintWinner(findCell(0, 2), findCell(1, 1), findCell(2,0));
        gameIsOver = true;
        return;
    }
    for (let i = 0; i < 3; i++) {
        if (FIELD[0][i] === FIELD[1][i] && FIELD[1][i] === FIELD[2][i] && FIELD[0][i] !== EMPTY){
            setTimeout(showResult(`Победили: ${currentPlayer}`), 1000)
            paintWinner(findCell(0, i), findCell(1, i), findCell(2,i));
            gameIsOver = true;
            return;
        }

    }
    let values = FIELD.flat(1)
    if (!values.includes(EMPTY)) {
        gameIsOver = true;
        setTimeout(showResult("Победила дружба"), 1000)
    }
}

function cellClickHandler(row, col) {
    if (FIELD[row][col] !== EMPTY || gameIsOver) {
        return;
    }
    renderSymbolInCell(currentPlayer, row, col);
    FIELD[row][col] = currentPlayer;
    getWinner();
    swapPlayer();
    console.log(`Clicked on cell: ${row}, ${col}`);


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
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
    gameIsOver = false;
    FIELD = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
    startGame();
    console.log('reset!');
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
