const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let field = [];
let status = CROSS;
let count = 0;
let isStopGame = false;
let isAITimpoActive = false;
let size = NaN;

startGame();
addResetListener();

function startGame () {
    while (isNaN(size) || size < 3){
        size = +prompt('Field size: ');
    }
    isAITimpoActive = confirm('Activate AI Timpo?');
    renderGrid(size);

}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        field.push([])
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
            field[i].push(cell)
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);

    if (isStopGame)
        return;

    if (field[row][col].innerHTML !== EMPTY)
        return;
    renderSymbolInCell(status, row, col);
    status = status === CROSS ? ZERO : CROSS;

    let winner = checkWin();
    if (winner.length !== 0) {
        isStopGame = true;
        console.log(winner);
        let winSymbol = field[winner[0][0]][winner[0][1]].textContent;
        for(const pair of winner) {
            console.log(pair);
            renderSymbolInCell(winSymbol, pair[0], pair[1], '#f00');
        }
        setTimeout(() => alert(`${winSymbol} is Win`), 100);
        return;
    }

    count++;
    if (count === field.length ** 2){
        setTimeout(() => alert("Победила дружба"), 100);
    }

    if (isAITimpoActive && status === ZERO) {
        let freeCells = [];
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (field[i][j].textContent === EMPTY) {
                    freeCells.push([i, j]);
                }
            }
        }
        let r = Math.random() * freeCells.length | 0;
        cellClickHandler(freeCells[r][0], freeCells[r][1]);
    }
}

function checkWin() {
    for (let i = 0; i < field.length; i++) {
        if (field[i][0].textContent === EMPTY) {
            continue;
        }
        let ans = [];
        for (let j = 0; j < field.length; j++) {
            if (field[i][j].textContent === field[i][0].textContent) {
                ans.push([i, j]);
            }
        }
        if (ans.length === field.length) {
            return ans;
        }
    }

    for (let i = 0; i < field.length; i++) {
        if (field[0][i].textContent === EMPTY) {
            continue;
        }
        let ans = [];
        for (let j = 0; j < field.length; j++) {
            if (field[j][i].textContent === field[0][i].textContent) {
                ans.push([j, i]);
            }
        }
        if (ans.length === field.length) {
            return ans;
        }
    }

    if (field[0][0].textContent !== EMPTY) {
        let ans = [];
        for (let i = 0; i < field.length; i++) {
            if (field[i][i].textContent === field[0][0].textContent) {
                ans.push([i, i]);
            }
        }
        if (ans.length === field.length) {
            return ans;
        }
    }

    if (field[0][field.length - 1].textContent !== EMPTY) {
        let ans = [];
        for (let i = 0; i < field.length; i++) {
            if (field[i][field.length - 1 - i].textContent === field[0][field.length - 1].textContent) {
                ans.push([i, field.length - 1 - i]);
            }
        }
        if (ans.length === field.length) {
            return ans;
        }
    }
    return [];
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
    for (const row of field) {
        for(const cell of row) {
        cell.textContent = EMPTY;
        cell.style.color = '#333';
        }
    }
    isStopGame = false;
    count = 0;
    status = CROSS;
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
