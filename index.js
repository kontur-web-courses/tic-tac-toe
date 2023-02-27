const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const SIZE = 3;
let  PLAYER = 'first'  // or 'second'
let FIELD;
let STATUS = 'IN_PROGRESS'  // or 'FINISHED'
const container = document.getElementById('fieldWrapper');

let movesCount = 100;
let currentMove = 0;

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
    FIELD = createField(3)
}

function createField(dimension) {
    return [[EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY,EMPTY]]
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
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (FIELD[row][col] !== EMPTY || STATUS === 'FINISHED') {
        return;
    }
    if (PLAYER === 'first') {
        renderSymbolInCell(CROSS, row, col);
        if (checkIfSymbolWins(CROSS)) {
            alert(`Player ${PLAYER} wins`)
            STATUS = 'FINISHED'
            return
        }
        PLAYER = 'second';
    } else {
        renderSymbolInCell(ZERO, row, col);
        if (checkIfSymbolWins(ZERO)) {
            alert(`Player ${PLAYER} wins`)
            STATUS = 'FINISHED'
            return
        }
        PLAYER = 'first'
    }
    currentMove += 1
    if (currentMove === movesCount) {
        alert('TIE')
        STATUS = 'FINISHED'
        return
    }
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);
    FIELD[row][col] = symbol;
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
    startGame()
    STATUS = 'IN_PROGRESS'
    movesCount = 100;
    currentMove = 0;

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

function checkIfSymbolWins(symbol){
    for (let i = 0; i < SIZE; i++) {
        let won = true;
        for (let j = 0; j < SIZE; j++) {
            if (FIELD[i][j] !== symbol) {
                won = false;
            }
        }
        if (won) {
            for (let j = 0; j < SIZE; j++) {
                renderSymbolInCell(symbol, i, j, 'red')
            }
            return true;
        }
    }

    for (let i = 0; i < SIZE; i++) {
        let won = true;
        for (let j = 0; j < SIZE; j++) {
            if (FIELD[j][i] !== symbol) {
                won = false;
            }
        }
        if (won) {
            for (let j = 0; j < SIZE; j++) {
                renderSymbolInCell(symbol, i, j, 'red')
            }
            return true;
        }
    }

    let won = true;
    for (let i = 0; i < SIZE; i++) {

        if (FIELD[i][i] !== symbol)
            won = false;
    }
    if (won){ 
        for (let j = 0; j < SIZE; j++) {
            renderSymbolInCell(symbol, j, j, 'red')
        }
        return true;
    }
    won = true;
    for (let i = 0; i < SIZE; i++) {

        if (FIELD[i][SIZE - i - 1] !== symbol)
            won = false;
    }
    if (won) {
        for (let j = 0; j < SIZE; j++) {
            renderSymbolInCell(symbol, i, SIZE - i - 1, 'red')
        }
        return true;
    }
}