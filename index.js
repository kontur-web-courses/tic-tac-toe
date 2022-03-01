const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let field;
let dimension;
const container = document.getElementById('fieldWrapper');


console.log(field);
let playerToMove = 1;
let filledCount = 0;

startGame();
addResetListener();

function startGame () {
    dimension = prompt('Выбери размер игрового поля', 3);
    field = new Array(dimension * dimension).fill(EMPTY, 0);
    filledCount = 0;
    renderGrid(dimension);
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

function getIndex(row, col) {
    return row * dimension + col;
}

function cellClickHandler (row, col) {
    const index = getIndex(row, col);
    if (field[index] === EMPTY) {
        switch (playerToMove) {
            case 1:
                field[index] = CROSS;
                break;
            case 0:
                field[index] = ZERO;
                break;
        }
        renderSymbolInCell(field[index], row, col);
        playerToMove ^= 1;
        filledCount++;
        checkEnd();
    }
    console.log(`Clicked on cell: ${row}, ${col}`);


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkWinner(len) {
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            let start = field[getIndex(i, j)];
            if (start === EMPTY)
                continue;
            if (i + len - 1 < dimension && j + len - 1 < dimension) {
                let check = true;
                for (let z = 1; z < len; z++) {
                    if (field[getIndex(i + z, j + z)] !== start) {
                        check = false;
                        break;
                    }
                }
                if (check)
                    return {type: "main_diag", row: i, col: j};
            }

            if (i + len - 1 < dimension && j - len + 1 >= 0) {
                let check = true;
                for (let z = 1; z < len; z++) {
                    if (field[getIndex(i + z, j - z)] !== start) {
                        check = false;
                        break;
                    }
                }
                if (check)
                    return {type: "side_diag", row: i, col: j};
            }
            //right
            if (i + len - 1 < dimension) {
                let check = true;
                for (let v = 1; v < len; v++){
                    if (field[getIndex(i + v, j)] !== start){
                        check = false;
                        break;
                    }
                }
                if (check)
                    return {type: 'down', row: i, col: j};
            }
            //down
            if (j + len - 1 < dimension) {
                let check = true;
                for (let v = 1; v < len; v++) {
                    if (field[getIndex(i, j + v)] !== start) {
                        check = false;
                        break;
                    }
                }
                if (check)
                    return {type: 'right', row: i, col: j};
            }
        }
    }
    return false;
}

function checkEnd() {
    let lenToCheck = dimension < 5 ? 3 : 5;
    let result = checkWinner(lenToCheck);
    if (result !== false) {
        switch (result.type) {
            case 'main_diag':
                for (let i = 0; i < lenToCheck; i++) {
                    findCell(result.row + i, result.col + i).style.background = 'red';
                }
                break;
            case 'side_diag':
                for (let i = 0; i < lenToCheck; i++) {
                    findCell(result.row + i, result.col - i).style.background = 'red';
                }
                break;
            case 'right':
                for (let i = 0; i < lenToCheck; i++) {
                    findCell(result.row, result.col + i).style.background = 'red';
                }
                break;
            case 'down':
                for (let i = 0; i < lenToCheck; i++) {
                    findCell(result.row + i, result.col).style.background = 'red';
                }
                break;
        }
        setTimeout(() => alert(`${playerToMove === 0 ? 'Cross wins!' : 'Zero wins!'}`), 0);
        return;
    }
    if (filledCount === field.length) {
        setTimeout(() => alert('Tie!'), 0);
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
    startGame()
    /*dimension = prompt('Выбери размер игрового поля', 3)
    field.fill(EMPTY, 0);
    filledCount = 0;
    playerToMove = 1;
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            renderSymbolInCell(EMPTY, i, j);
            findCell(i, j).style.background = '';
        }
    }*/
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
