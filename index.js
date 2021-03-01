const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const map = [];
let stepsCounter;
let dim;
let playerTurn = 0;
let gameIsOn = true;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';
    dim = dimension;
    stepsCounter = dimension * dimension;
    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        let tmpArray = [];
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            tmpArray.push(EMPTY);
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        map.push(tmpArray);
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    /* Пользоваться методом для размещения символа в клетке так: */
    if (map[row][col] !== EMPTY)
        return;

    stepsCounter--;
    if (playerTurn === 0){
        map[row][col] = ZERO;
        playerTurn = 1;
        renderSymbolInCell(ZERO, row, col);
    } else {
        map[row][col] = CROSS;
        playerTurn = 0;
        renderSymbolInCell(CROSS, row, col);
    }
    if (isWin(row, col))
        alert("Победа");
    if (stepsCounter <= 0) {
        alert('Победила дружба!');
        gameIsOn = false;
    }
}

function isWin(row, col){
    // if ((row === 0 && col === 0)
    //     || (row === dim - 1  && col === dim - 1)
    //     || (row === dim - 1  && col === 0)
    //     || (row === 0  && col === dim - 1)){
    // }
    let currentTurn = map[row][col];

    // По горизонтали
    let counter = findLineNeighbours(Math.max(col - 2, 0), col, [], currentTurn, row);
    if (counter >= 3)
        return true;

    counter = findLineNeighbours(Math.max(col - 1, 0), Math.min(col + 1, dim - 1), [], currentTurn, row);
    if (counter >= 3)
        return true;


    counter = findLineNeighbours(col, Math.min(col + 2, dim), [], currentTurn, row);
    if (counter >= 3)
        return true;

    // По вертикали
    counter = findVerticalNeighbours(Math.max(row - 2, 0), row, [], currentTurn, col);
    if (counter >= 3)
        return true;

    counter = findVerticalNeighbours(Math.max(row - 1, 0), Math.min(row + 1, dim - 1), [], currentTurn, col);
    if (counter >= 3)
        return true;


    counter = findVerticalNeighbours(row, Math.min(row + 2, dim - 1), [], currentTurn, col);
    if (counter >= 3)
        return true;

    // По диагонали
    counter = findСrosswiseNeighbours([Math.max(row - 2, 0), Math.max(col - 2, 0)], [row, col], [], currentTurn, 1, 1);
    if (counter >= 3)
        return true;


    counter = findСrosswiseNeighbours([Math.max(row - 1, 0), Math.max(col - 1, 0)], [Math.min(row + 1, dim - 1), Math.min(col + 1, dim - 1)], [], currentTurn, 1, 1);
    if (counter >= 3)
        return true;


    counter = findСrosswiseNeighbours([row, col], [Math.min(row + 2, dim - 1), Math.min(col + 2, dim - 1)], [], currentTurn, 1, 1);
    if (counter >= 3)
        return true;

    counter = findСrosswiseNeighbours([Math.min(row + 2, dim - 1), Math.max(col - 2, 0)], [row, col], [], currentTurn, 1, -1);
    if (counter >= 3)
        return true;
}


function findLineNeighbours(minIndex, maxIndex, points, e, row){
    let counter = 0;
    for (let i = minIndex; i <= maxIndex; i++){
        if (map[row][i] === e){
            counter += 1;
            points.push((i));
        }
    }
    return counter;
}

function findVerticalNeighbours(minIndex, maxIndex, points, e, col){
    let counter = 0;
    for (let i = minIndex; i <= maxIndex; i++){
        if (map[i][col] === e){
            counter += 1;
            points.push([i, col])
        }
    }
    return counter;
}

function findСrosswiseNeighbours(startPoint, endPoint, points, e, stepRow, stepCol){
    let counter = 0;
    for (let i = startPoint[0]; i <= endPoint[0]; i = i + stepRow){
        for (let j = startPoint[1]; j <= endPoint[1]; j = j + stepCol){
            console.log(i, j);
            if (map[i][j] === e){
                counter += 1;
                points.push([i, j])
            }        
        }
    }
    return counter;
}

function findСrosswise2Neighbours(startPoint, endPoint, points, e, stepRow, stepCol){
    let counter = 0;
    for (let i = startPoint[0]; i >= endPoint[0]; i = i + stepRow){
        for (let j = startPoint[1]; j <= endPoint[1]; j = j + stepCol){
            console.log(i, j);
            if (map[i][j] === e){
                counter += 1;
                points.push([i, j])
            }        
        }
    }
    return counter;
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
