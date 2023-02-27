const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let field;
let firstPlayerTurn = true;
let winColor = '#FF69B4';
let isWin = false;
let n; 
let count = 0;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    n = prompt("Размер", 3);
    field = []
    count = 0;
    isWin = false;
    firstPlayerTurn = true;

    for (let i = 0; i < n; i++) {
        let a = [];
        for (let j = 0; j < n; j++)
            a.push(EMPTY);
        field.push(a);
    }

    renderGrid(n);
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

    if (isWin)
        return;

    if (field[row][col] !== EMPTY) {
        return;
    }
    count ++;
    if (firstPlayerTurn) {
        firstPlayerTurn = false;
        field[row][col] = ZERO;
        renderSymbolInCell(ZERO, row, col);
    } else {
        firstPlayerTurn = true;
        field[row][col] = CROSS;
        renderSymbolInCell(CROSS, row, col);
    }
    if (!checkWinner()) {
        let isNichia = true;
        for (let i of field) {
            for (let j of i) {
                if (j === EMPTY) {
                    isNichia = false;
                    break;
                }
            }
            if (!isNichia)
                break;

        }
        if (isNichia)
            setTimeout(() => alert('Победила дружба'));
    } else {
        isWin = true;
    }
    if (!checkWinner())
    {
        if (count > n*n / 2)
        {
            console.log("trt")
            n++;
            for (let i = 0; i < n - 1; i++) {
                field[i].push(EMPTY);

            }
            let a = []
            for (let j = 0; j < n; j++)
                a.push(EMPTY);
            field.push(a);

            renderGrid(n);

            for (let i = 0; i< n;i ++)
            {
                for (let j = 0; j< n;j ++)
                {
                    renderSymbolInCell(field[i][j], i, j)
                }
            }
        }
    }


}

function checkWinner() {
    const allEqual = arr => arr.every( v => v === arr[0] )
    let i = -1;
    for(let cell of field)
    {
        i++;
        if (allEqual(cell)) {
            if (cell[0] === CROSS)
            {
                for (let k = 0; k < n; k++)
                    renderSymbolInCell(field[i][0], i, k, winColor);
                setTimeout(() => alert('Победил игрок 2'));
                return true;
            }
            else if (cell[0] === ZERO) {
                for (let k = 0; k < n; k++)
                    renderSymbolInCell(field[i][k], i, k, winColor);
                setTimeout(() => alert('Победил игрок 1'));
                return true;
            }
        }
    }
    for (let i = 0; i<n; i++)
    {
        let a = []
        for (let j = 0; j < n; j++)
        {
            a.push(field[j][i]);
        }
        if (allEqual(a))
            if (field[0][i] === CROSS) {
                for (let k = 0; k < n; k++)
                    renderSymbolInCell(field[0][i], k, i, winColor);
                setTimeout(() => alert('Победил игрок 2'));
                return true;
            }
            else if (field[0][i] === ZERO) {
                for (let k = 0; k < n; k++)
                    renderSymbolInCell(field[0][i], k, i, winColor);
                setTimeout(() => alert('Победил игрок 1'));
                return true;
            }
    }

    let a = [];
    for (let i = 0; i < n; i++) {
        a.push(field[i][i]);
    }
    if (allEqual(a))
        if (a[0] === CROSS) {
            for (let k = 0; k < n; k++)
                renderSymbolInCell(a[0], k, k, winColor);
            setTimeout(() => alert('Победил игрок 2'));
            return true;
        }
        else if (a[0] === ZERO) {
            for (let k = 0; k < n; k++)
                renderSymbolInCell(a[0], k, k, winColor);
            setTimeout(() => alert('Победил игрок 1'));
            return true;
        }

    a = [];
    for (let i = 0; i < n; i++) {
        a.push(field[n-i-1][i]);
    }
    if (allEqual(a))
        if (a[0] === CROSS) {
            for (let k = 0; k < n; k++)
                renderSymbolInCell(a[0], n-k-1, k, winColor);
            setTimeout(() => alert('Победил игрок 2'));
            return true;
        }
        else if (a[0] === ZERO) {
            for (let k = 0; k < n; k++)
                renderSymbolInCell(a[0], n-k-1, k, winColor);
            setTimeout(() => alert('Победил игрок 1'));
            return true;
        }

    return false;
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

    startGame();
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
