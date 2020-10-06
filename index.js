const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

const gameField = [];
let moveCounter = 0;
let isWinner = false;
let moveBot = false;

startGame();
addResetListener();

function startGame() {
    const fieldSize = +prompt('Введите размер игрового поля', '');
    renderGrid(fieldSize);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        gameField.push([]);
        const row = document.createElement('tr');

        for (let j = 0; j < dimension; j++) {
            gameField[i].push(EMPTY);

            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    if (gameField[row][col] === EMPTY && !isWinner && !moveBot) {
        // ----- Для игры с ботом -----

        addSymbol(CROSS, row, col);

        moveBot = true;
        setTimeout(moveRandomBot, 400);

        // ----- Для игры без бота -----

        // if (moveCounter % 2) {
        //     addSymbol(ZERO, row, col);
        // } else {
        //     addSymbol(CROSS, row, col);
        // }

        console.log(`Clicked on cell: ${row}, ${col}`);
        console.log(gameField);
        console.log(moveCounter);
    }

    if (moveCounter === gameField.length ** 2) {
        alert('Победила дружба!');
    }
}

function checkWinner(symbol) {
    const transposeGameField = transpose(gameField);
    const mainDiag = checkMainDiag();
    const secondaryDiag = checkSecondaryDiag();

    for (let i = 0; i < gameField.length; i++) {
        displayWinner(gameField[i], 'horizontal', symbol, i);
        displayWinner(transposeGameField[i], 'vertical', symbol, i);
    }

    displayWinner(mainDiag, 'mainDiag', symbol);
    displayWinner(secondaryDiag, 'secondaryDiag', symbol);
}

function displayWinner(line, position, symbol, index = 0) {
    if (checkLineWinner(line, symbol)) {
        moveCounter = -1;
        isWinner = true;
        paintWinner(index, position);
        alert(`${symbol} выиграл!`);
    }
}

function checkLineWinner(lineArr, symbol) {
    return lineArr.every((value) => value === symbol);
}

function transpose(matrix) {
    return matrix[0].map((_, i) => matrix.map((row) => row[i]));
}

function checkMainDiag() {
    const mainDiag = [];

    for (let i = 0; i < gameField.length; i++) {
        for (let j = 0; j < gameField.length; j++) {
            if (i === j) {
                mainDiag.push(gameField[i][j]);
            }
        }
    }
    return mainDiag;
}

function checkSecondaryDiag() {
    const secondaryDiag = [];

    for (let i = 0; i < gameField.length; i++) {
        for (let j = 0; j < gameField.length; j++) {
            if (i === gameField.length - j - 1) {
                secondaryDiag.push(gameField[i][j]);
            }
        }
    }
    return secondaryDiag;
}

function paintWinner(start, line) {
    switch (line) {
        case 'horizontal':
            for (let i = 0; i < gameField.length; i++) {
                findCell(start, i).style.color = 'red';
            }
            break;

        case 'vertical':
            for (let i = 0; i < gameField.length; i++) {
                findCell(i, start).style.color = 'red';
            }
            break;

        case 'mainDiag':
            for (let i = 0; i < gameField.length; i++) {
                for (let j = 0; j < gameField.length; j++) {
                    if (i === j) {
                        findCell(i, j).style.color = 'red';
                    }
                }
            }
            break;

        case 'secondaryDiag':
            for (let i = 0; i < gameField.length; i++) {
                for (let j = 0; j < gameField.length; j++) {
                    if (i === gameField.length - j - 1) {
                        findCell(i, j).style.color = 'red';
                    }
                }
            }
            break;
    }
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function addSymbol(symbol, row, col) {
    gameField[row][col] = symbol;
    renderSymbolInCell(symbol, row, col);
    checkWinner(symbol);
    moveCounter++;
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
    gameField.length = 0;
    moveCounter = 0;
    isWinner = false;
    startGame();

    console.log('reset!');
}

function moveRandomBot() {
    if (!isWinner && moveCounter !== gameField.length ** 2) {
        const moveX = getRandomInt(gameField.length);
        const moveY = getRandomInt(gameField.length);

        if (gameField[moveX][moveY] === EMPTY) {
            addSymbol(ZERO, moveX, moveY);
        } else {
            moveRandomBot();
        }
    }
    moveBot = false;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
