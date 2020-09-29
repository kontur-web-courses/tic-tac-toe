const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const PLAYER = 'Игрок'
const AI = 'Компьютер'

const container = document.getElementById('fieldWrapper');

let initialGameFieldLength = 3;
let autoEnlargement = false;

let gameField;
let gameInProgress = false;

let AISwitch = false;
let AIHardDifficulty = true;
let thisTurnPlayer = CROSS;
let winnerString = `${EMPTY} победил`;

let clickCounter = 0;
let possibleClicksCount;

function prepareGame () {
    startGame();
    addAutoEnlargementListener();
    addResetListener();
    addAIListener();
    addFieldLengthListener();
    tryChangeInitialGameFieldLength();
}

prepareGame();

function tryChangeInitialGameFieldLength () {
    let lengthBeforeChange = initialGameFieldLength;
    let newLength = +prompt('Какой длины будет начальное поле?', "3");
    if (isNaN(newLength)) {
        alert('Неверный размер поля!')
        return;
    }
    initialGameFieldLength = newLength;
    if (lengthBeforeChange !== initialGameFieldLength)
        if (confirm('Желаете перезапустить игру? Иначе поле изменится после этой игры.'))
            startGame();
}

function makeNewEmptyArray(gameField) {
    let dimension = gameField.length;
    for (let i = 0; i < dimension; i++) {
        gameField[i] = new Array(dimension);
        for (let j = 0; j < dimension; j++)
            gameField[i][j] = EMPTY;
    }
}

function initGameField(dimension) {
    gameField = [];
    for (let i = 0; i < dimension; i++)
        gameField.push(new Array(dimension));
    makeNewEmptyArray(gameField);

    gameInProgress = true;
    winnerString = `${EMPTY} победил`;
    clickCounter = 0;
    possibleClicksCount = gameField.length * gameField.length;
}

function tryEnlargeGameField(gameField) {
    if (!autoEnlargement)
        return;
    let lastRow = [];
    for (let i = 0; i < gameField.length; i++) {
        gameField[i].push(EMPTY);
        lastRow.push(EMPTY);
    }
    lastRow.push(EMPTY);
    gameField.push(lastRow);

    console.log(`Enlarged Array: ${gameField}`);
    updatePossibleClicksCount();
    renderGrid(gameField.length);
}

function updatePossibleClicksCount () {
    possibleClicksCount = gameField.length * gameField.length;
}

function startGame () {
    initGameField(initialGameFieldLength);
    renderGrid(gameField.length);
    setTurn();
}

function setTurn() {
    if (AISwitch)
        thisTurnPlayer = PLAYER;
    else
        thisTurnPlayer = CROSS;
}

function changeTurn() {
    if (AISwitch)
        if (thisTurnPlayer === PLAYER) {
            thisTurnPlayer = AI;
            if (AIHardDifficulty)
                forceAIToASmartMove();
            else
                forceAIToABlindMove();
        }
        else
            thisTurnPlayer = PLAYER;
    else
    if (thisTurnPlayer === CROSS)
        thisTurnPlayer = ZERO;
    else
        thisTurnPlayer = CROSS;
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            switch (gameField[i][j]){
                case EMPTY:
                    cell.textContent = EMPTY;
                    break;
                case CROSS:
                    cell.textContent = CROSS;
                    break;
                case ZERO:
                    cell.textContent = ZERO;
                    break;
            }
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function checkWinner (gameField) {
    function checkField (gameField) {
        function checkFieldHorizontally (gameField) {
            for (let i = 0; i < gameField.length; i++) {
                let row = gameField[i].join('');
                if (row === CROSS.repeat(gameField.length)) {
                    if (AISwitch)
                        setWinner(PLAYER);
                    else
                        setWinner(CROSS);
                    paintWinningCells(row, i);
                    break;
                }
                else if (row === ZERO.repeat(gameField.length)) {
                    if (AISwitch)
                        setWinner(AI);
                    else
                        setWinner(ZERO);
                    paintWinningCells(row, i);
                    break;
                }
            }
        }
        function checkFieldVertically (gameField) {
            function checkColumn(gameField, index) {
                let flatArray = gameField.flat(2);
                let word = '';
                for (let i = index; i < flatArray.length; i += gameField.length) {
                    if (flatArray[i] === EMPTY)
                        continue;
                    word += flatArray[i];
                }
                if (word === CROSS.repeat(gameField.length)) {
                    if (AISwitch)
                        setWinner(PLAYER);
                    else
                        setWinner(CROSS);
                    paintWinningCells(gameField, index, true);
                    return true;
                } else if (word === ZERO.repeat(gameField.length)) {
                    if (AISwitch)
                        setWinner(AI);
                    else
                        setWinner(ZERO);
                    paintWinningCells(gameField, index, true);
                    return true;
                }
            }
            for (let i = 0; i < gameField.length; i++)
                if (checkColumn(gameField, i))
                    break;
        }
        function checkFieldDiagonally (gameField) {
            let leftDiagonal = '';
            let rightDiagonal = '';
            let l = gameField.length;

            for (let i = 0; i < l; i++) {
                leftDiagonal += gameField[i][i];
                rightDiagonal += gameField[i][l - 1 - i];
            }
            let leftDiagPlayerWins = leftDiagonal === CROSS.repeat(l);
            let rightDiagPlayerWins = rightDiagonal === CROSS.repeat(l);
            let leftDiagAIWins = leftDiagonal === ZERO.repeat(l);
            let rightDiagAIWins = rightDiagonal === ZERO.repeat(l);

            if (leftDiagPlayerWins || rightDiagPlayerWins) {
                if (AISwitch)
                    setWinner(PLAYER);
                else
                    setWinner(CROSS);
                if (leftDiagPlayerWins)
                    paintWinningCells(1, 1, false, 'left');
                else
                    paintWinningCells(1, 1, false, 'right');
            }
            else if (leftDiagAIWins || rightDiagAIWins) {
                if (AISwitch)
                    setWinner(AI);
                else
                    setWinner(ZERO);
                if (leftDiagAIWins)
                    paintWinningCells(1, 1, false, 'left');
                else
                    paintWinningCells(1, 1, false, 'right');
            }

        }

        checkFieldHorizontally(gameField);
        checkFieldVertically(gameField);
        checkFieldDiagonally(gameField);
    }
    function paintWinningCells (line, startIndex, col = false, diag = 'none') {
        if (diag === 'left')
            for (let i = 0; i < gameField.length; i++)
                findCell(i, i).style.color = 'Red';
        else if (diag === 'right')
            for (let i = 0; i < gameField.length; i++)
                findCell(i, gameField.length - 1 - i).style.color = 'Red';
        else if (col === true)
            for (let i = 0; i < line.length; i++)
                findCell(i, startIndex).style.color = 'Red';
        else
            for (let i = 0; i < line.length; i++)
                findCell(startIndex, i).style.color = 'Red';
    }
    function setWinner (winner) {
        winnerString = `${winner} победил`;
        gameInProgress = false;
    }
    function tryAnnounceWinner () {
        if (winnerString !== `${EMPTY} победил`)
            setTimeout(announceWinner, 10);
    }
    function announceWinner () {
        alert(winnerString);
    }

    checkField(gameField);
    tryAnnounceWinner();
}

function tryClickOnCell(row, col) {
    let fieldState = clickCounter % 2 ? ZERO : CROSS;
    gameField[row][col] = fieldState;
    console.log(`${thisTurnPlayer} clicked on cell: ${row}, ${col}`);
    console.log(gameField);
    clickCounter++;
    renderSymbolInCell(fieldState, row, col);
}

function turnHandler () {
    if (gameInProgress) {
        checkWinner(gameField);
        if (gameInProgress) {
            if (clickCounter > possibleClicksCount / 2)
                tryEnlargeGameField(gameField);
            if (clickCounter === possibleClicksCount)
                alert('Победила дружба');
            changeTurn();
        }
    }
}

function cellClickHandler (row, col) {
    if (gameInProgress)
        if (gameField[row][col] === EMPTY) {
            tryClickOnCell(row, col);
            turnHandler();
        }
}

function forceAIToABlindMove () {
    function findEmptyCell(gameField, index) {
        let flatArray = gameField.flat(2);
        for (let i = index; i < flatArray.length; i += gameField.length) {
            if (flatArray[i] === EMPTY) {
                tryClickOnCell(Math.floor(i / gameField.length), i % gameField.length);
                return true;
            }
        }
    }

    for (let i = 0; i < gameField.length; i++)
        if (findEmptyCell(gameField, i)) {
            turnHandler();
            return
        }
}

function forceAIToASmartMove () {
    let rowPlayerCount = new Array(gameField.length).fill(0);
    let rowAICount = new Array(gameField.length).fill(0);

    let columnPlayerCount = new Array(gameField.length).fill(0);
    let columnAICount = new Array(gameField.length).fill(0);

    let lDiagonalAICount = 0;
    let rDiagonalAICount = 0;
    let lDiagonalPlayerCount = 0;
    let rDiagonalPlayerCount = 0;

    for (let i = 0; i < gameField.length; i++)
        for (let j = 0; j < gameField.length; j++) {
            if (gameField[i][j] === CROSS) {
                rowPlayerCount[i]++;
                columnPlayerCount[j]++;
            }
            if (gameField[i][j] === ZERO) {
                rowAICount[i]++;
                columnAICount[j]++;
            }
            if (rowPlayerCount[i] + rowAICount[i] === gameField.length)
                rowPlayerCount[i] = 0;
            if (columnPlayerCount[j] + columnAICount[j] === gameField.length)
                columnPlayerCount[j] = 0;
        }
    for (let i = 0; i < gameField.length; i++) {
        if (gameField[i][i] === ZERO)
            lDiagonalAICount++;
        if (gameField[i][gameField.length - i - 1] === ZERO)
            rDiagonalAICount++;
        if (gameField[i][i] === CROSS)
            lDiagonalPlayerCount++;
        if (gameField[i][gameField.length - i - 1] === CROSS)
            rDiagonalPlayerCount++;
    }

    console.log(`[${rowPlayerCount}, ${columnPlayerCount}]`);

    let maxCountInRows = Math.max.apply(null, rowPlayerCount);
    let maxCountInColumns = Math.max.apply(null, columnPlayerCount);
    let maxCountInDiag = Math.max(lDiagonalPlayerCount, rDiagonalPlayerCount);

    if (maxCountInDiag >= maxCountInColumns && maxCountInDiag >= maxCountInRows) {
        for (let i = 0; i < gameField.length; i++) {
            if (lDiagonalPlayerCount > rDiagonalPlayerCount) {
                if (gameField[i][i] === EMPTY) {
                    tryClickOnCell(i, i);
                    turnHandler();
                    return;
                }
            }
            else if (lDiagonalPlayerCount <= rDiagonalPlayerCount){
                if (gameField[i][gameField.length - i - 1] === EMPTY) {
                    tryClickOnCell(i, gameField.length - i - 1);
                    turnHandler();
                    return;
                }
            }
        }
    }
    if (maxCountInRows > maxCountInColumns) {
        for (let i = 0; i < gameField.length; i++) {
            if (maxCountInRows === rowPlayerCount[i])
                for (let j = 0; j < gameField.length; j++){
                    if (gameField[i][j] === EMPTY) {
                        tryClickOnCell(i, j);
                        turnHandler();
                        return;
                    }
                }
        }
    }
    if (maxCountInRows <= maxCountInColumns) {
        for (let i = 0; i < gameField.length; i++) {
            if (maxCountInColumns === columnPlayerCount[i])
                for (let j = 0; j < gameField.length; j++){
                    if (gameField[j][i] === EMPTY) {
                        tryClickOnCell(j, i);
                        turnHandler();
                        return;
                    }
                }
        }
    }
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

function addAutoEnlargementListener () {
    const autoEnlargementButton = document.getElementById('auto_enlargement');
    autoEnlargementButton.addEventListener('click', autoEnlargementClickHandler);
}

function addFieldLengthListener () {
    const fieldLengthButton = document.getElementById('fieldLength');
    fieldLengthButton.addEventListener('click', fieldLengthClickHandler);
}

function addAIListener () {
    const AISwitch = document.getElementById('AI');
    AISwitch.addEventListener('change', AISwitchChangeHandler);
}

function resetClickHandler () {
    startGame();
    console.log('reset!');
}

function fieldLengthClickHandler () {
    tryChangeInitialGameFieldLength();
}

function autoEnlargementClickHandler () {
    autoEnlargement = !autoEnlargement;
    const autoEnlargementButton = document.getElementById('auto_enlargement');
    if (autoEnlargement)
        autoEnlargementButton.style.backgroundColor = 'LightGreen';
    else
        autoEnlargementButton.style.backgroundColor = 'White';
}

function AISwitchChangeHandler () {
    AISwitch = !AISwitch;
    startGame();
    console.log(`AI switched to ${AISwitch}`);
}