const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let field = [];
const player = CROSS;
const bot = ZERO;
let isGameOver;
let currentTurnPlayer = player; 

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    let fieldSize = prompt('Введите размер поля');
    for (let i = 0; i < fieldSize; i++) {
        field[i] = []; 
        for (let j = 0; j < fieldSize; j++) {
            field[i][j] = EMPTY;
        }
    }
    renderGrid(fieldSize);
    isGameOver = false;
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
    if (isGameOver) {
        return; 
    }
    if (field[row][col] === EMPTY) {
        console.log(`Clicked on cell: ${row}, ${col}`);
        renderSymbolInCell(player, row, col);
        field[row][col] = player;
        changeTurnPlayer();
        botMove();
        checkWinner(row, col);
        changeTurnPlayer();
    } else { 
        console.log( `Cell ${row}, ${col} is employed`);
    }
}

function getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function botMove () {
    let randomRow = getRandomInt(field.length);
    let randomCol = getRandomInt(field.length); 
    if (field[randomRow][randomCol] === EMPTY) {
        field[randomRow][randomCol] = bot;
        renderSymbolInCell(bot, randomRow, randomCol);
        return; 
    } else {botMove();}
}

function checkWinner (row, col) {
    let freeCells = field.length; 
    if (checkHorisontalWinner(row) || checkVerticalWinner(col) || checkDiagonalWinner()) {
        alert (`Победил ${currentTurnPlayer}!`);
        isGameOver = true;
    } else if (freeCells === 0) {
        alert ('Победила дружба!')
    }
    freeCells--;
}

function checkHorisontalWinner (row) {
    let horizontalValues = {};
    for (let i = 0; i < field[row].length; i++) {
        horizontalValues[field[row][i]] = (horizontalValues[field[row][i]] || 0) + 1;
    }
    if (horizontalValues[player] === field[row].length || horizontalValues[bot] === field[row].length) {
        return true; 
    }
}

function checkVerticalWinner (col) {
    let verticalValues = {};
    for (let i = 0; i < field.length; i++) {
        verticalValues[field[i][col]] = (verticalValues[field[i][col]] || 0) + 1;
    }
    if (verticalValues[CROSS] === field.length || verticalValues[ZERO] === field.length) {
        changeColor(0, col, 1);
        return true; 
    } 
}

function checkDiagonalWinner () {
    let leftDiagonal = {};
    let rightDiagonal = {}; 

    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (i === j) {
                leftDiagonal[field[i][j]] = (leftDiagonal[field[i][j]] || 0) + 1; 
            }
            if (i === 0 && j === field[i].length - 1 || i === field[i].length - 1 && j === 0) {
                rightDiagonal[field[i][j]] = (rightDiagonal[field[i][j]] || 0) + 1;
            } else if (
                i !== field[i].length - 1 && 
                j !== field[i].length - 1 && 
                (i > 0 && j > 0 && field[i][j] === field[i + 1][j - 1])
                ) {
                    rightDiagonal[field[i][j]] = (rightDiagonal[field[i][j]] || 0) + 1;
                }
        }
    }

    if (leftDiagonal[CROSS] === field.length || leftDiagonal[ZERO] === field.length) {
        changeColor(0, 0, 2)
        return true;
    }
    if (rightDiagonal[CROSS] === field.length || rightDiagonal[ZERO] === field.length){
        changeColor(0, 0, 3);
        return true;
    }
}

function changeColor (row, col, typeOfWin) {
    // horizontal win
    if (typeOfWin === 0) {
        for (let i = 0; i < field.length; i++) {
            findCell(row, i).style.color = 'red'; 
        } 
    }
    // vertical win
    if (typeOfWin === 1) {
        for (let i = 0; i < field.length; i++) {
            findCell(i, col).style.color = 'red';
        }
    }
    // left diagonal win
    if (typeOfWin === 2) {
        for (let i = 0; i < field.length; i++) {
            findCell(i, i).style.color = 'red'; 
        }
    }
    // right diagonal win
    if (typeOfWin === 3) {
        for (let i = 0; i < field.length; i++) {
            findCell(field.length - i - 1, i).style.color = 'red'; 
        } 
    }
}

function changeTurnPlayer () {
    currentTurnPlayer = currentTurnPlayer === player ? bot : player;
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
