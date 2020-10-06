const CROSS = "X"
const ZERO = "O"
const EMPTY = " "

const container = document.getElementById("fieldWrapper")

let gameField = []
let toggleUser = false
let stepCounter = 0
let isEndGame = false

startGame()
addResetListener()

function startGame() {
    let dimension = Number(prompt("Поле с размером", 3))
    stepCounter = 0
    isEndGame = false
    toggleUser = false
    gameField = []
    initGameField(dimension, gameField)
    renderGrid(dimension)
    aiStep()
}

function initGameField(dimension, gameField) {
    for (let i = 0; i < dimension; i++) {
        gameField[i] = new Array(dimension)
        for (let j = 0; j < dimension; j++) {
            gameField[i][j] = EMPTY
        }
    }

    console.log(gameField)
}

function resize(dimension) {
    let newGameField = []

    for (let i = 0; i < dimension; i++) {
        newGameField[i] = new Array(dimension)
        for (let j = 0; j < dimension; j++) {
            if (gameField[i] && gameField[i][j]) {
                newGameField[i][j] = gameField[i][j]
            } else {
                newGameField[i][j] = EMPTY
            }
        }
    }

    gameField = newGameField
    renderGrid(dimension)
}

function renderGrid(dimension) {
    container.innerHTML = ""

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement("tr")
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement("td")
            cell.textContent = gameField[i][j]
            cell.addEventListener("click", () => cellClickHandler(i, j))
            row.appendChild(cell)
        }
        container.appendChild(row)
    }
}

function cellClickHandler(row, col) {
    if (step(row, col)) aiStep()
}

function step(row, col) {
    let isSuccessStep = false
    if (gameField[row][col] === EMPTY && !isEndGame) {
        const symbol = toggleUser ? CROSS : ZERO
        renderSymbolInCell(symbol, row, col)
        gameField[row][col] = symbol
        stepCounter++
        toggleUser = !toggleUser
        checkWinner(gameField)
        isSuccessStep = true

        console.log(`Clicked on cell: ${row}, ${col}`)
        console.log(gameField)
    }

    if (stepCounter > (gameField.length * gameField.length) / 2) {
        console.log("resize")
        resize(gameField.length + 1)
    }

    if (stepCounter === gameField.length * gameField.length && !isEndGame) {
        isEndGame = true
        alert("Победила дружба")
    }

    return isSuccessStep
}

function aiStep() {
    let col = randomInt(0, gameField.length)
    let row = randomInt(0, gameField.length)

    while (gameField[row][col] !== EMPTY) {
        col = randomInt(0, gameField.length)
        row = randomInt(0, gameField.length)
    }

    step(row, col)
}

function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random())
}

function checkWinner(gameField) {
    checkHorizontalWinner()

    for (let i = 0; i < gameField.length; i++) {
        if (checkVerticalWinner(i)) {
            break
        }
    }

    checkDiagonalWinner()

    function checkHorizontalWinner() {
        for (let i = 0; i < gameField.length; i++) {
            let word = gameField[i].join("")

            checkWord(word, i, paintWinningHorizontal)
        }
    }

    function checkVerticalWinner(index) {
        let flatField = gameField.flat(2)
        let word = ""
        for (let i = index; i < flatField.length; i += gameField.length) {
            if (flatField[i] === EMPTY) continue
            word += flatField[i]
        }

        return checkWord(word, index, paintWinningVertical)
    }

    function checkDiagonalWinner() {
        let mainDiagonalWord = ""
        let secondaryDiagonalWord = ""
        for (let i = 0; i < gameField.length; i++) {
            mainDiagonalWord += gameField[i][i]

            let backIndex = gameField.length - 1 - i
            secondaryDiagonalWord += gameField[i][backIndex]
        }

        checkWord(mainDiagonalWord, 0, paintWinningDiagonal)
        checkWord(secondaryDiagonalWord, secondaryDiagonalWord.length - 1, paintWinningDiagonal)
    }

    function checkWord(word, index, painter) {
        if (word === CROSS.repeat(gameField.length)) {
            win(CROSS, word, index, painter)
            return true
        }

        if (word === ZERO.repeat(gameField.length)) {
            win(ZERO, word, index, painter)
            return true
        }

        return false
    }

    function win(symbol, word, index, painter) {
        painter(word, index)
        alert(`${symbol} победил`)
        isEndGame = true
    }

    function paintWinningHorizontal(line, startIndex) {
        for (let i = 0; i < line.length; i++) {
            renderSymbolInCell(line[i], startIndex, i, "red")
        }
    }

    function paintWinningVertical(line, startIndex) {
        for (let i = 0; i < line.length; i++) {
            renderSymbolInCell(line[i], i, startIndex, "red")
        }
    }

    function paintWinningDiagonal(line, startIndex) {
        if (startIndex === 0) {
            for (let i = 0; i < line.length; i++) {
                renderSymbolInCell(line[i], i, i, "red")
            }
        }

        let end = line.length - 1
        if (startIndex === end) {
            for (let i = 0; i < line.length; i++) {
                let backIndex = gameField.length - 1 - i
                renderSymbolInCell(line[i], i, backIndex, "red")
            }
        }
    }
}

function renderSymbolInCell(symbol, row, col, color = "#333") {
    const targetCell = findCell(row, col)

    targetCell.textContent = symbol
    targetCell.style.color = color
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll("tr")[row]
    return targetRow.querySelectorAll("td")[col]
}

function addResetListener() {
    const resetButton = document.getElementById("reset")
    resetButton.addEventListener("click", resetClickHandler)
}

function resetClickHandler() {
    console.log("reset!")
    startGame()
}

/* Test Function */
/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2)
    clickOnCell(0, 0)
    clickOnCell(2, 0)
    clickOnCell(1, 1)
    clickOnCell(2, 2)
    clickOnCell(1, 2)
    clickOnCell(2, 1)
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0)
    clickOnCell(1, 0)
    clickOnCell(1, 1)
    clickOnCell(0, 0)
    clickOnCell(1, 2)
    clickOnCell(1, 2)
    clickOnCell(0, 2)
    clickOnCell(0, 1)
    clickOnCell(2, 1)
    clickOnCell(2, 2)
}

function clickOnCell(row, col) {
    findCell(row, col).click()
}
