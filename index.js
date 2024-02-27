const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let DIMENSION = 3;

const container = document.getElementById('fieldWrapper');

let grid;
let currSymbol = CROSS;
let stepsCount = DIMENSION * DIMENSION;
let winner = EMPTY;
let winnerLoc = [];


startGame();
addResetListener();

function startGame () {
    DIMENSION = parseInt(prompt("Введи размер:", '3'), 10);
    stepsCount = DIMENSION * DIMENSION;
    createGrid();
    renderGrid();
}

function createGrid () {
    grid = [];
    for (let i = 0; i < DIMENSION; i++) {
        grid[i] = [];
        for (let j = 0; j < DIMENSION; j++) {
            grid[i][j] = EMPTY;
        }
    }
}

function renderGrid () {
    container.innerHTML = '';

    for (let i = 0; i < DIMENSION; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < DIMENSION; j++) {
            const cell = document.createElement('td');
            cell.textContent = grid[i][j];
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (winner != EMPTY) {
        return;
    }
    
    if (grid[row][col] != EMPTY) {
        return;
    }

    renderSymbol(row, col);

    stepsCount -= 1;

    setWinner();

    console.log(winner);

    if (winner != EMPTY) {
        console.log(winnerLoc);
        for(let loc of winnerLoc) {
            renderSymbolInCell(winner, loc[0], loc[1], '#FF0000');
        }
        alert(`Победили ${winner}!!`);
        return;
    }
    
    if (stepsCount == 0) {
        alert('Победила дружба!!!');
        return;
    }
}

function renderSymbol(row, col) {
    renderSymbolInCell(currSymbol, row, col);
    grid[row][col] = currSymbol;

    switch (currSymbol) {
        case ZERO:
            currSymbol = CROSS;
            break;
        case CROSS:
            currSymbol = ZERO;
            break;
    }
}

function setWinner() {
    setWinnerHorizontal();
    setWinnerVertical();
    setWinnerDiagonal();
    setWinnerDiagonalReverse();
}

function setWinnerHorizontal () {
    next: for (let i = 0; i < DIMENSION; i++) {
        locations = [ [i, 0] ];
        checkValue = grid[i][0];

        if (checkValue == EMPTY){            
            continue next;
        }

        for (let j = 1; j < DIMENSION; j++) {
            if (grid[i][j] != checkValue) {
                continue next;
            }
            locations.push([i, j]);
        }

        winner = checkValue;
        // for (let loc of )
        winnerLoc = winnerLoc.concat(locations);
        break;
    }
}

function setWinnerVertical () {
    next: for (let i = 0; i < DIMENSION; i++) {
        locations = [ [0, i] ];
        checkValue = grid[0][i];

        if (checkValue == EMPTY){            
            continue next;
        }

        for (let j = 1; j < DIMENSION; j++) {
            if (grid[j][i] != checkValue) {
                continue next;
            }
            locations.push([j, i]);
        }

        winner = checkValue;
        winnerLoc = winnerLoc.concat(locations);
        break;
    }
}

function setWinnerDiagonal () {
    locations = [ [0, 0] ];
    checkValue = grid[0][0];

    if (checkValue == EMPTY){            
        return;
    }

    for (let i = 1; i < DIMENSION; i++) {
        if (grid[i][i] != checkValue) {
            return;
        }
        locations.push([i, i]);
    }

    winner = checkValue;
    winnerLoc = winnerLoc.concat(locations);
}

function setWinnerDiagonalReverse () {
    locations = [ [0, DIMENSION - 1] ];
    checkValue = grid[0][DIMENSION - 1];

    if (checkValue == EMPTY){            
        return;
    }

    for (let i = 2; i <= DIMENSION; i++) {
        if (grid[i][DIMENSION - i] != checkValue) {
            return;
        }
        locations.push([i, DIMENSION - i]);
    }

    winner = checkValue;
    winnerLoc = winnerLoc.concat(locations);
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
    currSymbol = CROSS; 
    stepsCount = DIMENSION * DIMENSION;
    winner = EMPTY;
    winnerLoc = [];

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
