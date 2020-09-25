const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

const gameField = [[],[],[]];
let clickCounter = 0;
let dimension;
let maxTurnCounter;
let aiTurn = false;
let gameEnded = false;
let fieldExpand;

addResetListener();
addStartListener();

function initGameField(dimension, gameField){
    for (let i = 0; i < dimension; i++){
        gameField[i] = new Array(dimension);
        for (let j = 0; j<dimension; j++){
            gameField[i][j] = EMPTY;
        }
    }
    console.log(gameField)
}

function getDimensions(){
    let input = document.getElementById('fieldSizeInput');
    let dimensions = parseInt(input.value);
    if (!isNaN(dimensions))
        return dimensions;
    return 3;
}

function startGame (dimension) {
    initGameField(dimension, gameField)
    renderGrid(dimension);
    fieldExpand = document.getElementById('enableFieldExpanding').checked;
}

function renderGrid (dimension, redraw=false) {
    container.innerHTML = '';
    let enableDumbAI = document.getElementById('enableDumbAi').checked;
    let enableSmartAI = document.getElementById('enableSmartAi').checked;
    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = redraw ? gameField[i][j] : EMPTY;
            cell.addEventListener('click', () =>
                (enableDumbAI || enableSmartAI) ?
                    cellClickHandlerButWithAI(i, j, enableSmartAI) : cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function checkWinner(gameField){
    checkHorizontalWinner(gameField);

    checkVerticalWinner(gameField);

    checkDiagonalWinner(gameField);
}

function paintWinningFields(line, startIndex, col = false) {
    if (col){
        for (let i = 0; i < line.length; i++) {
            findCell(i, startIndex).style.color = 'red'
        }
        return
    }

    for (let i = 0; i < line.length; i++) {
        findCell(startIndex, i).style.color = 'red'
    }
}

function paintDiagonal(line,main = true){
    if(main){
        for (let i = 0; i < line.length; i++){
            findCell(i,i).style.color = 'red';
        }
        return
    }
    for (let i = 0; i < line.length; i++){
        findCell(line.length-1-i,i).style.color = 'red';
    }
}

function checkVerticalWinner(gameField){
    for(let i=0;i<gameField.length;i++){
        let flatArray = gameField.flat(2)
        let word = ''
        for (let j = i; j < flatArray.length; j+=gameField.length) {
            if(flatArray[j]===EMPTY)
                continue
            word += flatArray[j]
        }
        if (gameEnded)
            break;

        if(word===CROSS.repeat(gameField.length)){
            alert(`${CROSS} победил`)
            paintWinningFields(gameField, i, true)
            break
        }
        else if(word===ZERO.repeat(gameField.length)){
            alert(`${ZERO} победил`)
            paintWinningFields(gameField, i, true)
            break
        }
    }
}

function createDiagonalLines(gameField) {
    let mainDiagonal = '';
    let secondaryDiagonal = '';
    for (let i = 0; i < gameField.length; i++) {
        if (gameField[i][i] !== EMPTY)
            mainDiagonal += gameField[i][i];
        if (gameField[gameField.length - 1 - i][i] !== EMPTY)
            secondaryDiagonal += gameField[gameField.length - 1 - i][i];
    }
    return {mainDiagonal, secondaryDiagonal};
}

function checkDiagonalWinner(gameField) {
    if(gameEnded) return;

    let {mainDiagonal, secondaryDiagonal} = createDiagonalLines(gameField);

    let main = false
    let crossLine = CROSS.repeat(gameField.length);
    let zeroLine = ZERO.repeat(gameField.length);

    if ((mainDiagonal===crossLine || mainDiagonal===zeroLine))
        main = true

    if ((mainDiagonal===crossLine || secondaryDiagonal===crossLine)){
        alert(`${CROSS} победил`)
        gameEnded= true
        if(main)
            paintDiagonal(gameField)
        else
            paintDiagonal(gameField,main)
    }
    else if((mainDiagonal===zeroLine || secondaryDiagonal===zeroLine)){
        gameEnded= true
        if(main)
            paintDiagonal(gameField)
        else
            paintDiagonal(gameField,main)
        alert(`${ZERO} победил`)
    }
}

function checkHorizontalWinner(gameField) {
    for (let i = 0; i< gameField.length;i++){
        let row = gameField[i].join("")
        if (row === CROSS.repeat(gameField.length) && !gameEnded ){
            gameEnded = true
            paintWinningFields(row, i)
            alert(`Победил ${CROSS}`)
            break
        }
        if (row === ZERO.repeat(gameField.length) && !gameEnded){
            gameEnded = true
            paintWinningFields(row, i)
            alert(`Победил ${ZERO}`)
            break
        }
    }
}

function makeNextTurn(symbol,row,col){
    gameField[row][col] = symbol;
    console.log(`Clicked on cell: ${row}, ${col}`);
    clickCounter++;
    renderSymbolInCell(symbol, row, col);

    checkWinner(gameField)

    if (gameEnded)
        return;

    if(fieldExpand && clickCounter >= Math.round(maxTurnCounter/2))
        increaseField();

    if (clickCounter === maxTurnCounter && !gameEnded)
        alert('Победила дружба')
}

function cellClickHandler(row, col){
    if(gameField[row][col] !== EMPTY || gameEnded){
        return
    }

    let symbol = clickCounter % 2 === 0 ? CROSS : ZERO;
    makeNextTurn(symbol,row, col);
}

function cellClickHandlerButWithAI(row,col, enableSmartAI){
    if(gameField[row][col] !== EMPTY || gameEnded){
        return
    }
    let symbol = aiTurn ? ZERO : CROSS;
    makeNextTurn(symbol,row,col)

    if (aiTurn) {
        aiTurn = false;
        return
    }
    randomAiTurn(enableSmartAI);
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

function findEmptyCells(){
    let emptyCells = []
    for (let i = 0; i < dimension; i++){
        for (let j = 0; j<dimension; j++){
            if (gameField[i][j] === EMPTY)
                emptyCells.push({x:i, y:j});
        }
    }

    return emptyCells
}

function randomAiTurn(enableSmartAI){
    if(gameEnded)
        return;
    aiTurn = true;
    let emptyCells = findEmptyCells();
    let randomInt = generateRandomInt(emptyCells)
    let selectedCell;
    if(enableSmartAI){
        let smartCellPick = smartAiTurn(emptyCells);
        selectedCell = typeof(smartCellPick) === 'undefined' ? emptyCells[randomInt] : smartCellPick;
    }
    else
        selectedCell = emptyCells[randomInt];
    clickOnCell(selectedCell.x, selectedCell.y)
}

function smartAiTurn(emptyCells){
    let fakeField = gameField.map((gameField)=> gameField.slice());
    for (let cell of emptyCells){
        fakeField[cell.x][cell.y] = ZERO;
        if(guessDiagonalWinner(fakeField)
            || guessIfHorizontalWinner(fakeField)
            || guessIfVerticalWinner(fakeField)){
            return cell;
        }
        fakeField[cell.x][cell.y] = EMPTY;
    }
}

function guessIfHorizontalWinner(gameField) {
    for (let i = 0; i< gameField.length;i++){
        let row = gameField[i].join("")
        if(gameEnded)
            break
        if (row === CROSS.repeat(gameField.length) || row === ZERO.repeat(gameField.length))
            return true;
    }
    return false;
}

function guessIfVerticalWinner(gameField){
    for(let i=0;i<gameField.length;i++){
        if(gameEnded)
            return;

        let flatArray = gameField.flat(2)
        let word = ''

        for (let j = i; j < flatArray.length; j+=gameField.length) {
            if(flatArray[j]===EMPTY)
                continue
            word += flatArray[j]
        }

        if(word===CROSS.repeat(gameField.length) || word===ZERO.repeat(gameField.length)){
            return true
        }
    }
    return false;
}

function increaseField() {
    gameField.unshift((new Array(dimension+1)).join(EMPTY).split(''));
    gameField.push((new Array(dimension+1)).join(EMPTY).split(''));
    for(let i = 0; i < gameField.length; i++){
        gameField[i].unshift(EMPTY)
        gameField[i].push(EMPTY)
    }
    dimension+=2;
    maxTurnCounter = dimension*dimension;
    renderGrid(dimension, true);
}

function guessDiagonalWinner(gameField) {
    let {mainDiagonal, secondaryDiagonal} = createDiagonalLines(gameField);

    let crossLine = CROSS.repeat(gameField.length);
    let zeroLine = ZERO.repeat(gameField.length);

    return (mainDiagonal===crossLine || secondaryDiagonal===crossLine)
        || (mainDiagonal===zeroLine || secondaryDiagonal===zeroLine)
}

function generateRandomInt(emptyCells) {
    return Math.floor(Math.random() * emptyCells.length);

}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function addStartListener () {
    const startButton = document.getElementById('start');
    startButton.addEventListener('click', startClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
    gameEnded = false;
    clickCounter = 0;
    startGame(dimension)
}

function startClickHandler () {
    console.log('gameStarted!');
    gameEnded = false;
    clickCounter = 0;
    dimension = getDimensions();
    maxTurnCounter = dimension*dimension;
    startGame(dimension)
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
