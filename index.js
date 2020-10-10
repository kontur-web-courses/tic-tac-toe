const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let personalCount = prompt('Укажите размерность поля?', ) // Для 9 задания
const gameField = [];
let clickCounter = 0;
const possibleClicksCount = personalCount * personalCount;
let isWin = false; // Для 7 задания

startGame();
addResetListener();

function initGameField(dimension, gameField){
    for (let i = 0; i < dimension; i++) {
        gameField[i] = new Array(dimension)
        for (let j = 0; j < dimension; j++) {
            gameField[i][j] = EMPTY;
        }
    }
    console.log(gameField, 'Field initialized')
}

function startGame () {
    initGameField(personalCount, gameField);
    renderGrid(personalCount);
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

function checkWinner(gameField){
    const checkHorizontalWinner = () => {
        for (let i=0;i<gameField.length;i++){
            let rowString = gameField[i].join("")
            if (rowString === CROSS.repeat(gameField.length)){
                alert(`${CROSS} победил`);
                paintWinningFields(rowString, i);
                isWin = true;
                break
            }
            else if(rowString === ZERO.repeat(gameField.length)) {
                alert(`${ZERO} победил`);
                isWin = true;
                paintWinningFields(rowString, i)
                break
            }
        }
    }
    const checkVerticalWinner = (index) => {
        let flatArray = gameField.flat(2)
        console.log(flatArray)
        let word = ''
        for (let i = index; i < flatArray.length; i+=gameField.length) {
            if(flatArray[i]===EMPTY)
                continue
            word += flatArray[i]
        }
        if (word===CROSS.repeat(gameField.length)){
            alert(`${CROSS} победил`);
            isWin = true;
            paintWinningFields(gameField, index, true)
            return true
        }
        else if (word===ZERO.repeat(gameField.length)){
            alert(`${ZERO} победил`);
            isWin = true;
            paintWinningFields(gameField, index, true)
            return true
        }
    }
    const checkDiagonalWinner = (index) => {
        let flatArray = gameField.flat(2)
        console.log(flatArray)
        let word = ''
        if (index === 0) {
            for (let i = index; i < flatArray.length; i += gameField.length + 1) {
                if (flatArray[i] === EMPTY)
                    continue
                word += flatArray[i]
            }
        }
        else {
            for (let i = index; i < flatArray.length; i += gameField.length - 1) {
                if (flatArray[i] === EMPTY)
                    continue
                word += flatArray[i]
            }
        }
        if (word === CROSS.repeat(gameField.length)) {
            alert(`${CROSS} победил`)
            isWin = true;
            paintWinningFields(gameField, index, true)
            return true
        } else if (word === ZERO.repeat(gameField.length)) {
            alert(`${ZERO} победил`)
            isWin = true;
            paintWinningFields(gameField, index, true)
            return true
        }

    }
    const paintWinningFields = (line, startIndex, col = false) => {
        if (col){
            for (let i = 0; i < line.length; i++) {
                findCell(i, startIndex).style.color = 'red';
            }
            return
        }
        for (let i = 0; i < line.length; i++) {
            findCell(startIndex, i).style.color = 'red';
        }
        for (let i=0; i<line.length; i++) {
            if (startIndex===0) {
                for (let j=0; j < line.length; i++) {
                    findCell(i, j).style.color = 'red';
                }
            }
            else {
                for (let j=line.length; i>0; i--) {
                    findCell(i, j).style.color = 'red';
                }
            }
        }
    }
    checkHorizontalWinner()
    for(let i=0;i<gameField.length;i++){
        if(checkVerticalWinner(i)){
            break
        }
    }
    for(let i=0;i<gameField.length;i++){
        if(checkDiagonalWinner(i)){
            break
        }
    }
}

function cellClickHandler (row, col) {
    if (isWin) return; // проверка для 7 задания
    if (gameField[row][col]===EMPTY) {
        let fieldState = clickCounter % 2 === 0 ? CROSS : ZERO;
        if (fieldState===CROSS) {
            gameField[row][col] = fieldState;
            console.log(`Clicked on cell: ${row}, ${col}`);
            clickCounter++;
            renderSymbolInCell(fieldState, row, col);
            console.log(gameField);
        }
        else if (fieldState===ZERO) {
            clickRandomZero(gameField);
        }
    }
    checkWinner(gameField)
    if (clickCounter === possibleClicksCount)
        alert('Победила дружба');
}

// Для 10 задания
function clickRandomZero(gameField) {
    let randomRow = Math.floor(Math.random() * gameField.length);
    let randomCol = Math.floor(Math.random() * gameField.length);
    if (gameField[randomRow][randomCol]===EMPTY){
        let fieldState = ZERO;
        gameField[randomRow][randomCol] = fieldState;
        console.log(`Clicked on cell: ${randomRow}, ${randomCol}`);
        clickCounter++;
        renderSymbolInCell(fieldState, randomRow, randomCol);
        console.log(gameField);
    }
    else {
        clickRandomZero(gameField);
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
    gameField.length = 0;
    startGame();
    isWin = false;
    clickCounter = 0;
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
