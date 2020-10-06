const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let field =[];
let player = CROSS;
let freeCells;
let dimension;
let win = false;

const container = document.getElementById('fieldWrapper');

startGame();
dimension = +prompt('Введите размерность поля','3');
startGame(dimension);
addResetListener();

function startGame () {
    renderGrid(dimension);
    freeCells = dimension ** 2;
    //field = [[EMPTY, EMPTY, EMPTY],[EMPTY, EMPTY, EMPTY],[EMPTY, EMPTY, EMPTY]];

    for (let i = 0; i < dimension; i++) {
        let rows = [];
        rows.length = dimension;
        rows.fill(EMPTY,0,dimension);
        field.push(rows);
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
    if(field[row][col] !== EMPTY)
        return;
    //console.log(`Clicked on cell: ${row}, ${col}`);
    renderSymbolInCell(player, row, col);
    field[row][col] = player;
    
    if (--freeCells <= 0){
        alert('Победила дружба!');
    };
    
    let count = 0;
    let cells = [];
    for (let i = 0; i < dimension;i++){
        for (let j = 0; j < dimension;j++){
            if (field[i][j] === player){
                count++;
                if (count === dimension){
                    alert('Победил ' + player);
                    return;
                }
            }
            else {
                count = 0;
            }
        }
    }

    for (let i = 0; i< dimension;i++){
        for (let j = 0; j < dimension;j++){
            if (field[j][i] === player){
                count++;
                if (count === dimension){
                    alert('Победил ' + player);
                    return;
                }
            }
            else {
                count = 0;
            }
        }
    }

    for (let i = 0; i< dimension;i++){
        for (let j = 0; j < dimension;j++){
            if (i === j){
                if (field[i][j] === player){
                    count++;
                    if (count === dimension){
                        alert('Победил ' + player);
                        return;
                    }
                }
                else {
                    count = 0;
                }
            }
            
        }
    }

    for (let i = 0; i< dimension;i++){
        for (let j = 0; j < dimension;j++){
            if (Math.abs(i-dimension - 1) === j){
                if (field[i][j] === player){
                    let obj = {x:i, y:j};
                    cells.push(obj);
                    if (cells.length === dimension){
                        alert('Победил ' + player);
                        brush(cells);                        
                        return;
                    }
                }
                else {
                    cells.length = 0;
                }
            }
        }
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
    startGame();
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
