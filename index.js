const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let turn = true;
let gameEnd = false;
let gameboard = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
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
    if (gameEnd){
        return;
    }
    if (gameboard[row][col] === EMPTY){
        if (turn){
            renderSymbolInCell(CROSS, row, col);
            turn = false;
            gameboard[row][col] = CROSS;

            if (gameboard[row].indexOf(ZERO) === -1 && gameboard[row].indexOf(EMPTY) === -1) {
                alert('Победили крестики');
                gameEnd = true;
                renderSymbolInCell(CROSS, row, 0, '#00FF00');
                renderSymbolInCell(CROSS, row, 1, '#00FF00');
                renderSymbolInCell(CROSS, row, 2, '#00FF00');
                return;
            }

            if (Array.from(gameboard, (x) => x.at(col)).indexOf(ZERO) === -1 &&
                Array.from(gameboard, (x) => x.at(col)).indexOf(EMPTY) === -1) {
                alert('Победили крестики');
                gameEnd = true;
                renderSymbolInCell(CROSS, 0, col, '#00FF00');
                renderSymbolInCell(CROSS, 1, col, '#00FF00');
                renderSymbolInCell(CROSS, 2, col, '#00FF00');
                return;
            }

            if (gameboard[0][2] == CROSS
                && gameboard[1][1] == CROSS
                && gameboard[2][0] == CROSS) {
                alert('Победили крестики');
                gameEnd = true;
                renderSymbolInCell(CROSS, 0, 2, '#00FF00');
                renderSymbolInCell(CROSS, 1, 1, '#00FF00');
                renderSymbolInCell(CROSS, 2, 0, '#00FF00');
            }

            for (let i = 0; i < 3; i++){
                if (gameboard.at(i).at(i) !== CROSS) {
                    return;
                }
            }
            alert('Победили крестики');
            gameEnd = true;
            renderSymbolInCell(CROSS, 0, 0, '#00FF00');
            renderSymbolInCell(CROSS, 1, 1, '#00FF00');
            renderSymbolInCell(CROSS, 2, 2, '#00FF00');

        } else {
            renderSymbolInCell(ZERO, row, col);
            turn = true;
            gameboard[row][col] = ZERO;

            if (gameboard[row].indexOf(CROSS) === -1 && gameboard[row].indexOf(EMPTY) === -1) {
                alert('Победили нолики');
                gameEnd = true;
                renderSymbolInCell(ZERO, row, 0, '#00FF00');
                renderSymbolInCell(ZERO, row, 1, '#00FF00');
                renderSymbolInCell(ZERO, row, 2, '#00FF00');
                return;
            }

            if (Array.from(gameboard, (x) => x.at(col)).indexOf(CROSS) === -1 &&
                Array.from(gameboard, (x) => x.at(col)).indexOf(EMPTY) === -1) {
                alert('Победили нолики');
                gameEnd = true;
                renderSymbolInCell(ZERO, 0, col, '#00FF00');
                renderSymbolInCell(ZERO, 1, col, '#00FF00');
                renderSymbolInCell(ZERO, 2, col, '#00FF00');
                return;
            }

            if (gameboard[0][2] === ZERO
                && gameboard[1][1] === ZERO
                && gameboard[2][0] === ZERO) {
                alert('Победили нолики');
                gameEnd = true;
                renderSymbolInCell(ZERO, 0, 2, '#00FF00');
                renderSymbolInCell(ZERO, 1, 1, '#00FF00');
                renderSymbolInCell(ZERO, 2, 0, '#00FF00');
            }

            for (let i = 0; i < 3; i++){
                if (gameboard.at(i).at(i) !== ZERO) {
                    return;
                }
            }
            alert('Победили нолики');
            gameEnd = true;
            renderSymbolInCell(ZERO, 0, 0, '#00FF00');
            renderSymbolInCell(ZERO, 1, 1, '#00FF00');
            renderSymbolInCell(ZERO, 2, 2, '#00FF00');
        }
    }
    if (gameboard.flat(Infinity).indexOf(EMPTY) === -1){
        alert("Победила дружба");
        gameEnd = true;
    }
    console.log(`Clicked on cell: ${row}, ${col}`);
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
    gameboard = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
    turn = true;
    renderGrid(3);
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
