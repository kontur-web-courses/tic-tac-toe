const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let items = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
];
let count = items.length * items[0].length;

let click = 1;

function changeSymbol(){
    click = (click + 1) % 2;
}

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
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

function cellClickHandler (row, col) {
    // Пиши код тут
    if (items[row][col] === EMPTY){
        changeSymbol();
        count -= 1;
        if (click === 1) {
            renderSymbolInCell(ZERO, row, col);
            items[row][col] = ZERO;
        } else {
            renderSymbolInCell(CROSS, row, col);
            items[row][col] = CROSS;
        }
    }

    //findWinner(items, 3);

    if (count === 0){
        alert('Победила дружба');
    }



    //alert(`Clicked on cell: ${row}, ${col}`);
    //renderSymbolInCell(ZERO, row, col);


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function findWinner(array, length){
    let value = array[0][0]
    let count = 0
    for(let i = 0; i < array.length && count !== length; i++){
        value = array[i][0]
        for(let j = 0; j < array[i].length && count !== length; j++){
            if(value.trim().length > 0 && array[i][j] === value){
                count+=1;
                if (count === 3){
                    alert(value);
                    break;
                }
            }
            else{
                count = 0;
                break
            }
        }
    }

    count = 0;

    for(let i = 0; i < array[i].length && count !== length; i++){
        value = array[0][i]
        for(let j = 0; j < array.length && count !== length; j++){
            if(value.trim().length > 0 && array[j][i] === value){
                count+=1;
                if (count === 3){
                    alert(value);
                    break;
                }
            }
            else{
                count = 0;
                break
            }
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

function resetClickHandler () {

    console.log('reset!');
    items = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]];
    click = 1;
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