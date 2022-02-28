const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let count = 0;
let field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
let gameover = false;
let width = 3;

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

function cellClickHandler(row, col) {
    if (!gameover) {
        if (field[row][col] === EMPTY) {
            if (count % 2 === 0) {
                renderSymbolInCell(ZERO, row, col);
                field[row][col] = ZERO;
            } else {
                renderSymbolInCell(CROSS, row, col);
                field[row][col] = CROSS;
            }
            count += 1;
            console.log(`Clicked on cell: ${row}, ${col}`);
        }
        let symbol = ZERO;
        if (count % 2 === 0)
            symbol = CROSS;
        if (checkWinner(symbol)) {
            gameover = true;
            alert(`Player ${count % 2} win!`)
        }
        if (count === 9) {
            alert("Победила дружба!");
        }
    }

}

function checkWinner(symbol) {
    let flag = true;
    let cur = field[0][0];
    let row = -1;
    for (let i = 0; i < width; i++) {
        cur = field[i][0];
        flag = true;
        row = i;
        for (let j = 1; j < width; j++) {
            if (field[i][j] !== cur) {
                flag = false;
            }
        }

        if (flag && cur !== EMPTY) {
            for (let k = 0; k < width; k++)
                renderSymbolInCell(symbol, row, k, '#ff1100');
            return true;

        }
    }

    for (let i = 0; i < width; i++) {
        cur = field[0][i];
        flag = true;
        for (let j = 1; j < width; j++) {
            if (field[j][i] !== cur) {
                flag = false;
            }
        }
        if (flag && cur !== EMPTY) {
            for (let k = 0; k < width; k++)
                renderSymbolInCell(symbol, k, i, '#ff1100');
            return true;
        }
    }

    cur = field[0][0];
    flag = true;
    for (let i = 0; i < width; i++) {
        if (field[i][i] !== cur) {
            flag = false;
        }
    }
    if (flag && cur !== EMPTY) {
        for (let i = 0; i < width; i++) {
            renderSymbolInCell(symbol, i, i, '#ff1100')
        }
        return true;
    }

    cur = field[width - 1][0];
    flag = true;
    for (let i = 0; i < width; i++) {
        if (field[width - i - 1][i] !== cur) {
            flag = false;
        }
    }
    if (flag && cur !== EMPTY) {
        for (let i = 0; i < width; i++) {
            renderSymbolInCell(symbol, width - i - 1, i, '#ff1100');
        }
        return true;
    }

    return false;


}

function colorCells(symbol) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (field[i][j] === symbol)
                renderSymbolInCell(symbol, i, j, '#ff1100')
        }
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
    count = 0;
    field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
    gameover = false;
    renderGrid(3);
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
