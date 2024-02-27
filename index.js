const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let length = 3;
let currentPlayer = CROSS;
let moves = 0;

startGame();
addResetListener();

function startGame() {
    renderGrid(length);
}

function renderGrid(length) {
    container.innerHTML = '';

    for (let i = 0; i < length; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < length; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    const cell = findCell(row, col);

    if (cell.textContent === EMPTY) {
        renderSymbolInCell(currentPlayer, row, col);
        moves++;

        if (checkWin(currentPlayer, row, col) || moves === length * length) {
            if (checkWin(currentPlayer, row, col)) {
                alert(`${currentPlayer} Победил!`);
                markWinningCells(currentPlayer);
                
                
                //startGame();

                // length = 3;
                // currentPlayer = CROSS;
                // moves = 0;

                
                
            } else {
                alert("Победила дружба");
            }

            container.removeEventListener('click', cellClickHandler);
        }

        currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
    }
}



function checkHorizontal(symbol, row) {
    const targetRow = container.querySelectorAll('tr')[row];
    return Array.from(targetRow.children).every(cell => cell.textContent === symbol);
}

function checkVertical(symbol, col) {
    const rows = container.querySelectorAll('tr');
    return Array.from(rows).every(row => row.children[col].textContent === symbol);
}



function checkWin(symbol, row, col) {
    return checkHorizontal(symbol, row) || checkVertical(symbol, col) || checkDiagonal(symbol, row, col);
}

function checkDiagonal(symbol, row, col) {
    if (row === col || row + col === length - 1) {

        const rows = container.querySelectorAll('tr');

        let checkMainDiagonal = Array.from(rows).every((row, index) => row.children[index].textContent === symbol);
        let checkAntiDiagonal = Array.from(rows).every((row, index) => row.children[length - index - 1].textContent === symbol);
        return checkMainDiagonal || checkAntiDiagonal;
    }
    return false;
}


function markWinningCells(symbol) {
    const rows = container.querySelectorAll('tr');

    // Horizontal
    Array.from(rows).forEach(row => {
        if (Array.from(row.children).every(cell => cell.textContent === symbol)) {
            Array.from(row.children).forEach(cell => cell.style.color = 'red');
        }
    });


    for (let col = 0; col < length; col++) {
        const verticalCells = Array.from(rows).map(row => row.children[col]);
        if (verticalCells.every(cell => cell.textContent === symbol)) {
            verticalCells.forEach(cell => cell.style.color = 'red');
        }
    }

    // Diagonal
    if (checkMainDiagonal(symbol)) {
        Array.from(rows).forEach((row, index) => row.children[index].style.color = 'red');
    } else if (checkAntiDiagonal(symbol)) {
        Array.from(rows).forEach((row, index) => row.children[length - index - 1].style.color = 'red');
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
    length = 3;
    currentPlayer = CROSS;
    moves = 0;

    startGame();
}

/* Test Function */
// function testWin() {
//     clickOnCell(0, 0);
//     clickOnCell(1, 1);
//     clickOnCell(0, 1);
//     clickOnCell(1, 2);
//     clickOnCell(0, 2);
// }

// function testDraw() {
//     clickOnCell(1, 1);
//     clickOnCell(0, 0);
//     clickOnCell(0, 2);
//     clickOnCell(1, 2);
//     clickOnCell(2, 0);
//     clickOnCell(2, 2);
//     clickOnCell(2, 1)
// }
