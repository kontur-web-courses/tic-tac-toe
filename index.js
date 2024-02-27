const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let currentPlayer = CROSS;

const container = document.getElementById('fieldWrapper');
let dimension = 3;
let isActive = false;

startGame();
addResetListener();
addStartListener();

function startGame () {
    renderGrid(dimension);
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
    isActive = true;
}

function cellClickHandler (row, col) {
    if (!isActive){
        return;
    }
    const cellContent = findCell(row, col).textContent;
    if (cellContent !== EMPTY) {
        return;
    }
    renderSymbolInCell(currentPlayer, row, col);
    if (checkWinner(row, col)) {
        highlightWinner(row, col);
        const winner = currentPlayer;
        setTimeout(function() {
            alert(`${winner} победил!`);
        }, 200);
        currentPlayer = null;
        isActive = false;
    } else if (checkDraw()) {
        alert("Победила дружба!");
        currentPlayer = null;
        isActive = false;
    } else {
        currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
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

function addStartListener() {
    const startButton = document.getElementById('start');
    startButton.addEventListener('click', startClickHandler);
}


function startClickHandler() {
    dimension = Number(document.getElementById('fieldSize').value);
    resetClickHandler();
}

function resetClickHandler () {
    currentPlayer = CROSS;
    renderGrid(dimension);
}

function checkWinner (row, col) {
    const symbol = findCell(row, col).textContent;

    let horizontalCount = 0;
    let verticalCount = 0;
    for (let i = 0; i < dimension; i++) {
        if (findCell(row, i).textContent === symbol) horizontalCount++;
        if (findCell(i, col).textContent === symbol) verticalCount++;
    }
    if (horizontalCount === dimension || verticalCount === dimension) return true;

    let diagonal1Count = 0;
    let diagonal2Count = 0;
    for (let i = 0; i < dimension; i++) {
        if (findCell(i, i).textContent === symbol) diagonal1Count++;
        if (findCell(i, dimension - 1 - i).textContent === symbol) diagonal2Count++;
    }
    return diagonal1Count === dimension || diagonal2Count === dimension;
}

function checkDraw () {
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            if (findCell(i, j).textContent === EMPTY) return false;
        }
    }
    return true;
}

function highlightWinner (row, col) {
    const symbol = findCell(row, col).textContent;
    let horizontalCount = 0;
    let verticalCount = 0;
    for (let i = 0; i < dimension; i++) {
        if (findCell(row, i).textContent === symbol) horizontalCount++;
        if (findCell(i, col).textContent === symbol) verticalCount++;
    }
    if (horizontalCount === dimension){
        for (let i = 0; i < dimension; i++) {
            if (findCell(row, i).textContent === symbol) {
                findCell(row, i).style.backgroundColor = 'red';
            }
        }
    }
    else if (verticalCount === dimension){
        for (let i = 0; i < dimension; i++) {
            if (findCell(i, col).textContent === symbol) {
                findCell(i, col).style.backgroundColor = 'red';
            }
        }
    }

    let diagonal1Count = 0;
    let diagonal2Count = 0;
    for (let i = 0; i < dimension; i++) {
        if (findCell(i, i).textContent === symbol) diagonal1Count++;
        if (findCell(i, dimension - 1 - i).textContent === symbol) diagonal2Count++;
    }

    if (diagonal1Count === dimension){
        for (let i = 0; i < dimension; i++) {
            if (findCell(i, i).textContent === symbol) {
                findCell(i, i).style.backgroundColor = 'red';
            }
        }
    }
    else if (diagonal2Count === dimension){
        for (let i = 0; i < dimension; i++) {
            if (findCell(i, dimension - 1 - i).textContent === symbol) {
                findCell(i, dimension - 1 - i).style.backgroundColor = 'red';
            }
        }
    }
}
