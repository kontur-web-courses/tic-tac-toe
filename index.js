const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let field = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]];
let strokeIndex = 0;
let haveWinner = false;
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
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (field[row][col] !== EMPTY || haveWinner) {

    } else {
        if (strokeIndex === 0) {
            field[row][col] = ZERO;
            renderSymbolInCell(ZERO, row, col);
            strokeIndex += 1;
        } else {
            field[row][col] = CROSS;
            renderSymbolInCell(CROSS, row, col);
            strokeIndex -= 1;
        }
        let winner = haveWinnerInGame();
        if (winner === EMPTY) {
            let flag = 0;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (field[i][j] !== EMPTY) {
                        flag++;
                    }
                }
            }
            if (flag === 0) {
                alert('Победила дружба');
            }
        } else {
            alert(winner);
        }
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
    field = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            renderSymbolInCell(EMPTY, i, j);
        }
    }
    console.log('reset!');
}

function haveWinnerInGame() {
    if (field[0][0] !== EMPTY && field[0][1] !== EMPTY && field[0][2] !== EMPTY) {
        if (field[0][0] === CROSS && field[0][1] === CROSS && field[0][2] === CROSS) {
            renderSymbolInCell(CROSS, 0, 0, '#FF0000');
            renderSymbolInCell(CROSS, 0, 1, '#FF0000');
            renderSymbolInCell(CROSS, 0, 2, '#FF0000');
            haveWinner = true;
            return CROSS;
        } else if (field[0][0] === ZERO && field[0][1] === ZERO && field[0][2] === ZERO) {
            renderSymbolInCell(ZERO, 0, 0, '#FF0000');
            renderSymbolInCell(ZERO, 0, 1, '#FF0000');
            renderSymbolInCell(ZERO, 0, 2, '#FF0000');
            haveWinner = true;
            return ZERO;
        }
    } else if (field[1][0] !== EMPTY && field[1][1] !== EMPTY && field[1][2] !== EMPTY) {
        if (field[1][0] === CROSS && field[1][1] === CROSS && field[1][2] === CROSS) {
            renderSymbolInCell(CROSS, 1, 0, '#FF0000');
            renderSymbolInCell(CROSS, 1, 1, '#FF0000');
            renderSymbolInCell(CROSS, 1, 2, '#FF0000');
            return CROSS;
        } else if (field[1][0] === ZERO && field[1][1] === ZERO && field[1][2] === ZERO) {
            renderSymbolInCell(ZERO, 1, 0, '#FF0000');
            renderSymbolInCell(ZERO, 1, 1, '#FF0000');
            renderSymbolInCell(ZERO, 1, 2, '#FF0000');
            haveWinner = true;
            return ZERO;
        }
    } else if (field[2][0] !== EMPTY && field[2][1] !== EMPTY && field[2][2] !== EMPTY) {
        if (field[2][0] === CROSS && field[2][1] === CROSS && field[2][2] === CROSS) {
            renderSymbolInCell(CROSS, 2, 0, '#FF0000');
            renderSymbolInCell(CROSS, 2, 1, '#FF0000');
            renderSymbolInCell(CROSS, 2, 2, '#FF0000');
            haveWinner = true;
            return CROSS;
        } else if (field[2][0] === ZERO && field[2][1] === ZERO && field[2][2] === ZERO) {
            renderSymbolInCell(ZERO, 2, 0, '#FF0000');
            renderSymbolInCell(ZERO, 2, 1, '#FF0000');
            renderSymbolInCell(ZERO, 2, 2, '#FF0000');
            haveWinner = true;
            return ZERO;
        }
    } else if (field[0][0] !== EMPTY && field[1][0] !== EMPTY && field[2][0] !== EMPTY) {
        if (field[0][0] === CROSS && field[1][0] === CROSS && field[2][0] === CROSS) {
            renderSymbolInCell(CROSS, 0, 0, '#FF0000');
            renderSymbolInCell(CROSS, 1, 0, '#FF0000');
            renderSymbolInCell(CROSS, 2, 0, '#FF0000');
            haveWinner = true;
            return CROSS;
        } else if (field[0][0] === ZERO && field[1][0] === ZERO && field[2][0] === ZERO) {
            renderSymbolInCell(ZERO, 0, 0, '#FF0000');
            renderSymbolInCell(ZERO, 1, 0, '#FF0000');
            renderSymbolInCell(ZERO, 2, 0, '#FF0000');
            haveWinner = true;
            return ZERO;
        }
    } else if (field[0][1] !== EMPTY && field[1][1] !== EMPTY && field[2][1] !== EMPTY) {
        if (field[0][1] === CROSS && field[1][1] === CROSS && field[2][1] === CROSS) {
            renderSymbolInCell(CROSS, 0, 1, '#FF0000');
            renderSymbolInCell(CROSS, 1, 1, '#FF0000');
            renderSymbolInCell(CROSS, 2, 1, '#FF0000');
            haveWinner = true;
            return CROSS;
        } else if (field[0][1] === ZERO && field[1][1] === ZERO && field[2][1] === ZERO) {
            renderSymbolInCell(ZERO, 0, 1, '#FF0000');
            renderSymbolInCell(ZERO, 1, 1, '#FF0000');
            renderSymbolInCell(ZERO, 2, 1, '#FF0000');
            haveWinner = true;
            return ZERO;
        }
    } else if (field[0][2] !== EMPTY && field[1][2] !== EMPTY && field[2][2] !== EMPTY) {
        if (field[0][2] === CROSS && field[1][2] === CROSS && field[2][2] === CROSS) {
            renderSymbolInCell(CROSS, 0, 2, '#FF0000');
            renderSymbolInCell(CROSS, 1, 2, '#FF0000');
            renderSymbolInCell(CROSS, 2, 2, '#FF0000');
            haveWinner = true;
            return CROSS;
        } else if (field[0][2] === ZERO && field[1][2] === ZERO && field[2][2] === ZERO) {
            renderSymbolInCell(ZERO, 0, 2, '#FF0000');
            renderSymbolInCell(ZERO, 1, 2, '#FF0000');
            renderSymbolInCell(ZERO, 2, 2, '#FF0000');
            haveWinner = true;
            return ZERO;
        }
    } else if (field[0][0] !== EMPTY && field[1][1] !== EMPTY && field[2][2] !== EMPTY) {
        if (field[0][0] === CROSS && field[1][1] === CROSS && field[2][2] === CROSS) {
            renderSymbolInCell(CROSS, 0, 0, '#FF0000');
            renderSymbolInCell(CROSS, 1, 1, '#FF0000');
            renderSymbolInCell(CROSS, 2, 2, '#FF0000');
            haveWinner = true;
            return CROSS;
        } else if (field[0][0] === ZERO && field[1][1] === ZERO && field[2][2] === ZERO) {
            renderSymbolInCell(ZERO, 0, 0, '#FF0000');
            renderSymbolInCell(ZERO, 1, 1, '#FF0000');
            renderSymbolInCell(ZERO, 2, 2, '#FF0000');
            haveWinner = true;
            return ZERO;
        }
    } else if (field[0][2] !== EMPTY && field[1][1] !== EMPTY && field[2][0] !== EMPTY) {
        if (field[0][2] === CROSS && field[1][1] === CROSS && field[2][0] === CROSS) {
            renderSymbolInCell(CROSS, 0, 2, '#FF0000');
            renderSymbolInCell(CROSS, 1, 1, '#FF0000');
            renderSymbolInCell(CROSS, 2, 0, '#FF0000');
            haveWinner = true;
            return CROSS;
        } else if (field[0][2] === ZERO && field[1][1] === ZERO && field[2][0] === ZERO) {
            renderSymbolInCell(ZERO, 0, 2, '#FF0000');
            renderSymbolInCell(ZERO, 1, 1, '#FF0000');
            renderSymbolInCell(ZERO, 2, 0, '#FF0000');
            haveWinner = true;
            return ZERO;
        }
    } else {
        return EMPTY;
    }
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
