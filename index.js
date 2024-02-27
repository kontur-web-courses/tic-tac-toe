const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let FIELD = [];
let PLAYER = true;
let STEPS = 0;
let SIZE;

startGame();
addResetListener();

function startGame() {
    renderGrid(3);
}

function renderGrid(dimension) {
    STEPS = dimension * dimension;
    SIZE = dimension;
    for (let i = 0; i < dimension; i++) {
        FIELD[i] = [];
        for (let j = 0; j < dimension; j++) {
            FIELD[i][j] = EMPTY;
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
    if (FIELD[row][col] !== EMPTY || getWinner()) {
			return;
		}
    if (STEPS === 0) {
			alert('Победила дружба');
			return;
		}
    FIELD[row][col] = PLAYER ? CROSS : ZERO;
    renderSymbolInCell(FIELD[row][col], row, col);
    PLAYER = !PLAYER;
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
    for (let i = 0; i < SIZE; i++) {
        let win = true;
        let winner = FIELD[i][0];
        let points = [[i, 0]];
        if (winner === EMPTY) {
            break;
        }
        for (let j = 1; j < SIZE; j++) {
            win = (winner === FIELD[i][j]);
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
    return [undefined];
}

function checkColumn() {
    for (let i = 0; i < SIZE; i++) {
        let win = true;
        let winner = FIELD[0][i];
        let points = [[0, i]];
        if (winner === EMPTY) {
            break;
        }
        for (let j = 1; j < SIZE; j++) {
            points[j] = [j, i];
            win = (winner === FIELD[j][i]);
            if (!win) {
                break;
            }
        }
        if (win) {
            return [winner, points];
        }
    }
    return [undefined];
}

function checkDiagonals() {
    let win = true;
    let winner = FIELD[0][0];
    let points = [[0, 0]];
    if (winner !== EMPTY) {
        for (let i = 1; i < SIZE; i++) {
            points[i] = [i, i];
            win = (winner === FIELD[i][i]);
            if (!win) {
                break;
            }
        }
        if (win) {
            return [winner, points];
        }
    }
    win = true;
    winner = FIELD[0][SIZE - 1];
    points = [[0, SIZE - 1]];
    if (winner !== EMPTY) {
        for (let i = 1; i < SIZE; i++) {
            points[i] = [i, SIZE - 1 - i];
            win = (winner === FIELD[i][SIZE - 1 - i]);
            if (!win) {
                break;
            }
        }
        if (win) {
            return [winner, points];
        }
    }
    return [undefined];
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
    FIELD = [];
    PLAYER = true;
	STEPS = 0;
    for (let i = 0; i < SIZE; i++){
        for (let j = 0; j < SIZE; j++){
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
