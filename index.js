const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

const startGameField = [];
let dimension = 3;
let gameField = startGameField.slice();
let clickCounter = 0;
let possibleClicksCount = dimension ** 2;

startGame();
addResetListener();

function initGameField(dimension, gameField) {
    // gameField.map((element) => [EMPTY])
    for (let i = 0; i < dimension; i++) {
        gameField[i] = new Array(dimension)
        for (let j = 0; j < dimension; j++) {
            gameField[i][j] = EMPTY;
        }
    }
    console.log(gameField, 'Field initialized')
}

function startGame() {
    dimension = Math.abs(parseInt(document.getElementById('dimension').value));
    possibleClicksCount = dimension ** 2;
    initGameField(dimension, gameField);
    renderGrid(dimension);
}

function renderGrid(dimension) {
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

function checkWinner(gameField) {
    const checkHorizontalWinner = () => {
        for (let i = 0; i < gameField.length; i++) {
            let rowString = gameField[i].join("")
            if (rowString === CROSS.repeat(gameField.length)) {
                alert(`${CROSS} победил`)
                paintWinningFields(rowString, i)
                break
            } else if (rowString === ZERO.repeat(gameField.length)) {
                alert(`${ZERO} победил`)
                paintWinningFields(rowString, i)
                break
            }
        }
    }
    const checkVerticalWinner = (index) => {
        let flatArray = gameField.flat(2)
        console.log(flatArray)
        let word = ''
        for (let i = index; i < flatArray.length; i += gameField.length) {
            if (flatArray[i] === EMPTY)
                continue
            word += flatArray[i]
            //console.log(word);
        }
        if (word === CROSS.repeat(gameField.length)) {
            alert(`${CROSS} победил`)
            paintWinningFields(gameField, index, true)
            return true

        } else if (word === ZERO.repeat(gameField.length)) {
            alert(`${ZERO} победил`)
            paintWinningFields(gameField, index, true)
            return true
        }
    }

    const checkFirstDiagonalWinner = (index) => {
        let flatArray = gameField.flat(2)
        let word = ''
        for (let i = index; i < flatArray.length; i += dimension - 1) {
            if (flatArray[i] === EMPTY)
                continue
            word += flatArray[i]
        }
        if (word === CROSS.repeat(gameField.length)) {
            alert(`${CROSS} победил`)
            paintWinningFields(gameField, index, false, true)
            return true

        } else if (word === ZERO.repeat(gameField.length)) {
            alert(`${ZERO} победил`)
            paintWinningFields(gameField, index, false, true)
            return true
        }
    }

    const checkSecondDiagonalWinner = (index) => {
        let flatArray = gameField.flat(2)
        let word = ''
        for (let i = index; i < flatArray.length; i += dimension + 1) {
            if (flatArray[i] === EMPTY)
                continue
            word += flatArray[i]
        }
        if (word === CROSS.repeat(gameField.length)) {
            alert(`${CROSS} победил`)
            paintWinningFields(gameField, index, false, false, true)
            return true

        } else if (word === ZERO.repeat(gameField.length)) {
            alert(`${ZERO} победил`)
            paintWinningFields(gameField, index, false, false, true)
            return true
        }
    }

    const paintWinningFields = (gameField, startIndex, col = false, firstD = false, secondD = false) => {
        if (col) {
            for (let i = 0; i < gameField.length; i++) {
                findCell(i, startIndex).style.color = 'red'
            }
            clickCounter = possibleClicksCount + 1
            return
        }
        if (firstD) {
            for (let i = 0; i < gameField.length; i++) {
                findCell(i, startIndex - i).style.color = 'red'
            }
            clickCounter = possibleClicksCount + 1
            return
        }
        if (secondD) {
            for (let i = 0; i < gameField.length; i++) {
                findCell(i, startIndex + i).style.color = 'red'
            }
            clickCounter = possibleClicksCount + 1
            return
        }
        for (let i = 0; i < gameField.length; i++) {
            findCell(startIndex, i).style.color = 'red'
            clickCounter = possibleClicksCount + 1
        }

    }

    checkHorizontalWinner()
    for (let i = 0;i<dimension;i++) {
        checkVerticalWinner(i)
    }
    checkFirstDiagonalWinner(dimension - 1)
    checkSecondDiagonalWinner(0)
    if (clickCounter === possibleClicksCount)
        alert('Победила дружба')

}

function cellClickHandler(row, col) {
    if (gameField[row][col] === EMPTY && clickCounter <= possibleClicksCount) {
        /*let fieldState = CROSS;     // Ставишь крестик, компьютер нолик 10 задача
        gameField[row][col] = fieldState;
        console.log(`Clicked on cell: ${row}, ${col}`);
        clickCounter++;
        checkWinner(gameField) 
        console.log(clickCounter);
        renderSymbolInCell(fieldState, row, col);
        console.log(gameField);
        while (gameField[row][col] != EMPTY && clickCounter<possibleClicksCount
            || gameField[row][col] == CROSS)
            {
            row = randomRow();
            col = randomCol();
            console.log('коорд',row,col);
        }
        fieldState = ZERO;
        gameField[row][col] = fieldState;

        console.log(`Clicked on cell: ${row}, ${col}`);
        clickCounter++;
        checkWinner(gameField) 
        console.log(clickCounter);
        renderSymbolInCell(fieldState, row, col);
        console.log(gameField);*/ 
        let fieldState = clickCounter % 2 === 0 ? CROSS : ZERO; // Оригинальная игра
        gameField[row][col] = fieldState;
        console.log(`Clicked on cell: ${row}, ${col}`);
        clickCounter++;
        renderSymbolInCell(fieldState, row, col);
        console.log(gameField);
        checkWinner(gameField)
    }
     
    
    /*if (clickCounter >= possibleClicksCount / 2) { // Неудачная попытка 12 задачи
        addRows();
    }*/
}

function randomRow(){
    let rowI = Math.floor(Math.random()*dimension);
    console.log('пытается поставить 0 в row',rowI)
    return rowI;
}

function randomCol(){
    let colJ = Math.floor(Math.random()*dimension);
    console.log('пытается поставить 0 в col',colJ)
    return colJ;
}
/*function addRows() {
    dimension += 1;
    possibleClicksCount = dimension ** 2;
    console.log(dimension, clickCounter, possibleClicksCount)  // Неудачная попытка 12 задачи
    initOldGameField(dimension, gameField);
    renderGrid(dimension);
}*/



function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    gameField = startGameField.slice();
    clickCounter = 0;
    startGame();
}


/* Test Function */
/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
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

function clickOnCell(row, col) {
    findCell(row, col).click();
}