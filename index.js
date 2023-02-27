const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const PLAYER1 = '0';
const PLAYER2 = 'X';

const container = document.getElementById('fieldWrapper');

let player = PLAYER1;
let field = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]];
let stepCounter = 0;

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

function cellClickHandler (row, col) {
    // Пиши код ту
    let symbolInCell = field[row][col];
    if (symbolInCell === EMPTY) {
        let newSymbol = (player === PLAYER1) ? ZERO : CROSS;
        field[row][col] = player;
        player = (player === PLAYER1) ? PLAYER2 : PLAYER1;
        stepCounter++;
        renderSymbolInCell(newSymbol, row, col);
    }
    let winner = checkWinner();
    if (winner === PLAYER1) {
        alert(`player 1 (${PLAYER1}) won`);
    }
    if (winner === PLAYER2) {
        alert(`player 2 (${PLAYER2}) won`);
    }
    if (stepCounter === 9) {
        alert("Победила дружба");
    }

    console.log(`Clicked on cell: ${row}, ${col}`);

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkWinner() {
    let countFirstDiagPlayer1 = 0;
    let countFirstDiagPlayer2 = 0;
    let countSecondDiagPlayer1 = 0;
    let countSecondDiagPlayer2 = 0;
    for (let i = 0; i < 3; i++) {
        let countStrPlayer1 = 0;
        let countColPlayer1 = 0;
        let countStrPlayer2 = 0;
        let countColPlayer2 = 0;

        for (let j = 0; j < 3; j++) {
            if (field[i][j] === PLAYER1) {
                countStrPlayer1++;
            } else if (field[i][j] === PLAYER2) {
                countStrPlayer2++;
            }
            if (field [j][i] === PLAYER1) {
                countColPlayer1++;
            } else if (field[j][i] === PLAYER2) {
                countColPlayer2++;
            }
        }
        if (field[i][i] === PLAYER1) {
            countFirstDiagPlayer1++;
        } else if (field[i][i] === PLAYER2) {
            countFirstDiagPlayer2++;
        }
        if (field[2 - i][i] === PLAYER1) {
            countSecondDiagPlayer1++;
        } else if (field[2 - i][i] === PLAYER2) {
            countSecondDiagPlayer2++;
        }

        if (countStrPlayer1 === 3 || countColPlayer1 === 3
            || countFirstDiagPlayer1 === 3 || countSecondDiagPlayer1 === 3) {
            return PLAYER1;
        }
        if (countStrPlayer2 === 3 || countColPlayer2 === 3
            || countFirstDiagPlayer2 === 3 || countSecondDiagPlayer2 === 3) {
            return PLAYER2;
        }
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
