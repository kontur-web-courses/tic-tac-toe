const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let counter = 0;
let field;
let n = 3;

function init_game_model() {
    field = [];
    for (let i = 0; i < n; i++) {
        field.push([])
        for (let j = 0; j < n; j++) {
            field[i].push(EMPTY);
        }
    }
    counter = 0;
}

function is_turns_ended() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (field[i][j] === EMPTY) return false;
        }
    }
    return true;
}

function findWinner() {
    for (let i = 0; i < n; i++) {
        figureInStr = field[i][0];
        strCount = 1;
        figureInCol = field[0][i];
        colCount = 1;
        figureInLeftCorner = field[0][0]
        leftCornerCount = 0
        figureInRightCorner = field[0][n - 1]
        rightCornerCount = 0
        for (let j = 1; i < n; i++) {
            if (field[i][j] === figureInStr) strCount += 1;
            if (field[j][i] === figureInCol) colCount += 1;
        }
        if (strCount === n) return figureInStr;
        if (colCount === n) return figureInCol;
        if (field[i][i] === figureInLeftCorner) leftCornerCount += 1;
        if (field[i][n - i - 1] === figureInRightCorner) rightCornerCount += 1;
        if (leftCornerCount === n) return figureInLeftCorner;
        if (rightCornerCount === n) return figureInRightCorner;
    }
    return null;
}


function get_figure() {
    a = [CROSS, ZERO];
    return a[counter++ % 2];
}

init_game_model();
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

function cellClickHandler(row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (field[row][col] === EMPTY) {
        let figure = get_figure();
        field[row][col] = figure;
        if (is_turns_ended()) alert("Победила дружба!")
        renderSymbolInCell(figure, row, col);
        console.log(findWinner());
    }

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
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
