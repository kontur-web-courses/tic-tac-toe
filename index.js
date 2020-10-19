const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
let player = CROSS;
const container = document.getElementById('fieldWrapper');
let dimension = 3;
let freeCells;

startGame();
addResetListener();

function startGame() {
    renderGrid(dimension);
    freeCells = dimension ** 2;
    field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
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
    if (field[row][col] !== EMPTY) {
        return;} 
    // console.log(`Clicked on cell: ${row}, ${col}`);
    renderSymbolInCell(player, row, col);
    field[row][col] = player;
   
    if (--freeCells <= 0){
        alert('Победила дружба!');
    };
    
    let count = [];
    let cells = []
    
    for (let i = 0; i <= 2; i++){
        for (let j = 0; j <= 2; j++){
            if (field[i][j] === player){
                count++;
                if (count === 3){
                    alert('Победил '+ player);
                    brush(count);
                    return;
                }
            }
            else{
                count = 0;
            }
            field[i][j]
        }
    }

    for (let i = 0; i <= 2; i++){
        for (let j = 0; j <= 2; j++){
            if (field[j][i] === player){
                count++;
                if (count === 3){
                    alert('Победил '+ player);
                    brush(count);
                    return;
                }
            }
            else{
                count = 0;
            }
            field[i][j]
        }
    }

    for (let i = 0; i <= 2; i++){
        for (let j = 2; j >= 0; j--){
            if (i === j){
                if (field[i][j] === player){
                    let obj = {x:i, y:j};
                    cells.push(obj);
                    if (cells.length === 3){
                        alert('Победил '+ player);
                        brush(cells);
                        return;
                    }
                }
                else{
                    cells.length = 0;
                }
            }
        }
    }

    for (let i = 0; i <= 2; i++){
        for (let j = 0; j <= 2; j++){
            if (Math.abs(i-2) === j){
                if (field[i][j] === player){
                    let obj = {x:i, y:j};
                    cells.push(obj);
                    if (cells.length === 3){
                        alert('Победил '+ player);
                        brush(cells);
                        return;
                    }
                }
                else{
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

function brush(cells){
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
    startGame ();
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
