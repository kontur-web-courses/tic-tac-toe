const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
flag = true;
stepsCounter = 0;
winner = "";
winCells = [];


startGame();
addResetListener();

map = [[EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]];

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
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (winCells.length > 0)
        return;
    stepsCounter++;
    let cell = findCell(row, col)
    if (cell.textContent !== EMPTY)
        return;
    if (flag){
        renderSymbolInCell(CROSS, row, col)
        map[row][col] = CROSS;
    } else {
        renderSymbolInCell(ZERO, row, col)
        map[row][col] = ZERO;
    }

    findWinner();
    if (winCells.length > 0){
        for (let e of winCells){
            console.log(e);
           renderSymbolInCell(map[e[0]][e[1]], e[0], e[1], '#FF0000' );
        }
        alert(winner + ' wins!');
    }
    if (stepsCounter === 9)
        alert('Friendship wins!')
    flag = !flag

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
    winCells = [];
    winner = '';
    map = [[EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]];
    stepsCounter = 0;
    flag = true;
    renderGrid(3);
}

function findWinner(){
    for (let i = 0; i < 3; i++){
        if (map[i][2] === map[i][0] && map[i][0] === map[i][1] && map[i][0] !== EMPTY){
            winCells = [[i,0], [i, 1], [i, 2]];
            winner = !flag ? "ZEROS" : "CROSS";
            return;
        } else if (map[2][i] === map[0][i] && map[0][i] === map[1][i] && map[0][i] !== EMPTY) {
            winCells = [[0, i], [1, i], [2, i]];
            winner = !flag ? "ZEROS" : "CROSS";
            return;
        }
    }
    if (map[0][0] === map[1][1] && map[0][0] === map[2][2] && map[0][0] !== EMPTY){
        winCells = [[0,0], [1,1], [2,2]];
        winner = !flag ? "ZEROS" : "CROSS";
        return;
    }
    if (map[0][2] === map[1][1] && map[0][2] === map[2][0] && map[2][0] !== EMPTY){
        winCells = [[2,0], [1,1], [0,2]];
        winner = !flag ? "ZEROS" : "CROSS";
        return;
    }
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
