const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const GRID_DIMENSION = 3;

const container = document.getElementById('fieldWrapper');

let field = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

let tick = 0;

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
    if (!isValidCell(row, col) || field[row][col] !== null) {
        return;
    }
    updateSymbolByTick(row, col);
    tick++;
    let status = findWinner(field)
    if (status !== undefined)
        alert(`Победил ${status[0]}`)
    for (let i = 0; i < status[1].length; i++) {
        renderSymbolInCell(field[status[1][i][1]][status[1][i][0]], status[1][i][1], status[1][i][0], '#ff0000');
    }
}

function updateSymbolByTick(row, col) {
    if (tick % 2 == 0) {
        field[row][col] = CROSS;
        renderSymbolInCell(CROSS, row, col);
    } else {
        field[row][col] = ZERO;
        renderSymbolInCell(ZERO, row, col);
    }
}

function isValidCell(row, col) {
    return row >= 0 && col >= 0 && row < GRID_DIMENSION && col < GRID_DIMENSION;
}

function findWinner(field) {
    let status = findWinnerInLine(field)
    if (status !== undefined)
        return status
    status = findWinnerInColumn(field)
    if (status !== undefined)
        return status
    status = findWinnerInCross(field)
    if (status !== undefined)
        return status
}

function findWinnerInLine(field) {
    for (let y = 0; y < field.length; y++) {
        let isFilled = true;
        for (let x = 1; x < field.length; x++) {
            if (field[y][x - 1] !== field[y][x] || field[y][x] === null || field[y][x - 1] === null)
                isFilled = false;
        }
        if (isFilled) {
            let moves = [...Array(field.length).keys()].map(function (num) {
                return [num, y]
            })
            return [field[y][0], moves];
        }
    }
}

function findWinnerInColumn(field) {
    for (let x = 0; x < field.length; x++) {
        let isFilled = true;
        for (let y = 1; y < field.length; y++) {
            if (field[y - 1][x] !== field[y][x] || field[y][x] === null || field[y - 1][x] === null)
                isFilled = false;
        }
        if (isFilled) {
            let moves = [...Array(field.length).keys()].map(function (num) {
                return [x, num]
            })
            return [field[0][x], moves];
        }
    }
}

function findWinnerInCross(field) {
    let isFilled = true;
    let moves = []
    for (let y = 1; y < field.length; y++) {
        moves.push([y - 1, field.length - y])
        if (field[y - 1][field.length - y] !== field[y][field.length - y - 1]
            || field[y - 1][field.length - y] === null
            || field[y][field.length - y - 1] === null) {
            isFilled = false;
        }
    }
    if (isFilled) {
        moves.push([field.length - 1, 0])
        return [field[1][1], moves];
    }

    isFilled = true;
    moves = []
    for (let y = 1; y < field.length; y++) {
        moves.push([y - 1, y - 1])
        if (field[y - 1][y - 1] !== field[y][y]
            || field[y][y] === null
            || field[y - 1][y - 1] === null) {
            isFilled = false;
        }
    }
    if (isFilled) {
        moves.push([field.length - 1, field.length - 1])
        return [field[1][1], moves];
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

function resetClickHandler () {
    console.log('reset!');

    field = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
    renderGrid(GRID_DIMENSION);
    tick = 0;
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

function aiGetWinCell () {
    let shouldStop = aiIsShouldStopEnemy();
    if (shouldStop !== null) {
        return shouldStop;
    }
    return aiChooseNextCell();
}

function aiChooseNextCell () {
    if (aiActiveTargetRow === null && aiActiveTargetColumn === null) {
        aiChooseTarget();
    }
    if (aiActiveTargetRow !== null) {
        if (aiCanWinAtRow(aiActiveTargetRow)) {
            return aiGetNextCellAtRow(aiActiveTargetRow);
        } else {
            aiActiveTargetRow = null;
        }
    }
    if (aiActiveTargetColumn !== null) {
        if (aiCanWinAtColumn(aiActiveTargetColumn)) {
            return aiGetNextCellAtColumn(aiActiveTargetColumn);
        } else {
            aiActiveTargetColumn = null;
        }
    }


}

function aiChooseTarget () {
    for (let i = 0; i < GRID_DIMENSION; ++i) {
        if (aiGetSymbolsCountInRow(i) == 0) {
            aiActiveTargetRow = i;
            return;
        }
        if (aiGetSymbolsCountInColumn(i) == 0) {
            aiActiveTargetColumn = i;
            return;
        }
    }

    let bestColumnCount = -1;
    let bestColumn = -1;
    let bestRowCount = -1;
    let bestRow = -1;

    for (let i = 0; i < GRID_DIMENSION; ++i) {
        if (aiGetSymbolsCountInRow(i) > bestRowCount) {
            bestRowCount = aiGetSymbolsCountInRow(i);
            bestRow = i;
        }
        if (aiGetSymbolsCountInColumn(i) > bestColumnCount) {
            bestColumn = aiGetSymbolsCountInColumn(i);
            bestColumn = i;
        }
    }

    if (bestColumnCount > bestRowCount) {
        aiActiveTargetColumn = bestColumn;
    } else {
        aiActiveTargetRow = bestRow;
    }
}

function aiGetNextCellAtColumn (column) {
    let bestRow = -1;
    let bestRowCount = -1;
    for (let i = 0; i < GRID_DIMENSION; ++i) {
        if (field[i][column] === ZERO) {
            continue;
        }
        let currentRowCount = aiGetSymbolsCountInRow(CROSS, i);
        if (currentRowCount > bestRowCount) {
            bestRow = i;
            bestRowCount = currentRowCount;
        }
    }

    return bestRow;
}

function aiCanWinAtColumn (column) {
    if (aiGetSymbolsCountInColumn(column) === 0) {
        return true;
    }
    return false;
}

function aiGetNextCellAtRow (row) {
    let bestColumn = -1;
    let bestColumnCount = -1;
    for (let i = 0; i < GRID_DIMENSION; ++i) {
        if (field[row][i] === ZERO) {
            continue;
        }
        let currentColumnCount = aiGetSymbolsCountInColumn(CROSS, i);
        if (currentColumnCount > bestColumnCount) {
            bestColumn = i;
            bestColumnCount = currentColumnCount;
        }
    }

    return bestColumn;
}

function aiCanWinAtRow (row) {
    if (aiGetSymbolsCountInRow(row) === 0) {
        return true;
    }
    return false;
}

function aiIsShouldStopEnemy () {
    for (let i = 0; i < GRID_DIMENSION; ++i) {
        for (let j = 0; j < GRID_DIMENSION; ++j) {
            if (aiGetSymbolsCountInRow(CROSS, i, j) === GRID_DIMENSION - 1) {
                return (i, j);
            }
            if (aiGetSymbolsCountInColumn(CROSS, i, j) === GRID_DIMENSION - 1) {
                return (i, j);
            }
        }
    }

    return null;
}

function aiGetSymbolsCountInRow (symbol, rowIdx) {
    let count = 0;
    for (let i = 0; i < GRID_DIMENSION; ++i) {
        if (field[rowIdx][i] === symbol) {
            count++;
        }
    }

    return count;
}

function aiGetSymbolsCountInColumn (symbol, colIdx) {
    let count = 0;
    for (let i = 0; i < GRID_DIMENSION; ++i) {
        if (field[i][colIdx] === symbol) {
            count++;
        }
    }

    return count;
}