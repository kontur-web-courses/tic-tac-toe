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

    if (!gameWon) {
        if (field[row][col] === EMPTY){
            field[row][col] = currentPlayer;
            transposedField[col][row] = currentPlayer;
            renderSymbolInCell(currentPlayer, row, col);
            gameWon = checkRowsAndColumns() || gameWon;
            gameWon = checkDiagonals() || gameWon;


            console.log(gameWon);
            if (gameWon) {
                colorWins(row, col)
            }

            console.log(gameWon);
            currentTurn +=1;
            swapPlayers();
        }

        if (currentTurn === 9 && !gameWon) {
            alert('Победила дружба!!!! ураураура11!1!');
        }
    }


}

function colorWins(row, col) {
    let columnCoordinates = []
    let rowCoordinates = []
    let mainDiagonal = []
    let sideDiagonal = []
    for (let i = 0; i < 3; i++){
        let rowTile = field[row][i]
        if (rowTile == currentPlayer){
            columnCoordinates.push([row, i])
        }

        let columnTile = field[i][col]
        if (columnTile == currentPlayer) {
            rowCoordinates.push([i, col])
        }

        let mainTile = field[i][i]
        if (mainTile == currentPlayer) {
            mainDiagonal.push([i, i])
        }

        let sideTile = field[i][2-i]
        if (sideTile == currentPlayer) {
            sideDiagonal.push([i,2-i])
        }

    }

    if (columnCoordinates.length === 3) {
        for (let elem of columnCoordinates) {
            renderSymbolInCell(currentPlayer, elem[0], elem[1], '#ff0000')
        }
    }

    if (rowCoordinates.length === 3) {
        for (let elem of rowCoordinates) {
            renderSymbolInCell(currentPlayer, elem[0], elem[1], '#ff0000')
        }
    }

    if (mainDiagonal.length === 3) {
        for (let elem of mainDiagonal) {
            renderSymbolInCell(currentPlayer, elem[0], elem[1], '#ff0000')
        }
    }


    if (sideDiagonal.length === 3) {
        for (let elem of sideDiagonal) {
            renderSymbolInCell(currentPlayer, elem[0], elem[1], '#ff0000')
        }
    }
}


function checkRowsAndColumns(){
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
            }

            if (columnCurrentTile != currentPlayer) {
                columnBreakFlag = false;
            }
        }

        if (columnBreakFlag || rowBreakFlag) {
            alert(`Победил ${currentPlayer}`)
            return true;
        }
    }

    return false;
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
        return true;
    }
    return false;
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
    gameWon = false;

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
