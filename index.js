const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]]
let lastTurnIndex = 0;
let gameEnded = false;

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

function paintWinner(p1, p2, p3) {
    let cells = [findCell(...p1), findCell(...p2), findCell(...p3)]
    cells.forEach((cell) => {
        cell.style.backgroundColor = 'red';
    })
    gameEnded = true;
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (field[i][0] === field[i][1] && field[i][1] === field[i][2] && field[i][0] !== EMPTY) {
            paintWinner([i, 0], [i, 1], [i, 2]);
            return field[i][0]
        }
        if (field[0][i] === field[1][i] && field[1][i] === field[2][i] && field[0][i] !== EMPTY) {
            paintWinner([0, i], [1, i], [2, i]);
            return field[0][i]
        }
    }
    if (field[0][0] === field[1][1] && field[1][1] === field[2][2] && field[0][0] !== EMPTY) {
        paintWinner([0, 0], [1, 1], [2, 2]);
        return field[0][0]
    }
    if (field[2][0] === field[1][1] && field[1][1] === field[0][2] && field[2][0] !== EMPTY) {
        paintWinner([2, 0], [1, 1], [0, 2]);
        return field[2][0]
    }
}

function computerStupidTurn(){
    const freeIndexes = field.reduce((result, cell, i) => {
        if (cell[0] === EMPTY){
            return [...result, {X: i, Y: 0}]
        }
        if (cell[1] === EMPTY){
            return [...result, {X: i, Y: 1}]
        }
        if (cell[2] === EMPTY){
            return [...result, {X: i, Y: 2}]
        }

        return result;
    }, [])
    const chosenIndex = Math.round(- 0.5 + Math.random() * (freeIndexes.length))
    console.log(chosenIndex)
    console.log(freeIndexes)
    let chosenCell = freeIndexes[chosenIndex];
    cellClickHandler(chosenCell.X, chosenCell.Y)
}

function cellClickHandler(row, col) {
    if (field[row][col] !== EMPTY || gameEnded) {
        return
    }
    let turnSymbol = lastTurnIndex % 2 === 0 ? CROSS : ZERO;
    field[row][col] = turnSymbol;
    renderSymbolInCell(turnSymbol, row, col);
    lastTurnIndex++;
    console.log(`Clicked on cell: ${row}, ${col}`);
    let winner = checkWinner();
    if (winner) {
        setTimeout(() => {
            alert(winner);
        }, 0)
    } else if (lastTurnIndex === 9) {
        setTimeout(() => {
            alert('Победила дружба');
            gameEnded = true;
        }, 0)
    }

    if (turnSymbol === CROSS) {
        setTimeout(() => {
            computerStupidTurn()
        }, 100)
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
    field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
    lastTurnIndex = 0;
    gameEnded = false;
    startGame();
    console.log('reset!');
}

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
