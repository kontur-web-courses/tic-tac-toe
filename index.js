const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let currentMove = 0;
const field = [];
let winnerIndices = [];
let isGameEnded = false;

const container = document.getElementById('fieldWrapper');

let size = +prompt("Введите размер поля", 3);
startGame();
addResetListener();

function startGame () {
    renderGrid(size);
    createField(size);
    // testDraw();
}

function createField (size) {
    for (let i = 0; i < size; i++) {
        field.push([]);
        for (let j = 0; j < size; j++) {
            field[i].push(EMPTY);
        }
    }
}

function getCell (row, col) {
    return field[row][col];
}

function setCell (value, row, col) {
    field[row][col] = value;
}

function checkWinner () {
    [d1, d2] = [[], []]
    for (let i = 0; i < size; i++) {
        row = field[i];
        col = [];
        for (let j = 0; j < size; j++) {
            col.push(field[j][i]);
        }
        if (row.every(cell => cell == CROSS) || row.every(cell => cell == ZERO)) {
            for (let j = 0; j < size; j++) {
                winnerIndices.push([i, j]);
            }
            return true;
        }
        if (col.every(cell => cell == ZERO) || col.every(cell => cell == CROSS)) {
            for (let j = 0; j < size; j++) {
                winnerIndices.push([j, i]);
            }
            return true;
        }
        d1.push(field[i][i]);
        d2.push(field[size - i - 1][i]);
    }
    if (d1.every(cell => cell == CROSS) || d1.every(cell => cell == ZERO)) {
        for (let i = 0; i < size; i++) {
            winnerIndices.push([i, i]);
        }
        return true;
    }
    if (d1.every(cell => cell == CROSS) || d1.every(cell => cell == ZERO)) {
        for (let i = 0; i < size; i++) {
            winnerIndices.push([size - i - 1, i]);
        }
        return true;
    }
    return false;
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

function changeWinnerCellsColor () {
    for (let index of winnerIndices) {
        [row, col] = index;
        cell = findCell(row, col);
        cell.style.color = 'red';
    }
}

function endGame () {
    isGameEnded = true;
    let winner = currentMove % 2 === 1 ? CROSS : ZERO;
    changeWinnerCellsColor();
    alert(`Победил игрок ${winner}!`);
}

function cellClickHandler (row, col) {
    if (getCell(row, col) != EMPTY || isGameEnded) {
        return;
    }
    currentMove++;
    
    if (currentMove % 2 == 1) {
        renderSymbolInCell(CROSS, row, col);
        setCell(CROSS, row, col);
    }
    else {
        renderSymbolInCell(ZERO, row, col);
        setCell(ZERO, row, col);
    }
    if (checkWinner()) endGame();
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
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            setCell(EMPTY, row, col);
            renderSymbolInCell(EMPTY, row, col);
            winnerIndices = [];
        }
    }
    isGameEnded = false;
    currentMove = 0;
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
