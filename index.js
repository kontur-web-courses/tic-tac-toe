const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let dimension = 3;
let currentSymbol = CROSS;
let grid = [];
let symbolsCount = 0;
let gameOver = false;

let doUpgradeGrid = true;
let isAIClever = true;
let isAIOn = true;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(dimension);
}

function renderGrid (dimension) {
    container.innerHTML = '';
    grid = [];
    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        grid[i] = [];
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            grid[i][j] = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function upgradeGrid(){
    let oldGrid = grid.slice(0);
    renderGrid(dimension + 2);
    let newGrid = []
    for (let i = 0; i < dimension + 2; i++){
        newGrid.push([]);
        for (let j = 0; j < dimension + 2; j++){
            if (i == 0 || i == dimension + 1 || j == 0 || j == dimension + 1)
                newGrid[i][j] = EMPTY;
            else
                newGrid[i][j] = oldGrid[i-1][j-1];
            
            renderSymbolInCell(newGrid[i][j], i, j);
        }
    }
    grid = newGrid;
    dimension += 2;
}

function cellClickHandler (row, col) {
    handleSymbolPut(row, col);
    if (!gameOver && isAIOn)
        pseudoAI();
}

function handleSymbolPut (row, col){
    if (grid[row][col] == EMPTY && !gameOver){
        renderSymbolInCell(currentSymbol, row, col);
        grid[row][col] = currentSymbol;
        changeSymbol();
        checkGameOver();
        symbolsCount++;
        if (symbolsCount == dimension*dimension && !gameOver){
            alert("Победила дружба");
            gameOver = true;
        }
        console.log(`Clicked on cell: ${row}, ${col}`);
    }        
    if (symbolsCount > dimension*dimension/2 && !gameOver && doUpgradeGrid)
        upgradeGrid();
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
    resetGame();
}

function resetGame (){
    gameOver = false;
    dimension = parseInt(document.getElementById("input").value);
    if (!dimension)
        dimension = 3;
    renderGrid(dimension);
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            renderSymbolInCell(EMPTY, i, j);
            grid[i][j] = EMPTY;
            findCell(i, j).style.backgroundColor = "lightgoldenrodyellow";
        }
    }
    currentSymbol = CROSS;
    symbolsCount = 0;
    
    doUpgradeGrid = document.getElementById("doUpgradeGrid").checked;
    isAIOn = document.getElementById("isAIOn").checked;
    isAIClever = document.getElementById("isAIClever").checked;
}
        
function changeSymbol (){
    if (currentSymbol == CROSS)
        currentSymbol = ZERO;
    else
        currentSymbol = CROSS;
}

function checkGameOver(){
    for (let i = 0; i < dimension - 2; i++){
        for (let j = 0; j < dimension - 2; j++){
            let subResult = checkGameOver3x3(i, j);
            if (subResult) {
                handleWin(subResult); 
                return;
            }
        }
    }
}

function handleWin(goodBlock){
    gameOver = true;
    for (i = 0; i < goodBlock.length; i++){
        findCell(goodBlock[i][0], goodBlock[i][1]).style.backgroundColor = "red";
    }
    alert("Победа " + grid[goodBlock[0][0]][goodBlock[0][1]]);
}

function checkGameOver3x3 (row, col){
    let results = [checkRows(3, row, col), checkCols(3, row, col), checkDiags(3, row, col)];
    for (let i = 0; i < 3; i++){
        if (results[i])
            return results[i];
    }
    return false;
}

function checkRows(dimension, row, col){
    for (let i = 0; i < dimension; i++) {
        let block = [];
        let symbol = grid[row + i][col];
        for (let j = 0; j < dimension; j++) {
            if (grid[row + i][col + j] != symbol || grid[row + i][col + j] == EMPTY){
                block = [];
                break;
            }
            block.push([row + i, col + j])
        }
        if (block.length > 0)
            return block;
    }
    return false;
}

function checkCols(dimension, row, col){
    for (let i = 0; i < dimension; i++) {
        let block = [];
        let symbol = grid[row][col + i];
        for (let j = 0; j < dimension; j++) {
            if (grid[row + j][col + i] != symbol || grid[row + j][col + i] == EMPTY){
                block = [];
                break;
            }
            block.push([row + j, col + i])
        }
        if (block.length > 0)
            return block;
    }
    return false;
}

function checkDiags (dimension, row, col) {
    let symbol = grid[row][col];
    let block = [];
    for (let i = 0; i < dimension; i++){
        if (grid[row + i][col + i] != symbol || grid[row + i][col + i] == EMPTY){
            block = [];
            break;
        }   
        block.push([row+i, col + i]);
    }
    if (block.length > 0)
        return block;
    
    symbol = grid[row + dimension - 1][col];
    for (let i = 0; i < dimension; i++){
        if (grid[row + dimension - 1 - i][col + i] != symbol ||
           grid[row + dimension - 1 - i][col + i] == EMPTY){
            block = [];
            break;
        }   
        block.push([row + dimension - 1 - i, col + i])            
    }
    if (block.length > 0)
        return block;
    return false;
}

function pseudoAI(){
    if (isAIClever){
        for (let i = 0; i < dimension - 2; i++){
            for (let j = 0; j < dimension - 2; j++){
                if (clickToWin3x3(i, j))
                    return;
            }
        }    
    }
    randomClickInSquare(dimension, 0, 0);
}

function clickToWin3x3(row, col){
    emptyCells = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[row + i][col + j] == EMPTY)
                emptyCells.push([row + i, col + j]);
        }
    }
    for (let i = 0; i < emptyCells.length; i++){
        grid[emptyCells[i][0]][emptyCells[i][1]] = ZERO;
        isWin = checkGameOver3x3(row, col);
        grid[emptyCells[i][0]][emptyCells[i][1]] = EMPTY
        if (isWin){
            handleSymbolPut(emptyCells[i][0], emptyCells[i][1]);
            return true;
        }
    }
}

function randomClickInSquare(dimension, row, col){
    let randInt = randomInteger(0, dimension * dimension);
    let isPut = false;
    let emptyCount = 0;
    while (!isPut){
        for (let i = 0; i < dimension; i++) {
            for (let j = 0; j < dimension; j++) {
                if (grid[row + i][col + j] == EMPTY){
                    if (emptyCount == randInt){
                        handleSymbolPut(row + i, col + j);
                        return;
                    }
                    emptyCount++;                    
                }
            }
        }        
    }    
}

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
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
