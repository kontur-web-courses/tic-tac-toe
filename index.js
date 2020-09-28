const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let i = 0
let moves = ''
let steps = 0
let crosssteps = ''
let zerosteps = ''
const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
    moves = ''
    crosssteps = ''
    zerosteps = ''
    i = 0
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
    console.log(`Clicked on cell: ${row}, ${col}`)
    let flag = false
    let arr = String(row) + String (col)
    for (let j = 0; j < moves.length+2;j+=2)
        if (moves.slice(j, j + 2) === arr)
            flag = true
    if (!flag)
    {
        moves+=arr
        if (i % 2 === 0)
        {
            renderSymbolInCell(ZERO, row, col)
            zerosteps = String(row) + String (col)
            if (zerosteps.length>=6)
                if(checkForWin(zerosteps))
                    alert('КРУГЛЫЙ ПОБЕДИЛ')
        }
        else
        {
            renderSymbolInCell(CROSS, row,col)
            crosssteps = String(row) + String(col)
            if (crosssteps.length>=6)
                if (checkForWin(crosssteps))
                    alert('КРЕСТОВЫЙ ПОБЕДИЛ')
        }
        i++
        steps++
    }
    if (steps===9)
        alert('Победила дружба')
}
function checkForWin(checkingSteps)
{

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
    mainArray = []
    startGame()
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
