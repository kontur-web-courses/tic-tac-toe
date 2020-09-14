const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
const map = [[,,],[,,],[,,]];
let isOver = false;

startGame();
addResetListener();
 
function startGame () {
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            map[i][j] = EMPTY;
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
    if(map[row][col] !== EMPTY || isOver) {
        console.log(map[row][col]);
        return;
    }
    let countOfCross = 0;
    let countOfZero = 0;
    for(let column of map)
        for(let cell of column)
            if(cell === CROSS)
                countOfCross++;
            else if(cell === ZERO)
                countOfZero++;
    
    map[row][col] = (countOfCross === countOfZero) ? CROSS : ZERO;
    renderSymbolInCell(map[row][col], row, col);
    let winner = getWinner();
    if(winner !== null) {
        paintWinner(winner);
        alert(winner);
        isOver = true;
    }
    else if(countOfZero + countOfCross === 8)
        alert("Победила дружба");
    console.log(`Clicked on cell: ${row}, ${col}`);
}

function getWinner () {
    let element = map[1][1];
    let countOfElement = 0;
    if(element !== EMPTY){
        for(let i = 0; i < 3; i++)
            if(map[i][2 - i] === element)
                countOfElement++;
        if(countOfElement === 3)
            return element;
        countOfElement = 0;
    
        for(let i = 0; i < 3; i++)
            if(map[i][i] === element)
                countOfElement++;
        if(countOfElement === 3)
            return element;
    }
    for(let i = 0; i < 3; i++) {
        element = map[i][0];
        if(element!==EMPTY){
            countOfElement = 0;
            for(let j = 0; j < 3; j++)
                if(map[i][j] === element)
                    countOfElement++;
            if(countOfElement === 3)
                return element;
        }
    }

    for(let i = 0; i < 3; i++) {
        element = map[0][i];
        if(element!==EMPTY){
            countOfElement = 0;
            for(let j = 0; j < 3; j++)
                if(map[j][i] === element)
                    countOfElement++;
            if(countOfElement === 3)
                return element;
        }
    }
    return null;
}

function paintWinner(winner){
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if(map[i][j] === winner)
                renderSymbolInCell(winner, i, j, "#ff0000");
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
    isOver = false;
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++){
            map[i][j] = EMPTY;
            renderSymbolInCell(map[i][j], i, j);
        }
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
