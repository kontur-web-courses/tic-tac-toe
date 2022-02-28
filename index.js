const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const EMPTY_TURNS_ALERT_TEXT = 'Победила дружба';

const container = document.getElementById('fieldWrapper');

let userTurn = CROSS;
const field = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
];
let turnCount = field.length * field[0].length;
let gameEnded = false;

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

function checkWin () {
    let winArr = [];
    for (let i = 0; i < 3; i ++) {
        if ((field[i][0] === field[i][1] === field[i][2]) && (field[i][0] != EMPTY)) {
            return [[i, 0], [i, 1], [i, 2]];
        }
        if (( field[0][i] === field[1][i] === field[2][i]) && (field[0][i] != EMPTY)) {
            return [[0, i], [1, i], [2, i]];
        }
    }
    if ((field[0][0] === field[1][1] === field[2][2]) && (field[0][0] != EMPTY))  {
        return [[0,0], [1,1], [2,2]];
    }
    if ((field[0][2] === field[1][1] === field[2][0]) && (field[1][1] != EMPTY))  {
        return [[0,2], [1,1], [2,0]];
    }

    return winArr;
}

function cellClickHandler(row, col) {
    if (field[row][col] !== EMPTY) return;

    field[row][col] = userTurn;
    renderSymbolInCell(userTurn, row, col);
    swapTurn()

    turnCount -= 1;
    // TODO: place checkIsWin
    if (turnCount === 0) {
        renderGameEnded();
        turnCount = field.length * field[0].length;
        return;
    }
}

function renderGameEnded() {
    alert(EMPTY_TURNS_ALERT_TEXT);
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
    console.log('reset!');
}


function swapTurn() {
    userTurn = userTurn === CROSS ? ZERO : CROSS;
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
