const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let turnCount = 0;
let field =
    [EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY,
    EMPTY, EMPTY, EMPTY];

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
    // Пиши код тут
    let currSymbol = currentPlayer();
    if (field[3 * row + col] === EMPTY) {
        field[3 * row + col] = currSymbol;
        renderSymbolInCell(currSymbol, row, col);
        turnCount++;
        let winner = checkWinner();
        if (winner === CROSS) {
            setTimeout(() => alert('Победил Х'), 2);
        }
        if (winner === ZERO) {
            setTimeout(() => alert('Победил O'), 2);
        }
        if (!checkTurns()) {
            setTimeout(() => alert('Победила дружба'), 2);
        }
    }
    else {
        alert('Ты не пройдешь')
    }
    console.log(`Clicked on cell: ${row}, ${col}`);

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkTurns(){
    return field.includes(EMPTY);
}

function checkWinner() {
    let n = Math.sqrt(field.length);
    let oDiagonalWins = 0;
    let xDiagonalWins = 0;
    for (let i = 0; i < n * n; i += n + 1) {
        if (field[i] === CROSS) {
            xDiagonalWins++;
        }
        if (field[i] === ZERO) {
            oDiagonalWins++;
        }
    }
    if (oDiagonalWins === n) {
        return ZERO;
    }
    if (xDiagonalWins === n) {
        return CROSS;
    }
    oDiagonalWins = 0;
    xDiagonalWins = 0;
    for (let i = n - 1; i < n * n - 1; i += n - 1) {
        if (field[i] === CROSS) {
            xDiagonalWins++;
        }
        if (field[i] === ZERO) {
            oDiagonalWins++;
        }
    }
    if (oDiagonalWins === n) {
        return ZERO;
    }
    if (xDiagonalWins === n) {
        return CROSS;
    }
    for (let i = 0; i < n; i++) {
        let xCountRows = 0;
        let oCountRows = 0;
        let xCountColumns = 0;
        let oCountColumns = 0;
        for (let j = 0; j < n; j++) {
            if (field[i * 3 + j] === CROSS) {
                xCountRows++;
            } else {
                if (field[i * 3 + j] === ZERO)
                    oCountRows++;
            }
            if (field[j * 3 + i] === CROSS) {
                xCountColumns++;
            } else {
                if (field[j * 3 + i] === ZERO)
                    oCountColumns++;
            }
        }
        if (xCountColumns === n) {
            return CROSS;
        }
        if (xCountRows === n) {
            return CROSS;
        }
        if (oCountColumns === n) {
            return ZERO;
        }
        if (oCountRows === n) {
            return ZERO;
        }
    }
    return EMPTY;

}
function currentPlayer() {
    return turnCount % 2 === 0 ? CROSS : ZERO;
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
    let n = Math.sqrt(field.length);
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            field[3 * i + j] = EMPTY;
            renderSymbolInCell(EMPTY, i, j);
        }
    }

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
