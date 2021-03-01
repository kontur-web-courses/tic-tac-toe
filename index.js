const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');




function startGame() {
    const observer = new Observer();
    renderGrid(3, observer);
    addResetListener(observer);
}

function renderGrid(dimension, observer) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j, observer));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col, observer) {
    console.log(`Clicked on cell: ${row}, ${col}`);
    let unit = observer.get_symbol();
    renderSymbolInCell(unit, row, col);
    observer.update_field(row, col, unit)
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

function addResetListener(observer) {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', () => resetClickHandler(observer));
}

function resetClickHandler(observer) {
    observer.reset();
    renderGrid(3);
}

class Observer {

    constructor() {
        this.symbols = [CROSS, ZERO];
        this.count = 0;
        this.field = [
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]
        ];
        this.end = false;
    }

    get_symbol() {
        this.count = (this.count + 1) % 2;
        return this.symbols[this.count];
    }

    update_field(i, j, unit) {
        if (this.field[i][j] === EMPTY)
            this.field[i][j] = unit;
        this.check_win(i, j);
    }

    check_win(i, j) {
        let unit = this.field[i][j]
        if (this.field[i][0] === this.field[i][1] && this.field[i][1] === this.field[i][2]) {
            this.end = true;
        } else if (this.field[0][j] === this.field[1][j] && this.field[1][j] === this.field[2][j]) {
            this.end = true;
        } else if (this.field[0][0] === this.field[1][1] && this.field[1][1] === this.field[2][2]) {
            this.end = this.field[0][0] !== EMPTY;
        } else if (this.field[0][2] === this.field[1][1] && this.field[1][1] === this.field[2][0]) {
            this.end = this.field[1][1] !== EMPTY;
        }
        if (this.end === true)
            alert('Win ' + unit);
    }

    reset() {
        this.symbols = [CROSS, ZERO];
        this.count = 0;
        this.field = [
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]
        ];
        this.end = false;
    }
}

startGame();

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