const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let gameField = []
let clickCounter = 0
const defaultDimensions = prompt('Размер поля', 3)
let dimensions = defaultDimensions
for (let i = 0; i < dimensions; i++)
    gameField.push([])
let possibleClicksCount = dimensions**2

startGame(dimensions);
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

function startGame (dimensions) {
    initGameField(dimensions, gameField);
    renderGrid(dimensions);
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

function rerenderGrid (dimension) {
    let rows = container.childNodes
    for (let i = 0; i < dimension - 1; i++) {
        const cell = document.createElement('td');
        cell.textContent = EMPTY;
        cell.addEventListener('click', () => cellClickHandler(i, dimension - 1));
        rows[i].appendChild(cell)
    }
    const newRow = document.createElement('tr');
    for (let j = 0; j < dimension; j++) {
        const cell = document.createElement('td');
        cell.textContent = EMPTY;
        cell.addEventListener('click', () => cellClickHandler(dimension - 1, j));
        newRow.appendChild(cell);
    }
    container.appendChild(newRow);
}

function checkWinner(gameField){
    const checkHorizontalWinner = () => {
        for (let i=0;i<gameField.length;i++){
            let rowString = gameField[i].join("")
            if (rowString === CROSS.repeat(gameField.length)){
                alert(`${CROSS} победил`)
                paintWinningFields(i)
                break
            }
            else if(rowString === ZERO.repeat(gameField.length)) {
                alert(`${ZERO} победил`)
                paintWinningFields(i)
                break
            }
        }
    }
    const checkVerticalWinner = (index) => {
        let flatArray = gameField.flat(2)
        let word = ''
        for (let i = index; i < flatArray.length; i+=gameField.length) {
            if(flatArray[i]===EMPTY)
                continue
            word += flatArray[i]
        }
        if( word===CROSS.repeat(gameField.length)){
            alert(`${CROSS} победил`)
            paintWinningFields(index, true)
            return true
        }
        else if( word===ZERO.repeat(gameField.length)){
            alert(`${ZERO} победил`)
            paintWinningFields(index, true)
            return true
        }
    }
    const checkDiagonalWinner = () => {
        let mainD = ''
        let secondD = ''
        for (let i = 0; i < dimensions; i++){
            mainD += gameField[i][i]
        }
        if (mainD === CROSS.repeat(gameField.length)) {
            alert(`${CROSS} победил`)
            paintDiagonal(true)
            return true
        }
        else if (mainD === ZERO.repeat(gameField.length)) {
            alert(`${ZERO} победил`)
            paintDiagonal(true)
            return true
        }
        for (let i = 0; i < dimensions; i++){
            secondD += gameField[i][dimensions - 1 - i]
        }
        if (secondD === CROSS.repeat(gameField.length)) {
            alert(`${CROSS} победил`)
            paintDiagonal(false)
            return true
        }
        else if (secondD === ZERO.repeat(gameField.length)) {
            alert(`${ZERO} победил`)
            paintDiagonal(false)
            return true
        }
    }

    const paintDiagonal = (isMainDiagonal) =>{
        if (isMainDiagonal){
            for (let i = 0; i < dimensions; i++){
                findCell(i, i).style.color = 'red'
            }
        }
        else{
            for (let i = 0; i < dimensions; i++){
                findCell(i, dimensions - 1 - i).style.color = 'red'
            }
        }
        haveWinner = true
    }

    const paintWinningFields = (startIndex, col = false) => {
        if (col) {
            for (let i = 0; i < dimensions; i++) {
                findCell(i, startIndex).style.color = 'red'
            }
        }
        else {
            for (let i = 0; i < dimensions; i++) {
                findCell(startIndex, i).style.color = 'red'
            }
        }
        haveWinner = true
    }

    let haveWinner = false
    checkHorizontalWinner()
    for(let i=0;i<gameField.length;i++){
        if (checkVerticalWinner(i)){
            return true
        }
    }
    checkDiagonalWinner()
    return haveWinner
}

function resizeField () {
    let newRow = [EMPTY]
    for (let i = 0; i < dimensions; i++){
        gameField[i].push(EMPTY)
        newRow.push(EMPTY)
    }
    possibleClicksCount = dimensions**2
    gameField.push(newRow)
    rerenderGrid(++dimensions)
}


function cellClickHandler (row, col) {
    if (gameField[row][col]===EMPTY){
        let fieldState = clickCounter % 2 === 0 ? CROSS : ZERO;
        gameField[row][col] = fieldState;
        console.log(`Clicked on cell: ${row}, ${col}`);
        clickCounter++;
        renderSymbolInCell(fieldState, row, col);
        console.log(gameField);
    }
    if (checkWinner(gameField)) {
        if (confirm('Начать заново?'))
            resetClickHandler()
    }
    else {
        if (clickCounter > Math.floor(dimensions ** 2 / 2))
            resizeField()
        else if (clickCounter === possibleClicksCount)
            alert('Победила дружба')
        if (clickCounter % 2 === 1)
            makeAMove()
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
    dimensions = defaultDimensions
    gameField = []
    for (let i = 0; i < defaultDimensions; i++)
        gameField.push([])
    startGame(dimensions)
    clickCounter = 0
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


function makeAMove(){
    let cell = self.findRandomFreeCell()
    clickOnCell(cell[0], cell[1])
}

function findRandomFreeCell(){
    let x = 0
    let y = 0
    do {
        x = Math.floor(Math.random() * dimensions)
        y = Math.floor(Math.random() * dimensions)
    } while (gameField[x][y] !== EMPTY)
    return [x, y]
}

