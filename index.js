const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let clickCounter = 0;
let field;
let player = CROSS;
let freeCells;
let dimension = 3;
let win = false;
const container = document.getElementById('fieldWrapper');
/*let autoExpandField = true;
let autoIncreaseGoal = false;
let goal = 3;*/

startGame();
addResetListener();

function startGame () {
    dimension = parseInt(prompt('Введите размер поля:', 3));
    renderGrid(dimension);
    /*goal = Number(document.getElementById("goalValue").value);
    autoExpandField = document.getElementById("expandFieldValue").checked;
    autoIncreaseGoal = document.getElementById("increaseGoalValue").checked;*/
    freeCells = dimension ** 2;
    field = new Array();
    win = false; 
    for (var i = 0; i < dimension; i++) {
        field[i] = new Array();
        for (var j = 0; j < dimension; j++) {
            field[i][j] = EMPTY;
        }
    }
}

function getRandomField (max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function getGameField (field) {
    let obj = {x : getRandomField(3), y : getRandomField(3)}
    if (field[obj.x][obj.y] != EMPTY){
        return getGameField(field);
    }
    else {
        return obj;
    } 
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
    if (player === ZERO) {
        let gameFaild = getGameField(field)
        row = gameFaild.x;
        col = gameFaild.y;
    }  

    if (field[row][col] !== EMPTY || win)
        return;
        
    renderSymbolInCell(player, row, col);
    field[row][col] = player;
    
    /*if (--freeCells < dimension ** 2 / 2 && autoExpandField) {
        increaseField();
        if (autoIncreaseGoal) { 
            goal++;
        }
    }*/

    checkWinner()
    if (--freeCells <= 0) {
        alert('Победила дружба!');
    };
}
 
function checkWinner() {
    let cells = [];
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            if (field[i][j] === player) {
                let obj = {x:i, y:j};
                cells.push(obj);
                if (cells.length === 3) {
                    alert('Победил ' + player);
                    brush(cells);
                    win = true;
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
            if (field[j][i] === player) {
                let obj = {x:j, y:i};
                cells.push(obj);
                if (cells.length  === 3) {
                    alert('Победил ' + player);
                    brush(cells);
                    win = true;
                    return;
                }
            }
            else {
                cells.length  = 0;
            }
        }
    }

    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <=2;j++) {
            if (i === j) {
                if (field[i][j] === player) {
                    let obj = {x:i, y:j};
                    cells.push(obj);
                    if (cells.length === 3) {
                        alert('Победил ' + player);
                        brush(cells);
                        win = true;
                        return;
                    }
                }
                else {
                    cells.length = 0;
                }
            }
            
        }
    }

    for (let i = 2; i >= 0; i--) {
        for (let j = 0; j <= 2; j++) {
            if (Math.abs(i-2) === j) {
                if (field[i][j] === player) {
                    let obj = {x:i, y:j};
                    cells.push(obj);
                    if (cells.length === 3) {
                        alert('Победил ' + player);
                        brush(cells); 
                        win = true;                       
                        return;
                    }
                }
                else {
                    cells.length = 0;
                }
            }
        }
    }

    if (player === CROSS){
        player = ZERO;        
    }
    else {
        player = CROSS;
    }
}

function brush (cells) {
    for(var i of cells) {
        renderSymbolInCell(player, i.x, i.y, 'red');
    }
}

/*function increaseField () {
    for (let row = 0; row < dimension; row++) {
        field[row].push(EMPTY);
        let rowObj = container.querySelectorAll('tr')[row];
        addCell(row, dimension, rowObj);
    }
    field.push(new Array(dimension + 1).fill(EMPTY));
    rowObj = document.createElement('tr');
    for (let col = 0; col <= dimension; col++) {
        addCell(dimension, col, rowObj);
    }
    container.appendChild(rowObj);
    freeCells += dimension * 2 + 1;
    dimension++;
}*/

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
    startGame();
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