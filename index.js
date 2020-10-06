const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let gameField;
let clickCounter;
let winnerIsFound;
let possibleClicksCount;
let dimension;

startGame();
addResetListener();

function initGameField(dimension){
    gameField = new Array(dimension);
    for (let i = 0; i < dimension; i++) {
        gameField[i] = new Array(dimension)
        for (let j = 0; j < dimension; j++) {
            gameField[i][j] = EMPTY;
        }
    }
    renderGrid(dimension);
    console.log(gameField, 'Field initialized');
    return gameField;
}

function startGame () {
    dimension = prompt("Размер поля: ")
    while (dimension < 2 || dimension > 21) {
        alert("Размер поля не может быть меньше 2 или больше 20")
        dimension = prompt("Размер поля: ")
    }
    possibleClicksCount = dimension * dimension
    winnerIsFound = false;
    clickCounter = 0;
    gameField = initGameField(dimension);
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

function checkWinner(){
    const checkHorizontalWinner = () => {
        for (let i=0;i<gameField.length;i++){
            let word = gameField[i].join("")
            let winner = checkLineWinner(word);
            if (winner)
                return {name: winner,
                    line: {startX: i, startY: 0, endX: i, endY: gameField.length - 1}}
        }
    }

    const checkVerticalWinner = () => {
        for (let i=0;i<gameField.length;i++) {
            let word = '';
            for (let j=0;j<gameField.length;j++) {
                word += gameField[j][i];
            }
            let winner = checkLineWinner(word);
            if (winner)
                return {name: winner,
                    line: {startX: 0, startY: i, endX: gameField.length - 1, endY: i}}
        }
    }

    const checkDiagonalWinner = () => {
        let word = '';
        for (let i=0;i<gameField.length;i++) {
            word += gameField[i][i];
        }
        let winner = checkLineWinner(word);
        if (winner)
            return {name: winner,
                line: {startX: 0, startY: 0, endX: gameField.length - 1, endY: gameField.length - 1}}
        word = '';
        for (let i=0;i<gameField.length;i++) {
            word += gameField[i][gameField.length - i - 1];
        }
        winner = checkLineWinner(word);
        if (winner)
            return {name: winner,
                line: {startX: 0, startY: gameField.length - 1, endX: gameField.length - 1, endY: 0}}
    }

    const checkLineWinner = (word) => {
        if (word===CROSS.repeat(gameField.length))
            return CROSS;
        else if (word===ZERO.repeat(gameField.length))
            return ZERO
        return false;
    }

    return checkHorizontalWinner() || checkVerticalWinner() || checkDiagonalWinner()
}

function paintWinningFieldsLine(line){
    if (line.startX == line.endX)
        for (let i = 0; i < gameField.length; i++) {
            findCell(line.startX, i).style.color = 'red'
        }
    else if (line.startY == line.endY)
        for (let i = 0; i < gameField.length; i++) {
            findCell(i, line.startY).style.color = 'red'
        }
    else if (line.endX == line.endY && line.startX == line.startY)
        for (let i = 0; i < gameField.length; i++) {
            findCell(i, i).style.color = 'red'
        }
    else
        for (let i = 0; i < gameField.length; i++) {
            findCell(i, gameField.length - 1 - i).style.color = 'red'
        }
}

function processWinner(){
    winner = checkWinner(gameField)
    if (winner){
        alert(`${winner.name} победил`)
        paintWinningFieldsLine(winner.line)
        winnerIsFound = true;
    }
}

function cellClickHandler (row, col, isAI) {
    if (gameField[row][col]===EMPTY && !winnerIsFound){
        let fieldState = clickCounter % 2 === 0 ? CROSS : ZERO;
        gameField[row][col] = fieldState;
        console.log(`Clicked on cell: ${row}, ${col}`);
        clickCounter++;
        renderSymbolInCell(fieldState, row, col);
        console.log(gameField);
        processWinner()
        if (clickCounter === possibleClicksCount && !winnerIsFound){
            alert('Победила дружба')
            winnerIsFound = true;
        }
        if (!isAI && !winnerIsFound){
            targetCell = getAITargetCell();
            cellClickHandler(targetCell.row, targetCell.col, true)
        }
    }
}

function getAITargetCell(){
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            if (gameField[i][j]===EMPTY){
                gameField[i][j] = ZERO;
                if (checkWinner()){
                    gameField[i][j] = EMPTY;
                    return {row: i, col: j}
                }
                gameField[i][j] = EMPTY;
            }
        }
    }
    return getRandomTargetCell();
}

function getRandomTargetCell(){
    while (true){
        let row = Math.floor(Math.random() * dimension)
        let column = Math.floor(Math.random() * dimension)
        console.log(`Targeting: ${row}, ${column}`);
        if (gameField[row][column] == EMPTY)
            return targetCell = {row: row, col: column}
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
    startGame()
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
