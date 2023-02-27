const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let field;
let turn = 1;
const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame() {
    field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]]
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
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    const t = turn % 2 === 0 ? ZERO : CROSS;
    if (field[row][col] === EMPTY) {
        field[row][col] = t;
        renderSymbolInCell(t, row, col);
        turn++;
    }
    const winner = checkWinner();
    console.log(winner)
    if (winner[0]) {
        renderSymbolInCell(t, winner[1][0], winner[1][1],"red");
        renderSymbolInCell(t, winner[2][0], winner[2][1],"red");
        renderSymbolInCell(t, winner[3][0], winner[3][1],"red");
        setTimeout(() => alert(`Win ${t}`));
    }
    if (turn === 10) {
        setTimeout(() => alert('Ничья! :D'));
    }
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if ([field[i][0], field[i][1], field[i][2]].every(v => v !==EMPTY && v===field[i][2])) {
            return [true, [i, 0], [i, 1], [i, 2]];
        }
        if ([field[0][i], field[1][i], field[2][i]].every(v => v !==EMPTY && v===field[0][i])) {
            return [true, [0, i], [1, i], [2, i]];
        }
    }
    if ([field[0][0], field[1][1], field[2][2]].every(v => v !==EMPTY && v===field[0][0])) {
        return [true, [0, 0], [1, 1], [2, 2]];
    }
    if ([field[0][2], field[1][1], field[2][0]].every(v => v !==EMPTY && v===field[0][2])) {
        return [true, [0, 2], [1, 1], [2, 0]];
    }
    return [false, 0, 0, 0];
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
