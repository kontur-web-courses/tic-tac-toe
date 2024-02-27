const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let sizeGameField = prompt("Введите размер поля", "3");
sizeGameField = sizeGameField !== null ? Number(sizeGameField) : 3;
let gameField = initField(sizeGameField);
let strokeNumber = 0;
let winner = null;


startGame(sizeGameField);
addResetListener();

function initField(size) {
    let field = [];
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row[j] = EMPTY;
        }
        field.push(row);
    }
    return field;
}

function startGame (size) {
    renderGrid(size);
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

function cellClickHandler (row, col) {
    // Пиши код тут
    if (gameField[row][col] !== EMPTY || winner !== null) {
        return
    }

    if (strokeNumber % 2 === 0) {
        renderSymbolInCell(ZERO, row, col);
        gameField[row][col] = ZERO;
        strokeNumber += 1;
    } else {
        renderSymbolInCell(CROSS, row, col);
        gameField[row][col] = CROSS;
        strokeNumber += 1;
    }
    console.log(`Clicked on cell: ${row}, ${col}`);

    winner = searchWinner(row, col);
    if (winner !== null) {
        alert(`Победиииииииил игрооооооок с ${winner}`);
    }

    if (strokeNumber === (sizeGameField * sizeGameField) && winner === null) {
        alert('Победила дружба!');
    }
}

function searchWinner (row, col) {
    let figurePlayer = gameField[row][col];
    if (checkWinInRow(gameField, row, figurePlayer)) {
        for (let i = 0; i < sizeGameField; i++) {
            renderSymbolInCell(gameField[row][i], row, i, '#ff0000');
        }

        return figurePlayer;
    }

    if (checkWinInColumn(gameField, col, figurePlayer)) {
        for (let i = 0; i < sizeGameField; i++) {
            renderSymbolInCell(gameField[i][col], i, col, '#ff0000');
        }

        return figurePlayer;
    }

    if (checkWinInMainDiagonal(gameField, figurePlayer)) {
        for (let i = 0; i < sizeGameField; i++) {
            renderSymbolInCell(gameField[i][i], i, i, '#ff0000');
        }

        return figurePlayer;
    }

    if (checkWinInsideDiagonal(gameField, figurePlayer)) {
        for (let i = 0; i < sizeGameField; i++) {
            renderSymbolInCell(gameField[i][sizeGameField - 1 - i], i, sizeGameField - 1 - i, '#ff0000');
        }

        return figurePlayer;
    }

    return null;
}

function checkWinInRow (gameField, row, figurePlayer) {
    return gameField[row].every(sym => sym === figurePlayer);
}

function checkWinInColumn (gameField, col, figurePlayer) {
    for (let i = 0; i < sizeGameField; i++) {
        if (gameField[i][col] !== figurePlayer) {
            return false;
        }
    }

    return true;
}

function checkWinInMainDiagonal (gameField, figurePlayer) {
    for (let i = 0; i < sizeGameField; i++) {
        if (gameField[i][i] !== figurePlayer) {
            return false;
        }
    }

    return true;
}

function checkWinInsideDiagonal (gameField, figurePlayer) {
    for (let i = 0; i < sizeGameField; i++) {
        if (gameField[i][sizeGameField - 1 - i] !== figurePlayer) {
            return false;
        }
    }

    return true;
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
    initStartTools();
    console.log('reset!');
    startGame(sizeGameField);
    addResetListener();
}

function initStartTools(){
    sizeGameField = prompt("Введите размер поля", "3");
    sizeGameField = sizeGameField !== null ? Number(sizeGameField) : 3;
    gameField = initField(sizeGameField);
    strokeNumber = 0;
    winner = null;
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
