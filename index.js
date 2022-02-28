const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let hasWinner = false
startGame();
addResetListener();

function startGame () {
    renderGrid(3);
    this.counter = 0;
}

function generateField(dimension){
    let result = Array();
    for (let i = 0; i < dimension; i++){
        result.push(Array(dimension).fill(null));
    }
    return result;
}

function renderGrid (dimension) {
    container.innerHTML = '';
    this.dimension = dimension
    this.field = generateField(dimension)

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
    if (this.field[row][col] !== null || hasWinner)
        return;
    let player = this.counter % 2 === 0 ? CROSS : ZERO;
    if (this.counter % 2 === 0){
        this.field[row][col] = 1;
    }
    else{
        this.field[row][col] = 0;
    }
    renderSymbolInCell(player, row, col);
    let result = checkWinner(row, col);
    if (result !== undefined){
        for (let d = 0; d < 3; d++){
            renderSymbolInCell(player,
                result.start.x + result.direction.x * d,
                result.start.y + result.direction.y * d,
                '#ed4830')
        }
        alert(player);
    }
    this.counter++;
    if (this.counter === (this.dimension * this.dimension))
        alert("Победила дружба!")
    console.log(`Clicked on cell: ${row}, ${col}`);

}

let directions = [{x: 0, y: 1}, {x: 1, y: 0}, {x: 1, y: 1}]

function checkWinner(){
    for (let dir of directions) {
        for (let i = 0; i < this.dimension; i++) {
            for (let j = 0; j < this.dimension; j++) {
                let r = true;
                for (let d = 1; d < 3; d++) {
                    if (i + dir.x * d >= this.dimension || j + dir.y * d >= this.dimension){
                        r = false;
                        break;
                    }
                    r = r && this.field[i][j] === this.field[i + dir.x * d][j + dir.y * d] && this.field[i][j] !== null
                }
                if (r) return {start: {x: i, y: j}, direction: dir};
            }
        }
    }
    return undefined;
}

function makeRandomMove(){
    let emptyCells = [];
    for (let i = 0; i < this.dimension; i++){
        for (let j = 0; j < this.dimension; j++){
            if (this.field[i][j] === null){
                emptyCells.push({x: i, y: j});
            }
        }
    }
    let randomIndex =  Math.floor(Math.random() * emptyCells.length);
    cellClickHandler(emptyCells[randomIndex].x, emptyCells[randomIndex].y);
}

function makeSmarterRandomMove(){
    for (let i = 0; i < this.dimension; i++){
        for (let j = 0; j < this.dimension; j++){
            if (this.field[i][j] !== 0){
                continue;
            }
            for (let k1 = -1; k1 <= 1; k1++){
                for (let k2 = -1; k2 <= 1; k2++){
                    if (0 <= i + k1 < this.dimension && 0 j + k2  k1 !== 0 && k2 !== 0 && this.field[i + k1][j + k2] === 0){
                        let x = i + 2 * k1;
                        let y = j + 2 * k2;
                        if (this.field[x][y] === null){
                            cellClickHandler(x, y);
                            return;
                        }
                    }
                }
            }
        }
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
    hasWinner = false
    this.counter = 0
    container.remove()
    renderGrid(this.dimension)
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
