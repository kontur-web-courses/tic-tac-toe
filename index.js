const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();
let moves = 0;
let turn = 0;

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';
    let field = initializeField(dimension);
    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => field = cellClickHandler(i, j, turn % 2, field), dimension);
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}
function initializeField(dimension) {
    let field = new Array(dimension);
    for (let k = 0; k < dimension; k++) {
        field[k] = []
        for (let m = 0; m < dimension; m++)
            field[k][m] = EMPTY
    }
    return field;
}

function cellClickHandler (row, col, player, field, n) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    // if (field[row][col] !== EMPTY) {
    //     cellClickHandler(row, col, player, field, n);
    // }
    if (moves === n * n)
        alert("Победила дружба");
    if (player === 1){
        field[row][col] = CROSS;
        renderSymbolInCell(CROSS, row, col);
        moves++;
        turn++;
    } else if (player === 0){
        field[row][col] = ZERO;
        renderSymbolInCell(ZERO, row, col);
        moves++;
        turn++;
    }
    isWin(row, col, field);
    return field;
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function isWin(k, m, field) {
    let i = k +1;
    let j = m + 1;
    let current = field[k][m];
    let len = field.length;
    if (current === undefined)
        return;
    if (j > 1 && j < len && field[i][j - 1] === current && (field[i][j - 2] === current || field[i][j + 1] === current))
        alert(`${current} win`); //строчка слева вправо

    if (j < (len - 1) && j > 0 && field[i][j + 1] === current && (field[i][j + 2] === current || field[i][j - 1] === current))
        alert(`${current} win`);//строчка справа влево

    if (i > 1 && i < len && field[i - 1][j] === current && (field[i - 2][j] === current || field[i + 1][j] === current))
        alert(`${current} win`);//столбик сверху вниз

    if (i < (len - 1) && i > 0 &&field[i + 1][j] === current && (field[i + 2][j] === current || field[i - 1][j] === current))
        alert(`${current} win`);//столбик снизу вверх

    if (j < len && j > 1 && i < len && i > 1 && field[i - 1][j - 1] === current && (field[i - 2][j - 2] === current || field[i + 1][j + 1] === current))
        alert(`${current} win`);//диагонали слева верх вправо вниз

    if (j < (len - 1) && j > 0 && i < (len - 1) && i > 0 && field[i + 1][j + 1] === current && (field[i + 2][j + 2] === current || field[i - 1][j - 1] === current))
        alert(`${current} win`);//диагональ справа низ влево вверх

    if (j < len && j > 0 && i < (len - 1) && i > 1 && field[i - 1][j + 1] === current && (field[i - 2][j + 2] === current || field[i + 1][j - 1] === current))
        alert(`${current} win`);//диагональ справа верх влево вниз

    if (j < len && j > 1 && i < (len - 1) && i > 0 && field[i + 1][j - 1] === current && (field[i + 2][j - 2] === current || field[i - 1][j + 1] === current))
        alert(`${current} win`);//диагональ слева низ вправо верх

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
