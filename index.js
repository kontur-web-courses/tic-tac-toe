const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let arr = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]
let TURN = 0;
const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
    TURN = 0;
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

    if (TURN % 2 === 0) {
        if (arr[row][col] === -1) {
            TURN += 1;
            renderSymbolInCell(ZERO, row, col);

            console.log(`Clicked on cell: ${row}, ${col}`);
            arr[row][col] = ZERO;
            if (arr[row][0] === arr[row][1] && arr[row][1] === arr[row][2]){
                setTimeout(() => alert("Победили нолики"));
            }
            if (arr[0][col] === arr[1][col] && arr[1][col] === arr[2][col]){
                setTimeout(() => alert("Победили нолики"));
            }
            if (arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2] && TURN >= 3){
                setTimeout(() => alert("Победили нолики"));
            }
            if (arr[2][0] === arr[1][1] && arr[1][1] === arr[0][2] && TURN >= 3){
                setTimeout(() => alert("Победили нолики"));
            }
        }
    } else {
        if (arr[row][col] === -1) {
            TURN += 1;
            renderSymbolInCell(CROSS, row, col);

            console.log(`Clicked on cell: ${row}, ${col}`);
            arr[row][col] = CROSS;
            if (arr[row][0] === arr[row][1] && arr[row][1] === arr[row][2]){
                setTimeout(() => alert("Победили крестики"));
            }
            if (arr[0][col] === arr[1][col] && arr[1][col] === arr[2][col] ){
                setTimeout(() => alert("Победили крестики"));
            }
            if (arr[2][0] === arr[1][1] && arr[1][1] === arr[0][2] && TURN >= 3){
                setTimeout(() => alert("Победили крестики"));
            }
            if (arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2] && TURN >= 3){
                setTimeout(() => alert("Победили крестики"));
            }
        }

    }
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
    if (TURN === 9){
        setTimeout(() => alert("Победила дружба!"));
    }
}

function end(){
    if (TURN === 9){
        setTimeout(() => alert("Победила дружба!"));
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
