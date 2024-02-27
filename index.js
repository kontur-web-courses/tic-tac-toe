const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let currentSymbol = CROSS;
let gameEnded = false;
let field;
let fieldSize = 3;
let aiMoved = false;

startGame();
addResetListener();

function startGame() {
    resetClickHandler();
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

function findWinLine(symbol) {
    let winCells = [];
    for (let i = 0; i < fieldSize; i++) {
        for (let j = 0; j < fieldSize - 2; j++) {
            if (field[i][j] === symbol && field[i][j + 1] === symbol && field[i][j + 2] === symbol) {
                winCells = [
                    [i, j],
                    [i, j + 1],
                    [i, j + 2]
                ];
            }
            if (field[j][i] === symbol && field[j + 1][i] === symbol && field[j + 2][i] === symbol) {
                winCells = [
                    [j, i],
                    [j + 1, i],
                    [j + 2, i]
                ];
            }
        }
    }

    for (let i = 0; i < fieldSize - 2; i++) {
        for (let j = 0; j < fieldSize - 2; j++) {
            if (field[i][j] === symbol && field[i + 1][j + 1] === symbol && field[i + 2][j + 2] === symbol) {
                winCells = [
                    [i, j],
                    [i + 1, j + 1],
                    [i + 2, j + 2]
                ];
            }
        }

    }

    for (let i = 2; i < fieldSize; i++) {
        for (let j = 0; j < fieldSize - 2; j++) {
            if (field[i][j] === symbol && field[i - 1][j + 1] === symbol && field[i - 2][j + 2] === symbol) {
                winCells = [
                    [i, j],
                    [i - 1, j + 1],
                    [i - 2, j + 2]
                ];
            }
        }

    }

    for (const cell of winCells) {
        renderSymbolInCell(symbol, cell[0], cell[1], "#ff0000");
    }

    return winCells.length != 0;
}

function finishGame(result) {
    if (result === CROSS || result == ZERO) {
        alert(result);
    } else alert('Победила дружба!')
    gameEnded = true;
}

function cellClickHandler(row, col) {
    makeMove(row, col);
}

function makeMove(row, col) {
    if (gameEnded) return;
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (field[row][col] != EMPTY) return;
    field[row][col] = currentSymbol;
    renderSymbolInCell(currentSymbol, row, col);
    currentSymbol = currentSymbol === ZERO ? CROSS : ZERO;
    if (findWinLine(CROSS)) {
        finishGame(CROSS);
    } else if (findWinLine(ZERO)) {
        finishGame(ZERO);
    } else if (checkNoMoreMoves()) {
        finishGame();
    }
    console.log( document.getElementById('ai').value);
    if (document.getElementById('ai').checked) {
        if (!aiMoved) {
            aiMoved = true;
            for (let randomRow = 0; randomRow < fieldSize; ++randomRow) {
                for (let randomCol = 0; randomCol < fieldSize; ++randomCol) {
                    if (field[randomRow][randomCol] === EMPTY) {
                        makeMove(randomRow, randomCol);
                        return;
                     }
                }
            }
        } else aiMoved = false;
    } 
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
    fieldSize = Number(document.getElementById('fieldSize').value) || 3;
    if (fieldSize < 3 || fieldSize > 50) {
        fieldSize = 3;
    }
    renderGrid(fieldSize);
    console.log(fieldSize);
    console.log('reset!');
    field = Array(fieldSize).fill().map(() => Array(fieldSize).fill(EMPTY));
    for (let row = 0; row < fieldSize; ++row) {
        for (let col = 0; col < fieldSize; ++col) {
            renderSymbolInCell(EMPTY, row, col);
        }
    }
    gameEnded = false;
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