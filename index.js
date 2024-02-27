class Board {
    constructor(dimension) {
        this.isGameFinished = false;
        this.matrix = this.matrix = Array.from({length: dimension}, () => Array.from({length: dimension}, () => null));
        this.player = ZERO;
    }

    changePlayer() {
        this.player = this.player === CROSS ? ZERO : CROSS;
    }

    paint(row, col) {
        this.changePlayer();
        this.matrix[row][col] = this.player;
        return this.player;
    }

    is_painted(row, col) {
        return this.matrix[row][col] !== null;
    }

    is_all_painted() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.matrix[i][j] === null)
                    return false;
            }
        }
        return true;
    }

    checkWinner() {
        for (let j = 0; j < this.matrix[0].length; j++) {
            let player = this.matrix[0][j];
            let isWinner = true;
            let winningCells = [];
            for (let i = 0; i < this.matrix.length; i++) {
                if (this.matrix[i][j] !== player) {
                    isWinner = false;
                    break;
                }
                winningCells.push([i, j]);
            }
            if (isWinner && player !== null) {
                return [player, winningCells];
            }
        }

        for (let i = 0; i < this.matrix.length; i++) {
            let player = this.matrix[i][0];
            let isWinner = true;
            let winningCells = [];
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] !== player) {
                    isWinner = false;
                    break;
                }
                winningCells.push([i, j]);
            }
            if (isWinner && player !== null) {
                return [player, winningCells];
            }
        }

        let player = this.matrix[0][0];
        let isWinner = true;
        let winningCells = [];
        for (let i = 0; i < this.matrix.length; i++) {
            if (this.matrix[i][i] !== player) {
                isWinner = false;
                break;
            }
            winningCells.push([i, i]);
        }
        if (isWinner && player !== null) {
            return [player, winningCells];
        }

        player = this.matrix[this.matrix.length - 1][0];
        isWinner = true;
        winningCells = [];
        for (let i = 0; i < this.matrix.length; i++) {
            if (this.matrix[this.matrix.length - i - 1][i] !== player) {
                isWinner = false;
                break;
            }
            winningCells.push([this.matrix.length - i - 1, i]);
        }
        if (isWinner && player !== null) {
            return [player, winningCells];
        }

        return [null, []];
    }

    getRandomFreeIndex() {
        let indices = [];
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix.length; j++) {
                if (this.matrix[i][j] === null) {
                    indices.push([i, j]);
                }
            }
        }

        let randIndex = getRandomInt(indices.length);
        return indices[randIndex];
    }
}


const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const BLACK_COLOR = '#333'
const RED_COLOR = '#FF0000'
const container = document.getElementById('fieldWrapper');

let board;
let boardDimension;
let wantsToPlayWithBot;

showDimensionInput();
randomBotInput();

function showDimensionInput() {
    let input = prompt("Введите размер поля (от 2 и выше):");

    if (input && !isNaN(input) && parseInt(input) >= 2) {
        boardDimension = parseInt(input);
        board = new Board(boardDimension);
        startGame();
        addResetListener();
    } else {
        alert("Пожалуйста, введите корректное значение для размера поля.");
        showDimensionInput();
    }
}

function randomBotInput() {
    wantsToPlayWithBot = confirm("Хотите ли вы играть с ботом?");

    if (wantsToPlayWithBot) {
        // Код, который будет запускаться, если пользователь хочет играть с ботом
        console.log("Играем с ботом!");
    } else {
        // Код, который будет запускаться, если пользователь не хочет играть с ботом
        console.log("Играем без бота!");
    }
}

function startGame() {
    renderGrid(boardDimension);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => gameClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function gameClickHandler(row, col){
    cellClickHandler(row, col);
    if (wantsToPlayWithBot)
    {
        let cell = board.getRandomFreeIndex();
        cellClickHandler(cell[0], cell[1]);
    }
}

function cellClickHandler(row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (board.isGameFinished) {
        return;
    }
    if (!board.is_painted(row, col)) {
        renderSymbolInCell(board.paint(row, col), row, col);
    }

    if (board.checkWinner()[0] !== null) {
        let winnerData = board.checkWinner();
        let winner = winnerData[0] === CROSS ? 'Крестик' : 'Нолик';
        let winFields = winnerData[1];
        winFields.forEach(function (field) {
            let row = field[0];
            let col = field[1];
            renderSymbolInCell(winnerData[0], row, col, RED_COLOR)
        })
        board.isGameFinished = true;
        alert(`Победил ${winner}!`)
        return;
    }
    if (board.is_all_painted()) {
        board.isGameFinished = true;
        alert('Победила дружба');
    }
}

function renderSymbolInCell(symbol, row, col, color = BLACK_COLOR) {
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
    board = new Board(boardDimension);
    startGame();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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
