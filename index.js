const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let field;

const container = document.getElementById('fieldWrapper');
class Field{
    constructor(dimension){
        self.dimension = dimension;
        self.field = [];
        self.nextChar = CROSS;
        for (let i = 0; i < dimension; i++) {
            let temp = [];
            for (let j = 0; j < dimension; j++) {
               temp.push(EMPTY);
            }
            self.field.push(temp);
        }
    }
    whoWin(){
        for (let i = 0; i < self.dimension ; i++) {
            let crossCount = 0;
            let zerosCount = 0;
            for (let j = 0; j < self.dimension ; j++) {
                if (self.field[i][j] === ZERO)
                    zerosCount++;
                if (self.field[i][j] === CROSS)
                    crossCount++;
            }
            if (crossCount === 3)
                return CROSS;
            if (zerosCount === 3)
                return ZERO;
        }
        for (let i = 0; i < self.dimension ; i++) {
            let crossCount = 0;
            let zerosCount = 0;
            for (let j = 0; j < self.dimension ; j++) {
                if (self.field[j][i] === ZERO)
                    zerosCount++;
                if (self.field[j][i] === CROSS)
                    crossCount++;
            }
            if (crossCount === 3)
                return CROSS;
            if (zerosCount === 3)
                return ZERO;
        }
        for (let i = 0; i < self.dimension ; i++) {
            let crossCount = 0;
            let zerosCount = 0;
            if (self.field[i][i] === ZERO)
                zerosCount++;
            if (self.field[i][i] === CROSS)
                crossCount++;
            if (crossCount === 3)
                return CROSS;
            if (zerosCount === 3)
                return ZERO;
        }
        for (let i = 0; i < self.dimension ; i++) {
            let crossCount = 0;
            let zerosCount = 0;
            if (self.field[i][self.dimension - i - 1] === ZERO)
                zerosCount++;
            if (self.field[i][self.dimension - i - 1] === CROSS)
                crossCount++;
            if (crossCount === 3)
                return CROSS;
            if (zerosCount === 3)
                return ZERO;
        }
        return null;
    }

    nextMove(col, row){
        if (self.field[row][col] === EMPTY) {
            self.field[row][col] = self.nextChar;
            self.nextChar = (self.nextChar === CROSS) ? ZERO : CROSS;
        }
        return self.field[row][col];
    }
}
startGame();
addResetListener();

function startGame () {
    filed = new Filed(3)
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

    renderSymbolInCell(field.nextMove(), row, col);
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
