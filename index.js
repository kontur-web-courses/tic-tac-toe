const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let dim = prompt('Введите размер поля', '3');
dim = Number(dim);
dim = Number.isNaN(dim) ? 3 : dim;
console.log(dim);
const container = document.getElementById('fieldWrapper');
const fields = [];
let moveCount = 0;
let finished = false;

startGame(dim);
addResetListener();

function startGame (dimension) {
    renderGrid(dimension);
    setStruct(dimension);
    console.log(fields);
}

function setStruct(dimension) {
    for (let i = 0; i < dimension; i++) {
        fields.push([]);
        for (let j = 0; j < dimension; j++)
            fields[i].push(EMPTY);
    }
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

function getWinner(row, col) {
    let [winner, indices] = checkEqual(i => row, i => i);
    if (winner !== EMPTY)
        return [winner, indices];
    [winner, indices] = checkEqual(i => i, i => col);
    if (winner !== EMPTY)
        return [winner, indices];
    if (row === col) {
        [winner, indices] = checkEqual(i => i, i => i);
        if (winner !== EMPTY)
            return [winner, indices];
    }
    let len = fields.length;
    if (row === len - 1 - col) {
        [winner, indices] = checkEqual(i => i, i => len - 1 - i);
        if (winner !== EMPTY)
            return [winner, indices];
    }
    return [EMPTY, []];
}

function checkEqual(rowFunc, columnFunc) {
    const startInd = [rowFunc(0), columnFunc(0)];
    console.log(startInd);
    let value = fields[startInd[0]][startInd[1]];
    if (value === EMPTY)
        return [EMPTY, []];
    const len = fields.length;
    let indices = [startInd];
    for (let j = 1; j < len; j++) {
        let currentInd = [rowFunc(j), columnFunc(j)]
        if (fields[currentInd[0]][currentInd[1]] !== fields[startInd[0]][startInd[1]])
            return [EMPTY, []];
        indices.push(currentInd);
    }
    return [fields[startInd[0]][startInd[1]], indices];
}

function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (finished) {
        return;
    }
    const cell = findCell(row, col);
    if (cell.textContent !== EMPTY){
        return;
    }
    const symbol = moveCount % 2 === 0 ? CROSS : ZERO;
    renderSymbolInCell(symbol, row, col);
    moveCount++;
    fields[row][col] = symbol;
    const [winner, indices] = getWinner(row, col);
    console.log([winner, indices]);
    if (winner !== EMPTY) {
        finished = true;
        for (let [r, c] of indices) {
            renderSymbolInCell(fields[r][c], r, c, 'red');
        }
        alert(`${winner === CROSS ? 'Crosses' : 'Zeros'} won!`);
    }
    else if (moveCount === dim * dim) {
        finished = true;
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
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            fields[i][j] = EMPTY;
            renderSymbolInCell(EMPTY, i, j);
        }
    }
    finished = false;
    moveCount = 0;
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
