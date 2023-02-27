const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const field = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
]

const container = document.getElementById('fieldWrapper');

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
let player = 'first';
let counter = 0;
let limit = 9;
let winner = EMPTY;

function cellClickHandler(row, col) {
    if (field[row][col] === EMPTY && winner === EMPTY) {
        counter += 1;
        if (player === 'first') {
            renderSymbolInCell(CROSS, row, col);
            field[row][col] = CROSS;
            player = 'second';
        } else {
            renderSymbolInCell(ZERO, row, col);
            field[row][col] = ZERO;
            player = 'first';
        }
        winner = findWinner();
        if (winner !== EMPTY) {
            for (let i in field) {
                for (let j in field) {
if (field[i][j] === winner) {
    renderSymbolInCell(winner, i, j, '#f00');
}
                }
            }
        }
        if (counter === limit) {
            alert('Победила дружба!!!!!!');
        }
    }
    console.log(`Clicked on cell: ${row}, ${col}`);


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function findWinner() {
    for (let i in field) {
        let thing = field[i][0];
        if (thing === EMPTY) {
            continue;
        }
        let isWin = true;
        for (let j in field[i]) {
            if (field[i][j] !== thing) {
                isWin = false;
                break;
            }
        }
        if (isWin) {
            alert('Поздравляем ' + thing);
            return thing;
        }
    }
    for (let i in field) {
        let thing = field[0][i];
        if (thing === EMPTY) {
            continue;
        }
        let isWin = true;
        for (let j in field[i]) {
            if (field[j][i] !== thing) {
                isWin = false;
                break;
            }
        }
        if (isWin) {
            alert('Поздравляем ' + thing);
            return thing;
        }
    }
    let thing = field[0][0];
    if (thing != EMPTY) {
        isWin = true;
        for (let i in field) {
            if (field[i][i] != thing) {
                isWin = false;
                break
            }
        }
        if (isWin) {
            alert('Поздравляем ' + thing);
            return thing;
        }
    }
    thing = field[0][field.length - 1];
    if (thing !== EMPTY) {
        isWin = true;
        for (let i in field) {
            if (field[i][field.length - i - 1] != thing) {
                isWin = false;
                break
            }
        }
        if (isWin) {
            alert('Поздравляем ' + thing);
            return thing;
        }
    }
    return EMPTY;
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
    for (let i in field) {
        for (let j in field) {
            renderSymbolInCell(EMPTY, i, j);
            field[i][j] = EMPTY;
        }
    }
    counter = 0;
    player = 'first';
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
