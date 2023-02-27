// TODO: write your code here
// (+) Реши, как будешь хранить поле. Тебе нужна будет такая структура, в которой удобно понимать есть ли победитель: три клетки по горизонтали, вертикали или диагонали, заполненные одинаковыми символами.
// (+) Допиши функцию cellClickHandler, чтобы после клика ставился крестик или нолик в соответствующее поле.
// (+) Если поле, по которому кликнули, не пустое, символ ставиться не должен.
// (+) Если кончились ходы, выведи alert с текстом "Победила дружба".
// (+) Напиши функцию, которая считает: есть ли уже победитель. Если есть победитель, выведи alert с названием победителя
// (+) Если есть победитель, покрась победные значения в клетках в красный.
// (+) После победы, клик по полю больше не должен ставить крестик или нолик.
// (+) Обрабатывай клик по кнопке "Сначала": допиши метод resetClickHandler, чтобы поле очищалось.
// (+) * Сделай так, чтобы можно было в начале игры задавать поле произвольного размера.
// (+) * Напиши "искусственный интеллект" — функцию, которая будет ставить нолики с случайное пустое поле.
// * Напиши чуть более умный искусственный интеллект — функция, ставящая нолики в случайном месте обязана поставить нолик в такое поле, нолик в котором приведет к выигрышу "ИИ".
// * Сделай так, чтобы при заполнении больше половины клеток на поле, оно бы расширялось: добавлялось бы по одному ряду с каждой стороны.


const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let isFirstPlayer = true;
let isGameFinished = false;
let matrix = [];
let countMoves = 0;
let isAI = true;

startGame();
addResetListener();

function makeField () {
    let length = prompt('Введите размер поля', 3);
    countMoves = length * length;
    for (let i = 0; i < length; i++) {
        matrix[i] = [];
        for (let j = 0; j < length; j++) {
            matrix[i][j] = EMPTY;
        }
    }
}

function resetGame () {
    isFirstPlayer = true;
    isGameFinished = false;
    matrix = [];
    countMoves = 0;
    startGame();
}

function startGame () {
    // use prompt to get count of rows/columns
    makeField();
    isAI = confirm('Игра с ИИ?');
    renderGrid(matrix.length);
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

// paint win cells red
function paintWinCells (winCells) {
    for (let cell of winCells) {
        renderSymbolInCell(matrix[cell[0]][cell[1]], cell[0], cell[1], 'red');
    }
}

function cellClickHandler (row, col) {
    if (isGameFinished || findCell(row, col).textContent !== EMPTY) {
        return;
    }

    if (isFirstPlayer) {
        renderSymbolInCell(CROSS, row, col);
        matrix[row][col] = CROSS;
    }
    else {
        renderSymbolInCell(ZERO, row, col);
        matrix[row][col] = ZERO;
    }

    isFirstPlayer = !isFirstPlayer;
    countMoves--;

    let winCells = getWinCells(row, col, matrix[row][col]);

    if (winCells.length > 0) {
        isGameFinished = true;
        paintWinCells(winCells);
        alert(`Победили ${matrix[row][col]}`);
        return;
    }

    if (countMoves === 0) {
        alert('Победила дружба');
        isGameFinished = true;
        return;
    }

    if (isAI && !isFirstPlayer) {
        let randomCeil = getRandomFreeCell();
        cellClickHandler(randomCeil[0], randomCeil[1]);
    }

    // console.log(`Clicked on cell: ${row}, ${col}`);
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
    resetGame();
    // console.log('reset!');
}

function checkWinHorizontal (row, symbol) {
    let winCells = [];
    if (matrix[row].every((item) => item === symbol)){
        for (let i = 0; i < matrix.length; i++) {
            winCells.push([row, i]);
        }
    }

    return winCells;
}

function checkWinVertical (column, symbol) {
    let winCells = [];
    if (matrix.every((item) => item[column] === symbol)) {
        for (let i = 0; i < matrix.length; i++) {
            winCells.push([i, column]);
        }
    }

    return winCells;
}

function checkWinDiagonal (row, column, symbol) {
    let winCells = [];
    if (row === column) {
        if (matrix.every((item, index) => item[index] === symbol)) {
            for (let i = 0; i < matrix.length; i++) {
                winCells.push([i, i]);
            }
        }
    }
    else if (row + column === matrix.length - 1) {
        if (matrix.every((item, index) => item[matrix.length - 1 - index] === symbol)) {
            for (let i = 0; i < matrix.length; i++) {
                winCells.push([i, matrix.length - 1 - i]);
            }
        }
    }

    return winCells;
}

function getRandomFreeCell () {
    let freeCells = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j] === EMPTY) {
                freeCells.push([i, j]);
            }
        }
    }

    return randomCell = freeCells[Math.floor(Math.random() * freeCells.length)];
}

/* Проверка на победу */
function getWinCells (row, column, symbol) {
    let winCells = [];
    winCells = winCells.concat(checkWinHorizontal(row, symbol));
    winCells = winCells.concat(checkWinVertical(column, symbol));
    winCells = winCells.concat(checkWinDiagonal(row, column, symbol));

    return winCells;
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
