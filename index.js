const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let FieldDim = 5;
const game = {
    'field': getStartingField(FieldDim),
    'stepsLeft' : FieldDim * FieldDim,
    'currentTurn' : CROSS,
    'finished' : false
}
const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();


function getStartingField (dimension = FieldDim){
    let dim = parseInt(dimension, 10)
    let tmpField = []
    for (let i = 0; i < dim; i++){
        tmpField[i] = new Array(dim).fill(EMPTY)
    }
    return tmpField
}

function startGame () {
    FieldDim = parseInt(prompt('введите размер поля', 3), 10);

    renderGrid(FieldDim);
    resetClickHandler();
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');  
            cell.textContent = game.field[i][j];
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    if (game.field[row][col] !== EMPTY || game.finished){
        return;
    }
    game.field[row][col] = game.currentTurn;
    console.log(`Clicked on cell: ${row}, ${col}`);
    renderSymbolInCell(game.currentTurn, row, col);
    game.currentTurn = (game.currentTurn == CROSS) ? ZERO : CROSS;
    let winSequence = getWinner(game.field)
    if (winSequence !== EMPTY){
        player = game.field[winSequence[0][0]][winSequence[0][1]]
        game.finished = true;
        for (const coord of winSequence){
            renderSymbolInCell(player, coord[0], coord[1], '#FF0000');
        }

        setTimeout(() => alert(player), 500)
    }

    if (--game.stepsLeft <= 0){
        setTimeout(() => alert("Победила дружба"), 500)
        return;
    }
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
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
    game.field = getStartingField();
    game.stepsLeft = FieldDim * FieldDim;
    for (let r = 0; r < FieldDim; r++){
        for (let c = 0; c < FieldDim; c++){
            renderSymbolInCell(EMPTY, r, c);
        }
    }
    game.currentTurn = CROSS;
    game.finished = false;
    console.log('reset!');
}

function getWinner (field) {
    for (let i = 0; i < FieldDim; i++){
        if (field[i].every((val, _, arr) => val === arr[0])){
            if (field[i][0] !== EMPTY){
                result = []
                for (let j = 0; j < FieldDim; j++){
                    result[j] = [i, j];
                }
                return result;
            }
        }
    }
    let tmp = field[0].map((_, colIndex) => field.map(row => row[colIndex]));
    for (let i = 0; i < FieldDim; i++){
        if (tmp[i].every((val, _, arr) => val === arr[0])){
            if (tmp[i][0] !== EMPTY){
                result = []
                for (let j = 0; j < FieldDim; j++){
                    result[j] = [j, i];
                }
                return result;
            }
        }
    }

    let first_diag = []
    let second_diag = []
    for (let i = 0; i < FieldDim; i++){
        first_diag[i] = game.field[i][i];
        second_diag[i] = game.field[FieldDim - i-1][i];
    }
    //debugger;
    if (first_diag.every((val, _, arr) => val === arr[0])) {
        //debugger;
        if (first_diag[0] !== EMPTY){
            //debugger;
            let result = []
            for (let i = 0; i < FieldDim; i++){
                result[i] = [i, i];
            }
            return result;
        }
    }
    //debugger;
    if (second_diag.every((val, _, arr) => val === arr[0])) {
        if (second_diag[0] !== EMPTY){
            let result = []
            for (let i = 0; i < FieldDim; i++){
                result[i] = [FieldDim - i-1, i];
            }
            return result;
        }
    }

    return EMPTY
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
