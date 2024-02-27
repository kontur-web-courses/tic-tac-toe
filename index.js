const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let player = CROSS

const START_GRID = 3

// let field = Array(START_GRID).fill(Array(START_GRID).fill(EMPTY));
let field = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]
function checkWinner(field, sym) {
    for (let i = 0; i < field.length; i++) {
        let flag = true
        for (let j = 0; j < field[0].length; j++) {
            const row_element = field[i][j]
            if (row_element !== sym) {
                flag = false
            }
        }
        if (flag) {
            for (let m = 0; m < i; m++) {
                renderSymbolInCell(player, i, m, 'red')                
            }
            console.log('row')
            return true
        }
    }
    
    for (let i = 0; i < field.length; i++) {
        let flag = true
        
        for (let j = 0; j < field[0].length; j++) {
            const col_element = field[j][i]
            if (col_element !== sym) {
                flag = false
            }
        }
        if (flag) {
            for (let m = 0; m < i; m++) {
                renderSymbolInCell(player, m, i, 'red')                
            }
            console.log('col')
            return true
        }
    }

    let flag = true
    for (let i = 0; i < field.length; i++) {
        const diag_element = field[i][i];
        if (diag_element !== sym) {
            flag = false
        }
    }
    if (flag) {
        for (let m = 0; m < START_GRID; m++) {
            renderSymbolInCell(player, m, m, 'red')                
        }
        console.log('diag')
        return true
    }
    
    flag = true
    for (let i = 0; i < field.length; i++) {
        const diag_element = field[i][field.length - i - 1];
        if (diag_element !== sym) {
            flag = false
        }
    }
    if (flag) {
        for (let m = 0; m < START_GRID; m++) {
            renderSymbolInCell(player, m, m, 'red')                
        }
        console.log('rev')
        return true
    }

    return false


}

function switchPlayers() {
    player = player === CROSS ? ZERO : CROSS 
}
 

startGame();
addResetListener();

function startGame () {
    renderGrid(START_GRID);
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

function checkDraw() {
    // Проверяем, все ли ячейки на поле заполнены
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] === EMPTY) {
                return false; // Не все ячейки заполнены, игра продолжается
            }
        }
    }

    return true; // Все ячейки заполнены, объявляем ничью
}

function cellClickHandler (row, col) {
    // Пиши код тут
    const targetCell = field[row][col];

    // Проверяем, что ячейка еще не заполнена
    if (targetCell === EMPTY) {
        console.log(`Clicked on cell: ${row}, ${col}`);
        field[row][col] = player

        renderSymbolInCell(player, row, col);

        if (checkWinner(field, player)) {
            alert('${player} wins');
            //return;
        }

        console.log(field,row,col)


        if (checkDraw()){
            alert("Победила дружба!");
            return
        }
        switchPlayers();
    }
     else {
        console.log(`Cell ${row}, ${col} is already filled`);

    }
    
    
    /* Пользоваться методом для размещения символа в клетке так:
     */
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
    for (let i = 0; i < START_GRID; i++) {
        for (let j = 0; j < START_GRID; j++) {
            const cell = findCell(i, j);
            cell.textContent = EMPTY;
            field = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]
            player = CROSS
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
