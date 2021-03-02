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
        renderSymbolInCell(CROSS, row, col);
        field[row][col] = CROSS;

        moves++;
        turn++;
    } else if (player === 0){
        renderSymbolInCell(ZERO, row, col);
        field[row][col] = ZERO;

        moves++;
        turn++;
    }
    if (moves > 4)
        isWin(row, col, field);
    return field;
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function isWin(i, j, field) {
    let current = field[i][j];
    if (current === undefined)
        return;
    if (j > 0 && field[i][j - 1] === current && field[i][j - 2] === current)
        alert(`${current} win`); //строчка слева вправо
    if (j > 0 && field[i][j - 1] === current && field[i][j + 1] === current)
        alert(`${current} win`); //столбик сверху вниз
    if (field[i][j + 1] === current && field[i][j + 2] === current)
        alert(`${current} win`); //строчка справа налево
    if (field[i][j + 1] === current && field[i][j - 1] === current)
        alert(`${current} win`); //столбик сверху вниз
    if (field[i + 1][j] === current)
    {
        if (field[i + 2][j] === current)
            alert(`${current} win`);
        else if (field[i - 1][j] === current)
            alert(`${current} win`);
    }

    if (i > 0 && field[i - 1][j] === current)
    {
        if (field[i + 1][j] === current)
            alert(`${current} win`);
        else if (field[i - 2][j] === current)
            alert(`${current} win`);
    }


    /*if (field[i + 1][j + 1] === current && (field[i + 2][j + 2] === current || field[i - 1][j - 1] === current))
        alert(${current} win); //диагональ снизу вверх справа налево
    if (field[i - 1][j - 1] === current && (field[i - 2][j - 2] === current || field[i + 1][j + 1] === current))
        alert(${current} win); //столбик снизу вверх*/
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