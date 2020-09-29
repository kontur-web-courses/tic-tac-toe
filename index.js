const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let sizeOfField = getSizeOfField();
const gameField = []
let clickCounter = 0
let winnerExist = false
let possibleClicksCount = sizeOfField * sizeOfField

startGame();
addResetListener();

function getSizeOfField() {
    let size = undefined;
    while(true) {
        size = prompt("Введите размер поля (не меньше 3 строчек и столбцов)", 3);
        if (size >= 3)
            break;
        alert('Неподходящий размер поля')
    }
    return size;
}

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
    initGameField(sizeOfField, gameField);
    renderGrid(sizeOfField);
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

function checkWinner(gameField) {
    const checkHorizontalWinner = () => {
        for (let i=0;i<gameField.length;i++) {
            let rowString = gameField[i].join("")
            if (rowString === CROSS.repeat(gameField.length)){
                paintWinningFields(rowString, i)
                setTimeout("alert(`${CROSS} победил`)", 0)
                winnerExist = true;
                break
            }
            else if(rowString === ZERO.repeat(gameField.length)) {
                paintWinningFields(rowString, i)
                setTimeout("alert(`${ZERO} победил`)", 0)
                winnerExist = true;
                break
            }
        }
    }
    const checkVerticalWinner = (index) => {
        let winnerFound = false;
        let flatArray = gameField.flat(2)
        let word = ''
        for (let i = index; i < flatArray.length; i+=gameField.length) {
            if(flatArray[i]===EMPTY)
                continue
            word += flatArray[i]
        }
        if (word === CROSS.repeat(gameField.length)) {
            paintWinningFields(gameField, index, true)
            setTimeout("alert(`${CROSS} победил`)", 0)
            winnerExist = true;
            winnerFound = true;
        }
        else if (word === ZERO.repeat(gameField.length)) {
            paintWinningFields(gameField, index, true)
            setTimeout("alert(`${ZERO} победил`)", 0)
            winnerExist = true;
            winnerFound = true;
        }
        return winnerFound;
    }
    const checkDiagonalWinner = () => {
        let firstWord = "";
        let secondWord = "";
        let lastIndex = gameField.length - 1;
        for (let i = 0; i < gameField.length; i++) {
            firstWord += gameField[i][i];
            secondWord += gameField[i][lastIndex];
            lastIndex--;
        }
        if (firstWord === CROSS.repeat(gameField.length)) {
            paintWinningFields(gameField, 0, false, true)
            setTimeout("alert(`${CROSS} победил`)", 0)
            winnerExist = true;
        } else if (secondWord === CROSS.repeat(gameField.length)) {
            paintWinningFields(gameField, gameField.length - 1, false, true, true)
            setTimeout("alert(`${CROSS} победил`)", 0)
            winnerExist = true;
        } else if (firstWord === ZERO.repeat(gameField.length)) {
            paintWinningFields(gameField, 0, false, true)
            setTimeout("alert(`${ZERO} победил`)", 0)
            winnerExist = true;
        } else if (secondWord === ZERO.repeat(gameField.length)) {
            paintWinningFields(gameField, gameField.length - 1, false, true, true)
            setTimeout("alert(`${ZERO} победил`)", 0)
            winnerExist = true;
        }

    }
    const paintWinningFields = (line, startIndex, col = false, diagonal = false, reversed = false) => {
        if (col) {
            for (let i = 0; i < line.length; i++) {
                findCell(i, startIndex).style.color = 'red'
            }
            return
        } else if (diagonal) {
            if (reversed) {
                for (let i = 0; i < line.length; i++) {
                    findCell(i, startIndex).style.color = 'red'
                    startIndex--;
                }
                return;
            }
            else {
                for (let i = startIndex; i < line.length; i++) {
                    findCell(i, i).style.color = 'red'
                }
                return;
            }
        }
        for (let i = 0; i < line.length; i++) {
            findCell(startIndex, i).style.color = 'red'
        }
    }
    checkHorizontalWinner()
    for(let i=0;i<gameField.length;i++){
        if(checkVerticalWinner(i)){
            break
        }
    }
    checkDiagonalWinner()
}

function cellClickHandler (row, col) {
    if (gameField[row][col]===EMPTY && !winnerExist) {
        let fieldState = clickCounter % 2 === 0 ? CROSS : ZERO;
        gameField[row][col] = fieldState;
        console.log(`Clicked on cell: ${row}, ${col}`);
        clickCounter++;
        renderSymbolInCell(fieldState, row, col);
        console.log(gameField);
    } else
        return;
    botClick();
    checkWinner(gameField)
    if (clickCounter === possibleClicksCount)
        setTimeout("alert('Победила дружба')", 0);
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
    for (let i = 0; i < gameField.length; i++) {
        for (let j = 0; j < gameField.length; j++) {
            gameField[i][j] = EMPTY;
            renderSymbolInCell(EMPTY, i, j)
        }
    }
    clickCounter = 0;
    winnerExist = false;
    possibleClicksCount = sizeOfField * sizeOfField;
    console.log('reset!');
}

function botClick () {
    let row = 0;
    let col = 0;
    while (true) {
        row = Math.floor(Math.random() * gameField.length);
        col = Math.floor(Math.random() * gameField.length);
        if (gameField[row][col] === EMPTY)
            break;
    }
    if (!winnerExist) {
        let fieldState = ZERO;
        gameField[row][col] = fieldState;
        clickCounter++;
        renderSymbolInCell(fieldState, row, col);
        console.log(`Бот кликнул на ${row} ${col}`);
    }
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
