const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let field = [];
let turn = CROSS;
let step_count;
let dimension = 3;
red_color = '#FF5733'


const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame() {
    step_count = dimension * dimension;
    field = []
    turn = CROSS;
    renderGrid(dimension);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        let line = [];
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            line.push(EMPTY);
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        field.push(line);
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    if (field[row][col] !== EMPTY || step_count === 0) {
        return;
    }
    field[row][col] = turn;
    console.log(`Clicked on cell: ${row}, ${col}`);
    renderSymbolInCell(turn, row, col)

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
    turn = turn === CROSS ? ZERO : CROSS
    step_count -= 1;

    let winner = findWinner();
    if (winner !== undefined) {
        alert(winner);
        step_count = 0;
        console.log("!!!!!!!");
        return;
    }
    console.log(winner);

    if (step_count === 0) {
        alert('Победила дружба');
        return;
    }

    if (turn === ZERO) {AI_move();}



    for (let i = 0; i < dimension; i++){
        console.log(field[i])
    }console.log("\n")


}

function findWinner() {


    for (let i = 0; i < dimension; i++) {
        let has_hor = true;
        for (let j = 1; j < dimension; j++) {
            if (field[i][j] !== field[i][0]) {
                has_hor = false;
                break;
            }
        }
        if (has_hor && field[i][0] !== EMPTY) {
            for (let j = 0; j < dimension; j++) renderSymbolInCell(field[i][0], i, j, red_color)
            return field[i][0];
        }
    }

    for (let i = 0; i < dimension; i++) {
        let has_vert = true;
        for (let j = 1; j < dimension; j++) {
            if (field[j][i] !== field[0][i]) {
                has_vert = false;
                break;
            }
        }
        if (has_vert && field[0][i] !== EMPTY) {
            for (let j = 0; j < dimension; j++) renderSymbolInCell(field[0][i], j, i, red_color)
            return field[0][i];
        }
    }

    let has_diag1 = true;
    for (let i = 1, j = 1; i < dimension; i++, j++) {
        console.log(field[i][j], "TO", field[0][0])
        if (field[i][j] !== field[0][0]) {
            has_diag1 = false;
            break;
        }

    }
    if (has_diag1 && field[0][0] !== EMPTY) {
        for (let i = 0, j = 0; i < dimension; i++, j++  ) renderSymbolInCell(field[0][0], i, j, red_color);
        return field[0][0];
    }

    let has_diag2 = true;
    for (let i = 1, j = dimension - 2; i < dimension; i++, j--) {

        if (field[i][j] !== field[0][dimension - 1]) {
            has_diag2 = false;
            break;
        }
    }
    if (has_diag2 && field[0][dimension - 1] !== EMPTY) {
        for (let i = 0, j = dimension - 1; i < dimension; i++, j--) renderSymbolInCell(field[0][dimension - 1], i, j, red_color);
        return field[0][dimension - 1];
    }

    return undefined;

}


function AI_move(){
    for (let i = 0; i < dimension; i++){
        for (let j = 0; j < dimension; j++){
            if (field[i][j] === EMPTY) {
                cellClickHandler(i, j)
                return
            }
        }
    }
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    startGame()
    console.log('reset!');
}


/* Test Function */

/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
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

function clickOnCell(row, col) {
    findCell(row, col).click();
}
