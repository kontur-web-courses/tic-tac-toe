const CROSS = "X"
const ZERO = "O"
const EMPTY = " "

const container = document.getElementById("fieldWrapper")

let gameField = []
let stepCounter = 0
let isEnd = false
let currentUser = CROSS

startGame()
addResetListener()

function startGame() {
    stepCounter = 0
    isEnd = false
    gameField = []
    initGameField(gameField)
    renderGrid()
    currentUser = CROSS
}

function initGameField(gameField) {
    for (let i = 0; i < 3; i++) {
        gameField[i] = new Array(3)
        for (let j = 0; j < 3; j++) {
            gameField[i][j] = EMPTY
        }
    }

    console.log(gameField)
}

function renderGrid() {
    container.innerHTML = ""

    for (let i = 0; i < 3; i++) {
        const row = document.createElement("tr")
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("td")
            cell.textContent = gameField[i][j]
            cell.addEventListener("click", () => cellClickHandler(i, j))
            row.appendChild(cell)
        }
        container.appendChild(row)
    }
}

function cellClickHandler(row, col) {
    step(row, col)
}

function step(row, col) {
    if (gameField[row][col] === EMPTY && !isEnd) {
        renderSymbolInCell(currentUser, row, col)
        gameField[row][col] = currentUser
        stepCounter++
        checkWinner(gameField)
        currentUser = currentUser === CROSS ? ZERO : CROSS

        console.log(`Clicked on cell: ${row}, ${col}`)
        console.log(gameField)
    }

    if (stepCounter === gameField.length * gameField.length && !isEnd) {
        isEnd = true
        alert("Победила дружба")
    }
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

            isWinnerCombination(word, i, paintWinningHorizontal)
        }
    }

    function checkVerticalWinner(index) {
        let flatField = gameField.flat(2)
        let word = ""
        for (let i = index; i < flatField.length; i += gameField.length) {
            if (flatField[i] === EMPTY) continue
            word += flatField[i]
        }

        return isWinnerCombination(word, index, paintWinningVertical)
    }

    function checkDiagonalWinner() {
        let mainDiagonalWord = ""
        let secondaryDiagonalWord = ""
        for (let i = 0; i < gameField.length; i++) {
            mainDiagonalWord += gameField[i][i]

            let backIndex = gameField.length - 1 - i
            secondaryDiagonalWord += gameField[i][backIndex]
        }

        isWinnerCombination(mainDiagonalWord, 0, paintWinningDiagonal)
        isWinnerCombination(secondaryDiagonalWord, secondaryDiagonalWord.length - 1, paintWinningDiagonal)
    }

    function isWinnerCombination(word, index, painter) {
        if (word === CROSS.repeat(gameField.length)) {
            setWinner(CROSS, word, index, painter)
            return true
        }

        if (word === ZERO.repeat(gameField.length)) {
            setWinner(ZERO, word, index, painter)
            return true
        }

        return false
    }

    function setWinner(symbol, word, index, painter) {
        painter(word, index)
        alert(`${symbol} победил`)
        isEnd = true
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