const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let number = 0;
let run = true;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
    number = 0;
    run = true;
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
    if (run && findCell(row, col).textContent == EMPTY) 
    {
        if (number % 2 == 0) renderSymbolInCell(CROSS, row, col);
        else renderSymbolInCell(ZERO, row, col);
        number += 1;
        let res = getWinner();
        if (res != EMPTY) alert(res);
        else if (number == 9) alert('Победила дружба')
    }
        
}

function getWinner() {
    let sim = []
    for(let i = 0; i < 3; i++)
    {
        sim.push(check_line([i, 0], [i, 1], [i, 2]));
        sim.push(check_line([0, i], [1, i], [2, i]));
    }
    sim.push(check_line([0,0],[1,1],[2,2]));
    sim.push(check_line([0,2],[1,1],[2.0]));
    console.log(sim);

    if (sim.includes(CROSS)) return CROSS;
    if (sim.includes(ZERO)) return ZERO;
    return EMPTY;
}

function check_line(x1, x2, x3)
{
    if (findCell(x1[0], x1[1]).textContent == findCell(x2[0], x2[1]).textContent && findCell(x2[0], x2[1]).textContent == findCell(x3[0], x3[1]).textContent && findCell(x2[0], x2[1]).textContent != EMPTY)
    {
        let sim = findCell(x1[0], x1[1]).textContent;

        renderSymbolInCell(sim, x1[0], x1[1], '#ff0000');
        renderSymbolInCell(sim, x2[0], x2[1],  '#ff0000');
        renderSymbolInCell(sim, x3[0], x3[1], '#ff0000');
        run = false;
        return sim;
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
    startGame();
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
