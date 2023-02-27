const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const TIE = 'tie';
const CROSS_WIN = 'cross win';
const ZERO_WIN = 'zero win';
const PLAY = 'play';
const TYPE_WINNER = {
    'X' : CROSS_WIN,
    'O' : ZERO_WIN
}

const container = document.getElementById('fieldWrapper');
let field = [
    [EMPTY] * 3,
] * 3;
let mapDimention = 3

startGame();
addResetListener();

function startGame () {
    renderGrid(mapDimention);
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

    let emptyCount = 0;
    for (let cellType in [ZERO, CROSS]) {
        for (let row = 0; row < mapDimention; row++) {
            emptyCount++;
            let count_match = 0;
            for (let column = 0; column < mapDimention; column++) {
                if (field[row][column] === cell_type) {
                    count_match++;
                }
            }
            if (count_match === mapDimention) {
                return TYPE_WINNER[cellType];
            }
        }
        for (let column = 0; column < mapDimention; column++) {
            let count_match = 0;
            for (let row = 0; row < mapDimention; row++) {
                if (field[row][column] === cellType) {
                    count_match++;
                }
            }
            if (count_match === mapDimention) {
                return TYPE_WINNER[cellType];
            }
        }

        let countMatchDiagonal1 = 0;
        let countMatchDiagonal2 = 0;
        for (let i = 0; i < mapDimention; i++) {
            if (field[i][i] === cellType)
                countMatchDiagonal1++;
            if (field[i][mapDimention - i - 1] === cellType)
                countMatchDiagonal2++;
        }

        if (countMatchDiagonal1 === mapDimention || countMatchDiagonal2 === mapDimention)
            return TYPE_WINNER[cellType];
    }

    if (emptyCount === 0)
        return TIE;


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
