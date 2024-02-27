const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let moves = 0;
let currentPlayer = CROSS;
let container = document.getElementById('fieldWrapper');
dimension = 3
let winning = false;

startGame();
addResetListener();

function startGame() {
    renderGrid(dimension);
    winning = false;
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
            if (winning){
                break;
            }
        }
        if (winning){
            break;
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    const cell = findCell(row, col);

    if (cell.textContent === EMPTY) {
        renderSymbolInCell(currentPlayer, row, col);
        moves++;

        if (checkWin(currentPlayer, row, col) || moves === dimension * dimension) {
            if (checkWin(currentPlayer, row, col)) {
                alert(`${currentPlayer} wins!`);
                markWinningCells(currentPlayer);
            } else {
                alert("Победила дружба!");
            }
            container.removeEventListener('click', cellClickHandler);
            winning = true;
        }

        currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
    }
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
    dimension = 3;
    currentPlayer = CROSS;
    moves = 0;
    console.log('reset!');

    startGame();
}

function checkWin(symbol, row, col) {
    return checkHorizontal(symbol, row) || checkVertical(symbol, col) || checkDiagonal(symbol, row, col);
}

function checkHorizontal(symbol, row) {
    const targetRow = container.querySelectorAll('tr')[row];
    return Array.from(targetRow.children).every(cell => cell.textContent === symbol);
}

function checkVertical(symbol, col) {
    const rows = container.querySelectorAll('tr');
    return Array.from(rows).every(row => row.children[col].textContent === symbol);
}

function checkDiagonal(symbol, row, col) {
    if (row === col || row + col === dimension - 1) {
        return checkMainDiagonal(symbol) || checkAntiDiagonal(symbol);
    }
    return false;
}

function checkMainDiagonal(symbol) {
    const rows = container.querySelectorAll('tr');
    return Array.from(rows).every((row, index) => row.children[index].textContent === symbol);
}

function checkAntiDiagonal(symbol) {
    const rows = container.querySelectorAll('tr');
    return Array.from(rows).every((row, index) => row.children[dimension - index - 1].textContent === symbol);
}

function markWinningCells(symbol) {
    const rows = container.querySelectorAll('tr');

    Array.from(rows).forEach(row => {
        if (Array.from(row.children).every(cell => cell.textContent === symbol)) {
            Array.from(row.children).forEach(cell => cell.style.color = 'red');
        }
    });

    for (let col = 0; col < dimension; col++) {
        const verticalCells = Array.from(rows).map(row => row.children[col]);
        if (verticalCells.every(cell => cell.textContent === symbol)) {
            verticalCells.forEach(cell => cell.style.color = 'red');
        }
    }

    if (checkMainDiagonal(symbol)) {
        Array.from(rows).forEach((row, index) => row.children[index].style.color = 'red');
    } else if (checkAntiDiagonal(symbol)) {
        Array.from(rows).forEach((row, index) => row.children[dimension - index - 1].style.color = 'red');
    }
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
