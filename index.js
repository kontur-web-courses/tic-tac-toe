const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let field = [];
let player = CROSS;
let freeCells;
let dimension;
let winner = [];
let win = false;

const container = document.getElementById('fieldWrapper');

//9* Задание произвольного поля
dimension = +prompt('Введите размерность поля одним числом','3');
startGame(dimension);
addResetListener();

function startGame () {
    if (dimension === 0) dimension = 3;

    renderGrid(dimension);
    freeCells = dimension * dimension;
    // 1 для поля 3x3
    //field = [[EMPTY,EMPTY,EMPTY],[EMPTY,EMPTY,EMPTY],[EMPTY,EMPTY,EMPTY]];

    // 9* создание произвольного поля
    for (let i = 0; i < dimension; i++) {
        let rows = [];
        rows.length = dimension;
        rows.fill(EMPTY,0,dimension);
        field.push(rows);
    }

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
    // 3
    if (field[row][col] !== EMPTY) return;

    // 7
    if (win) return;

    // 2
    renderSymbolInCell(player, row, col);
    field[row][col] = player;

    // 4
    if (--freeCells <= 0){
        alert('Победила дружба!');
    }



    // 5, 6
    let currentPos = field[row][col];

    if(checkRightDiagonal(currentPos) || checkLeftDiagonal(currentPos)
        || checkCols(currentPos, col) || checkRows(currentPos, row)) {
        brush(winner);
        alert(player + ' win!');
        win = true;
    }

    // 2 (смена игрока)
    if (player === CROSS){
        player = ZERO;
    }
    else {
        player = CROSS;
    }

}

function checkRightDiagonal(condition) {
    winner.length = 0;
    let toright = true;
    for (let i = 0; i < dimension; i++) {
        toright &= (field[i][i] === condition);
        winner.push({x:i,y:i});
    }
    return toright;
}

function checkLeftDiagonal(condition) {
    winner.length = 0;
    let toleft = true;
    for (let i = 0; i < dimension; i++) {
        toleft &= (field[dimension-i-1][i] === condition);
        winner.push({x:dimension-i-1,y:i});
    }
    return toleft;
}

function checkCols(condition, col) {
    winner.length = 0;
    let cols = true;
    for (let row=0; row<dimension; row++) {
        cols &= (field[row][col] === condition);
        winner.push({x:row,y:col});
    }
    return cols;
}

function checkRows(condition, row) {
    winner.length = 0;
    let rows = true;
    for (let col=0; col<dimension; col++) {
        rows &= (field[row][col] === condition);
        winner.push({x:row,y:col});
    }
    return rows;
}

function brush (cells){
    for(let i of cells){
        renderSymbolInCell(player, i.x, i.y, 'red');
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
    // 8
    field.length = 0;
    startGame(dimension);
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
