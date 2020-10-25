const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let gameMap = [];
let emptyCells = 0;
let gameIsEnd = false;
let winCells = [];
let mapSize = 0;
let player = 0;
const container = document.getElementById('fieldWrapper');
let autoExpansion = true;
let useAi = true;

startGame();
addResetListener();

function startGame () {
    mapSize = Number(document.getElementById("fieldSizeValue").value);
    autoExpansion = document.getElementById("expansionChecked").checked;
    useAi = document.getElementById("useAiChecked").checked;
    gameMap = [];
    renderGrid(mapSize);
    for (let i = 0; i< mapSize; i++){
        gameMap.push(new Array(mapSize).fill(EMPTY));
    }
    emptyCells = mapSize**2;
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
    if (gameMap[row][col] !== EMPTY || gameIsEnd)
        return;
    gameMap[row][col] = player%2 === 0? CROSS: ZERO;
    renderSymbolInCell(gameMap[row][col],row,col);
    checkWinner(row, col);
    if (gameIsEnd){
        winCells.forEach(element => {
            let row = element[0]
            let col = element[1]
            renderSymbolInCell(gameMap[row][col],row,col, 'red');
        });
        alert(`Победил ${player%2 === 0? CROSS: ZERO}`);
        return;
    }
    emptyCells--;
    if (autoExpansion && emptyCells < (mapSize**2) / 2){
        increaseMap();
    }
    console.log(`Clicked on cell: ${row}, ${col}`);
    if(emptyCells === 0){
        alert("Победила дружба");
        return;
    }
    player++;
    if (useAi && player%2 === 1){
        AiMove()
    }
}

function AiMove(){
    possibleCells = []
    for (let row = 0; row < mapSize; row++)
        for (let col = 0; col < mapSize; col++)
            if (gameMap[row][col] === EMPTY)
                possibleCells.push([row,col]);
    let rand = Math.floor(Math.random() * possibleCells.length);
    cellClickHandler(possibleCells[rand][0], possibleCells[rand][1])
}

function increaseMap(){
    mapSize++;
    emptyCells += mapSize**2-(mapSize-1)**2; 
    renderGrid(mapSize);
    let newGameMap = [];
    for (let i = 0; i< mapSize; i++){
        newGameMap.push(new Array(mapSize).fill(EMPTY));
    }
    let row = 0;
    let col = 0;
    gameMap.forEach(element => {
        element.forEach(sym => {
            renderSymbolInCell(sym,row,col);
            newGameMap[row][col] = sym;
            col++;
        });
        row++;
        col = 0;
    });
    gameMap = newGameMap;
}

function checkWinner(row,col){
    for (let i = row - 1; i <= row + 1; i++){
        if (i - 1 >= 0 && i + 1 < mapSize){
            gameIsEnd = gameMap[i - 1][col] === gameMap[i][col] && gameMap[i][col] === gameMap[i+1][col];
            if (gameIsEnd){
                winCells = [[i - 1, col], [i, col], [i + 1, col]];
                return;
            }
        }
    }

    for (let i = col - 1; i <= col + 1; i++){
        if (i - 1 >= 0 && i + 1 < mapSize){
            gameIsEnd = gameMap[row][i-1] === gameMap[row][i] 
            && gameMap[row][i] === gameMap[row][i+1];
            if (gameIsEnd){
                winCells = [[row, i - 1], [row, i], [row, i+1]];
                return;
            }
        }
    }

    for (let i = -1; i <= 1; i++){
        if (row + i - 1 >= 0 && col + i - 1 >=0  && row + i + 1 < mapSize && col + i + 1 < mapSize){
            gameIsEnd = gameMap[row + i - 1][col + i - 1] === gameMap[row + i][col + i] && gameMap[row + i][col + i] === gameMap[row + i + 1][col + i + 1];
            if (gameIsEnd){
                winCells = [[row + i - 1, col + i - 1], [row + i, col + i], [row + i + 1, col + i + 1]];
                return;
            }
        }
    }

    for (let i = -1; i <= 1; i++){
        if (row + i - 1 >= 0 && col - (i - 1) >=0  && row + i + 1 < mapSize && col - (i + 1) < mapSize){
            gameIsEnd = gameMap[row + i - 1][col - (i - 1)] === gameMap[row + i][col - i] && gameMap[row + i][col - i] === gameMap[row + i + 1][col - (i + 1)];
            if (gameIsEnd){
                winCells = [[row + i - 1, col - (i - 1)], [row + i, col - i], [row + i + 1, col - (i + 1)]];
                return;
            }
        }
    }
    
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
    winCells = []
    gameIsEnd = false;
    player = 0;
    startGame()
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
