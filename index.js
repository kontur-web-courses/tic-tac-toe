const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

class Rule {
    constructor(d) {
        this.d = d;
        this.full = new Array(2 * d + 2).fill(0);
        this.rowIdx = 0;
        this.colIdx = d;
        this.mainDiagIdx = 2 * d;
        this.antiDiagIdx = 2 * d + 1;
    }

    setValue(row, col, value) {
        this.full[this.rowIdx + row] = value;
        this.full[this.colIdx + col] = value;
        if (row == col)
            this.full[this.mainDiagIdx] = value;
        if (this.d - 1 - row == col)
            this.full[this.antiDiagIdx] = value;
    }

    turnChanges(row, col, modifier = 1) {
        this.full[this.rowIdx + row] += modifier;
        this.full[this.colIdx + col] += modifier;
        if (row == col)
            this.full[this.mainDiagIdx] += modifier;
        if (this.d - 1 - row == col)
            this.full[this.antiDiagIdx] += modifier;
    }

    isWinState(row, col) {
        if (Math.abs(this.full[this.rowIdx + row]) == this.d || 
        Math.abs(this.full[this.colIdx + col]) == this.d || 
        Math.abs(this.full[this.mainDiagIdx]) == this.d || 
        Math.abs(this.full[this.antiDiagIdx]) == this.d) {
            return true;
        }
        return false;
    }


    findTurn(ignoreValue = Number.NEGATIVE_INFINITY) {
        rowIdxs = [];
        colIdxs = [];
        usingMain = this.full[this.mainDiagIdx] != ignoreValue;
        usingAnti = this.full[this.antiDiagIdx] != ignoreValue;
        for (let i = 0; i < 2 * this.d; i++) {
            if (i < this.colIdx && this.full[i] != ignoreValue)
                rowIdxs.push(i);
            else if (this.full[i + this.colIdx] != ignoreValue)
                colIdxs.push(i - this.colIdx);
        }
    }
}


let field;
let xTurn;
let endState;
let turnCount;
let multiPlayerRules;
let dim;

startGame();
addResetListener();

function startGame () {
    dim = Number(prompt("Enter dimension", 3));
    field = [];
    for (let i = 0; i < dim; i++)
        field.push(new Array(dim).fill(EMPTY));

    xTurn = true;
    endState = false;
    turnCount = 0;
    multiPlayerRules = new Rule(dim);
    renderGrid(dim);
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
    // Пиши код тут
    if (!endState && field[row][col] == EMPTY) {

        renderSymbolInCell(xTurn ? CROSS : ZERO, row, col);

        field[row][col] = xTurn ? CROSS : ZERO;

        turnCount += 1;

        multiPlayerRules.turnChanges(row, col, xTurn ? 1 : -1);

        endState = (multiPlayerRules.isWinState(row, col) || (turnCount == dim ** 2));

        if (endState) {
            if (multiPlayerRules.isWinState(row, col))
                alert(`${xTurn ? "X" : "O"} won!`);
                //paint here
            else
                alert("DRAW!");
            return;
        }

        xTurn = !xTurn;
        // console.log(endState, multiPlayerRules.full, row, col)
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
    console.log('reset!');
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
