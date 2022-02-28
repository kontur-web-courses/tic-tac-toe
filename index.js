const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let h = 0;
let size = 3;
let crossCountRow = 0;
let zeroCountRow = 0;
let crossCountCol = 0;
let zeroCountCol = 0;
let crossCountD = 0;
let zeroCountD = 0;
let field = [[]];
let gameEnd = false;
const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(size);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        field[i] = [];
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
            field[i][j] = null;
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    // Пиши код тут
    if(!gameEnd){
        if (field[row][col] == null){
            if (h % 2 == 0){
                renderSymbolInCell(CROSS, row, col);
                field[row][col] = 1
            } else{
                renderSymbolInCell(ZERO, row, col);
                field[row][col] = 0
            }
            h++;
            console.log(`Clicked on cell: ${row}, ${col}`);
            for (j in field){
                crossCountRow = 0
                zeroCountRow = 0
                crossCountCol = 0
                zeroCountCol = 0
                for (l in field[j]){
                    if (field[j][l] == 0){
                        zeroCountRow++;
                    }
                    if (field[l][j] == 0){
                        zeroCountCol++;
                    }
                    if (field[j][l] == 1){
                        crossCountRow++;
                    }
                    if (field[l][j] == 1){
                        crossCountCol++;
                    }
                }
                if (crossCountRow == 3 || crossCountCol == 3 || crossCountD == 3){
                    alert("крестики wins")
                    gameEnd = true
                }
                if (zeroCountCol == 3 || zeroCountD == 3 || zeroCountRow == 3){
                    alert("нолики wins")
                    gameEnd = true
                }
            }
            
        }
    }


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
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
    h = 0;
    for (let j= 0; j<size; j++)
        for (let l = 0; l< size; l++){
            renderSymbolInCell(EMPTY, j, l);
            field[j][l] = null
        }
    crossCountRow = 0
    zeroCountRow = 0
    crossCountCol = 0
    zeroCountCol = 0
    gameEnd = false
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
