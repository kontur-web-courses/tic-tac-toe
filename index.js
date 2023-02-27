const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let winnerExist = false;
const container = document.getElementById('fieldWrapper');
let field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY],[EMPTY, EMPTY, EMPTY]];
let currentMove = CROSS;

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
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
    if (field[row][col] === EMPTY && !winnerExist) {
        renderSymbolInCell(currentMove, row, col);
        winnerExist = checkWinner(row, col);
        currentMove = currentMove === CROSS ? ZERO : CROSS;

        console.log(`Clicked on cell: ${row}, ${col}`);
        if (!winnerExist) {
            let flag = false;
            for (let row of field) {
                for (let col of row) {
                    if (col === EMPTY) {
                        flag = true;
                    }
                }
            }
            if (!flag) {
                alert('Победила дружба')
            }
        } else {
            alert(field[row][col] + ' wins');
        }
    }
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}



function checkWinner(row, col) {

    if (field[row][0] === field[row][1] && field[row][1] === field[row][2]){
        for (let i = 0; i < 3; i++)
            renderSymbolInCell(field[row][i], row, i, '#FF0000');
        return true;
    }

    if (field[0][col] === field[1][col] && field[1][col] === field[2][col]){
        for (let i = 0; i < 3; i++)
            renderSymbolInCell(field[i][col], i, col, '#FF0000');
        return true;
    }
    if ((row + col) % 2 === 0){
        if ( row === 1 && col === 1 ){
            return checkMainDiagonal() || checkSecondDiagonal();
        } else {
            if (row === col) {
                return checkMainDiagonal();
            } else {
                return checkSecondDiagonal();
            }
        }
    }
    return false;
}

function checkMainDiagonal(){
    if (field[0][0] === field[1][1] && field[1][1] === field[2][2]) {
        for (let i = 0; i < 3; i++) {
            renderSymbolInCell(field[i][i], i, i, '#FF0000');
        }
    }

    return (field[0][0] === field[1][1] && field[1][1] === field[2][2]);
}

function checkSecondDiagonal() {
    if (field[2][0] === field[1][1] && field[1][1] === field[0][2]) {
        for (let i = 0; i < 3; i++) {
            renderSymbolInCell(field[i][2-i], i, 2-i, '#FF0000');
        }
    }
    return  (field[2][0] === field[1][1] && field[1][1] === field[0][2]);
}
function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col)
    targetCell.textContent = symbol;
    targetCell.style.color = color;
    field[row][col] = symbol;
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
    field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY],[EMPTY, EMPTY, EMPTY]];
    winnerExist = false;
    currentMove = CROSS;
    console.log('reset!');
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
