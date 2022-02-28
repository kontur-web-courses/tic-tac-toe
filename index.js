const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let grid = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']]
let count = 0;
let gameNotOverFlag = true;
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
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (count % 2 === 0 && grid[row][col] === ' ' && gameNotOverFlag) {
        renderSymbolInCell(CROSS, row, col);
        grid[row][col] = 'X'
        let winner1 = checkWinner(grid);
        if (winner1 !== 'no'){
            alert(winner1);
            gameNotOverFlag = false;
        }
        count += 1;
    } else if (grid[row][col] === ' '&& gameNotOverFlag){
        renderSymbolInCell(ZERO, row, col);
        grid[row][col] = '0'
        let winner2 = checkWinner(grid);
        if (winner2 !== 'no'){
            alert(winner2);
            gameNotOverFlag = false;
        }
        count += 1;
    }
    if (count === 9){
        alert('Победила дружба')
    }

}

function checkWinner (grid) {
    if (grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2] && grid[0][0] === '0'){
        renderSymbolInCell(ZERO, 0, 0, 'red'), renderSymbolInCell(ZERO, 0, 1, 'red'), renderSymbolInCell(ZERO, 0, 2, 'red');
        return 'Победа второго игрока';
    }
    if (grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2] && grid[1][0] === '0'){
        renderSymbolInCell(ZERO, 1, 0, 'red'), renderSymbolInCell(ZERO, 1, 1, 'red'), renderSymbolInCell(ZERO, 1, 2, 'red');
        return 'Победа второго игрока';
    }
    if (grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2] && grid[2][0] === '0'){
        renderSymbolInCell(ZERO, 2, 0, 'red'), renderSymbolInCell(ZERO, 2, 1, 'red'), renderSymbolInCell(ZERO, 2, 2, 'red');
        return 'Победа второго игрока';
    }
    if (grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0] && grid[2][0] === '0'){
        renderSymbolInCell(ZERO, 0, 0, 'red'), renderSymbolInCell(ZERO, 1, 0, 'red'), renderSymbolInCell(ZERO, 2, 0, 'red');
        return 'Победа второго игрока';
    }
    if (grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1] && grid[2][1] === '0'){
        renderSymbolInCell(ZERO, 0, 1, 'red'), renderSymbolInCell(ZERO, 1, 1, 'red'), renderSymbolInCell(ZERO, 2, 1, 'red');
        return 'Победа второго игрока';
    }
    if (grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2] && grid[2][2] === '0'){
        renderSymbolInCell(ZERO, 0, 2, 'red'), renderSymbolInCell(ZERO, 1, 2, 'red'), renderSymbolInCell(ZERO, 2, 2, 'red');
        return 'Победа второго игрока';
    }
    if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] && grid[2][2] === '0'){
        renderSymbolInCell(ZERO, 0, 0, 'red'), renderSymbolInCell(ZERO, 1, 1, 'red'), renderSymbolInCell(ZERO, 2, 2, 'red');
        return 'Победа второго игрока';
    }
    if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0] && grid[2][0] === '0'){
        renderSymbolInCell(ZERO, 0, 2, 'red'), renderSymbolInCell(ZERO, 1, 1, 'red'), renderSymbolInCell(ZERO, 2, 0, 'red');
        return 'Победа второго игрока';
    }


    if (grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2] && grid[0][0] === 'X'){
        renderSymbolInCell(CROSS, 0, 0, 'red'), renderSymbolInCell(CROSS, 0, 1, 'red'), renderSymbolInCell(CROSS, 0, 2, 'red');
        return 'Победа первого игрока';
    }
    if (grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2] && grid[1][0] === 'X'){
        renderSymbolInCell(CROSS, 1, 0, 'red'), renderSymbolInCell(CROSS, 1, 1, 'red'), renderSymbolInCell(CROSS, 1, 2, 'red');
        return 'Победа первого игрока';
    }
    if (grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2] && grid[2][0] === 'X'){
        renderSymbolInCell(CROSS, 2, 0, 'red'), renderSymbolInCell(CROSS, 2, 1, 'red'), renderSymbolInCell(CROSS, 2, 2, 'red');
        return 'Победа первого игрока';
    }
    if (grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0] && grid[2][0] === 'X'){
        renderSymbolInCell(CROSS, 0, 0, 'red'), renderSymbolInCell(CROSS, 1, 0, 'red'), renderSymbolInCell(CROSS, 2, 0, 'red');
        return 'Победа первого игрока';
    }
    if (grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1] && grid[2][1] === 'X'){
        renderSymbolInCell(CROSS, 0, 1, 'red'), renderSymbolInCell(CROSS, 1, 1, 'red'), renderSymbolInCell(CROSS, 2, 1, 'red');
        return 'Победа первого игрока';
    }
    if (grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2] && grid[2][2] === 'X'){
        renderSymbolInCell(CROSS, 0, 2, 'red'), renderSymbolInCell(CROSS, 1, 2, 'red'), renderSymbolInCell(CROSS, 2, 2, 'red');
        return 'Победа первого игрока';
    }
    if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] && grid[2][2] === 'X'){
        renderSymbolInCell(CROSS, 0, 0, 'red'), renderSymbolInCell(CROSS, 1, 1, 'red'), renderSymbolInCell(CROSS, 2, 2, 'red');
        return 'Победа первого игрока';
    }
    if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0] && grid[2][0] === 'X'){
        renderSymbolInCell(CROSS, 0, 2, 'red'), renderSymbolInCell(CROSS, 1, 1, 'red'), renderSymbolInCell(CROSS, 2, 0, 'red');
        return 'Победа первого игрока';
    }
    return 'no';
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
    for (i = 0; i<= 2; i++){
        for(j = 0; j<= 2; j++){
            renderSymbolInCell(EMPTY, i, j);
        }
    }
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
