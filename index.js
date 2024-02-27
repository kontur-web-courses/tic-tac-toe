const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const DIMENSION = 3;

const container = document.getElementById('fieldWrapper');

let board;

startGame();
addResetListener();

function newBoard(dimension) {
    let data = []
    for (let i = 0; i < dimension; i++) {
        let arr = []
        for (let j = 0; j < dimension; j++) {
            arr.push({x: i, y: j, side: EMPTY});
        }

        data.push(arr);
    }

    board = {
        _data: data,
        curSide: EMPTY,
        finished: false,
        getWinningValues: function (side) {
            for (let row of this._data) {
                if (row.every((el) => el.side === side)) {
                    return [row, true];
                }
            }

            for (let colIdx = 0; colIdx < dimension; colIdx++) {
                let column = [];
                for (let row of this._data) {
                    column.push(row[colIdx]);
                }

                if (column.every((el) => el.side === side)) {
                    return [column, true]
                }
            }

            let diag1 = [];
            let diag2 = [];
            for (let diagIdx = 0; diagIdx < dimension; diagIdx++) {
                diag1.push(this._data[diagIdx][diagIdx]);
                diag2.push(this._data[diagIdx][dimension - diagIdx - 1]);
            }

            if (diag1.every((el) => el.side === side)) {
                return [diag1, true]
            }


            if (diag2.every((el) => el.side === side)) {
                return [diag2, true];
            }

            return [[], false]
        },
        allFieldsPlaced: function() {
            return this._data.every((row) => row.every((el) => el.side !== EMPTY))
        },
        at: function (row, col) {
            return this._data[row][col].side
        },
        set: function (row, col, side) {
            this._data[row][col].side = side
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
    if (board.at(row, col) !== EMPTY || board.finished)
        return;

    if (board.curSide === EMPTY || board.curSide === ZERO) {
        board.curSide = CROSS;
    } else if (board.curSide === CROSS) {
        board.curSide = ZERO;
    }

    board.set(row, col, board.curSide);
    renderSymbolInCell(board.curSide, row, col);

    let [winningCells, isWinner] = board.getWinningValues(board.curSide)
    if (isWinner) {
        board.finished = true;
        for (let cell of winningCells) {
            renderSymbolInCell(cell.side, cell.x, cell.y, '#800');
        }

        alert(`${board.curSide} won!`);
    }

    if (!board.finished && board.allFieldsPlaced()) {
        board.finished = true;
        alert(`Draw!`);
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
