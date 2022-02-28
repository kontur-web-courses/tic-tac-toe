const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let field;
let turn = 1;
let canPlay = true;

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
    field = [[EMPTY,EMPTY,EMPTY],[EMPTY,EMPTY,EMPTY],[EMPTY,EMPTY,EMPTY]];
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
    if (!canPlay)
        return;
    console.log(`Clicked on cell: ${row}, ${col}`);
    const a = turn % 2 === 0 ? ZERO : CROSS;
    if (field[row][col] === EMPTY) {
        field[row][col] = a;
        renderSymbolInCell(a, row, col); }
    const winner1 = checkWinner(ZERO);
    const winner2 = checkWinner(CROSS);
    if (winner1){
        canPlay = false;
        setTimeout(() => alert('Победили нолики!'), 50)
    }
    else if (winner2) {
        canPlay = false;
        setTimeout(() => alert('Победили крестики!'), 50)
    }
    else {
        turn++;
        if (turn === 10)
        {
            canPlay = false;
            setTimeout(() => alert('Победила дружба! <3'), 50)
        }
    }


}

function checkWinner (value) {
    // 3 горизонтали, 3 вертикали, 2 диагонали
    const value1 = field[0].every( v => v === value );
    const value2 = field[1].every( v => v === value );
    const value3 = field[2].every( v => v === value );
    const value4 = [field[0][0], field[1][0], field[2][0]].every( v => v === value)
    const value5 = [field[0][1], field[1][1], field[2][1]].every( v => v === value)
    const value6 = [field[0][2], field[1][2], field[2][2]].every( v => v === value)
    const value7 = [field[0][0], field[1][1], field[2][2]].every( v => v === value)
    const value8 = [field[0][2], field[1][1], field[2][0]].every( v => v === value)
    if (value1 || value2 || value3 || value4 || value5 || value6 || value7 || value8) {
        return true;
    }
    return false;
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
