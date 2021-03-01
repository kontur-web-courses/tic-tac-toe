const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
const desk = [[] , [], []];
let turn = 0;
let winner = null;

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
    console.log(desk[row][col])
    if (desk[row][col] !== undefined) {
        return
    }
    if (turn % 2 === 0) {
        renderSymbolInCell(ZERO, row, col);
        desk[row][col] = ZERO;
        turn += 1;
    }
    else {
        renderSymbolInCell(CROSS, row, col);
        desk[row][col] = CROSS;
        turn += 1;
    }

    console.log(desk[row]);
    console.log(turn)
    console.log(`Clicked on cell: ${row}, ${col}`);
    checkWin(row, col)
    if (winner !== null) {
        alert(winner)
    }

    if (turn === 9 && winner === null) {
        alert('Победила дружба')
    }

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkWin (row, col) {
    console.log(desk[row][0], desk[row][1], desk[row][2])
    if (desk[row][0] === desk[row][1] && desk[row][2] === desk[row][1]) {
        for (let i = 0; i < 3; i++) {
            renderSymbolInCell(desk[row][i], row, i, '#ff0000')
        }
        winner = desk[row][0]
    }

    if (desk[0][col] === desk[1][col] && desk[2][col] === desk[1][col]) {
        for (let i = 0; i < 3; i++) {
            renderSymbolInCell(desk[i][col], i, col, '#ff0000')
        }
        winner = desk[0][col]
    }

    // С диагоналями вообще жесть

    if (desk[0][0] === desk[1][1] && desk[1][1] === desk[2][2] && desk[0][0] !== undefined) {
        renderSymbolInCell(desk[0][0], 0, 0, '#ff0000')
        renderSymbolInCell(desk[1][1], 1, 1, '#ff0000')
        renderSymbolInCell(desk[2][2], 2, 2, '#ff0000')
        winner = desk[0][0]
    }

    if (desk[0][2] === desk[1][1] && desk[1][1] === desk[2][0] && desk[0][2] !== undefined) {
        renderSymbolInCell(desk[0][2], 0, 2, '#ff0000')
        renderSymbolInCell(desk[1][1], 1, 1, '#ff0000')
        renderSymbolInCell(desk[2][0], 2, 0, '#ff0000')
        winner = desk[0][2]
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
