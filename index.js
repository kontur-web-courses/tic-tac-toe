const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

const grid = [[], [], []];
for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++)
        grid[j].push(null);
}
let currentPlayer = 0;

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
    if (grid[row][col] != null)
        return;
    let count = 0
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (currentPlayer === 0) {
        grid[row][col] = 0;
        console.log(count)
        renderSymbolInCell(ZERO, row, col);
    } else {
        grid[row][col] = 1;
        console.log(count)
        renderSymbolInCell(CROSS, row, col);
    }
    currentPlayer = (currentPlayer + 1) % 2;

    console.log(isHaveWinner());

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++)
            if (grid[i][j] != null)
                count += 1
    }
    if (count === 9) {
        setTimeout('alert("Победила дружба")', 1000)
    }
    if (isHaveWinner()[0] === CROSS) {
        setTimeout('alert("Победил X")', 1000)
        const k = isHaveWinner()[1]
        for (let j = 0; j < k.length; j++) {
            const targetCell = findCell(k[j][0],k[j][1]);
            targetCell.style.color = '#f00';
            }
        }
    if (isHaveWinner()[0] === ZERO) {
        setTimeout('alert("Победил O")', 1000)
        const k = isHaveWinner()[1]
        for (let j = 0; j < k.length; j++) {
            const targetCell = findCell(k[j][0],k[j][1]);
            targetCell.style.color = '#f00';
        }
    }
}

    function isHaveWinner() {
        let cells = findWinningCells();
        if (cells == null)
            return EMPTY;

        let x = cells[0][0];
        let y = cells[0][1];
        let winner = grid[x][y] == 1 ? CROSS : ZERO;

        return [winner, cells];
    }

    function findWinningCells() {
        let sum;
        for (let i = 0; i < 3; i++) {
            sum = 0;
            for (let j = 0; j < 3; j++) {
                if (grid[i][j] == null)
                    sum = 1000;
                sum += grid[i][j];
            }
            if (sum == 3 || sum == 0)
                return [[i, 0], [i, 1], [i, 2]];
        }

        for (let i = 0; i < 3; i++) {
            sum = 0;
            for (let j = 0; j < 3; j++) {
                if (grid[j][i] == null)
                    sum = 1000;
                sum += grid[j][i];
            }
            if (sum == 3 || sum == 0)
                return [[0, i], [1, i], [2, i]];
        }

        for (let j = 0; j < 2; j++) {
            sum = 0;
            for (let i = 0; i < 3; i++) {
                let second = j == 0 ? i : 2 - i;
                if (grid[i][second] == null)
                    sum = 1000;
                sum += grid[i][second];
            }

            if (sum == 3 || sum == 0) {
                if (j == 0)
                    return [[0, 0], [1, 1], [2, 2]];

                return [[0, 2], [1, 1], [2, 0]];
            }
        }

        return null;
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

