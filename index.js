const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let field;
let symbol = CROSS;
let counter = 0;
let winner = EMPTY;
let isEnd = false;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';
    field = [dimension];
    for (let i = 0; i < dimension; i++) {
        field[i] = [dimension]
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            field[i][j]=EMPTY
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}
function draw ()
{
    if (counter === 9 && winner === EMPTY){
        outputText('Победила дружба');
    }
}

function outputText(string){
    alert(string);  
    isEnd = true;
}

function paintWinner(indexes){
    let tds = document.getElementsByTagName("td");
    for(const index of indexes)
        tds[index[0] * 3 + index[1]].style.color = "#00ff6f";
}

function checkWinner(){
    for (let i = 0; i < 3; i++) {
        if (field[i][0] === field[i][1] && field[i][1] === field[i][2] && field[i][0] !== EMPTY) {
            winner = field[i][0];
            outputText(`Победил ${winner}`)
            paintWinner([[i,0],[i,1],[i,2]])
            return;
        }
        if (field[0][i] === field[1][i] && field[1][i] === field[2][i] && field[0][i] !== EMPTY) {
            winner = field[0][i];
            outputText(`Победил ${winner}`);
            paintWinner([[0,i],[1,i],[2,i]])
            return;
        }
    }
    if ((field[0][0] === field[1][1] && field[1][1] === field[2][2]) && field[1][1] !== EMPTY){
        winner = field[1][1]
        outputText(`Победил ${winner}`);
        paintWinner([[0,0],[1,1],[2,2]])
        return;
    }
    else if ((field[0][2] === field[1][1] && field[1][1] === field[2][0]) && field[1][1] !== EMPTY){
        winner = field[1][1]
        outputText(`Победил ${winner}`);
        paintWinner([[0,2],[1,1],[2,0]])
        return;
    }
}

function cellClickHandler (row, col) {
    // Пиши код тут
    if (field[row][col] === EMPTY && !isEnd) {
        renderSymbolInCell(symbol, row, col);
        field[row][col] = symbol;
        symbol = symbol === CROSS ? ZERO : CROSS;
        counter++;
        console.log(`Clicked on cell: ${row}, ${col}`);
        setTimeout(checkWinner, 200);
        setTimeout(draw, 200);
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
    symbol = CROSS;
    counter = 0;
    winner = EMPTY;
    isEnd = false;
    renderGrid(3);
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
