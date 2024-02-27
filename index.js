const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let field;
let turn;
let isEnded;
let winIndicies;
startGame();
addResetListener();

function startGame () {
    renderGrid(3);
    field = [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY];
    turn = 0;
    isEnded = false;
    winIndicies = [];
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

function checkThree(field, a, b, c) {
    if (field[a] === field[b] && field[b] === field[c] && field[a] !== EMPTY) {
        winIndicies = [a, b, c];
        return true;
    }
    return false;
}

function isWin (field) {
    return checkThree(field, 0, 1, 2) || checkThree(field, 3, 4, 5) || checkThree(field, 6, 7, 8) || checkThree(field, 0, 3, 6) ||
        checkThree(field, 1, 4, 7) || checkThree(field, 2, 5, 8) || checkThree(field, 0, 4, 8) || checkThree(field, 2, 4, 6);
}

function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (isEnded === true || field[row * 3 + col] !== EMPTY) {
        return;
    }    
    if (turn === 0) {
        field[row * 3 + col] = ZERO;
        renderSymbolInCell(ZERO, row, col);

    }
    else {
        field[row * 3 + col] = CROSS;
        renderSymbolInCell(CROSS, row, col);

    }
    if (isWin(field)) {
        for (let i in winIndicies){
            renderSymbolInCell(turn === 0 ? ZERO : CROSS, Math.floor(winIndicies[i] / 3) , winIndicies[i] % 3, 'red')
        }
        alert(`${turn + 1}-ый игрок победил!`);
        isEnded = true;
    } else if (field.indexOf(EMPTY) === -1) {
        alert(`Победила дружба!`);
        isEnded = true;
    }
    turn = (turn+1)%2;

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
