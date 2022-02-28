const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const winningConditions =
    [[[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
    ]
let turn = 0;
let wincolor = []
let isWin = false;
let arr = [[0, 0, 0],
           [0, 0, 0],
           [0, 0, 0]];
const container = document.getElementById('fieldWrapper');

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

function getFirstWinner()
{
    for (let winPosition of winningConditions) {
        let count = 0
        for (let pos of winPosition) {
            if (arr[pos[0]][pos[1]] === 1) {
                count += 1
            }
        }
        if (count === 3){
            wincolor = winPosition
            return true
        }
    }
}

function getSecondWinner()
{
    for (let winPosition of winningConditions) {
        let count = 0
        for (let pos of winPosition) {
            if (arr[pos[0]][pos[1]] === 2) {
                count += 1
            }
        }
        if (count === 3){
            wincolor = winPosition
            return true
        }
    }
}

function cellClickHandler (row, col) {
    if (isWin)
        return
    if (arr[row][col] === 0) {
        console.log(`Clicked on cell: ${row}, ${col}`);
        if (turn % 2 === 0) {
            renderSymbolInCell(CROSS, row, col);
            arr[row][col] = 1;
        }
        else {
            renderSymbolInCell(ZERO, row, col);
            arr[row][col] = 2;
        }
        turn += 1;
    }
    let first = getFirstWinner()
    let second = getSecondWinner()
    if (first === true){
        alert('Победил CROSS')
        isWin = true
        for (let x of wincolor)
        {
            renderSymbolInCell(CROSS, x[0], x[1], '#F00')
        }
    }
    if (second === true){
        alert('Победил ZERO')
        isWin = true
        for (let x of wincolor)
        {
            renderSymbolInCell(ZERO, x[0], x[1], '#F00')
        }
    }
    if (turn === 9)
        alert('Победила дружба')

    /* Пользоваться методом для размещения символа в клетке так:
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
    renderGrid(3);
    turn = 0;
    wincolor = []
    isWin = false;
    arr = [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]];
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
