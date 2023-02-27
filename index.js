const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let motion = 0;
let arr = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
];


startGame();
addResetListener();

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
    if (arr[row][col] === EMPTY) {
        if (motion % 2 === 0) {
            renderSymbolInCell(ZERO, row, col);
            arr[row][col] = ZERO;
            motion++;
            isWinner(ZERO)
        } else {
            renderSymbolInCell(CROSS, row, col);
            arr[row][col] = CROSS;
            motion++;
            isWinner(CROSS)
        }
    }
    if (motion === 8){
        alert("Победила дружба");
    }
    console.log(`Clicked on cell: ${row}, ${col}`);
}

function isWinner(symbol){
    if ((arr[0][0] === symbol && arr[0][1] === symbol && arr[0][2] === symbol) ||
    (arr[1][0] === symbol && arr[1][1] === symbol && arr[1][2] === symbol) ||
        (arr[2][0] === symbol && arr[2][1] === symbol && arr[2][2] === symbol) ||
        (arr[0][0] === symbol && arr[1][0] === symbol && arr[2][0] === symbol)||
        (arr[1][1] === symbol && arr[1][0] === symbol && arr[1][2] === symbol) ||
            (arr[0][1] === symbol && arr[1][1] === symbol && arr[2][1] === symbol) ||
        (arr[0][0] === symbol && arr[1][1] === symbol && arr[2][2] === symbol) ||
        (arr[2][0] === symbol && arr[1][1] === symbol && arr[0][2] === symbol))
        alert("Победил " + symbol);
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
    motion = 0;
    arr = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]
    ];
    startGame(3);
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
