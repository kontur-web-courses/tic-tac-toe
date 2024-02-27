const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let board = [];
let currentPlayer = CROSS;
let currentState = 'game';
let movesLeft;
startGame();
addResetListener();

function startGame () {
    board = []
    renderGrid(3);
    movesLeft = 9;
    currentState = 'game';
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        board.push([]);
        for (let j = 0; j < dimension; j++) {
            board[i].push(EMPTY);
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    if (currentState === 'game over')
        return;
    if (board[row][col] === EMPTY) {
        renderSymbolInCell(currentPlayer, row, col);
        board[row][col] = currentPlayer;
        --movesLeft;
        if (checkAndHighlightWinner()) {
            const winner = currentPlayer === CROSS ? 'Крестики' : 'Нолики';
            alert(`${winner} выиграли`);
            currentState = 'game over'
        }
    }
    if (movesLeft === 0) {
        alert('Победила дружба');
    }
    currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
}

function checkAndHighlightWinner() {
    let check = false;
    for (let col = 0; col < 3; ++col) {
        check = true;
        for (let row = 0; row < 3; ++row) {
            check &&= board[row][col] === currentPlayer;
        }
        if (check) {
            highlightRowOrColumn(false, col);
            return true;
        }
    }
    for (let row = 0; row < 3; ++row) {
        check = true;
        for (let col = 0; col < 3; ++col) {
            check &&= board[row][col] === currentPlayer;
        }
        if (check) {
            highlightRowOrColumn(true, row);
            return true;
        }
    }
    check = true;
    for (let i = 0; i < 3; ++i) {
        check &&= board[i][i] === currentPlayer;
    }
    if (check) {
        highlightDiagonal(true);
        return true;
    }

    check = true;
    for (let i = 0; i < 3; ++i) {
        check &&= board[i][2 - i] === currentPlayer;
    }
    if (check) {
        highlightDiagonal(false);
        return true;
    }
    return check;
}

function highlightDiagonal(main = true){
    if(main){
        for(let i = 0; i < 3; i++){
            findCell(i, i).style.color = 'red';
        }
    }
    else{
        for(let i = 0; i < 3; i++){
            findCell(i, 2 - i).style.color = 'red';
        }
    }
}

function highlightRowOrColumn(row = true, number) {
    if (row) {
        for (let i = 0; i < 3; i++) {
            findCell(number, i).style.color = 'red';
        }
    }
    else {
        for (let i = 0; i < 3; i++) {
            findCell(i, number).style.color = 'red';
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
