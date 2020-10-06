const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

const gameMap = [[], [], []] //1. Реши, как будешь хранить поле.
let clickCounter = 0, possibleClicksCount = gameMap.length * gameMap.length;
let incSizeMap = 0;

let isGameFinish = true, //7. После победы, клик по полю больше не должен ставить крестик или нолик.
    isSimpleAI = false;
    //isNotAI = tru;



function initGameMap(dimension, gameMap){   //1. Реши, как будешь хранить поле.

    if (dimension > gameMap.length) gameMap.push([])
    else if (dimension < gameMap.length) gameMap.pop();
    //gameMap.push([]);
    for (let i = 0; i < dimension; i++) {
        gameMap[i] = new Array(dimension)
        for (let j = 0; j < dimension; j++) {
            gameMap[i][j] = EMPTY;
        }
    }
    console.log(gameMap, 'Map initialized')
}

startGame(0);
addResetListener();
addSimpleAI();
addIncreaseListener();
addAutoIncreaseListener();
addDecreaseListener();

function upDatePossibleCliks(){
    possibleClicksCount = gameMap.length * gameMap.length;
}
function startGame (incSizeMap) {
    isGameFinish = false;
    clickCounter = 0;

    initGameMap(3 + incSizeMap, gameMap);
    renderGrid(3 + incSizeMap);
}

function renderGrid (dimension) { //добавляет на страницу таблицу
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = gameMap[i][j];
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
} //добавляет на страницу таблицу

//5. Напиши функцию, которая считает: есть ли уже победитель.
// Если есть победитель, выведи alert с названием победителя
function checkWinner(){

    const checkHorizontalWinner = () => {
        for (let i=0;i<gameMap.length;i++){
            let rowString = gameMap[i].join("")
            if (rowString === CROSS.repeat(gameMap.length)){
                alert(`${CROSS} победил`)
                paintWinningFields(rowString, i, 0)
                isGameFinish = true;
                break
            }
            else if(rowString === ZERO.repeat(gameMap.length)) {
                alert(`${ZERO} победил`)
                paintWinningFields(rowString, i, 0)
                isGameFinish = true;
                break
            }
        }
    }

    const checkNotHorizontalWinner = (index, coefficient) => {
        let flatArray = gameMap.flat(2)
        console.log(flatArray)
        let word = ''
        for (let i = index; i < flatArray.length; i+=gameMap.length + coefficient) {
            if(flatArray[i]===EMPTY)
                continue
            word += flatArray[i];
        }
        if( word===CROSS.repeat(gameMap.length)){
            alert(`${CROSS} победил`)
            paintWinningFields(gameMap, index, coefficient, true)
            isGameFinish = true;
            return true
        }
        else if( word===ZERO.repeat(gameMap.length)){
            alert(`${ZERO} победил`)
            paintWinningFields(gameMap, index, coefficient, true)
            isGameFinish = true;
            return true
        }
    }

    //6. Если есть победитель, покрась победные значения в клетках в красный.
    const paintWinningFields = (line, startIndex, coefficient, col = false) => {
        if (col){
            for (let i = 0; i < line.length; i++) {
                findCell(i, startIndex).style.color = 'red'
                startIndex += coefficient;
            }
            return
        }
        for (let i = 0; i < line.length; i++) {
            findCell(startIndex, i).style.color = 'red'
        }
    }

    checkHorizontalWinner();
    //  VerticalCheck
    for(let i=0;i<gameMap.length;i++){
        if(checkNotHorizontalWinner(i, 0)){
            break
        }
    }
    //  DiagonalCheck
    checkNotHorizontalWinner(0,1);
    checkNotHorizontalWinner(gameMap.length-1,-1);

}

function turnSimpleAI(){
    let flatArray = gameMap.flat(2)
    console.log(flatArray)
    for (let i = 0; i < flatArray.length; i++) {
        if(flatArray[i]===EMPTY) {
            //flatArray[i] = ZERO;
            return i;
        }
    }
}

function autoIncrease(){

    if (clickCounter >= possibleClicksCount / 2){
        for (let i = 0; i < gameMap.length; i++){
            gameMap[i].push(EMPTY);     }
        gameMap.push(new Array());
        for (let i = 0; i <  gameMap.length; i++){
            gameMap[gameMap.length-1].push(EMPTY);
        }
        renderGrid(gameMap.length);
    }
    upDatePossibleCliks();
}

function cellClickHandler (row, col) {
    // Пиши код тут

    //2. Допиши функцию cellClickHandler,
    // чтобы после клика ставился крестик или нолик в соответствующее поле.
    //3. Если поле, по которому кликнули, не пустое, символ ставиться не должен.
    //7. После победы, клик по полю больше не должен ставить крестик или нолик.

    if (gameMap[row][col]===EMPTY & !isGameFinish){
        autoIncrease();
        let mapState = clickCounter % 2
        if (mapState === 0)
        {   mapState = CROSS
            gameMap[row][col] = mapState;
            renderSymbolInCell(mapState, row, col);
            if (isSimpleAI){
                let i = turnSimpleAI();
                let rowNew = Math.floor(i/gameMap.length)
                let colNew = i % gameMap.length;
                gameMap[rowNew][colNew]=ZERO;
                clickCounter++;
                renderSymbolInCell(ZERO, rowNew, colNew);}
            checkWinner(gameMap);
        } else mapState = ZERO;

        if (mapState === CROSS || ZERO){
        gameMap[row][col] = mapState;
        console.log(`Clicked on cell: ${row}, ${col}`);
        clickCounter++;
        renderSymbolInCell(mapState, row, col);
        console.log(gameMap);    }

//         gameMap[row][col] = mapState;
//         console.log(`Clicked on cell: ${row}, ${col}`);
//         clickCounter++;
//         renderSymbolInCell(mapState, row, col);
//         console.log(gameMap);
//     }


    //5. Напиши функцию, которая считает: есть ли уже победитель.
    // Если есть победитель, выведи alert с названием победителя
    checkWinner(gameMap)
    //4. Если кончились ходы, выведи alert с текстом "Победила дружба".
    if (clickCounter === possibleClicksCount)
        alert('Победила дружба!')

    console.log(`Clicked on cell: ${row}, ${col}`);


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}
}



function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;

}

// 10. Напиши "искусственный интеллект" — функцию,
//              которая будет ставить нолики с случайное пустое поле.
function simpleAI(){
    isSimpleAI = true;
    startGame(incSizeMap);

}

// 9. Сделай так, чтобы можно было в начале игры
//          задавать поле произвольного размера.
function increaseMap(){
    incSizeMap++;
    startGame(incSizeMap);

}
function decreaseMap(){
    incSizeMap--;
    startGame(incSizeMap);
}


function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

//8. Обрабатывай клик по кнопке "Сначала":
//      допиши метод resetClickHandler, чтобы поле очищалось.
function resetClickHandler () {
    console.log('reset!');
    startGame(0);
    incSizeMap = 0;
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function addIncreaseListener () {
    const increaseButton = document.getElementById('increaseButton');
    increaseButton.addEventListener('click', increaseMap);
}

function addDecreaseListener () {
    const decreaseButton = document.getElementById('decreaseButton');
    decreaseButton.addEventListener('click', decreaseMap);
}


function addSimpleAI () {
    const simpleAIButton = document.getElementById('SimpleAI');
    simpleAIButton.addEventListener('click', simpleAI);
}

function addAutoIncreaseListener () {
    const automaticIncreaseButton = document.getElementById('autoIncreaseButton');
    automaticIncreaseButton.addEventListener('click', autoIncrease);
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

