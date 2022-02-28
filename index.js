const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let grMem = new gridMem();
const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame() {
    renderGrid(3);
}

class gridMem {
    field = [[EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]];
    isEnd = false;
    isDraw = false;
    winner = undefined;
    turnCount = 0;
    turnValue = CROSS

    addTurn(x, y) {
        if (this.field[x][y] !== EMPTY) {
            return false;
        }
        this.turnCount++;
        this.field[x][y] = this.turnValue;
        this.checkEnd(x, y);
        return true;
    }

    swapSymbol(){
        this.turnValue = this.turnValue === CROSS ? ZERO : CROSS;
    }

    checkEnd(x, y) {

        let flagY = true;
        let flagX = true;
        for (let i = 0; i < 3; i++) {
            if (this.field[i][y] !== this.turnValue)
                flagY = false;
            if (this.field[x][i] !== this.turnValue)
                flagX = false;
        }
        let flagDp = false;
        let flagDm = false;
        if (x === y) {
            flagDp = true;
            for (let i = 0; i < 3; i++) {
                if (this.field[i][i] !== this.turnValue)
                    flagDp = false;
            }
        }
        if (x === 2 - y) {
            flagDm = true;
            for (let i = 0; i < 3; i++) {
                if (this.field[i][2 - i] !== this.turnValue)
                    flagDm = false;
            }
        }
        if (flagY || flagX || flagDp || flagDm) {
            this.winner = this.turnValue;
            this.isEnd = true;
            return;
        }
        if (this.turnCount === 3 ** 2) {
            this.isEnd = true;
            this.isDraw = true;
        }
    }
}

function renderGrid(dimension) {
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

function cellClickHandler(row, col) {
    let resultFlag = grMem.addTurn(row, col);
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (resultFlag) {
        renderSymbolInCell(grMem.turnValue, row, col);
        grMem.swapSymbol()
    }

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    console.log('reset!');
}


/* Test Function */

/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
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

function clickOnCell(row, col) {
    findCell(row, col).click();
}
