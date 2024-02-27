const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let field = [[EMPTY, EMPTY, EMPTY],
                [EMPTY, EMPTY, EMPTY],
                [EMPTY, EMPTY, EMPTY]];

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

let _counter = 0
function cellClickHandler (row, col) {
    // Пиши код тут
    if(!checkWinner()&&checkMove()) {
        let move;
        move = CROSS
        renderSymbolInCell(CROSS, row, col);
        field[row][col] = move
        randomMove();
        checkWinner();
        checkMove();
    }
}

function randomMove () {
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            if (field[i][j] === EMPTY) {
                field[i][j] = ZERO;
                if (!checkWinner(false)) {
                    field[i][j] = EMPTY;
                    continue;
                }
                renderSymbolInCell(ZERO, i, j);
                return;
            }
        }
    }
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            if (field[i][j] === EMPTY) {
                field[i][j] = ZERO;
                renderSymbolInCell(ZERO, i, j);
                return;
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
    field = [[EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]];

    for(let row= 0; row<3; row++)
    {
        for (let column = 0; column<3; column++)
        {
            renderSymbolInCell(EMPTY, row, column);
        }
    }
    _counter = 0;
    alert('reset!');
}

function checkMove() {

    for (let column of field) {
        for (let cell of column) {
            if (cell === EMPTY) {
                return true;
            }
        }
    }

    alert('Победила дружба');
    return false;
}

function checkWinner(draw = true) {
    let winner = false;

    for (let i = 0; i < 3; i++) {
        if (field[i][0] === field[i][1] && field[i][1] === field[i][2] && field[i][2] !== EMPTY) {
            winner = field[i][0];
            if (draw) {
                renderSymbolInCell(winner, i, 0, 'red');
                renderSymbolInCell(winner, i, 1, 'red');
                renderSymbolInCell(winner, i, 2, 'red');
            }
            break;
        }
    }

    for (let i = 0; i < 3; i++) {
        if (field[0][i] === field[1][i] && field[1][i] === field[2][i] && field[2][i] !== EMPTY) {
            winner = field[0][i];
            if (draw) {
                renderSymbolInCell(winner, 0, i, 'red');
                renderSymbolInCell(winner, 1, i, 'red');
                renderSymbolInCell(winner, 2, i, 'red');
            }
            break;
        }
    }

    if (field[0][0] === field[1][1] && field[1][1] === field[2][2] && field[2][2] !== EMPTY) {
        winner = field[0][0];
        if (draw) {
            renderSymbolInCell(winner, 0, 0, 'red');
            renderSymbolInCell(winner, 1, 1, 'red');
            renderSymbolInCell(winner, 2, 2, 'red');
        }
    }

    if (field[2][0] === field[1][1] && field[1][1] === field[0][2] && field[0][2] !== EMPTY) {
        winner = field[0][2];
        if (draw) {
            renderSymbolInCell(winner, 2, 0, 'red');
            renderSymbolInCell(winner, 1, 1, 'red');
            renderSymbolInCell(winner, 0, 2, 'red');
        }
    }

    if (winner) {
        if (draw) {
            alert(`Победитель: ${winner}`);
        }
        return true;
    }

    return false;
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
