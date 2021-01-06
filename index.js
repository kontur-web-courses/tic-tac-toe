const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let arrayField;
let player = CROSS;
let dimension = 3;
let freeCell;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();
rechangeCells();

function startGame() {
    freeCell = dimension ** 2;
    emptyList = [];
    arrayField = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
    console.log(arrayField);
    renderGrid(dimension)
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

    if (arrayField[row][col] !== EMPTY)
        return;
    
    renderSymbolInCell(player, row, col);
    arrayField[row][col] = player;

    if (--freeCell <= 0)
        alert('Победила дружба!');


    let count = 0;
    cells = [];

    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            if (arrayField[i][j] === player) {
                let obj = { x: i, y: j };
                cells.push(obj);
                if (cells.length === 3) {
                    alert('Победил wide?' + player);
                    brush(cells);
                    return;
                }
            }
            else {
                cells.length = 0;
            }            
        }
    }

    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            if (arrayField[j][i] === player) {
                let obj = { x: i, y: j };
                cells.push(obj);
                if (cells.length === 3) {
                    alert('Победил up? ' + player);
                    brush(cells);
                    return;
                }
            }
            else {
                cells.length = 0;
            }
        }
    }

    for (let i = 0; i <= 2; i++) {//главная диагональ работает
        for (let j = 0; j <= 2; j++) {
            if (i === j) {
                if (arrayField[i][j] === player) {
                    let obj = { x: i, y: j };
                    cells.push(obj);                   
                    if (cells.length === 3) {
                        alert('Победил ' + player);
                        brush(cells);
                        return;
                    }
                }
                else {
                    cells.length = 0;
                }
            }
        }
    }

    for (let i = 0; i <= 2; i++) {//побочная диагональ работает
        for (let j = 0; j <= 2; j++) {
            if (Math.abs(i - 2) === j) {
                if (arrayField[i][j] === player) {
                    let obj = { x: i, y: j };
                    cells.push(obj);
                    if (cells.length === 3) {
                        alert('Победил ' + player);
                        brush(cells);
                        return;
                    }
                }
                else {
                    cells.length = 0;
                }
            }
        }
    }

    //for (let i = 0; i < p.length; i++) {
    //    //i>p.
    //}

    if (player === CROSS)
        player = ZERO;
    else
        player = CROSS;

    
     
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

function addResetListener () {//работает после старта
    const resetButton = document.getElementById('reset');//регистрирует кнопку
    resetButton.addEventListener('click', resetClickHandler);//по клику переходит ниже
}
function resetClickHandler() {//сюда
    startGame();
    console.log('reset!');
}

function brush(cells) {
    for (var i of cells) {
        renderSymbolInCell(player, i.x, i.y, 'red');
    }
}

function rechangeCells() {
    const rechangeButton = document.getElementById('rechange');//кнопка   
    rechangeButton.addEventListener('click', getgrid);//по клику переходит выше
}

function getgrid() {
    dimension = document.getElementById("quantity").value;
    startGame();
    console.log('grid!');
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
