const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const DIMENSION = 3;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

let board = newBoard();

function newBoard(dimension) {
    board = {
        _data: Array(dimension * dimension).fill({x: -1, y: -1, side: EMPTY}),
        curSide: CROSS,
        getWinningValues: function (side) {
            for (let row of this._data) {
                if (row.every((el) => el === side)) {
                    return [row, true];
                }
            }

            for (let colIdx = 0; colIdx < dimension; colIdx++) {
                let column = [];
                for (let row of this._data) {
                    column.push(row[colIdx]);
                }

                if (column.every((el) => el === side)) {
                    return [column, true]
                }
            }

            let diag1 = [];
            let diag2 = [];
            for (let diagIdx = 0; diagIdx < dimension; diagIdx++) {
                for (let row of this._data) {
                    diag1.push(row[diagIdx]);
                    diag2.push(row[dimension - diagIdx - 1]);
                }
            }

            if (diag1.every((el) => el === side)) {
                return [diag1, true]
            }


            if (diag2.every((el) => el === side)) {
                return [diag2, true];
            }

            return [[], false]
        },
        at: function (row, col) {
            return this._data[row * dimension + col]
        },
        set: function (row, col, side) {
            this._data[row * dimension + col] = side
        },
    }

    return board;
}

function startGame() {
    renderGrid(DIMENSION);
    board = newBoard(DIMENSION);
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
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (board.at(row, col) !== EMPTY)
        return;

    board.set(row, col, board.curSide);
    renderSymbolInCell(board.curSide, row, col);

    if (board.is_winner(board.curSide)) {

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
    console.log('reset!');
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
