const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];

let currentMark = CROSS;

let gameOver = false;

function RenderWinner(marker, ...args) {
    for (let i = 0; i < args.length / 2; i++)
        renderSymbolInCell(marker, args[i * 2], args[i * 2 + 1], '#f00');
    //Чтобы аlert вызывался после отрисовки
    setTimeout(() => SendAlert(marker), 1);
}

function CheckWinner() {
    for (let i = 0; i < 3; i++) {
        if (field[i][0] != EMPTY && field[i][0] === field[i][1] && field[i][1] === field[i][2]) {
            RenderWinner(field[i][0], i, 0, i, 1, i, 2);
            return;
        }
        if (field[0][i] != EMPTY && field[0][i] === field[1][i] && field[1][i] === field[2][i]) {
            RenderWinner(field[0][i], 0, i, 1, i, 2, i);
            return;
        }
    }
    if (field[0][0] != EMPTY && field[0][0] == field[1][1] && field[1][1] == field[2][2]) {
        RenderWinner(field[0][0], 0, 0, 1, 1, 2, 2);
        return;
    }
    if (field[2][0] != EMPTY && field[2][0] == field[1][1] && field[1][1] == field[0][2]) {
        RenderWinner(field[2][0], 2, 0, 1, 1, 0, 2);
        return;
    }
    for (let arr of field)
        if (arr.includes(EMPTY)) return;
    RenderWinner('DRAW');
}

function SendAlert(marker) {
    if (marker == CROSS) {
        alert('Победили Крестики!');
    }
    else if (marker == ZERO) {
        alert('Победили Нолики!');
    }
    else if (marker == 'DRAW') {
        alert('Победила дружба!');
    }
    else throw Error("Некорректные данные");
    console.log('GameOver');
    gameOver = true;
}

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
    if (gameOver || field[row][col] !== EMPTY) return;
    field[row][col] = currentMark;
    renderSymbolInCell(currentMark, row, col);
    currentMark = currentMark == CROSS ? ZERO : CROSS;

    CheckWinner();

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
    console.log('reset!');
    field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
    currentMark = CROSS;
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            renderSymbolInCell(EMPTY, i, j, "#333");
    gameOver = false;
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
