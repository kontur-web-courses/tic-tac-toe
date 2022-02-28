class grid {

    constructor(size) {
        this.size = size;
        this.amountOfMoves = 0;
        this.isEnded = false;
        this.fields = this.getFields(size);
    }

    getFields(size) {
        let array = new Array(size);
        for (let i = 0; i < size; i++) {
            array[i] = new Array(size).map(el => el = EMPTY);
        }
        return array;
    }

    isWin() {
        let count = 0;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                count += this.fields[i][j] === 'X' ? 1 : this.fields[i][j] === '0' ? -1 : 0;
            }
            if (Math.abs(count) === this.size) {
                if (count > 0) {
                    for (let k = 0; k < this.size; k++) {
                        renderSymbolInCell('X', i, k, '#ff0000')
                    }
                    field.isEnded = true;
                    alert(CROSS + ' wins!')
                } else {
                    for (let k = 0; k < this.size; k++) {
                        renderSymbolInCell('0', i, k, '#ff0000')
                    }
                    alert(ZERO + ' wins!');
                    field.isEnded = true;
                }
                break;
            }
            count = 0;
        }
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                count += this.fields[j][i] === 'X' ? 1 : this.fields[j][i] === '0' ? -1 : 0;
            }
            if (Math.abs(count) === this.size) {
                if (count > 0) {
                    for (let k = 0; k < this.size; k++) {
                        renderSymbolInCell('X', k, i, '#ff0000')
                    }
                    alert(CROSS + ' wins!')
                    field.isEnded = true;
                } else {
                    for (let k = 0; k < this.size; k++) {
                        renderSymbolInCell('0', k, i, '#ff0000')
                    }
                    alert(ZERO + ' wins!')
                    field.isEnded = true;
                }
                break;
            }
            count = 0;
        }
        for (let i = 0; i < this.size; i++) {
            count += this.fields[i][i] === 'X' ? 1 : this.fields[i][i] === '0' ? -1 : 0;
            if (Math.abs(count) === this.size) {
                if (count > 0) {
                    for (let k = 0; k < this.size; k++) {
                        renderSymbolInCell('X', k, k, '#ff0000')
                    }
                    alert(CROSS + ' wins!')
                    field.isEnded = true;
                } else {
                    for (let k = 0; k < this.size; k++) {
                        renderSymbolInCell('0', k, k, '#ff0000')
                    }
                    alert(ZERO + ' wins!')
                    field.isEnded = true;
                }
                break;
            }
        }
        count = 0;
        for (let i = 0; i < this.size; i++) {
            count += this.fields[i][this.size - i - 1] === 'X' ? 1 : this.fields[i][this.size - i - 1] === '0' ? -1 : 0;
            if (Math.abs(count) === this.size) {
                if (count > 0) {
                    for (let k = 0; k < this.size; k++) {
                        renderSymbolInCell('X', k, this.size - k - 1, '#ff0000')
                    }
                    alert(CROSS + ' wins!')
                    field.isEnded = true;
                } else {
                    for (let k = 0; k < this.size; k++) {
                        renderSymbolInCell('0', k, this.size - k - 1, '#ff0000')
                    }
                    alert(ZERO + ' wins!')
                    field.isEnded = true;
                }
                break;
            }
        }
        count = 0;
    }
}

let field = new grid(1);
const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();


function startGame() {
    let size = prompt('Введите размер поля', 3)
    renderGrid(Number(size));
}


function renderGrid(dimension = 3) {
    container.innerHTML = '';
    field = new grid(dimension);
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
    if (field.fields[row][col] !== CROSS && field.fields[row][col] !== ZERO && !field.isEnded) {
        if (field.amountOfMoves % 2 === 0) {
            renderSymbolInCell(CROSS, row, col)
            field.fields[row][col] = CROSS;
        } else {
            renderSymbolInCell(ZERO, row, col)
            field.fields[row][col] = ZERO;
        }
        console.log(`Clicked on cell: ${row}, ${col}`);
        field.amountOfMoves += 1;
        field.isWin();
        if (field.amountOfMoves === field.size * field.size) {
            alert('Победила дружба!')
        }
    }

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
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
    startGame();
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
