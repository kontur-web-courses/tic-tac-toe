const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const EMPTY_TURNS_ALERT_TEXT = 'Победила дружба';

let fieldSize = 3;

const container = document.getElementById('fieldWrapper');
const nowTurnContainer = document.getElementById('nowTurn');
const fieldSizeContainer = document.getElementById('fieldSize');
fieldSizeContainer.addEventListener('change', function (e) {
    fieldSize = parseInt(e.target.value, 10)
    startGame();
});

let userTurn = CROSS;
let field = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
];
let turnCount = fieldSize * fieldSize;
let gameEnded = false;

startGame();
addResetListener();

function startGame() {
    renderGrid(fieldSize);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        field[i] = [];
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            field[i][j] = EMPTY;
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function checkWin(x, y) {
    if (1 < x && x < fieldSize - 3 && 1 < y && y < fieldSize - 3) {
        for (let i = -1; i < 2; i++) {
            if ((field[x + i][y] === field[x + i][y] && field[x + i][y] === field[x + i][y]) && (field[x + i][y] !== EMPTY)) {
                return [[x + i, y], [x + i, y], [x + i, y]];
            }
            if ((field[x][y + i] === field[x][y + i] && field[x][y + i] === field[x][y + i]) && (field[x][y + i] !== EMPTY)) {
                return [[x, y + i], [x, y + i], [x, y + i]];
            }
        }
        if ((field[x + 0][y + 0] === field[x + 1][y + 1] && field[x + 1][y + 1] === field[x + 2][y + 2]) && (field[x + 0][y + 0] !== EMPTY)) {
            return [[x + 0, y + 0], [x + 1, y + 1], [x + 2, y + 2]];
        }
        if ((field[x + 0][y + 2] === field[x + 1][y + 1] && field[x + 1][y + 1] === field[x + 2][y + 0]) && (field[x + 1][y + 1] !== EMPTY)) {
            return [[x + 0, y + 2], [x + 1, y + 1], [x + 2, y + 0]];
        }
    }

}

function cellClickHandler(row, col) {
    if (field[row][col] !== EMPTY || gameEnded) return;

    field[row][col] = userTurn;
    renderSymbolInCell(userTurn, row, col);

    const winArray = checkWin();
    if (winArray) {
        renderWinArray(winArray);
        gameEnded = true;
        return;
    }

    swapTurn()
    turnCount -= 1;
    if (turnCount !== 0) return;

    renderGameEnded();
    gameEnded = true;
}

function renderWinArray(winArray) {
    for (const indexesPair of winArray) {
        const row = indexesPair[0];
        const col = indexesPair[1];

        const elementAt = field[row][col];
        renderSymbolInCell(elementAt, row, col, 'red')
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
    for (let i = 0; i < fieldSize; i++) {
        for (let j = 0; j < fieldSize; j++) {
            renderSymbolInCell(EMPTY, i, j)
            field[i][j] = EMPTY;
        }
    }
    gameEnded = false;
    turnCount = fieldSize * fieldSize;
    userTurn = CROSS;
    renderWhosTurn();
}


function swapTurn() {
    userTurn = userTurn === CROSS ? ZERO : CROSS;
    renderWhosTurn();
}

function renderWhosTurn() {
    nowTurnContainer.innerText = `Сейчас ходит ${userTurn}`;
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
