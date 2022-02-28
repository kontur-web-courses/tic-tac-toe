const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';


const container = document.getElementById('fieldWrapper');
class Field{
    constructor(dimension){
        self.dimension = dimension;
        self.is_ended = 0;
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

    isAnyMove(){
        for (let i = 0; i < self.dimension ; i++) {
            for (let j = 0; j < self.dimension ; j++) {
                if (self.field[i][j] === EMPTY)
                    return true;
            }
        }
        return false;
    }

    whoWin(){
        for (let i = 0; i < self.dimension ; i++) {
            let crossCount = [];
            let zerosCount = [];
            for (let j = 0; j < self.dimension ; j++) {
                if (self.field[i][j] === ZERO)
                    zerosCount.push([i, j, ZERO]);
                if (self.field[i][j] === CROSS)
                    crossCount.push([i, j, CROSS]);
            }
            if (crossCount.length === self.dimension)
                return crossCount;
            if (zerosCount.length === self.dimension)
                return zerosCount;
        }
        for (let i = 0; i < self.dimension ; i++) {
            let crossCount = [];
            let zerosCount = [];
            for (let j = 0; j < self.dimension ; j++) {
                if (self.field[j][i] === ZERO)
                    zerosCount.push([j, i, ZERO]);
                if (self.field[j][i] === CROSS)
                    crossCount.push([j, i, CROSS]);
            }
            if (crossCount.length === self.dimension)
                return crossCount;
            if (zerosCount.length === self.dimension)
                return zerosCount;
        }
        let crossCount = [];
        let zerosCount = [];
        for (let i = 0; i < self.dimension ; i++) {
            if (self.field[i][i] === ZERO)
                zerosCount.push([i, i, ZERO]);
            if (self.field[i][i] === CROSS)
                crossCount.push([i, i, CROSS]);
        }
        if (crossCount.length === self.dimension)
            return crossCount;
        if (zerosCount.length === self.dimension)
            return zerosCount;
        crossCount = [];
        zerosCount = [];
        for (let i = 0; i < self.dimension ; i++) {
            if (self.field[i][self.dimension - i - 1] === ZERO)
                zerosCount.push([i, self.dimension - i - 1, ZERO]);
            if (self.field[i][self.dimension - i - 1] === CROSS)
                crossCount.push([i, self.dimension - i - 1, CROSS])
        }
        if (crossCount.length === self.dimension)
            return crossCount;
        if (zerosCount.length === self.dimension)
            return zerosCount;
        return null;
    }

    endGame(){
        self.is_ended = true;
    }

    nextMove(row, col){
        if (!self.is_ended && self.field[row][col] === EMPTY) {
            self.field[row][col] = self.nextChar;
            self.nextChar = (self.nextChar === CROSS) ? ZERO : CROSS;
        }
        return self.field[row][col];
    }
}
let field = startGame();
addResetListener();

function startGame () {
    let filed = new Field(3)
    renderGrid(3);
    return filed;
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
    renderSymbolInCell(field.nextMove(row, col), row, col);
    console.log(`Clicked on cell: ${row}, ${col}`);
    
    let win = field.whoWin();
    if (win) {
        alert(`${ win[0][2] === CROSS ? 'Крестики' : 'Нолики'} победили!`)
        field.endGame();
        for (let winElement of win) {
            renderSymbolInCell(winElement[2], winElement[0], winElement[1], '#f00');
        }
    }
    if (!field.isAnyMove()) {
        alert('Ничья, давай по-новой!')
        field.endGame();
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
    field = new Field(3);
    renderGrid(3);
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
