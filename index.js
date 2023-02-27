const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const NO = 'No';

const container = document.getElementById('fieldWrapper');
let grid = [];

startGame();
addResetListener();

function startGame () {
    renderGrid(4);
    createGrid(4)
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
    for(let i = 0; i < grid.size(); i++){
        let countZero = 0;
        let countCross = 0;
        for(let j of grid[i]) {
            if (j === ZERO)
                countZero++;
            if (j === CROSS)
                countCross++;
        }

        if (array.size() === countZero)
            return ZERO
        if (array.size() === countCross)
            return CROSS
    }


    for(let i = 0; i < grid.size(); i++){
        let countZero = 0;
        let countCross = 0;
        for(let j = 0; j < grid.size(); j++) {
            if (grid[j][i] === ZERO)
                countZero++;
            if (grid[j][i] === CROSS)
                countCross++;
        }

        if (array.size() === countZero)
            return ZERO
        if (array.size() === countCross)
            return CROSS
    }

    let countZero = 0;
    let countCross = 0;

    for(let i = 0; i < grid.size(); i++) {
        if (grid[i][i] === ZERO)
            countZero++;
        if (grid[i][i] === CROSS)
            countCross++;
    }

    if (array.size() === countZero)
        return ZERO
    if (array.size() === countCross)
        return CROSS

    return NO;
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
