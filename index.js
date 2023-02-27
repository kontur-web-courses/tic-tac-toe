const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const NO = 'No';
const DIMENSION = 3;

const container = document.getElementById('fieldWrapper');
let grid = [];

startGame();
addResetListener();

function startGame () {
    renderGrid(DIMENSION);
    createGrid(DIMENSION)
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

function checkWinCondition(){
    let arr = [];

    for(let i = 0; i < DIMENSION; i++){
        let countZero = 0;
        let countCross = 0;
        for(let j = 0; j < DIMENSION; j++) {
            arr.push([i, j]);
            if (grid[i][j] === ZERO)
                countZero++;
            if (grid[i][j] === CROSS)
                countCross++;
        }
        console.log(countZero);
        if (DIMENSION === countZero || DIMENSION === countCross)
            return arr
    }
    arr = [];

    for(let i = 0; i < DIMENSION; i++){
        let countZero = 0;
        let countCross = 0;
        for(let j = 0; j < DIMENSION; j++) {
            arr.push([j, i]);
            if (grid[j][i] === ZERO)
                countZero++;
            if (grid[j][i] === CROSS)
                countCross++;
        }
        console.log(countZero);
        if (DIMENSION === countZero || DIMENSION === countCross)
            return arr
    }
    arr = [];
    let countZero = 0;
    let countCross = 0;

    for(let i = 0; i < DIMENSION; i++) {
        arr.push([i, i]);
        if (grid[i][i] === ZERO)
            countZero++;
        if (grid[i][i] === CROSS)
            countCross++;
    }

    if (DIMENSION === countZero || DIMENSION === countCross)
        return arr


    countZero = 0;
    countCross = 0;
    arr = [];
    for(let i = 0; i < DIMENSION; i++) {
        arr.push([DIMENSION - i - 1, i]);
        if (grid[DIMENSION - i - 1][i] === ZERO)
            countZero++;
        if (grid[DIMENSION - i - 1][i] === CROSS)
            countCross++;
    }

    if (DIMENSION === countZero || DIMENSION === countCross)
        return arr

    return false;
}

function createGrid(dimension) {
    for (let i = 0; i < dimension; i++) {
        grid[i] = []
        for (let j = 0; j < dimension; j++) {
            grid[i][j] = EMPTY
        }
    }
}

let parity = false;
function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);


    if(grid[row][col] === EMPTY){
        if(parity){
            grid[row][col] = CROSS;
            renderSymbolInCell(CROSS, row, col, "#c02020")
        } else {
            grid[row][col] = ZERO;
            renderSymbolInCell(ZERO, row, col, "#208020")
        }
    }
    parity = !parity;
    console.log(checkWinCondition());
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
