const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const POSSIBLEDIMENSIONS = [3, 5, 10];
let field = [];
let dimensionIndex = 0;
let dimensionsCount = 3;
let isCross = true;
let countSteps = 0;
let strike = [];

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();
addChangeDimListener();

function startGame() {
    strike = [];
    countSteps = 0;
    renderGrid(dimensionsCount);
    isCross = true;
    clearField();
}

function clearField() {
    for (let row = 0; row < dimensionsCount; row++) {
        field[row] = [];
        for (let col = 0; col < dimensionsCount; col++) {
            field[row][col] = EMPTY;
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

function checkHorizontal(row) {
    let isWin = field[row][0] !== EMPTY;
    for (let col = 0; col < field.length; col++) {
        strike.push({'row': row, 'col': col})
        if (col === 0) continue;
        isWin = isWin && field[row][col - 1] === field[row][col];
    }
    if (!isWin) strike = [];
    return isWin;
}

function checkVertical(col) {
    let isWin = field[0][col] !== EMPTY;
    for (let row = 0; row < field.length; row++) {
        strike.push({'row': row, 'col': col})
        if (row === 0) continue;
        isWin = isWin && field[row - 1][col] === field[row][col];
    }
    if (!isWin) strike = [];
    return isWin;
}

function checkDiagonal() {
    let len = field.length;

    let diagonalIsWin1 = field[0][0] !== EMPTY;
    for (let i = 0; i < len; i++) {
        strike.push({'row': i, 'col': i})
        if (i === 0) continue;
        diagonalIsWin1 = diagonalIsWin1 && field[i - 1][i - 1] === field[i][i];
    }
    if (!diagonalIsWin1) strike = [];
    else return true;

    let diagonalIsWin2 = field[0][len - 1] !== EMPTY;
    let r = 0;
    let c = len - 1;
    for (let i = 0; i < len; i++) {
        strike.push({'row': r, 'col': c})
        if (i !== 0) {
            diagonalIsWin2 = diagonalIsWin2 && field[r][c] === field[r - 1][c + 1];
        }
        r++;
        c--;
    }
    if (!diagonalIsWin2) strike = [];
    else return true;

    return false;
}

function checkWin(row, col) {
    return checkHorizontal(row) || checkVertical(col) || checkDiagonal();
}

function cellClickHandler(row, col) {
    let isWin = false;
    const symbol = isCross ? CROSS : ZERO;
    if (field[row][col] === EMPTY) {
        isCross = !isCross;
        renderSymbolInCell(symbol, row, col);
        field[row][col] = symbol;
        isWin = checkWin(row, col);
        countSteps++;
    }

    if (isWin) {
        let name = !isCross ? "Первый игрок" : "Второй игрок";
        for (let pair of strike){
            renderSymbolInCell(symbol, pair.row, pair.col, "#F00");
        }

        setTimeout(() => alert(`Победил ${name}!`), 100);
    }
    if (countSteps === dimensionsCount * dimensionsCount) {
        setTimeout(() => alert("Победила дружба"), 100);
    }


    console.log(`Clicked on cell: ${row}, ${col}`);
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
    startGame();

    console.log('reset!');
}

function addChangeDimListener() {
    const dimButton = document.getElementById('changeDim');
    dimButton.addEventListener('click', changeDimHandler);
}

function changeDimHandler() {
    dimensionIndex += 1;
    dimensionIndex %= POSSIBLEDIMENSIONS.length;
    dimensionsCount = POSSIBLEDIMENSIONS[dimensionIndex];
    startGame();
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
