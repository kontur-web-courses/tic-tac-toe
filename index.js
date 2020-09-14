const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
const field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]]
let num = 0;
let gameOver = false;

startGame();
addResetListener();

function startGame() {
    renderGrid(3);
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
        }
        container.appendChild(row);
    }
}

function isCross() {
    return num % 2 === 1;
}


function checkDiagonal() {
    
    if (field[0][0] === field[1][1]&&field[1][1] === field[2][2]) {
        if (field[1][1] != EMPTY) {
            renderSymbolInCell(field[0][0], 0, 0, '#f00');
            renderSymbolInCell(field[1][1], 1, 1, '#f00');
            renderSymbolInCell(field[2][2], 2, 2, '#f00')
        }
        return field[1][1];
    }

    if (field[0][2] === field[1][1]&& field[1][1]=== field[3][0]) {
        if (field[1][1] != EMPTY) {
            renderSymbolInCell(field[0][2], 0, 2, '#f00');
            renderSymbolInCell(field[1][1], 1, 1, '#f00');
            renderSymbolInCell(field[3][0], 3, 0, '#f00')
        }
        return field[1][1];
    }
    return EMPTY;
}

function showWinner(winner) {
    if (winner != EMPTY) {
        gameOver = true;
        alert(winner);
    }
}

function isWinnerWasFound() {
    let winner = checkDiagonal();
    showWinner(winner);
    winner = checkLineVirt();
    showWinner(winner);
    winner = checkLineGor();
    showWinner(winner);
}
function checkLineVirt() {
    for (let i = 0; i < 3; i++) {
        if (field[i][0] === field[i][1]&&field[i][1] === field[i][2]) {
            if (field[i][0] != EMPTY) {
                for (let s = 0; s < 3; s++) {
                    renderSymbolInCell(field[i][0], i, s, '#f00')
                }
            }
            return (field[i][0]);
        }        
    }
    return EMPTY;
}
function checkLineGor() {
    for (let i = 0; i < 3; i++) {
        if (field[0][i] === field[1][i] && field[1][i] === field[2][i]) {
            for (let s = 0; s < 3; s++) {
                renderSymbolInCell(field[0][i], s, i, '#f00')
            }
            return field[0][i];
        }
    }
    return EMPTY;
}
function cellClickHandler(row, col) {
    if (!gameOver && field[row][col] == EMPTY) {
        field[row][col] = isCross() ? CROSS : ZERO;
        renderSymbolInCell(field[row][col], row, col)
        num++;
        isWinnerWasFound();
    }
    
    if (num === 9) {
        alert("Победила дружба");
    }
    console.log(`Clicked on cell: ${row}, ${col}`);


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
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
    for (let i = 0; i < 3; i++) {     
        for (let j = 0; j < 3; j++){
            field[i][j] = EMPTY;
        } 
    }
    gameOver = false;
    num = 0;
    renderGrid(3);
    console.log('reset!');
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
