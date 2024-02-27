
const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

class Field {

    constructor() {
        this.state = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
        this.moves = 0;
    }

    MarkAs(row, col) {
        if (this.state[row][col] !== ' ' || this.IsWin()) {
            return null;
        }

        if (this.moves % 2 === 0) {
            this.state[row][col] = CROSS;
            if (this.IsWin()) {
                return CROSS;
            }
        } else {
            this.state[row][col] = ZERO;
            if (this.IsWin()) {
                return ZERO;
            }
        }
        this.moves++;
        if (this.moves === 9) {
            return EMPTY;
        }
        return null;
    }

    IsWin () {
        for (let i = 0; i < 2; i++) {
            if ((this.state[i][0] === this.state[i][1]) && (this.state[i][1] === this.state[i][2])) {
                if (this.state[i][0] !== EMPTY) {
                    return true;
                }
            }
            if ((this.state[0][i] === this.state[1][i]) && (this.state[1][i] === this.state[2][i])) {
                if (this.state[0][i] !== EMPTY) {
                    return true;
                }
            }
        }
        if ((this.state[0][0] === this.state[1][1]) && (this.state[1][1] === this.state[2][2])) {
            if (this.state[0][0] !== EMPTY) {
                return true;
            }
        }
        if ((this.state[2][0] === this.state[1][1]) && (this.state[1][1] === this.state[0][2])) {
            if (this.state[2][0] !== EMPTY) {
                return true;
            }
        }
        return false;
    }
}

let grid = new Field();
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
    const targetCell = findCell(row, col);
    let winSymbol = grid.MarkAs(row, col);
    if (targetCell.textContent === EMPTY) {
        console.log(`Clicked on cell: ${row}, ${col}`);
        let symbol = grid.state[row][col];
        renderSymbolInCell(symbol, row, col);
    }
    if (winSymbol === CROSS) {
        alert('Победили крестики');
    } else if (winSymbol === ZERO) {
        alert('Победили нолики');
    } else if (winSymbol === EMPTY) {
        alert('Победила дружба');
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
    grid = new Field();
    startGame();
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