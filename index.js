const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

const gameField = [[]]
let clickCounter = 0
let dimension = 3
let possibleClicksCount = dimension * dimension

let GameOver = false

startGame();
addResetListener();


function initGameField(dimension, gameField){
    // gameField.map((element) => [EMPTY])
    for (let i = 0; i < dimension; i++) {
        gameField[i] = new Array(dimension)
        for (let j = 0; j < dimension; j++) {
            gameField[i][j] = EMPTY;
        }
    }
    console.log(gameField, 'Field initialized')
}

function startGame () {
    initGameField(dimension, gameField);
    renderGrid(dimension);
    GameOver=false
    clickCounter=0
}

function renderGrid (dimension,oldDimension=0) {
    container.innerHTML = '';
    for (let i = oldDimension; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = oldDimension; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function checkWinner(gameField){
    const checkHorizontalWinner = () => {
        for (let i=0;i<gameField.length;i++){
            let rowString = gameField[i].join("")
            if (rowString === CROSS.repeat(gameField.length)){
                alert(`${CROSS} победил`)
                paintWinningFields(rowString, i)
                return true
            }
            else if(rowString === ZERO.repeat(gameField.length)) {
                alert(`${ZERO} победил`)
                paintWinningFields(rowString, i)
                return true
            }
        }
    }
    const checkVerticalWinner = (index) => {
        let flatArray = gameField.flat(1)
        console.log(`flatArray=${flatArray}`)
        let word = ''
        for (let i = index; i < flatArray.length; i+=gameField.length) {
            if(flatArray[i]===EMPTY)
                continue
            word += flatArray[i]
        }
        if( word===CROSS.repeat(gameField.length)){
            alert(`${CROSS} победил`)
            paintWinningFields(gameField, index, true)
            return true
        }
        else if( word===ZERO.repeat(gameField.length)){
            alert(`${ZERO} победил`)
            paintWinningFields(gameField, index, true)
            return true
        }
    }
    const checkDiagonalWinner = () => {
        let word=''
        for(let i=0;i<gameField.length;i++){
            word += gameField[i][i]
        }
        console.log(`main diagonal: ${word}`)
        if (word===CROSS.repeat(gameField.length)){
            alert(`${CROSS} победил`)
            paintWinningDiagonal(true)
            return true
        }
        else if( word===ZERO.repeat(gameField.length)){
            alert(`${ZERO} победил`)
            paintWinningDiagonal(true)
            return true
        }
        word=''
        for(let i=0;i<gameField.length;i++){
            word+=gameField[gameField.length-1-i][i]
        }
        console.log(`side diagonal: ${word}`)
        if (word===CROSS.repeat(gameField.length)){
            alert(`${CROSS} победил`)
            paintWinningDiagonal(false)
            return true
        }
        else if( word===ZERO.repeat(gameField.length)){
            alert(`${ZERO} победил`)
            paintWinningDiagonal(false)
            return true
        }
    }

    function paintWinningDiagonal(main){
        if(main){
            for(let i=0;i<gameField.length;i++){
                findCell(i,i).style.color = 'red'
            }
        }
        else{
            for(let i=0;i<gameField.length;i++){
                findCell(gameField.length-1-i, i).style.color ='red'
            }
        }
    }

    const paintWinningFields = (line, startIndex, col = false) => {
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
    GameOver=checkHorizontalWinner()
    if(!GameOver) {
        for (let i = 0; i < gameField.length; i++) {
            if (checkVerticalWinner(i)) {
                GameOver =true
                break
            }
        }
    }
    if(!GameOver) {
        GameOver = checkDiagonalWinner()
    }
    return GameOver
}

function cellClickHandler (row, col) {
    if(GameOver){
        return
    }
    if (gameField[row][col]===EMPTY){
        let fieldState = CROSS
        gameField[row][col] = fieldState;
        console.log(`Clicked on cell: ${row}, ${col}`);
        clickCounter++;
        renderSymbolInCell(fieldState, row, col);
        console.log(gameField);
    }
    console.log('before checkWinner')
    if(checkWinner(gameField)) {
        console.log('win')
        return
    }
    console.log('after checkWinner')
    if (clickCounter == possibleClicksCount) {
        alert("победила дружба")
        GameOver=true
        return
    }
    cleverZero()
    clickCounter++;
    if(checkWinner(gameField))
        return
    if (clickCounter == possibleClicksCount) {
        alert("победила дружба")
        GameOver=true
        return
    }
}

function cleverZero(){
    if(findPosition(ZERO)){
        return
    }
    if(findPosition(CROSS)){
        return
    }
    randomZero()
}

function findPosition(symb){
    let coordinates={
        row:0,
        col:0}
    let antiSymb=(symb==ZERO) ? CROSS : ZERO
    let count=0
    let breakCount=0
    let indexRow=0
    let indexCol=0
    console.log(`Symb=${symb}`)
    for(let i=0;i<dimension;i++){
        console.log(`hor=${i}`)
        for(let j=0;j<dimension;j++) {
            if (breakCount == 2)
                break
            if (gameField[i][j] == antiSymb){
                count=0
                break
            }
            if (gameField[i][j] == symb)
                count++
            if (gameField[i][j] == EMPTY) {
                indexRow = i
                indexCol=j
                breakCount++
            }
        }
        if(count==dimension-1){
            gameField[indexRow][indexCol]=ZERO
            renderSymbolInCell(ZERO,indexRow,indexCol)
            console.log(`row=${indexRow},col=${indexCol}`)
            return true
        }
        count=0
        breakCount=0
    }
    for(let i=0;i<dimension;i++){
        console.log(`ver=${i}`)
        for(let j=0;j<dimension;j++) {
            if (breakCount == 2)
                break
            if (gameField[j][i] == antiSymb){
                count=0
                break
            }
            if (gameField[j][i] == symb)
                count++
            if (gameField[j][i] == EMPTY) {
                indexRow = j
                indexCol=i
                breakCount++
            }
        }
        if(count==dimension-1){
            gameField[indexRow][indexCol]=ZERO
            renderSymbolInCell(ZERO,indexRow,indexCol)
            console.log(`row=${indexRow},col=${indexCol}`)
            return true
        }
        count=0
        breakCount=0
    }
    console.log('main diag')
    for(let i=0;i<dimension;i++){
        if (breakCount == 2)
            break
        if (gameField[i][i] == antiSymb){
            count=0
            break
        }
        if (gameField[i][i] == symb)
            count++
        if (gameField[i][i] == EMPTY) {
            indexRow = i
            breakCount++
        }
    }
    if(count==dimension-1){
        gameField[indexRow][indexRow]=ZERO
        renderSymbolInCell(ZERO,indexRow,indexRow)
        console.log(`row=${indexRow},col=${indexRow}`)
        return true
    }
    count=0
    breakCount=0
    console.log('unmain diag')
    for(let i=0;i<dimension;i++){
        if (breakCount == 2)
            break
        if (gameField[dimension-1-i][i] == antiSymb){
            count=0
            break
        }
        if (gameField[dimension-1-i][i] == symb)
            count++
        if (gameField[dimension-1-i][i] == EMPTY) {
            indexRow = i
            breakCount++
        }
    }
    if(count==dimension-1){
        gameField[dimension-1-indexRow][indexRow]=ZERO
        renderSymbolInCell(ZERO,dimension-1-indexRow,indexRow)
        console.log(`row=${dimension-1-indexRow},col=${indexRow}`)
        return true
    }
    count=0
    breakCount=0
}

function randomZero(){
    let coordinates={
        row:0,
        col:0}
    while(true){
        coordinates.row=Math.floor(dimension*Math.random())
        coordinates.col=Math.floor(dimension*Math.random())
        if(gameField[coordinates.row][ coordinates.col]==EMPTY){
            gameField[coordinates.row][ coordinates.col]=ZERO
            break
        }
    }
    renderSymbolInCell(ZERO,coordinates.row,coordinates.col)
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
