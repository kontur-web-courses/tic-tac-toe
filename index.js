const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();
let field = [];
let moveCount = 9;
let currMoveCount = 0;
let victory = false;

for (let i = 0; i < 3; i++) {
    field.push([EMPTY, EMPTY, EMPTY])
}

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

function checkVictory(player, row, col) {
    if (row === 0 && col === 0) {
        if (field[row + 1][col + 1] === player && field[row + 2][col + 2] === player) {
            renderSymbolInCell(player, row + 1, col + 1, '#FF0000');
            renderSymbolInCell(player, row + 2, col + 2, '#FF0000');
            renderSymbolInCell(player, row, col, '#FF0000');
            return true;
        }
        if (field[row + 1][col] === player && field[row + 2][col] === player) {
            renderSymbolInCell(player, row + 1, col, '#FF0000')
            renderSymbolInCell(player, row + 2, col, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
        if (field[row][col + 1] === player && field[row][col + 2] === player) {
            renderSymbolInCell(player, row, col + 1, '#FF0000')
            renderSymbolInCell(player, row, col + 2, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }

    }
    if (row === 0 && col === 1) {
        if (field[row][col - 1] === player && field[row][col + 1] === player) {
            renderSymbolInCell(player, row, col - 1, '#FF0000')
            renderSymbolInCell(player, row, col + 1, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
        if (field[row + 1][col] === player && field[row + 2][col] === player) {
            renderSymbolInCell(player, row + 1, col, '#FF0000')
            renderSymbolInCell(player, row + 2, col, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true;
        }

    }
    if (row === 0 && col === 2) {
        if (field[row][col - 1] === player && field[row][col - 2] === player) {
            renderSymbolInCell(player, row, col - 1, '#FF0000')
            renderSymbolInCell(player, row, col - 2, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
        if (field[row + 1][col - 1] === player && field[row + 2][col - 2] === player) {
            renderSymbolInCell(player, row + 1, col - 1, '#FF0000')
            renderSymbolInCell(player, row + 2, col - 2, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
        if (field[row + 1][col] === player && field[row + 2][col] === player) {
            renderSymbolInCell(player, row + 1, col, '#FF0000')
            renderSymbolInCell(player, row + 2, col, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
    }
    if (row === 1 && col === 0) {
        if (field[row - 1][col] === player && field[row + 1][col] === player) {
            renderSymbolInCell(player, row - 1, col, '#FF0000')
            renderSymbolInCell(player, row + 1, col, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
        if (field[row][col + 1] === player && field[row][col + 2] === player) {
            renderSymbolInCell(player, row, col + 1, '#FF0000')
            renderSymbolInCell(player, row, col + 2, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
    }
    if (row === 1 && col === 1) {
        if (field[row - 1][col - 1] === player && field[row + 1][col + 1] === player) {
            renderSymbolInCell(player, row - 1, col - 1, '#FF0000')
            renderSymbolInCell(player, row + 1, col + 1, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
        if (field[row - 1][col] === player && field[row + 1][col] === player) {
            renderSymbolInCell(player, row - 1, col, '#FF0000')
            renderSymbolInCell(player, row + 1, col, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
        if (field[row - 1][col + 1] === player && field[row + 1][col - 1] === player) {
            renderSymbolInCell(player, row - 1, col + 1, '#FF0000')
            renderSymbolInCell(player, row + 1, col - 1, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
        if (field[row][col - 1] === player && field[row][col + 1] === player) {
            renderSymbolInCell(player, row, col - 1, '#FF0000')
            renderSymbolInCell(player, row, col + 1, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
    }
    if (row === 1 && col === 2) {
        if (field[row][col - 1] === player && field[row][col - 2] === player) {
            renderSymbolInCell(player, row, col - 1, '#FF0000')
            renderSymbolInCell(player, row, col - 2, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
        if (field[row - 1][col] === player && field[row + 1][col] === player) {
            renderSymbolInCell(player, row + 1, col + 1, '#FF0000')
            renderSymbolInCell(player, row + 2, col + 2, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
    }
    if (row === 2 && col === 0) {
        if (field[row - 1][col] === player && field[row - 2][col] === player) {
            renderSymbolInCell(player, row - 1, col, '#FF0000')
            renderSymbolInCell(player, row - 2, col, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
        if (field[row - 1][col + 1] === player && field[row - 2][col + 2] === player) {
            renderSymbolInCell(player, row - 1, col + 1, '#FF0000')
            renderSymbolInCell(player, row - 2, col + 2, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
        if (field[row][col + 1] === player && field[row][col + 2] === player) {
            renderSymbolInCell(player, row, col + 1, '#FF0000')
            renderSymbolInCell(player, row, col + 2, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
    }
    if (row === 2 && col === 1) {
        if (field[row][col - 1] === player && field[row][col + 1] === player) {
            renderSymbolInCell(player, row, col - 1, '#FF0000')
            renderSymbolInCell(player, row, col + 1, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
        if (field[row - 1][col] === player && field[row - 2][col] === player) {
            renderSymbolInCell(player, row - 1, col, '#FF0000')
            renderSymbolInCell(player, row - 2, col, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
    }
    if (row === 2 && col === 2) {
        if (field[row][col - 1] === player && field[row][col - 2] === player) {
            renderSymbolInCell(player, row, col - 1, '#FF0000')
            renderSymbolInCell(player, row, col - 2, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
        if (field[row - 1][col - 1] === player && field[row - 2][col - 2] === player) {
            renderSymbolInCell(player, row - 1, col - 1, '#FF0000')
            renderSymbolInCell(player, row - 2, col - 2, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
        if (field[row - 1][col] === player && field[row - 2][col] === player) {
            renderSymbolInCell(player, row - 1, col, '#FF0000')
            renderSymbolInCell(player, row - 2, col, '#FF0000')
            renderSymbolInCell(player, row, col, '#FF0000')
            return true
        }
    }
    return false
}

function cellClickHandler(row, col) {
    if (!victory && field[row][col] === EMPTY) {
        if (currMoveCount % 2 === 0) {
            field[row][col] = CROSS;
            if (checkVictory(CROSS, row, col)) {
                victory = true;
                setTimeout(()=>alert('CROSS победил!'), 100);
            } else {
                renderSymbolInCell(CROSS, row, col);
            }
        } else {
            field[row][col] = ZERO;
            if (checkVictory(ZERO, row, col)) {
                victory = true;
                setTimeout(()=>alert('ZERO победил!'), 100);
            } else {
                renderSymbolInCell(ZERO, row, col);
            }
        }
        currMoveCount += 1;
        if (currMoveCount === moveCount && !victory) {
            alert('Победила дружба!');
        }
    }

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
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            field[i][j] = EMPTY;
            renderSymbolInCell(EMPTY, i, j);
        }
    }
    victory = false;
    currMoveCount = 0;

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
