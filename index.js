const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let field = [[EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]];
let turn = 0;
let turnCounter = 0;
let isEnd = false;
let II = false;


startGame();
addResetListener();

function startGame() {
    let size = prompt('Введите размер поля', '3');
    if (parseInt(size) !== 3) {
        alert('Вы молодец! Но играть будете на поле 3х3!');
    }
    II = confirm('Играть с ИИ?');
    renderGrid(3);
}


function renderGrid(dimension) {
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

function cellClickHandler(row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (!isEnd) {
        if (field[row][col] === EMPTY) {
            if (turn === 0) {
                renderSymbolInCell(ZERO, row, col);
                field[row][col] = ZERO;
            } else {
                renderSymbolInCell(CROSS, row, col);
                field[row][col] = CROSS;
            }
            turn = (turn + 1) % 2;
            setTimeout(checkWinner, 100);
        }
    }
    if (II) {
        makeTurnII();
    }
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}


function checkDruzba() {
    turnCounter++;
    if (turnCounter === 9) {
        alert('Победила Druzba');
        isEnd = true;
    }
    return isEnd;
}

function checkWinner() {
    let winner = 'None';
    if (field[0][0] === field[0][1] && field[0][1] === field[0][2] && field[0][0] !== EMPTY) {
        winner = field[0][1] === 'X' ? 'CROSS' : 'ZERO';
        recolorLineToRed(0, 0, 0, 1, 0, 2);
    } else if (field[1][0] === field[1][1] && field[1][1] === field[1][2] && field[1][0] !== EMPTY) {
        winner = field[1][1] === 'X' ? 'CROSS' : 'ZERO';
        recolorLineToRed(1, 0, 1, 1, 1, 2);
    } else if (field[2][0] === field[2][1] && field[2][1] === field[2][2] && field[2][0] !== EMPTY) {
        winner = field[2][1] === 'X' ? 'CROSS' : 'ZERO';
        recolorLineToRed(2, 0, 2, 1, 2, 2);
    } else if (field[0][0] === field[1][0] && field[1][0] === field[2][0] && field[2][0] !== EMPTY) {
        winner = field[0][0] === 'X' ? 'CROSS' : 'ZERO';
        recolorLineToRed(0, 0, 1, 0, 2, 0);
    } else if (field[0][1] === field[1][1] && field[1][1] === field[2][1] && field[2][1] !== EMPTY) {
        winner = field[0][1] === 'X' ? 'CROSS' : 'ZERO';
        recolorLineToRed(0, 1, 1, 1, 2, 1);
    } else if (field[0][2] === field[1][2] && field[1][2] === field[2][2] && field[2][2] !== EMPTY) {
        winner = field[0][2] === 'X' ? 'CROSS' : 'ZERO';
        recolorLineToRed(0, 2, 1, 2, 2, 2);
    } else if (field[0][0] === field[1][1] && field[1][1] === field[2][2] && field[2][2] !== EMPTY) {
        winner = field[1][1] === 'X' ? 'CROSS' : 'ZERO';
        recolorLineToRed(0, 0, 1, 1, 2, 2);
    } else if (field[0][2] === field[1][1] && field[1][1] === field[2][0] && field[2][0] !== EMPTY) {
        winner = field[1][1] === 'X' ? 'CROSS' : 'ZERO';
        recolorLineToRed(0, 2, 1, 1, 2, 0);
    }
    if (!checkDruzba() && winner !== 'None') {
        alert(`${winner} is winner!`);
        isEnd = true;
    }

}

function recolorLineToRed(row1, col1, row2, col2, row3, col3) {
    recolorSymbolToRed(row1, col1);
    recolorSymbolToRed(row2, col2);
    recolorSymbolToRed(row3, col3);
}

function recolorSymbolToRed(row, col) {
    const targetCell = findCell(row, col);

    targetCell.style.color = '#FF0000';
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
    console.log('reset!');
    field = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
    turn = 0;
    turnCounter = 0;
    isEnd = false;
    II = false;
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
            renderSymbolInCell(EMPTY, i, j);
        }
    }

}

function makeTurnII() {
    let row = Math.floor(Math.random() * 3);
    let col = Math.floor(Math.random() * 3);
    let flag = false;
    while (!flag) {
        if (!isEnd) {
            if (field[row][col] === EMPTY) {
                if (turn === 0) {
                    renderSymbolInCell(ZERO, row, col);
                    field[row][col] = ZERO;
                } else {
                    renderSymbolInCell(CROSS, row, col);
                    field[row][col] = CROSS;
                }
                turn = (turn + 1) % 2;
                setTimeout(checkWinner, 100);
                flag = true;
            }
        }
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
}
