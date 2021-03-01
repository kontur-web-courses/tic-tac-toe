const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let grid;
let currentPlayer = 0;
let gameEnded = false;
let dimensions = 3;
let playWithRobot = false;

startGame();
addResetListener();

function startGame () {
    let newFieldSize = prompt("Введите размер поля:", dimensions);
    if (isNaN(newFieldSize)) {
        newFieldSize = prompt("Введите размер поля:", dimensions);
    }
    playWithRobot = confirm("Игарть против компа чи не?");
    dimensions = parseInt(newFieldSize);
    renderGrid(dimensions);
    grid = createGrid(dimensions);
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

function createGrid(dimension) {
    grid = [];
    for (let i = 0; i < dimension; i++) {
        grid.push([]);
        for (let j = 0; j < dimension; j++) {
            grid[i].push(EMPTY);
        }
    }
    return grid;
}

function cellClickHandler (row, col) {
    if (grid[row][col] != EMPTY || gameEnded) {
        return;
    }
    let currentSymbol = CROSS;
    if (currentPlayer % 2 === 1)
        currentSymbol = ZERO;
    grid[row][col] = currentSymbol;
    currentPlayer++
    renderSymbolInCell(currentSymbol, row, col);
    if (playWithRobot) {
        currentPlayer++;
        makeRobotMove();
    }
    if (currentPlayer >= dimensions * dimensions) {
        alert("Победила дружба");
        gameEnded = true;
    } else {
        let winnerInfo = getWinner();
        //console.log(winnerInfo);
        if (!winnerInfo[0])
            return;
        winnerInfo[1].forEach(tileId => {
            let cell = findCell(tileId[0], tileId[1]);
            cell.style.backgroundColor = 'red';
        });
        gameEnded = true;
        alert(`${winnerInfo[2]} wins!`);
    }
}

function getWinner() {
    for (let x = 0; x < dimensions; x++) {
        let horizontalRow = grid[x];
        let currentRowWinner = rowWinner(horizontalRow)
        if (currentRowWinner != EMPTY)
            return [true, createHorizontalRow(x), currentRowWinner];
    }
    for (let y = 0; y < dimensions; y++) {
        let verticalRow = [];
        for (let x = 0; x < dimensions; x++)
            verticalRow.push(grid[x][y]);
        let currentRowWinner = rowWinner(verticalRow);
        if (currentRowWinner != EMPTY)
            return [true, createVerticalRow(y), currentRowWinner];
    }
    let diagonalRowOne = [];
    let diagonalRowTwo = [];
    for (let x = 0; x < dimensions; x++) {
        diagonalRowOne.push(grid[x][x]);
        diagonalRowTwo.push(grid[x][dimensions - 1 - x]);
    }
    let currentRowWinner = rowWinner(diagonalRowOne);
    if (currentRowWinner != EMPTY)
        return[true, createDiagonalRow(true), currentRowWinner];
    currentRowWinner = rowWinner(diagonalRowTwo);
    if (currentRowWinner != EMPTY)
        return[true, createDiagonalRow(false), currentRowWinner];
    return [false, undefined, undefined];
}

function createHorizontalRow(x) {
    let result = [];
    for (let i = 0 ; i < dimensions; i++) {
        result.push([x, i]);
    }
    return result;
}

function createVerticalRow(y) {
    let result = [];
    for (let i = 0 ; i < dimensions; i++) {
        result.push([i, y]);
    }
    return result;
}

function createDiagonalRow(toLeft) {
    let result = [];
    for (let i = 0 ; i < dimensions; i++) {
        result.push(toLeft ? [i, i] : [i, dimensions - 1 - i]);
    }
    return result;
}

function makeRobotMove() {
    if (gameEnded)
        return;
    let possibleTiles = [];
    for (let x = 0; x < dimensions; x++)
        for (let y = 0; y < dimensions; y++) 
            if (grid[x][y] == EMPTY)
                possibleTiles.push([x, y]);
    let tileId = getRandomInt(possibleTiles.length);
    let tile = possibleTiles[tileId];
    grid[tile[0]][tile[1]] = ZERO;
    renderSymbolInCell(ZERO, tile[0], tile[1]);
}

function rowWinner(row) {
    if (row.includes(EMPTY))
        return EMPTY;
    if (row.includes(CROSS) && row.includes(ZERO))
        return EMPTY;
    if (row.includes(CROSS))
        return CROSS;
    if (row.includes(ZERO))
        return ZERO;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}  

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    //console.log(row, col);
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
    gameEnded = false;
    currentPlayer = 0;

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
