const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

const gameField = []
let clickCounter = 0 
let possibleClicksCount = 0

startGame();
addResetListener();

function initGameField(dimension, gameField) {
    for (let i = 0; i < dimension; i++){
        gameField[i] = new Array(dimension) 
        for (let j = 0; j < dimension; j++) {
            gameField[i][j] = EMPTY;
        }
    }
}

function startGame () {
    let dimension = prompt('Ширина поля', 3)
    initGameField(dimension, gameField);
    renderGrid(dimension);
    clickCounter = 0
    possibleClicksCount = dimension * dimension
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
function checkWinner (gameField){
    const checkHorizontalWinner = () => {
        for (let i = 0; i < gameField.length; i++){
            let rowString = gameField[i].join('')
            if (rowString === CROSS.repeat(gameField.length)){
                alert(`${CROSS} победил`)
                paintWinningFields(rowString, i, true, false, false, false)
                break
            }
            else if (rowString === ZERO.repeat(gameField.length)){
                alert(`${ZERO} победил`)
                paintWinningFields(rowString, i, true, false, false, false)
                break
            }
        }
    }
    const checkVerticalWinner = (index) => {
        let flatArray = gameField.flat(2)
        let word = ''
        for (let i = index; i < flatArray.length; i+= gameField.length){
            if(flatArray[i] === EMPTY)
                continue
            word += flatArray[i]
        }
        if (word === CROSS.repeat(gameField.length)){
            alert(`${CROSS} победил`)
            paintWinningFields(gameField, index, false, true, false, false)
            return true
        }
        if (word === ZERO.repeat(gameField.length)){
            alert(`${ZERO} победил`)
            paintWinningFields(gameField, index, false, true, false, false)
            return true
        }
    }

    const checkDiagonalWinner = () => {
        let flatArray = gameField.flat(2)

        let word1 = '' 
        for (let i = 0; i < flatArray.length; i += gameField.length + 1){
            if(flatArray[i] === EMPTY)
                continue
            word1 += flatArray[i]
            console.log(word1)
            if (word1 === CROSS.repeat(gameField.length)){
                alert(`${CROSS} победил`)
                paintWinningFields(word1, i, false, false, true, false)
                break
            }
            else if (word1 === ZERO.repeat(gameField.length)){
                alert(`${ZERO} победил`)
                paintWinningFields(word1, i, false, false, true, false)
                break
            }
        }
        
        let word2 = ''
        for (let i = gameField.length - 1; i < flatArray.length - 1; i += gameField.length - 1) {
            if(flatArray[i] === EMPTY)
                continue
            word2 += flatArray[i]
            console.log(word2)
            if (word2 === CROSS.repeat(gameField.length)){
                alert(`${CROSS} победил`)
                paintWinningFields(word2, i, false, false, false, true)
                break
            }
            else if (word2 === ZERO.repeat(gameField.length)){
                alert(`${ZERO} победил`)
                paintWinningFields(word2, i, false, false, false, true)
                break
            }
        }
    }

    const paintWinningFields = (line, startIndex, row, col, diag1, diag2) => {
        if (col){
            for (let i = 0; i < line.length; i++){
                findCell(i, startIndex).style.color = 'red'
             }
             
        } 
        
        if (row){
            for (let i = 0; i < line.length; i++) {
                findCell(startIndex, i).style.color = 'red'
            }
        }

        if (diag1){
            let index = 0
            for (let i = 0; i < line.length; i++) {
                findCell(index, i).style.color = 'red'
                index +=  1
            }
        }

        if (diag2){
            let index = line.length - 1
            for (let i = 0; i < line.length; i++) {
                findCell(index, i).style.color = 'red'
                index -=  1
            }
        }
        return
    }
    checkHorizontalWinner()
    for (let i = 0; i < gameField.length; i++){
        if (checkVerticalWinner(i))
            break
    }
    checkVerticalWinner()
    checkDiagonalWinner()
}



function cellClickHandler (row, col) {
    if (gameField[row][col] === EMPTY) { 
        let fieldState = clickCounter % 2 === 0 ? CROSS : ZERO;
        gameField[row][col] = fieldState;
        console.log(`Clicked on cell: ${row}, ${col}`);
        clickCounter++;
        renderSymbolInCell(fieldState, row, col);
    }
    checkWinner(gameField)
    if (clickCounter == possibleClicksCount){
        alert('Победила дружба')
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
    console.log('reset!');
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
