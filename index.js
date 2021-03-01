const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const winnerColor = '#f00';
const container = document.getElementById('fieldWrapper');

let dims = prompt('Введите размер')
startGame();
addResetListener();

let gameEnded = false;

let cells = [];
FillCells();
function FillCells(){
    for (let i = 0; i < dims; i++){
        cells.push([]);
        for (let j = 0; j < dims; j++){
            cells[i].push(EMPTY);
        }
    }
}
function startGame () {
    renderGrid(dims);
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

let turn = 1;

function cellClickHandler (row, col) {
    let symb = turn % 2 === 1 ? CROSS : ZERO;
    if (!TryTick(row, col, symb) || gameEnded){
        return;
    }
    renderSymbolInCell(symb, row, col);
    turn++;
    console.log(`Clicked on cell: ${row}, ${col}`);
    let winner = LookForWinner();
    if (winner != EMPTY)
    {
        gameEnded = true;
        if (winner === CROSS){
            alert('Победили Крестики');
        }
        if (winner === ZERO){
            alert('Победили Нолики');
        }
        if (winner == 'DRUZHBA'){
            alert('Победила дружба');
        }
    }

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function TryTick(row, col, symb){
    let cell = cells[row][col];
    if (cell != EMPTY){
        return false;
    }

    cells[row][col] = symb;
    return true;
}

function LookForWinner()
{
    for(let i = 0; i < dims; i++){
        let symb = cells[i][0];
        if (cells[i].every(elem => elem === symb)){
            for (let j = 0 ; j < dims; j++){
                renderSymbolInCell(symb, i, j, winnerColor);
            }
            return symb;
        }
    }
    let mainSymb = cells[0][0];
    let notMainSymb = cells[0][dims - 1];
    let flag = true;
    for(let i = 0; i < dims; i++){
        if (cells[i][i] != mainSymb){
            flag = false;
            break;
        }
    }
    if (flag){
        for (let i = 0; i < dims; i++){
            renderSymbolInCell(mainSymb, i, i, winnerColor);
        }
        return mainSymb;
    }
    flag = true;
    for (let i = 0; i < dims; i++){
        if (cells[i][dims - 1 - i] != notMainSymb){
            flag = false;
            break;
        }
    }
    if (flag){
        for (let i = 0; i < dims; i++){
            renderSymbolInCell(notMainSymb, i, dims - 1 - i, winnerColor);
        }
        return notMainSymb;
    }
    let flags = Array(dims).fill(true);
    for (let i = 0; i < dims; i++){
        for (let j = 0; j < dims; j++){
            if (cells[0][j] != cells[i][j]){
                flags[j] = false;
            }
        }
    }
    for (let i = 0; i < dims; i++){
        if (flags[i] && cells[0][i] != EMPTY){
            for (let j = 0; j < dims; j++){
                renderSymbolInCell(cells[0][i], j, i, winnerColor);
            }
            return cells[0][i];
        }
    }

    if (turn === dims * dims + 1){
        return 'DRUZHBA'
    }

    return EMPTY;
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
    turn = 1;
    gameEnded = false;
    cells = []
    FillCells();
    renderGrid(dims);
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
