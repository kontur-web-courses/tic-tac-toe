const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let FIELD = [];
let TURN = CROSS;
let PASSED_TURNS = 0;
let DIMENSION = 0;
let WINNER = EMPTY;

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    DIMENSION = dimension;
    for (let i = 0; i < dimension; i++) {
        FIELD.push(Array(DIMENSION).fill(EMPTY));
    }
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
    if (WINNER !== EMPTY || FIELD[row][col] !== EMPTY)
        return;
    FIELD[row][col] = TURN;
    renderSymbolInCell(TURN, row, col);
    TURN = TURN === CROSS ? ZERO : CROSS;
    PASSED_TURNS++;
    let winner_items = checkForWinner();
    if (winner_items)
    {
        WINNER = winner_items[0];
        console.log(WINNER)
        for (const cell of winner_items[1]) {
            const targetCell = findCell(cell[0], cell[1]);
            targetCell.style.color = "#FF0000";
        }
        alert(`Winner: ${WINNER}`)
        return;
    }
    if (PASSED_TURNS === DIMENSION * DIMENSION)
        alert("Победила дружба")
    console.log(`Clicked on cell: ${row}, ${col}`);


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function drawWinner()
{

}

function checkForWinner()
{
    let vert = [];
    let vert_indexes = [];
    let diag1 = [];
    let diag1_indexes = [];
    let diag2 = [];
    let diag2_indexes = [];
    for (let i = 0; i < DIMENSION; i++) {
        if (FIELD[i].every(el => el === FIELD[i][0] && el !== EMPTY))
            return [FIELD[i][0], getHorizontalRow(i)];
        for (let j = 0; j < DIMENSION; j++) {
            vert.push(FIELD[j][i]);
            vert_indexes.push([j, i])
        }
        if (vert.every(el => el === vert[0] && el !== EMPTY))
            return [vert[0], vert_indexes];
        vert = [];
        diag1.push(FIELD[i][i]);
        diag1_indexes.push([i, i]);
        diag2.push(FIELD[i][DIMENSION- 1 - i]);
        diag2_indexes.push([i, DIMENSION-1-i]);
    }

    if (diag1.every(el => el === diag1[0] && el !== EMPTY))
        return [diag1[0], diag1_indexes];
    if (diag2.every(el => el === diag2[0] && el !== EMPTY))
        return [diag2[0], diag2_indexes];
    return false;
}

function getHorizontalRow(row)
{
    let r = [];
    for (let i = 0; i < DIMENSION; i++) {
        r.push([row, i])
    }
    return r;
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
    FIELD = [];
    TURN = CROSS;
    PASSED_TURNS = 0;
    WINNER = EMPTY;
    renderGrid(DIMENSION);
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
