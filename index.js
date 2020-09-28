const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

class Rule {
    constructor(d) {
        this.d = d;
        this.full = new Array(2 * d + 2).fill(0);
        this.rowIdx = 0;
        this.colIdx = d;
        this.mainDiagIdx = 2 * d;
        this.antiDiagIdx = 2 * d + 1;
    }

    
    setValue(row, col, value) {
        this.full[this.rowIdx + row] = value;
        this.full[this.colIdx + col] = value;
        if (row == col)
            this.full[this.mainDiagIdx] = value;
        if (this.d - 1 - row == col)
            this.full[this.antiDiagIdx] = value;
    }
    

    turnChanges(row, col, modifier = 1) {
        this.full[this.rowIdx + row] += modifier;
        this.full[this.colIdx + col] += modifier;
        if (row == col)
            this.full[this.mainDiagIdx] += modifier;
        if (this.d - 1 - row == col)
            this.full[this.antiDiagIdx] += modifier;
    }
    

    findTurn(f) {
        let bestValue = Math.max(...this.full);
        let rowIdxs = [];
        let colIdxs = [];
        let usingMain = this.full[this.mainDiagIdx] == bestValue;
        let usingAnti = this.full[this.antiDiagIdx] == bestValue;

        let allPossibleTurns = [];

        for (let i = 0; i < this.full.length; i++) {
            if (i < this.colIdx && this.full[i] == bestValue)
                rowIdxs.push(i);
            else if (this.full[i] == bestValue)
                colIdxs.push(i - this.colIdx);
        }

        for (let i of rowIdxs){
            for (let j = 0; j < this.d; j++){
                allPossibleTurns.push([i, j]);
            }
        }


        for (let i of colIdxs){
            for (let j = 0; j < this.d; j++){
                allPossibleTurns.push([j, i]);
            }
        }



        if (usingMain) {
            for (let i = 0; i < this.d; i++) {
                allPossibleTurns.push([i, i]);
            }
        }


        if (usingAnti) {
            for (let i = 0; i < this.d; i++) {
            allPossibleTurns.push([this.d - 1 - i, i]);
            }
        }


        let allEmptyPossibleTurns = [];



        for (let e of allPossibleTurns){
            let r = e[0];
            let c = e[1];
            if (f[r][c] == EMPTY){
                allEmptyPossibleTurns.push(e);
            }
        }

        let valuesCount = {};
        for (let i = 0; i < allEmptyPossibleTurns.length; i++) {
            if (allEmptyPossibleTurns[i] in valuesCount) {
                valuesCount[allEmptyPossibleTurns[i]] += 1;
            } else {
                valuesCount[allEmptyPossibleTurns[i]] = 1;
            }
        }

        let maxValue = Number.NEGATIVE_INFINITY;
        let maxKey;

        for (let i in valuesCount){
            if (valuesCount[i] > maxValue) {
                maxValue = valuesCount[i];
                maxKey = i;
            }
        }
        return [maxKey, bestValue];
    }
    
    isWinState(row, col) {
        if (Math.abs(this.full[this.rowIdx + row]) == this.d || 
        Math.abs(this.full[this.colIdx + col]) == this.d || 
        Math.abs(this.full[this.mainDiagIdx]) == this.d || 
        Math.abs(this.full[this.antiDiagIdx]) == this.d) {
            return true;
        }
        return false;
    }

    paintCells(field) {
        // don't use until sure winState == true
        let i = 0;
        let winCombo = 0
        while (Math.abs(this.full[i]) != this.d) {
            i+=1;
            winCombo = i;
        }

        console.log(winCombo);

        let winCells = [];
        for (let i = 0; i < this.d; i++) {
            if (winCombo < this.colIdx) {
                winCells.push([winCombo, i]);
            } else if (winCombo < this.mainDiagIdx) {
                winCells.push([i, winCombo - this.colIdx])
            } else if (winCombo == this.mainDiagIdx) {
                winCells.push([i, i]);
            } else {
                winCells.push([this.d - 1 - i, i]);
            }
        }

        for (let e of winCells) {
            let r = e[0];
            let c = e[1];
            renderSymbolInCell(field[r][c], r, c, 'red');
        }
    }
}


let field;
let xTurn;
let endState;
let turnCount;
let multiPlayerRules;
let dim;
let aiMatch = true; // <= not Random AI

let attack;
let defense;

startGame();
addResetListener();

function startGame () {
    dim = Number(prompt("Enter dimension", 3));
    field = [];
    for (let i = 0; i < dim; i++)
        field.push(new Array(dim).fill(EMPTY));

    xTurn = true;
    endState = false;
    turnCount = 0;
    multiPlayerRules = new Rule(dim);
    renderGrid(dim);

    if (aiMatch) {
        attack = new Rule(dim);
        defense = new Rule(dim);
    }
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

function cellClickHandler (row, col) {
    if (!endState && field[row][col] == EMPTY) {
        renderSymbolInCell(xTurn ? CROSS : ZERO, row, col);
        field[row][col] = xTurn ? CROSS : ZERO;
        turnCount += 1;
        multiPlayerRules.turnChanges(row, col, xTurn ? 1 : -1);

        endState = (multiPlayerRules.isWinState(row, col) || (turnCount == dim ** 2));

        if (endState) {
            if (multiPlayerRules.isWinState(row, col)) {
                alert(`${xTurn ? "X" : "O"} won!`);
                //paint here
                multiPlayerRules.paintCells(field);
            } else
                alert("DRAW!");
            return;
        }

        xTurn = !xTurn;
        if (aiMatch) {
            // get row and col
            attack.setValue(row, col, Number.NEGATIVE_INFINITY);
            defense.turnChanges(row, col, 1);

            let foundTurn = attack.findTurn(field);
            let fullAttack = foundTurn[0].split(',').map((x) => Number(x));
            let attackCoeff = foundTurn[1];
            let aiRowAttack = fullAttack[0];
            let aiColAttack = fullAttack[1];

            foundTurn = defense.findTurn(field)
            let fullDefense = foundTurn[0].split(',').map((x) => Number(x));
            let aiRowDefense = fullDefense[0];
            let aiColDefense = fullDefense[1];
            let defenseCoeff = foundTurn[1];

            let aiRowTurn = aiRowDefense;
            let aiColTurn = aiColDefense;

            if (defenseCoeff > attackCoeff){
                aiRowTurn = aiRowDefense;
                aiColTurn = aiColDefense;
            } else {
                aiRowTurn = aiRowAttack;
                aiColTurn = aiColAttack;
            }

            console.log(attackCoeff, defenseCoeff);

            

            attack.turnChanges(aiRowTurn, aiColTurn, 1);
            //attack.setValue(aiRowTurn, aiColTurn, Number.NEGATIVE_INFINITY);

            defense.setValue(aiRowTurn, aiColTurn, Number.NEGATIVE_INFINITY);
            
            renderSymbolInCell(xTurn ? CROSS : ZERO, aiRowTurn, aiColTurn);
            field[aiRowTurn][aiColTurn] = xTurn ? CROSS : ZERO;
            multiPlayerRules.turnChanges(aiRowTurn, aiColTurn, xTurn ? 1 : -1);

            turnCount += 1;

            endState = (multiPlayerRules.isWinState(aiRowTurn, aiColTurn) || (turnCount == dim ** 2));

            if (endState) {
                if (multiPlayerRules.isWinState(aiRowTurn, aiColTurn)) {
                    alert(`${xTurn ? "X" : "O"} won!`);
                    //paint here
                    multiPlayerRules.paintCells(field);
                }   else
                    alert("DRAW!");
                return;
            }

            xTurn = !xTurn;
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

function resetClickHandler () {
    console.log('reset!');
    startGame()
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
