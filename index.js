"use strict"

const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const DEFAULT_CELL_COLOR = '#333333'
const WINNER_CELL_COLOR = '#f10101'

const fieldWrapper = document.getElementById('fieldWrapper');
var gameField = null;
var fieldSize = 3;
var goal = 3;
var currentPlayer = CROSS;
var emptyCellsCount = 0;
var gameFinished = false;
var useAi = false;
var autoIncreaseGoal = false
var autoExpandField = true
var alertWinner = false

startGame();
bindListeners();

function startGame() {
    fieldSize = Number(document.getElementById("fieldSizeValue").value)
    goal = Number(document.getElementById("goalValue").value)
    useAi = document.getElementById("useAiValue").checked
    autoExpandField = document.getElementById("expandFieldValue").checked
    autoIncreaseGoal = document.getElementById("increaseGoalValue").checked
    alertWinner = document.getElementById("alertWinnerValue").checked
    renderGrid(fieldSize);
    initGameField(fieldSize);
    setCurrentPlayer(currentPlayer)
}

function setCurrentPlayer(value) {
    currentPlayer = value
    var currentPlayerLbl = document.getElementById("currentPlayer")
    currentPlayerLbl.textContent = `Current player: ${value}`
}

function renderGrid(dimension) {
    fieldWrapper.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            addCell(i, j, row)
        }
        fieldWrapper.appendChild(row);
    }
}

function addCell(row, col, rowObj) {
    const cell = document.createElement('td');
    cell.textContent = EMPTY;
    cell.addEventListener('click', () => cellClickHandler(row, col));
    rowObj.appendChild(cell);
}

function initGameField(fieldSize) {
    gameField = new Array(fieldSize)
        .fill(null)
        .map(_ => new Array(fieldSize).fill(EMPTY));
    emptyCellsCount = fieldSize ** 2;
}

function cellClickHandler(row, col) {
    var cell = getCell(row, col);
    if (cell !== EMPTY || gameFinished)
        return;

    setCell(row, col, currentPlayer);
    renderSymbolInCell(currentPlayer, row, col);

    var winnerCells = checkWinner(row, col, currentPlayer)
    if (winnerCells !== null) {
        if (alertWinner)
            alert(`${currentPlayer} won!`)
        gameFinished = true
        markWinnerCells(winnerCells, currentPlayer)
        return
    }
    if (--emptyCellsCount < fieldSize ** 2 / 2 && autoExpandField) {
        expandField()
        if (autoIncreaseGoal)
            goal++
    }
    else if (emptyCellsCount <= 0)
        alert("Победила дружба")
    setCurrentPlayer(currentPlayer === CROSS ? ZERO : CROSS)
    if (useAi && currentPlayer === ZERO)
        makeAiMove()
}

function expandField() {
    for (var row = 0; row < fieldSize; row++) {
        gameField[row].push(EMPTY)
        var rowObj = fieldWrapper.querySelectorAll('tr')[row]
        addCell(row, fieldSize, rowObj)
    }
    gameField.push(new Array(fieldSize + 1).fill(EMPTY))
    rowObj = document.createElement('tr');
    for (var col = 0; col <= fieldSize; col++)
        addCell(fieldSize, col, rowObj)
    fieldWrapper.appendChild(rowObj)
    emptyCellsCount += fieldSize * 2 + 1
    fieldSize++
}

function makeAiMove() {
    var emptyCell = null
    for (var row = 0; row < fieldSize; row++)
        for (var col = 0; col < fieldSize; col++) {
            if (getCell(row, col) === EMPTY)
                emptyCell = new Point(row, col)
            else
                continue
            if (getRandomInt(1, fieldSize) !== 1)
                continue
            clickOnCell(row, col)
            return
        }
    clickOnCell(emptyCell.x, emptyCell.y)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function markWinnerCells(winnerCells, symbol) {
    for (var cell of winnerCells)
        renderSymbolInCell(symbol, cell.x, cell.y, WINNER_CELL_COLOR)
}

function checkWinner(row, col, symbol) {
    var currentPoint = new Point(row, col)
    var offsets = [
        new Point(-1, -1),
        new Point(0, -1),
        new Point(1, -1),
        new Point(1, 0),
    ]
    var directions = offsets.map(p => p.multiply(-1))
    var routes = offsets
        .map(p => currentPoint.applyOffset(p.multiply(goal - 1)))
        .map((startPoint, index) => {
            return {startPoint, direction: directions[index]}
        })
    var range = goal * 2 - 1
    for (var route of routes) {
        var cells = getWinnerCells(route.startPoint, route.direction, symbol, range)
        if (cells !== null)
            return cells
    }
    return null
}

function getWinnerCells(startPoint, direction, symbol, range) {
    var cellsQueue = []
    var currentPoint = startPoint
    for (var i = 0; i < range; i++) {
        var currentCell = getCell(currentPoint.x, currentPoint.y)
        if (currentCell === symbol)
            cellsQueue.push(currentPoint)
        else
            cellsQueue.length = 0
        if (cellsQueue.length === goal)
            return cellsQueue
        currentPoint = currentPoint.applyOffset(direction)
    }
    return null
}

function getCell(x, y) {
    if (inFieldBounds({x, y}))
        return gameField[x][y]
    return null
}

function setCell(x, y, value) {
    if (!inFieldBounds({x, y}))
        throw new RangeError("Out of field bounds")
    gameField[x][y] = value
}

function inFieldBounds(point) {
    return point.x >= 0 && point.y >= 0 && point.x < fieldSize && point.y < fieldSize
}

function renderSymbolInCell(symbol, row, col, color = DEFAULT_CELL_COLOR) {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = fieldWrapper.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function bindListeners() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
    document.getElementById("testDrawBtn").onclick = testDraw
    document.getElementById("testWinBtn").onclick = testWin
}

function resetClickHandler() {
    currentPlayer = CROSS
    gameFinished = false
    startGame();
}

class Point {
    x = 0
    y = 0

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    applyOffset(offset) {
        return new Point(this.x + offset.x, this.y + offset.y)
    }

    multiply(value) {
        return new Point(this.x * value, this.y * value)
    }
}


function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

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