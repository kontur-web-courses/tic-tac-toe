const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let field = [];
let player = true;
let steps = 0;
let size;

startGame();
addResetListener();

function startGame() {
    renderGrid(3);
}

function renderGrid(dimension) {
    steps = dimension * dimension;
    size = dimension;
    for (let i = 0; i < dimension; i++) {
        field[i] = [];
        for (let j = 0; j < dimension; j++) {
            field[i][j] = EMPTY;
        }
    }
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
    if (field[row][col] !== EMPTY || getWinner()) {
			return;
		}
    if (steps === 0) {
			alert('Победила дружба');
			return;
		}
    field[row][col] = player ? CROSS : ZERO;
    renderSymbolInCell(field[row][col], row, col);
    player = !player;
    let winner = getWinner();
    console.log(winner);
    if (winner) {
        let winnerPoints = checkRow()[1] || checkColumn()[1] || checkDiagonals()[1];
        console.log(winner);
        for (let item of winnerPoints) {
			findCell(item[0], item[1]).style.color = 'red';
		}
        alert(winner);
    }

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function getWinner() {
    return checkRow()[0] || checkColumn()[0] || checkDiagonals()[0];
}

function checkRow() {
    for (let i = 0; i < size; i++) {
        let win = true;
        let winner = field[i][0];
        let points = [[i, 0]];
        if (winner === EMPTY) {
            continue;
        }
        for (let j = 1; j < size; j++) {
            win = (winner === field[i][j]);
            points[j] = [i, j]
            console.log(win);
            if (!win) {
                break;
            }
        }
        if (win) {
            return [winner, points];
        }
    }
    return [false];
}

function checkColumn() {
    for (let i = 0; i < size; i++) {
        let win = true;
        let winner = field[0][i];
        let points = [[0, i]];
        if (winner === EMPTY) {
            continue;
        }
        for (let j = 1; j < size; j++) {
            points[j] = [j, i];
            win = (winner === field[j][i]);
            if (!win) {
                break;
            }
        }
        if (win) {
            return [winner, points];
        }
    }
    return [false]
}

function checkDiagonals() {
    let win = true;
    let winner = field[0][0];
    let points = [[0, 0]];
    if (winner !== EMPTY) {
        for (let i = 1; i < size; i++) {
            points[i] = [i, i];
            win = (winner === field[i][i]);
            if (!win) {
                break;
            }
        }
        if (win) {
            return [winner, points];
        }
    }
    win = true;
    winner = field[0][size - 1];
    points = [[0, size - 1]];
    if (winner !== EMPTY) {
        for (let i = 1; i < size; i++) {
            points[i] = [i, size - 1 - i];
            win = (winner === field[i][size - 1 - i]);
            if (!win) {
                break;
            }
        }
        if (win) {
            return [winner, points];
        }
    }
    return [false]
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
    field = [];
    player = true;
	steps = 0;
    for (let i = 0; i < size; i++){
        for (let j = 0; j < size; j++){
            renderSymbolInCell(' ', i, j);
        }
    }
    renderGrid(3);
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
