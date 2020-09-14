const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const FIELD_SIZE = 3;
const COUNT_CELLS = 9;
const Xwon = "X won";
const Owon = "0 won";
const Draw = "Draw";
const Continue = "Continue";
const RED = "#ff0000";
const BLACK = "#000000";

let gameField = new Array(COUNT_CELLS);
let numOfMoves = 0;
let IsXMove = false; // false - 0, true - x
let res = Continue;

for (let i = 0; i < COUNT_CELLS; i++) 
   gameField[i] = EMPTY;


console.log(gameField);

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
    console.log(`Clicked on cell: ${row}, ${col}`);
    
    if(gameField[row*3 + col] !== EMPTY || res === Draw || res === Xwon || res === Owon)
        return;

    IsXMove = !IsXMove;
    gameField[row*3 + col] = IsXMove ? CROSS : ZERO;
    renderSymbolInCell(IsXMove ? CROSS : ZERO, row, col); 
    res = checkField();

    if(res === Xwon) {
        renderSymbolInCell
        alert("The first player won!");
        console.log(Xwon);

    } else if (res === Owon) {
        alert("The second player won!");
        console.log(Owon);
    } else if (res === Draw) {
        alert("Победила дружба!");
        console.log(Draw);
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
    for (let i = 0; i < COUNT_CELLS; i++) {
        renderSymbolInCell(EMPTY,i / 3 >> 0, i % 3, BLACK);
        gameField[i] = EMPTY;
    }
    IsXMove = false;
    res = Continue;
}

function checkField() {
    for(let k = 0; k < COUNT_CELLS; k += FIELD_SIZE) {
        if (gameField[k] === gameField[k + 1]
         && gameField[k] === gameField[k + 2])
        {
            if (gameField[k] == CROSS) {
                markWonStep(CROSS, k, k + 1, k + 2);
                return Xwon;                
            }
            if (gameField[k] == ZERO) {
                markWonStep(ZERO,  k, k + 1, k + 2);
                return Owon;  
            }
        }  
    }
    for (let k = 0; k < COUNT_CELLS; k++)
    {
        if (gameField[k] === gameField[k + FIELD_SIZE]
            && gameField[k] === gameField[k + FIELD_SIZE * 2])
        {
            
            if (gameField[k] == CROSS) {
                markWonStep(CROSS, k, k + FIELD_SIZE, k + FIELD_SIZE * 2);
                return Xwon;
            }
            if (gameField[k] == ZERO) {
                markWonStep(ZERO,  k, k + FIELD_SIZE, k + FIELD_SIZE * 2);
                return Owon;
            }
                
        }
    }

    if (gameField[0] == gameField[4] && gameField[8] == gameField[4] && gameField[8] !== EMPTY
        || gameField[2] == gameField[4] && gameField[6] == gameField[4] && gameField[6] !== EMPTY)
    {
        if (gameField[0] == CROSS) {
            markWonStep(CROSS,  0, 4, 8);
            return Xwon;
        }
            
        if (gameField[0] == ZERO) {
            markWonStep(ZERO,  0, 4, 8);
            return Owon;
        }

        if (gameField[2] == CROSS) {
            markWonStep(CROSS,  2, 4, 6);
            return Xwon;
        }
            
        if (gameField[2] == ZERO) {
            markWonStep(ZERO,  2, 4, 6);
            return Owon;
        }
            
    }

    for (let i = 0; i < COUNT_CELLS; i++)
    {
        if (gameField[i] === EMPTY)
            return Continue;
    }
    return Draw;
}


function markWonStep(winner, firstStep, secondStep, thirdStep)
{
      renderSymbolInCell(winner,firstStep / 3 >> 0, firstStep % 3, RED);
      renderSymbolInCell(winner,secondStep / 3 >> 0, secondStep % 3, RED);
      renderSymbolInCell(winner,thirdStep / 3 >> 0,thirdStep % 3, RED);    
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
