const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let gameField;
let clickCounter = 0;
let possibleClicksCount;
let winner = undefined;

startGame();
addResetListener();
addAddListener();

function initGameField(dimension){
    gameField = [];
    for (let i = 0; i < dimension; i++) {
        gameField[i] = new Array(dimension)
        for (let j = 0; j < dimension; j++) {
            gameField[i][j] = EMPTY;
        }
    }
    possibleClicksCount = gameField.length ** 2;
}

function startGame () {
    initGameField(3);
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = i < gameField.length && j < gameField.length ? gameField[i][j] : EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function makeFieldBigger() {
    gameField.unshift(new Array())
    gameField.push(new Array())
    for (let i = 0; i < gameField.length - 2; i++){
        gameField[0][i] = EMPTY;
        gameField[gameField.length - 1][i] = EMPTY;
    }
    for (let i = 0; i < gameField.length; i++){
        gameField[i].unshift(EMPTY);
        gameField[i].push(EMPTY);
    }
    renderGrid(gameField.length)
    possibleClicksCount = gameField.length ** 2;
}

function checkWinner(){
    if (checkHorizontalWinner() || checkVerticalWinner() ||  checkDiagonalWinner())
        return;
    else if (winner === undefined && clickCounter === possibleClicksCount)
        alert("Победила дружба");
}

function checkHorizontalWinner() {
    for (let row = 0; row < gameField.length; row++){
        let rowString = gameField[row].join("");
        if (rowString.includes("XXX")){
            winner = CROSS;
            paintWinningFields([row, rowString.indexOf("X")], "horizontal");
            alert(`${CROSS} победил`);
            return ;
        }
        else if (rowString.includes("OOO")){
            winner = ZERO;
            paintWinningFields([row, rowString.indexOf("O")], "horizontal");
            alert(`${ZERO} победил`);
            return ;
        }
    }
}

function checkVerticalWinner() {
    let fieldWord = gameField.flat(2).join("");
    let count = gameField.length - 1;
    let isCrossWinner = fieldWord.search(new RegExp("X.{" + count + "}X.{" + count + "}X"));
    let isZeroWinner = fieldWord.search(new RegExp("O.{" + count + "}O.{" + count + "}O"));
    if (isCrossWinner != -1){
        winner = CROSS;
        paintWinningFields([Math.trunc(isCrossWinner/gameField.length),isCrossWinner%gameField.length ], "vertical");
        alert(`${CROSS} победил`);
        return;
    }
    else if (isZeroWinner != -1){
        winner = ZERO;
        paintWinningFields([Math.trunc(isZeroWinner/gameField.length),isZeroWinner%gameField.length], "vertical");
        alert(`${ZERO} победил`);
        return;
    }
}

function checkDiagonalWinner() {
    const checkSmallField = (row, col) => {
        let wordLeftToRight = "";
        let wordRightToLeft = "";
        for (let i = 0; i < 3; i++){
            wordLeftToRight += gameField[row + i][col + i];
            wordRightToLeft += gameField[row + i][col - i + 2];
        }
        if ((wordLeftToRight || wordRightToLeft) && (wordLeftToRight.includes("XXX") || wordRightToLeft.includes("XXX"))){
            winner = CROSS;
            let direction = wordLeftToRight.includes("XXX") ? "right" : "left";
            paintWinningFields([row, col], "diagonal", direction);
            alert(`${CROSS} победил`);
            return true;
        }
        else if ((wordLeftToRight || wordRightToLeft) && (wordLeftToRight.includes("OOO") || wordRightToLeft.includes("OOO"))){
            winner = ZERO;
            let direction = wordLeftToRight.includes("OOO") ? "right" : "left";
            paintWinningFields([row, col], "diagonal", direction);
            alert(`${ZERO} победил`);
            return true;
        }
    }
    for (let i = 0; i < gameField.length - 2; i++){
        for (let j = 0; j < gameField.length - 2; j++){
            if (checkSmallField(i, j))
                return true;
        }
    }
}

function paintWinningFields (startPoint, type, directionTo) {
    if (type === "vertical"){ console.log(startPoint);
        for (let i = startPoint[0]; i < startPoint[0] + 3; i++)
            findCell(i, startPoint[1]).style.color = 'red';
    }
    else if (type === "horizontal") {console.log(startPoint);
        for (let i = startPoint[1]; i < startPoint[1] + 3; i++)
            findCell(startPoint[0], i).style.color = 'red';
    }
    else if (type === "diagonal"){
        if (directionTo == "right"){console.log(startPoint);
            for (let i = 0; i < 3; i++)
                findCell(startPoint[0] + i, startPoint[1] + i).style.color = 'red';
        }
        else if (directionTo == "left"){console.log(startPoint);
            for (let i = 0; i < 3; i++)
                findCell(startPoint[0] + i, startPoint[1] - i + 2).style.color = 'red';
        }
    }
}

function cellClickHandler (row, col) {
    console.log(gameField)

    if (gameField[row][col] === EMPTY && winner === undefined){
        gameField[row][col] = CROSS;
        renderSymbolInCell(CROSS, row, col);
        clickCounter++;
        checkWinner();
        if (winner === undefined){
            makeZeroClick();
            clickCounter++;
            checkWinner();
        }
    }
    if (clickCounter >  possibleClicksCount / 2 && winner === undefined) {
        makeFieldBigger();
    }
}

function makeZeroClick(){
    for (let i = 0; i < gameField.length; i++)
        for (let j = 0; j < gameField.length; j++){
            if (gameField[i][j] === EMPTY && winner === undefined){
                gameField[i][j] = ZERO;
                renderSymbolInCell(ZERO, i, j);
                return;
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

function addAddListener () {
    const addButton = document.getElementById('add');
    addButton.addEventListener('click', makeFieldBigger);
}

function resetClickHandler () {
    for (let i = 0; i < gameField.length; i++){
        for (let j = 0; j < gameField.length; j++){
            gameField[i][j] = EMPTY;
            renderSymbolInCell(EMPTY, i, j);
        }
    }
    resetScore();
    startGame();
}

function resetScore(){
    clickCounter = 0
    winner = undefined;
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
