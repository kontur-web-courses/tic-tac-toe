const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

let gameField = {
    dimension: 3,
    field: [],
    resetField(newDim = 3) {
        this.dimension = newDim;
        this.field = [];
        for(let i = 0; i < this.dimension; i++){
            this.field.push([]);
            for (let j = 0; j < this.dimension; j++) {
                this.field[i].push(EMPTY);
                
            }
        }
    },
    makeMove(symbol, row, col) {
        console.log(this.field);
        if (this.field[row][col] != EMPTY) {

            return;
        }
        this.field[row][col] = symbol;
    },
    evaluateFrom(row, col) {
        let symbol = this.field[row][col];
        console.log("symbol: ", symbol);
        let winMoves = [[row, col]];

        let rowSum = 1;
        for (const mr of [1, 2]) {
            for (let f = 0; f < 2; f++) {
                let r = row + mr * (f % 2 == 0 ? -1 : 1);
                if (r < 0 || r >= this.dimension) {
                    continue;
                }
                if (this.field[r][col] == symbol) {
                    winMoves.push([r, col]);
                    rowSum++;
                    console.log("Found rowSum: ", rowSum);
                    if (rowSum == 3) {
                        return winMoves;
                    }
                } else {
                    continue;
                }
            }
        }

        winMoves = [[row, col]];
        let colSum = 1;
        for (const mc of [1, 2]) {
            for (let f = 0; f < 2; f++) {
                let c = col + mc * (f % 2 == 0 ? -1 : 1);
                if (c < 0 || c >= this.dimension) {
                    continue;
                }
                if (this.field[row][c] == symbol) {
                    winMoves.push([row, c]);
                    colSum++;
                    console.log("Found colSum: ", colSum);
                    if (colSum == 3) {
                        return winMoves;
                    }
                } else {
                    continue;
                }
            }
        }

        winMoves = [[row, col]];
        let diag = 1;
        for (const mc of [1, 2]) {
            for (let f = 0; f < 2; f++) {
                let d = mc * (f % 2 == 0 ? -1 : 1);
                let r = row + d;
                let c = col + d;
                if (r < 0 || r >= this.dimension || c < 0 || c >= this.dimension) {
                    continue;
                }
                if (this.field[r][c] == symbol) {
                    winMoves.push([r, c]);
                    diag++;
                    console.log("Found diag: ", diag);
                    if (diag == 3) {
                        return winMoves;
                    }
                } else {
                    continue;
                }
            }
        }

        winMoves = [[row, col]];
        let mainDiag = 1;
        for (const mc of [1, 2]) {
            for (let f = 0; f < 2; f++) {
                let d = mc * (f % 2 == 0 ? -1 : 1);
                let r = row + d;
                let c = col - d;
                if (r < 0 || r >= this.dimension || c < 0 || c >= this.dimension) {
                    continue;
                }
                if (d < 0 || d >= this.dimension) {
                    continue;
                }
                if (this.field[r][c] == symbol) {
                    winMoves.push([r, c]);
                    mainDiag++;
                    console.log("Found mainDiag: ", mainDiag);
                    if (mainDiag == 3) {
                        return winMoves;
                    }
                } else {
                    continue;
                }
            }
        }

        return [];
    },
    
}

let gameOver = false;
let moveNumber = 0;

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
    
    if (moveNumber == 0) {
        gameField.resetField();
    } else if (gameOver) {
        return;
    }
    
    let symbol = moveNumber % 2 == 0 ? CROSS : ZERO;
    
    renderSymbolInCell(symbol, row, col);
    gameField.makeMove(symbol, row, col);
    
    let winMoves = gameField.evaluateFrom(row, col);
    let win = winMoves.length > 1;
    if (win) {
        gameOver = true;
        for(const [wRow, wCol] of winMoves) {
            renderSymbolInCell(symbol, wRow, wCol, "#ff0000");
        }
        setTimeout(alert, 0, `Игрок ${moveNumber % 2 == 0 ? 1 : 2} победил!`);
    } else if (moveNumber == 8) {
        gameOver = true;
        setTimeout(alert, 0, `Победила дружба`);
    }
    moveNumber++;
    console.log(`Clicked on cell: ${row}, ${col}`);


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
    gameField.resetField();
    moveNumber = 0;
    gameOver = false;
    for(let i = 0; i < gameField.dimension; i++){
        for (let j = 0; j < gameField.dimension; j++) {
            renderSymbolInCell(EMPTY, i, j);
            
        }
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
