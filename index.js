const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let whoIsStepping = 0
let moves = ''
let steps = 0
let crosssteps = ''
let zerosteps = ''
let endOfGameFlag = false
let xWinline = ''
let oWinLine = ''
let oFlag = false
const container = document.getElementById('fieldWrapper');
const winCombinationsArray = ['001020', '011121', '021222', '000102', '101112', '202122', '001122', '201102']
startGame();
addResetListener();

function startGame () {
    renderGrid(3);
    moves = ''
    crosssteps = ''
    zerosteps = ''
    steps = 0
    whoIsStepping = 0
    endOfGameFlag = false
    xWinline = ''
    oWinLine = ''
    oFlag = false
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
    if (endOfGameFlag)
        return
    console.log(`Clicked on cell: ${row}, ${col}`)
    let makeStep = false
    let arr = String(row) + String (col)
    for (let j = 0; j < moves.length+2;j+=2)
        if (moves.slice(j, j + 2) === arr)
            makeStep = true
    if (!makeStep)
    {
        moves+=arr
        if (whoIsStepping % 2 === 0)
        {
            renderSymbolInCell(ZERO, row, col)
            zerosteps += String(row) + String (col)
            oFlag = true
            if (zerosteps.length>=6)
                if(checkForWin(zerosteps, oWinLine)){
                    for (let i = 0; i < oWinLine.length; i+=2)
                        renderSymbolInCell(ZERO,oWinLine[i], oWinLine[i+1], '#FF0000')
                    alert('КРУГЛЫЙ ПОБЕДИЛ')
                    endOfGameFlag = true}
        }
        else
        {
            renderSymbolInCell(CROSS, row,col)
            crosssteps += String(row) + String(col)
            oFlag = false
            if (crosssteps.length>=6)
                if (checkForWin(crosssteps, xWinline)){
                    for (let i = 0; i < xWinline.length; i+=2)
                        renderSymbolInCell(CROSS, xWinline[i], xWinline[i+1], '#FF0000')
                    alert('КРЕСТОВЫЙ ПОБЕДИЛ')
                    endOfGameFlag = true}
        }
        whoIsStepping++
        steps++
    }
    if (steps===9)
        alert('Победила дружба')
}
function checkForWin(checkingSteps, winArr)
{
    let winCount = 0
    winArr = ''
    for (let i = 0; i < winCombinationsArray.length; i++)
        for (let z = 0; z < checkingSteps.length; z+=2)
            for (let j = 0; j < checkingSteps.length; j += 2)
            {
                if (winCombinationsArray[i].slice(j, j + 2).includes(checkingSteps.slice(z, z + 2)))
                {
                    winArr += checkingSteps.slice(z, z + 2)
                    winCount++
                    if (winCount === 3) {
                        oFlag ? oWinLine = winArr : xWinline = winArr
                        return true
                    }
                }
                if (z === checkingSteps.length - 2 && winCount !== 3)
                {
                    winArr = ''
                    winCount = 0
                }

    }
    return false
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
