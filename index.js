const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let TURN = true;
const field = new Array(3).fill(EMPTY).map(() => new Array(3).fill(EMPTY));
const container = document.getElementById('fieldWrapper');
let status = false;

const field = new Array(3).fill(-1).map(() => new Array(3).fill(-1))

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function getMove () {
    let validMoves = []
    for (let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
            if (field[i][j] === EMPTY){
                validMoves.push([i, j])
            }
        }
    }

    const randomIndex = Math.floor(Math.random() * validMoves.length);
    return validMoves[randomIndex]
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
    if (field[row][col] !== EMPTY || status) {
        return;
    }

    if (TURN) {
        renderSymbolInCell(CROSS, row, col);
        field[row][col] = CROSS;
    } else {
        renderSymbolInCell(ZERO, row, col);
        field[row][col] = ZERO;
    }

    console.log(`Clicked on cell: ${row}, ${col}`);

    switch (checkWinner(row, col)) {
        case 'Ничья':
            status = true;
            setTimeout(function () { alert('Победила Дружба'); }, 1000);
            return;
        case CROSS:
            status = true;
            setTimeout(function () { alert('Победили крестики'); }, 1000);
            return;
        case ZERO:
            status = true;
            setTimeout(function () { alert('Победили нолики'); }, 1000);
            return;
        default:
            TURN = !TURN;
            break;
    }
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (field[i][0] !== EMPTY && field[i][0] === field[i][1] && field[i][0] === field[i][2]) {
            findCell(i, 0).style.background = 'red';
            findCell(i, 1).style.background = 'red';
            findCell(i, 2).style.background = 'red';
            return field[i][0];
        }
    }

    for (let j = 0; j < 3; j++) {
        if (field[0][j] !== EMPTY && field[0][j] === field[1][j] && field[0][j] === field[2][j]) {
            findCell(0, j).style.background = 'red';
            findCell(1, j).style.background = 'red';
            findCell(2, j).style.background = 'red';
            return field[0][j];
        }
    }

    if (field[0][0] !== EMPTY && field[0][0] === field[1][1] && field[0][0] === field[2][2]) {
        findCell(0, 0).style.background = 'red';
        findCell(1, 1).style.background = 'red';
        findCell(2, 2).style.background = 'red';
        return field[0][0];
    }
    if (field[0][2] !== EMPTY && field[0][2] === field[1][1] && field[0][2] === field[2][0]) {
        findCell(0, 2).style.background = 'red';
        findCell(1, 1).style.background = 'red';
        findCell(2, 0).style.background = 'red';
        return field[0][2];
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (field[i][j] === EMPTY) {
                return '';
            }
        }
    }

    return 'Ничья';
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
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            field[i][j] = EMPTY;
        }
    }
    renderGrid(3);
    status = false;
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
