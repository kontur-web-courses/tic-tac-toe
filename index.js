const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

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

currentPlayer = CROSS;
currentTurn = 0;

function swapPlayers() {
    if (currentTurn % 2 === 0) {
        currentPlayer = CROSS;
    } else {
        currentPlayer = ZERO;
    }
}

field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
transposedField = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
gameWon = false;

function cellClickHandler (row, col) {

    if (field[row][col] === EMPTY){
        field[row][col] = currentPlayer;
        transposedField[col][row] = currentPlayer;
        renderSymbolInCell(currentPlayer, row, col);
        checkRowsAndColumns();
        checkDiagonals();
        currentTurn +=1;
        swapPlayers();
    }

    if (currentTurn === 9) {
        alert('Победила дружба!!!! ураураура11!1!');
    }
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}


function checkRowsAndColumns(){
    let winRow = -1;
    let winColumn = -1;
    for (let i = 0; i < 3; i++) {
        let rowBreakFlag = true;
        let columnBreakFlag = true;
        let row = field[i];
        let column = transposedField[i];
        for (let j = 0; j < 3; j++) {
            const rowCurrentTile = row[j];
            const columnCurrentTile = column[j];

            if (rowCurrentTile != currentPlayer) {
                rowBreakFlag = false;
            } else {
                winRow = i
            }

            if (columnCurrentTile != currentPlayer) {
                columnBreakFlag = false;
                break;
            } else {
                winColumn = j
            }
        }

        console.log(`winRow = ${winRow}`);
        console.log(`winColumn= ${winColumn}`);
        if (columnBreakFlag || rowBreakFlag) {
            alert(`Победил ${currentPlayer}`)
        }
    }

}

function checkDiagonals() {
    let mainFlag = true;
    let sideFlag = true;
    for (let i = 0; i < 3; i++) {
        const mainTile = field[i][i];
        const sideTile = field[i][2-i];

        if (mainTile != currentPlayer) {
            mainFlag = false;
        }

        if (sideTile != currentPlayer) {
            sideFlag = false;
        }
    }

    if (mainFlag || sideFlag) {
        alert(`Победил ${currentPlayer}`)
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
    currentPlayer = CROSS
    currentTurn = 0

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            field[i][j] = EMPTY
            transposedField[j][i] = EMPTY
            renderSymbolInCell(EMPTY, i, j)
        }


    }
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
