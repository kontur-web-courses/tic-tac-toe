const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

let field = new Array(3);

for (let i = 0; i < field.length; i++) {
    field[i] = new Array(3);
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

let person = true;

function cellClickHandler (row, col) {
    console.log(person);
    console.log(field);
    if (ticTacToeProblem(field) === -1) {

        if (person && field[row][col] === undefined) {
            renderSymbolInCell(CROSS, row, col);
            person = false;
            field[row][col] = +person;
        }
        if (!person && field[row][col] === undefined) {
            renderSymbolInCell(ZERO, row, col);
            person = true;
            field[row][col] = +person;
        }
    } else {
        const targetCell = findCell(row, col);
        renderSymbolInCell(targetCell.textContent, row, col);

    }

    console.log(`Clicked on cell: ${row}, ${col}`);

}

function paintRed(firstCell, secondCell, thirdCell){
    const targetCell1 = findCell(firstCell[0], firstCell[1]);
    targetCell1.style.color = '#F00'
    const targetCell2 = findCell(secondCell[0], secondCell[1]);
    targetCell2.style.color = '#F00'
    const targetCell3 = findCell(thirdCell[0], thirdCell[1]);
    targetCell3.style.color = '#F00'
}

function ticTacToeProblem(field) {
    for (let i = 0; i < 3; i++)
        if (field[i][0] === field[i][1] && field[i][1] === field[i][2]){
            if (field[i][0] !== undefined) {
                paintRed([i,0], [i,1], [i,2])
                alert(`Победил ${field[i][0]}`)
                return field[i][0];
            }
            return -1;
        }
        else if (field[0][i] === field[1][i] && field[1][i] === field[2][i]){
            if (field[0][i] !== undefined){
                paintRed([0,i], [1,i], [2,i])
                alert(`Победил ${field[0][i]}`)
                return field[0][i];
            }
            return -1;
        }
        else if (i === 0)
            if (field[i][i] === field[i + 1][i + 1] && field[i + 1][i + 1] === field[i + 2][i + 2]){
                if (field[i][i] !== undefined){
                    paintRed([i,i], [i+1,i+1], [i+2,i+2])
                    alert(`Победил ${field[i][i]}`)
                    return field[i][i];
                }
                return -1;
            }
            else if (field[i + 2][i] === field[i + 1][i + 1] && field[i + 1][i + 1] === field[i][i + 2]){
                if (field[i + 2][i] !== undefined) {
                    paintRed([i+2,i], [i+1,i+1], [i,i+2])
                    alert(`Победил ${field[i + 2][i]}`)
                    return field[i + 2][i];
                }
                return -1;
            }
    if (field.flat(Infinity).indexOf(undefined) === -1){
        alert('Победила дружба')
        return "draw";
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
    for (let i = 0; i < field.length; i++) {
        field[i] = new Array(3);
    }
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
