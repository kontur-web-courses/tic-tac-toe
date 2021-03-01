const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let counter = 0;
let isWinnerExists = false;
let FIELD = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]];

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
            cell.id = `cell ${i} ${j}`
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    // Пиши код ту
    if (FIELD[row][col] === EMPTY && !isWinnerExists){
        if (counter % 2 == 0) {
            FIELD[row][col] = CROSS;
            renderSymbolInCell(CROSS, row, col);
        } else {
            FIELD[row][col] = ZERO;
            renderSymbolInCell(ZERO, row, col);
        }
        counter++;
    }
    if (counter === 9 && !isWinnerExists){
        alert('Победила дружба')
    }
    else if (!isWinnerExists){
        let cond = isWin();
        if (cond){
            let winner = counter % 2 === 1 ? 'cross' : 'zero';
            let symbol = counter % 2 === 1 ? CROSS : ZERO;
            alert(winner);
            isWinnerExists = true;
            for (let cell of cond){
                renderSymbolInCell(symbol, cell[0], cell[1], 'red')
            }
        }
    }
    //document.getElementById(`cell ${row} ${col}`).style.backgroundColor = 'yellow';
    console.log(`Clicked on cell: ${row}, ${col}`);


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function isWin(){
    for (let i=0;i<3;i++){
        let e = FIELD[i][0];
        let isWin = true;
        for (let j=0; j<3; j++){
            if (!(FIELD[i][j] !== EMPTY && FIELD[i][j] === e)){
                isWin = false;
            }
        }
        if (isWin){
            return [[i, 0], [i, 1], [i, 2]]
        }
    }

    for (let i=0; i<3; i++){
        let e = FIELD[0][i]
        let isWin = true;
        for (let j=0; j<3;j++){
            if (!(FIELD[j][i] !== EMPTY && FIELD[j][i] === e)){
                isWin = false;
            }
        }
        if (isWin){
            return [[0, i], [1, i], [2, i]];
        }
    }

    let e = FIELD[1][1]
    let fDiag = e !== EMPTY && (FIELD[0][0] === e && e === FIELD[2][2]);
    let sDiag = e !== EMPTY && (FIELD[0][2] === e && e === FIELD[2][0]);
    if (fDiag){
        return [[0,0],[1,1],[2,2]];
    }
    if (sDiag){
        return [[0,2], [1,1], [2,0]];
    }
    return false;
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
    FIELD = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]];
    for (let i=0; i<3;i++){
        for(let j = 0; j<3; j++){
            renderSymbolInCell(EMPTY, i, j);
        }
    }
    counter = 0;
    isWinnerExists = false;
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
