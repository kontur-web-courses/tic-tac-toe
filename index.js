const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let field =[];
var iteration = 1;

let WIN_POSITIONS = [
    'XXX      ',
    '   XXX   ',
    '      XXX',
    'X  X  X  ',
    ' X  X  X ',
    '  X  X  X',
    'X   X   X',
    '  X X X  '
  ];

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
    initialiseField();
    iteration = 1;
}

function initialiseField () {
    for(let i = 0; i<3 ; i++)
    {
        field[i]=[];
        for(let j = 0; j<3 ; j++)
            field[i][j]=EMPTY;
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
    // Пиши код тут

    if(iteration === 9) alert('Победила дружба');
    if(field[row][col] === EMPTY && iteration !== -1) {
        if(iteration%2 === 0) {
            field[row][col] = ZERO;
            iteration++;
            renderSymbolInCell(ZERO, row, col);
        }
        else {
             field[row][col] = CROSS;
             iteration++;
             renderSymbolInCell(CROSS,row, col);
        }
    }

    let winner = Winner();
    if (winner === CROSS || winner === ZERO){
        WinnerAler(winner)
    }

    console.log(`Clicked on cell: ${row}, ${col}`);
}

function WinnerAler(winner){
    if(iteration !== -1) {
        iteration = -1;
        recolorField(winner); 
        alert(`${winner === CROSS ? "Крестики" : "Нолики"} победили!`);
    }
}

function recolorField (symbol){
    for(let i = 0; i<3 ; i++) {
        for(let j = 0; j<3 ; j++)
            if(field[i][j] === symbol)
                renderSymbolInCell(symbol, i, j,'#FF0000');
    }
}

function Winner(){
    let crossField = field.reduce((f,row) => f + row.join('').toString().replace(/O/g,EMPTY),'');
    let zeroField = field.reduce((f,row) => f + row.join('').toString().replace(/X/g,EMPTY),'').replace(/O/g,CROSS);
    if(WIN_POSITIONS.includes(crossField))
        return CROSS;
    else if(WIN_POSITIONS.includes(zeroField))
        return ZERO;
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
