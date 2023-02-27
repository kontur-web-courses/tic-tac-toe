const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const TIE = 'tie';
const CROSS_WIN = 'cross win';
const ZERO_WIN = 'zero win';
const PLAY = 'play';
const TYPE_WINNER = {
    'X' : CROSS_WIN,
    'O' : ZERO_WIN,
}

const container = document.getElementById('fieldWrapper');

let mapDimention = 3
let gameState = PLAY;
let field = [];
let zeroTurn = true;

startGame();
addResetListener();

function startGame () {
    renderGrid(mapDimention);
}

function renderGrid (dimension) {
    container.innerHTML = '';
    createField(dimension)
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
    console.log(`Clicked on cell: ${row}, ${col}`);

    console.log(`State: ${gameState}`);

    if (field[row][col] !== EMPTY || gameState !== PLAY) {
        return;
    }
    const figureToPlace = zeroTurn ? ZERO : CROSS;
    field[row][col] = figureToPlace;
    renderSymbolInCell(figureToPlace, row, col);

    zeroTurn = !zeroTurn;
    alertIfFinished();
}

function getState() {
    let emptyCount = 0;
    for (let cellType in [ZERO, CROSS]) {
        for (let row = 0; row < mapDimention; row++) {
            let count_match = 0;
            for (let column = 0; column < mapDimention; column++) {
                if (field[row][column] === cellType) {
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
                } else if (field[row][column] === EMPTY) {
                    emptyCount++;
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

    console.log(emptyCount);
    return PLAY;
}

function alertIfFinished(){
    gameState = getState();

    if (gameState === TIE) {
        alert('Победила дружба');
        return;
    }
    if (gameState === ZERO_WIN) {
        alert('Победили нолики');
        return;
    }
    if (gameState === CROSS_WIN) {
        alert('Победили крестики');
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
    for (let row = 0; row < mapDimention; row++) {
        for (let col = 0; col < mapDimention; col++) {
            renderSymbolInCell(EMPTY, row, col);
            field[row][col] = EMPTY;
        }
    }
    gameState = PLAY;
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
function createField(dim) {
    for (let i = 0; i < dim; i++) {
        field.push([]);
        for (let j = 0; j < dim; j++) {
            field[i].push(EMPTY);
        }
    }
}
