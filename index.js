const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let field;
const SIZE = 3;

startGame();
addResetListener();

function startGame() {
    renderGrid(SIZE);
    field = [];
    for (let i = 0; i < SIZE; i++) {
        field.push([]);
        for (let j = 0; j < SIZE; j++) {
            field[i].push(EMPTY);
        }
    }

    field.next = CROSS;
    field.emptyCount = SIZE * SIZE;
    field.gameOver = false;
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
    if (field.gameOver) {
        return;
    }
    if (field[row][col] === EMPTY) {
        field[row][col] = field.next;
        field.emptyCount--;
        renderSymbolInCell(field.next, row, col);
        const winner = hasWinner(row, col);
        if (winner[0]) {
            field.gameOver = true;
            for (const cell of winner[1]){
                renderSymbolInCell(field.next, cell[0], cell[1], '#f00');
            }
            alert(field.next);
        }
        field.next = field.next === CROSS ? ZERO : CROSS;
        if (field.emptyCount === 0) {
            field.gameOver = true;
            alert('Победила дружба!');
        }
    }
}

function hasWinner(row, col) {
    let hasWinner = true;

    let line = [];
    let coor = []

    for (let i = 0; i < SIZE; i++) {
        line.push(field[row][i]);
        coor.push([row, i])
    }
    if (line.every(e => e == line[0] && e !== EMPTY)) {
        return [true, coor];
    }

    line = [];
    coor = [];
    for (let i = 0; i < SIZE; i++) {
        line.push(field[i][col]);
        coor.push([i, col])
    }
    if (line.every(e => e == line[0] && e !== EMPTY)) {
        return [true, coor];
    }

    line = [];
    coor = [];
    for (let i = 0; i < SIZE; i++) {
        line.push(field[i][i]);
        coor.push([i, i]);
    }
    if (line.every(e => e == line[0] && e !== EMPTY)) {
        return [true, coor];
    }

    line = [];
    coor = [];
    for (let i = 0; i < SIZE; i++) {
        line.push(field[i][SIZE - i - 1]);
        coor.push([i, SIZE - i - 1]);
    }
    if (line.every(e => e == line[0] && e !== EMPTY)) {
        return [true, coor];
    }
    return [false, []]
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
    startGame();
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
