const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const container = document.getElementById('fieldWrapper');
let board;

class Board {
    constructor(size) {
        this.size = size;
        this.board = new Array(size);
        this.symbol = CROSS;
        this.steps = 0;
    }

    pasteSymbol(row, col) {
        this.board[row * this.size + col] = this.symbol;
        let previousSymbol = this.symbol;
        this.symbol = this.symbol === CROSS ? ZERO : CROSS;
        this.steps += 1;
        return previousSymbol;
    }

    isEmpty(row, col) {
        return !this.board[row * this.size + col];
    }

    isTie() {
        return this.steps === (this.size * this.size);
    }

    isWinner() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size - 1; j++) {
                if (this.board[i + j * this.size] !== this.board[i + j * this.size + this.size]) {
                    break;
                }

                if (j === (this.size - 2))
                    return this.board[i + j * this.size + this.size];
            }
        }

        for (let i = 0; i < this.size * this.size; i += this.size) {
            for (let j = 0; j < this.size - 1; j++) {
                if (this.board[i + j] !== this.board[i + j + 1]) {
                    break;
                }

                if (j === (this.size - 2))
                    return this.board[i + j + 1];
            }
        }

        for (let i = 0; i < this.size; i += this.size + 1){
            if (this.board[i] !== this.board[i + this.size + 1]){
                break;
            }

            if (i === this.size + 1){
                return this.board[i];
            }
        }

        for (let i = 2; i < this.size; i += this.size -= 1){
            if (this.board[i] !== this.board[i + this.size -1]){
                break;
            }

            if (i === this.size - 1){
                return this.board[i];
            }
        }
    }
}

startGame();
addResetListener();

function startGame() {
    renderGrid(3);
    board = new Board(3);
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
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (board.isEmpty(row, col)) {
        let symbol = board.pasteSymbol(row, col)
        renderSymbolInCell(symbol, row, col);
    }

    if (board.isTie()) {
        alert(`Победила дружба`);
    }

    let winner = board.isWinner();
    if (winner) {
        alert(`Победил ${winner}`)
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
