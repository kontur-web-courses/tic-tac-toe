const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const TIE = 'tie';
const CROSS_WIN = 'cross win';
const ZERO_WIN = 'zero win';
const PLAY = 'play';

const container = document.getElementById('fieldWrapper');
let field = [
    [EMPTY] * 3,
] * 3;
let map_dimention = 3

startGame();
addResetListener();

function startGame () {
    renderGrid(map_dimention);
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
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function isEndGame() {
    for (let cellType in [ZERO, CROSS]) {
        for (let row = 0; row < map_dimention; row++) {
            let count_match = 0;
            for (let column = 0; column < map_dimention; column++) {
                if (field[row][column] === cell_type) {
                    count_match++;
                }
            }
            if (count_match === map_dimention) {
                return true;
            }
        }
        for (let column = 0; column < map_dimention; column++) {
            let count_match = 0;
            for (let row = 0; row < map_dimention; row++) {
                if (field[row][column] === cellType) {
                    count_match++;
                }
            }
            if (count_match === map_dimention) {
                return true;
            }
        }

        let countMatchDiagonal1 = 0;
        let countMatchDiagonal2 = 0;
        for (let i = 0; i < map_dimention; i++) {
            if (field[i][i] === cellType)
                countMatchDiagonal1++;
            if (field[i][map_dimention - i - 1] === cellType)
                countMatchDiagonal2++;
        }

        if (countMatchDiagonal1 === map_dimention || countMatchDiagonal2 === map_dimention)
            return true;
    }


    return PLAY;
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
