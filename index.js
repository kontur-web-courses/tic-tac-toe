const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let turn = 1;
let finished = false;

let field = [];
let length = 2;

startGame();
addResetListener();

function startGame() {
    field = [];
    for (let i = 0; i < length; i++) {
        let arr = Array(length).fill(EMPTY)
        field.push(arr);
    }
    renderGrid(length);
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
    let t = turn % 2 === 0 ? ZERO : CROSS;
    if (field[row][col] === EMPTY) {
        field[row][col] = t;
        renderSymbolInCell(t, row, col);
        turn++;
    }
    if (turn === length * length + 1) {
        setTimeout(() => alert('Победила дружба!'))
    }
    console.log(`Clicked on cell: ${row}, ${col}`);
    let res = checkWinner(field);
    if (res !== -1) {
        finished = true;
        alert(res);
    }


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkWinner(arr) {
    let firstDiagonal = [0, 0];
    let secondDiagonal = [0, 0];
    for (let i = 0; i < length; i++) {
        if (arr[i].filter(x => x === ZERO).length === length) {
            for (let r = 0; r < length; r++) {
                renderSymbolInCell(ZERO, i, r, '#ff0000')
            }
            return 'ZERO player wins!'
        }
        if (arr[i].filter(x => x === CROSS).length === length) {
            for (let r = 0; r < length; r++) {
                renderSymbolInCell(CROSS, i, r, '#ff0000')
            }
            return 'CROSS player wins!'
        }

        let crossCounter = 0;
        let zeroCounter = 0;
        for (let j = 0; j < length; j++) {

            if (arr[j][i] === ZERO) {
                zeroCounter++;
                if (zeroCounter === length) {
                    for (let r = 0; r < length; r++) {
                        renderSymbolInCell(ZERO, r, i, '#ff0000')
                    }
                    return 'ZERO player wins!'
                }
            }
            if (arr[j][i] === CROSS) {
                crossCounter++;
                if (crossCounter === length) {
                    for (let r = 0; r < length; r++) {
                        renderSymbolInCell(CROSS, r, i, '#ff0000')
                    }

                    return 'CROSS player wins!'
                }
            }
        }
        if (arr[i][i] !== EMPTY) {
            arr[i][i] === ZERO ? firstDiagonal[0]++ : firstDiagonal[1]++;
        }
        if (arr[i][length - 1 - i] !== EMPTY) {
            arr[i][length - 1 - i] === ZERO ? secondDiagonal[0]++ : secondDiagonal[1]++;
        }
    }
    if (firstDiagonal[0] === length) {
        for (let r = 0; r < length; r++) {
            renderSymbolInCell(ZERO, r, r, '#ff0000')
        }
        return 'ZERO player wins!'
    }
    if (firstDiagonal[1] === length) {
        for (let r = 0; r < length; r++) {
            renderSymbolInCell(CROSS, r, r, '#ff0000')
        }
        return 'CROSS player wins!'
    }
    if (secondDiagonal[0] === length) {
        for (let r = 0; r < length; r++) {
            renderSymbolInCell(ZERO, r, length - 1 - r, '#ff0000')
        }
        return 'ZERO player wins!'
    }
    if (secondDiagonal[1] === length) {
        for (let r = 0; r < length; r++) {
            renderSymbolInCell(CROSS, r, length - 1 - r, '#ff0000')
        }
        return 'CROSS player wins!'
    }
    return -1;
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    if (finished) return;
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
    startGame();
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
