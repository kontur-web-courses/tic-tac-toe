const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let field;
let player = CROSS;
let freeCells;
let dimension = 3;
let win = false;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(dimension);
    freeCells = dimension ** 2;
    field = [[EMPTY, EMPTY, EMPTY],[EMPTY, EMPTY, EMPTY],[EMPTY, EMPTY, EMPTY]];
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
    // Пиши код 
    
    if((field[row][col] !== EMPTY) || (win))
        return;
    //console.log(`Clicked on cell: ${row}, ${col}`);
    renderSymbolInCell(player, row, col);
    field[row][col] = player;
    
    if (--freeCells <= 0){
        startGame();
        alert('Победила дружба!');
    };
    
    let cells = [];
    for (let i = 0; i < 3; i++){
        if (field[0][i] == field[1][i] && field[1][i] == field[2][i] && field[2][i] != " ") {
            alert('Победил ' + player);
            cells.push([0, i], [1, i], [2, i]);
            brush(cells);
            win = true;
        }

        else if (field[i][0] == field[i][1] && field[i][1] == field[i][2] && field[i][2] != " ") {
            alert('Победил ' + player);
            cells.push([i, 0], [i, 1], [i, 2]);
            brush(cells);
            win = true;
        }
    }
    
    if (field[0][0] == field[1][1] && field[1][1] == field[2][2] && field[2][2] != " ") {
        alert('Победил ' + player);
        cells.push([0, 0], [1, 1], [2, 2]);
        brush(cells);
        win = true;
    }

    else if (field[0][2] == field[1][1] && field[1][1] == field[2][0] && field[2][0] != " ") {
        alert('Победил ' + player);
        cells.push([0, 2], [1, 1], [2, 0]);
        brush(cells);
        win = true;
    }


    if (player === CROSS){
        player = ZERO;        
    }
    else{
        player = CROSS;
    }
    
   
}

function brush (cells){
    for(var i of cells){
        renderSymbolInCell(player, i[0], i[1], 'red');
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
    win = false;
    player = CROSS;
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
