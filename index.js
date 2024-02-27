const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let flag = true;

let field = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
]

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame() {
    renderGrid(3);
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

function isWin() {

    for (let i = 0; i < 3; i++) {
        if (field[i][0] === field[i][1] && field[i][1] === field[i][2] && field[i][0] !== EMPTY) {
            return [[i, 0], [i, 1], [i, 2]];
        }
        if (field[0][i] === field[1][i] && field[1][i] === field[2][i] && field[0][i] !== EMPTY) {
            return [[0,i],[1, i], [2, i]];
        }
    }
    if (field[0][0] === field[1][1] && field[1][1] === field[2][2] && field[0][0] !== EMPTY) {
        return [[0,0], [1, 1], [2, 2]];
    }
    if (field[0][2] === field[1][1] && field[1][1] === field[2][0] && field[0][2] !== EMPTY) {
        return [[0,2], [1, 1], [2, 0]];
    }
    return false;
}

function cellClickHandler(row, col) {

    if (field[row][col] === EMPTY && !isWin()) {

        if (flag) {
            renderSymbolInCell(CROSS, row, col);
            field[row][col] = CROSS;
        } else {
            renderSymbolInCell(ZERO, row, col);
            field[row][col] = ZERO;
        }

        flag = !flag

        console.log(`Clicked on cell: ${row}, ${col}`);
    }

    if (isWin()){
        winRow = isWin()[0][0]
        winCol = isWin()[0][1]

        renderSymbolInCell(field[winRow][winCol], winRow, winCol, '#ff0000');
        renderSymbolInCell(field[winRow][winCol], isWin()[1][0], isWin()[1][1], '#ff0000');
        renderSymbolInCell(field[winRow][winCol], isWin()[2][0], isWin()[2][1], '#ff0000');
        alert(`${field[winRow][winCol]} победил и переиграл`)

        return
    }

    let friendship = !field.some(x => x.includes(EMPTY));

    console.log(`${friendship}`)

    if (friendship) {
        alert('Победила дружба')
    }
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
    field = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]
    ]

    flag = true

    startGame();
    addResetListener();

    console.log('reset!');
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
