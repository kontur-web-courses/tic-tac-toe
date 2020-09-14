class GameField{
    constructor(rows = 3, cols = 3){
        console.log(`in constructor`);
        this.field = [];
        
        console.log(`before cycle`);
        for(let i = 0 ; i < cols; i++){
            let tempRowsArray = [];
            for(let j =0 ; j < rows; j++){
                tempRowsArray.push(EMPTY);   
            }
            this.field.push(tempRowsArray);
        }
        console.log(`after cycle`);
    }

    makeNextMove(row, col){
        let cross = this.markCount(CROSS);
        let zero = this.markCount(ZERO);
        console.log(`crosses: ${cross} Zeros: ${zero}`);
        if(cross > zero){
            this.field[row][col] = ZERO;
            return ZERO;
        }
        this.field[row][col] = CROSS;
        return CROSS;
    }

    markCount(mark){
        let count =0;
        for(let i = 0 ; i < this.field.length; i++)
            for(let j = 0 ; j < this.field[0].length; j++)
                if(this.field[i][j] === mark)
                    count++;
        return count;
    }

    isCellEmpty(row, col) {
        return this.field[row][col] === EMPTY;
    }

    isGameEnd() {
        return this.isSomeoneWin() || this.isDraw();
    }

    isDraw() {
        for(let i = 0 ; i < this.field.length; i++)
            for(let j = 0 ; j < this.field[0].length; j++)
                if (this.field[i][j] === EMPTY)
                    return false;
        return true;
    }
    
    fillWinnerInRed() {
        let winner = this.isSomeoneWin();
        if(!winner) return;
        for(const cell of winner){
            renderSymbolInCell(cell.mark, cell.i, cell.j, "red");
        }
    }

    isSomeoneWin() {
        let MainDiagArr = [];
        let SecDiagArr = [];

        for (let i = 0; i < this.field.length; i++) {
            let rowArr = [];
            let colArr = [];
            
            for (let j = 0; j < this.field[0].length; j++) {
                rowArr.push({mark:this.field[i][j], i,j});
                colArr.push({mark:this.field[j][i], i:j,j:i});
            }
            
            let rowTempValue = rowArr[0];
            let colTempValue = colArr[0];
            
            if (rowTempValue.mark !== EMPTY && rowArr.every(elem => elem.mark === rowTempValue.mark))
                return rowArr;

            if (colTempValue.mark !== EMPTY && colArr.every(elem => elem.mark === colTempValue.mark))
                return colArr;
            
            MainDiagArr.push({mark: this.field[i][i], i:i, j:i});
            SecDiagArr.push({mark: this.field[this.field.length - i - 1][i], i:this.field.length - i - 1, j:i});
        }

        if (MainDiagArr[0].mark !== EMPTY && MainDiagArr.every(elem => elem.mark === MainDiagArr[0].mark))
            return MainDiagArr;
        if (SecDiagArr[0].mark !== EMPTY && SecDiagArr.every(elem => elem.mark === SecDiagArr[0].mark))
            return SecDiagArr;

        return false;
    }
}

const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let variousDimm = prompt("Введи размерность поля", 3)

const globalDimm = !Number.isNaN(Number(variousDimm)) && Number(variousDimm) > 2? Number(variousDimm) : 3;
const container = document.getElementById('fieldWrapper');

let globalField;

startGame(globalDimm);
addResetListener();

function startGame (dimension) {
    renderGrid(dimension);
    globalField = new GameField(dimension, dimension);
    console.log(`field: ${globalField.field}`);
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
    console.log(`isDraw: ${globalField.isDraw()}, isWin: ${globalField.isSomeoneWin()}`);
    if(!globalField.isCellEmpty(row, col) || globalField.isDraw() || globalField.isSomeoneWin())
        return;
    let moveMark = globalField.makeNextMove(row, col);
    console.log(moveMark);
    renderSymbolInCell(moveMark, row, col);

    console.log(`Clicked on cell: ${row}, ${col}`);

    if(globalField.isSomeoneWin()){
        alert(`Наш победитель ${globalField.isSomeoneWin()[0].mark}`);
        globalField.fillWinnerInRed();
        return;
    }
    if(globalField.isDraw()){
        alert("Победила дружба!");
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
    startGame (globalDimm);
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
