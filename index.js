const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let turn = 0
let gameGrid = []
let endGameFlag = false
let winner = -1

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
    createGrid(3)
}

function createGrid (dim) {
    gameGrid = new Array(dim);
    for(let i = 0; i < dim; i++) {
        gameGrid[i] = new Array(dim);
        for (let j = 0; j < dim; j++) {
            gameGrid[i][j] = -1;
        }
    }
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

function updateWinner () {
    if (winner !== -1) {
        if (winner === 0) {
            alert('Нолик выиграл!')
        } else {
            alert('Крестик выиграл!')
        }
    }
}

function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);

    if (endGameFlag) {
        return;
    }
    if (turn){
        if (gameGrid[col][row] === -1) {
            renderSymbolInCell(CROSS, row, col);
            gameGrid[col][row] = 1;
            turn = (turn + 1) % 2
        }
    } else {
        if (gameGrid[col][row] === -1) {
            renderSymbolInCell(ZERO, row, col);
            gameGrid[col][row] = 0;
            turn = (turn + 1) % 2
        }
    }
    checkWinCombinations()
    updateWinner()
}

function checkWinCombinations () {
    console.log(`get vertical combination on ${checkVertical()} col`)
    console.log(`get horizontal combination ${checkHorizontal()} row`)
    console.log(`left diagonal ${checkLeftDiagonal()}`)
    console.log(`right diagonal ${checkRightDiagonal()}`)


}

function checkLeftDiagonal() {
    let el = -1
    let pastEl = gameGrid[0][0]

    for (let i = 1; i < gameGrid.length; i++) {
        el = gameGrid[i][i]
        if (el !== pastEl || el === -1) {
            return undefined
        }
    }
    if (gameGrid[0][0] === 0)
        winner = 0
    else {
        winner = 1
    }
    endGameFlag = true
    return 0
}

function checkRightDiagonal () {
    let el = -1
    let pastEl = gameGrid[gameGrid.length - 1][0]

    for (let i = 1; i < gameGrid.length; i++) {
        el = gameGrid[gameGrid.length - 1 - i][i]
        if (el !== pastEl || el === -1) {
            return undefined
        }
    }
    if (gameGrid[gameGrid.length - 1][0] === 0)
        winner = 0
    else {
        winner = 1
    }
    endGameFlag = true
    return 0
}

function checkVertical () {
    for (let i = 0; i < gameGrid.length; i++) {
        let pastEl = gameGrid[i][0]
        let combFlag = true
        let el = -1
        for (let j = 1; j < gameGrid[i].length; j++) {
            el = gameGrid[i][j]
            if (pastEl !== el) {
                combFlag = false;
                break;
            }
            pastEl = el
        }
        if (combFlag && el !== -1) {
            if (gameGrid[i][0] === 0)
                winner = 0
            else {
                winner = 1
            }
            endGameFlag = true
            return i
        }
    }
    return undefined
}

function checkHorizontal () {
    for (let i = 0; i < gameGrid.length; i++) {
        let pastEl = gameGrid[0][i]
        let combflag = true
        let el = -1
        for (let j = 1; j < gameGrid[0].length; j++) {
            el = gameGrid[j][i]
            if (pastEl !== el) {
                combflag = false
                break
            }
            pastEl = el
        }
        if (combflag && el !== -1) {
            if (gameGrid[0][i] === 0)
                winner = 0
            else {
                winner = 1
            }
            endGameFlag = true
            return i
        }
    }
    return undefined
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
    turn = 0
    gameGrid = []
    endGameFlag = false
    winner = -1

    startGame();
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
