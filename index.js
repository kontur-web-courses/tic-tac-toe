const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let board = [];
let currentPlayer = CROSS;
let currentState = 'game';
dimension = parseInt(prompt('Введи размер игры'));
let movesLeft;
startGame();
addResetListener();

function startGame () {
    board = []
    renderGrid(dimension);
    movesLeft = dimension * dimension;
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
            return;
        }
        if (movesLeft === 0) {
            alert('Победила дружба');
            currentState = 'game over'
            return;
        }
        currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
        let x = getRandomInt(dimension);
        let y = getRandomInt(dimension);
        while (board[x][y] !== EMPTY) {
            x = getRandomInt(dimension);
            y = getRandomInt(dimension);
        }
        renderSymbolInCell(currentPlayer, x, y);
        board[x][y] = currentPlayer;
        --movesLeft;
        if (checkAndHighlightWinner()) {
            const winner = currentPlayer === CROSS ? 'Крестики' : 'Нолики';
            alert(`${winner} выиграли`);
            currentState = 'game over'
            return;
        }
        if (movesLeft === 0) {
            alert('Победила дружба');
            currentState = 'game over'
            return;
        }
        currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
    }

}

function getRandomInt(n) {
    return Math.random() > 0.5 ? (Math.floor(Math.random() * (n - 1))) : 0;
}

function checkAndHighlightWinner() {
    let check = false;
    for (let col = 0; col < dimension; ++col) {
        check = true;
        for (let row = 0; row < dimension; ++row) {
            check &&= board[row][col] === currentPlayer;
        }
        if (check) {
            highlightRowOrColumn(false, col);
            return true;
        }
    }
    for (let row = 0; row < dimension; ++row) {
        check = true;
        for (let col = 0; col < dimension; ++col) {
            check &&= board[row][col] === currentPlayer;
        }
        if (check) {
            highlightRowOrColumn(true, row);
            return true;
        }
    }
    check = true;
    for (let i = 0; i < dimension; ++i) {
        check &&= board[i][i] === currentPlayer;
    }
    if (check) {
        highlightDiagonal(true);
        return true;
    }

    check = true;
    for (let i = 0; i < dimension; ++i) {
        check &&= board[i][dimension - i - 1] === currentPlayer;
    }
    if (check) {
        highlightDiagonal(false);
        return true;
    }
    return check;
}

function highlightDiagonal(main = true){
    if(main){
        for(let i = 0; i < dimension; i++){
            findCell(i, i).style.color = 'red';
        }
    }
    else{
        for(let i = 0; i < dimension; i++){
            findCell(i, dimension - i - 1).style.color = 'red';
        }
    }
}

function highlightRowOrColumn(row = true, number) {
    if (row) {
        for (let i = 0; i < dimension; i++) {
            findCell(number, i).style.color = 'red';
        }
    }
    else {
        for (let i = 0; i < dimension; i++) {
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

function clickOnCell (row, col) {
    findCell(row, col).click();
}
