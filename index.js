const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const SIZE = 5;

let FIELD;
let curPlayer = 0;
let filledCells = 0;
let gameOver = false;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(SIZE);
}

function initField(size) {
    FIELD = [];
    for (let i = 0; i < size; i++) {
        let buf = [];
        for (let j = 0; j < size; j++) {
            buf[j] = EMPTY;
        }
        FIELD.push(buf);
    }
}

function renderGrid (dimension) {
    initField(dimension);
    gameOver = false;
    filledCells = 0;

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

function checkRow(row) {
    const first = FIELD[row][0];
    if (first === EMPTY) {
        return EMPTY;
    }
    
    for (let i = 1; i < FIELD[row].length; i++) {
        if (FIELD[row][i] !== first) {
            return EMPTY;
        }
    }

    return first;
}

function checkColumn(col) {
    const first = FIELD[0][col];
    if (first === EMPTY) {
        return EMPTY;
    }
    
    for (let i = 1; i < FIELD.length; i++) {
        if (FIELD[i][col] !== first) {
            return EMPTY;
        }
    }

    return first;
}

function checkDiagonal(main) {
    let startX;
    let step;

    if (main) {
        startX = 0;
        step = 1;
    } else {
        startX = FIELD[0].length - 1;
        step = -1;
    }

    const first = FIELD[0][startX];
    if (first === EMPTY) {
        return EMPTY;
    }

    let x = startX;
    let y = 0;

    for (let i = 0; i < FIELD.length; i++) {
        if (FIELD[y][x] !== first) {
            return EMPTY;
        }

        x += step;
        y++;
    }

    return first;
}

function getWinner() {
    for (let i = 0; i < FIELD.length; i++) {
        let results = [];
        results.push(checkColumn(i));
        results.push(checkRow(i));
        results.push(checkDiagonal(i % 2 === 0));

        for (let res of results) {
            if (res !== EMPTY) {
                return res;
            }
        }
    }

    return EMPTY;
}

function winCheck() {
    let winner = getWinner();
    if (winner !== EMPTY) {
        alert(winner);
        gameOver = true;
        colorWinner();
    } else if (filledCells === FIELD.length * FIELD.length) {
        alert('Победила дружба');
        gameOver = true;
    }
}

function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (gameOver) {
        return;
    }

    if (FIELD[row][col] === EMPTY) {
        // const symbol = (curPlayer % 2 === 0) ? CROSS : ZERO;
        FIELD[row][col] = CROSS;
        renderSymbolInCell(CROSS, row, col);
        winCheck();

        if (gameOver) {
            return;
        }

        const aiMove = getAiMove();
        FIELD[aiMove.row][aiMove.col] = ZERO;
        renderSymbolInCell(ZERO, aiMove.row, aiMove.col);
        winCheck();
    }

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function randint(max) {
    return Math.floor(Math.random() * max);
}

function getAiMove() {
    let x;
    let y;
    while (1) {
        x = randint(FIELD.length);
        y = randint(FIELD.length);
        if (FIELD[y][x] === EMPTY) {
            console.log(y, x);
            return {row: y, col: x};
        }
    }
}

function colorWinner() {
    const winner = getWinner();
    for (let i = 0; i < FIELD.length; i++) {
        for (let j = 0; j < FIELD.length; j++) {
            if (FIELD[i][j] === winner) {
                renderSymbolInCell(winner, i, j, "red");
            }
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
    startGame();
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
