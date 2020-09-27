const SYMBOL = {"CROSS": 'X', "ZERO": 'O', "EMPTY": " "}
const PLAYER_SYMBOL = {
    "player1": SYMBOL.CROSS,
    "player2": SYMBOL.ZERO,
}
let currentSymbol = PLAYER_SYMBOL.player1;
const switchMove = () => currentSymbol = currentSymbol === PLAYER_SYMBOL.player1 ? PLAYER_SYMBOL.player2 : PLAYER_SYMBOL.player1;

const container = document.getElementById('fieldWrapper');
let game = null;
startGame(game);
addResetListener();

function startGame() {
    game = new Game(3, 3);
    renderGrid(3);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = SYMBOL.EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    console.log(`Clicked on cell: ${row}, ${col} символ ${currentSymbol}`);
    try {
        game.clickCell(row, col, currentSymbol)
    } catch (e) {
        switch (true) {
            case e instanceof GameFieldIsFullError:
                alert("Ходы закончились победила дружба");
                return;
            case e instanceof InvalidGameFieldAddressError:
                alert(e.toString())
                return;
            case e instanceof CellNotEmptyError:
                alert("Клетка не пустая, выберите другую")
                return;
        }
    }
    renderSymbolInCell(currentSymbol, row, col);
    if (game.isOver) {
        game.winnerCells.forEach(cell => renderSymbolInCell(currentSymbol,cell.y, cell.x, '#ff0000'))
        alert(`Игра закончилась. Победил ${currentSymbol}`);
        return;
    }
    switchMove();
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
    game = new Game(3,3)
    renderGrid(3)
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
