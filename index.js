const CROSS = 'X';
const ZERO = 'O';
const EMPTY = '';

const container = document.getElementById('fieldWrapper');
let gameBoard = [];
startGame();
addResetListener();
let clickCount = 0;

function initGameBoard(dimension){
    gameBoard = new Array();
  for(let i = 0; i < dimension; i++){
    gameBoard[i] = new Array(dimension);
    for(let j = 0; j < dimension; j++)
      gameBoard[i][j] = EMPTY;
    }
}

function startGame () {
    initGameBoard(Number(document.getElementById("fieldSizeValue").value));
    renderGrid(Number(document.getElementById("fieldSizeValue").value));
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

function checkWinner(){
  function checkHorizontalWinner(){
      let rowString = '';
    for (let i = 0; i < gameBoard.length; i++){
      rowString = gameBoard[i].join("");
      if(rowString === CROSS.repeat(gameBoard.length)){
        alert(`${CROSS} победил`)
          paintWinningFields(i, 1);
        return true;
        break
      }
      else if(rowString === ZERO.repeat(gameBoard.length)) {
        alert(`${ZERO} победил`)
          paintWinningFields(i, 1);
          return true;
        break;
    }
  }
}
  function checkVerticalWinner(index){
    let flatBoard = gameBoard.flat(2);
    let rowString ='';
    for(let i = index; i < flatBoard.length; i += gameBoard.length){
      if(flatBoard[i]===EMPTY)
        continue;
      rowString += flatBoard[i];
    }
    if( rowString===CROSS.repeat(gameBoard.length)){
            alert(`${CROSS} победил`)
            paintWinningFields(index, 0)
            return true
        }
        else if( rowString===ZERO.repeat(gameBoard.length)){
            alert(`${ZERO} победил`)
            paintWinningFields(index, 0)
            return true
        }
  }
  function checkDiagonalWinner(){
      let diagonalString = '';
      let diagonalString1 = '';
      for(let i = 0; i < gameBoard.length; i++){
          diagonalString += gameBoard[i][i];
          diagonalString1 += gameBoard[gameBoard.length - i - 1][i];
      }
      let diagonalCrossCondition = diagonalString === CROSS.repeat(gameBoard.length);
      let diagonalZeroCondition = diagonalString === ZERO.repeat(gameBoard.length);
      let diagonalCrossCondition1 = diagonalString1 === CROSS.repeat(gameBoard.length);
      let diagonalZeroCondition1 = diagonalString1 === ZERO.repeat(gameBoard.length);
      if(diagonalCrossCondition || diagonalCrossCondition1){
          diagonalCrossCondition ? paintWinningFields(0,2) : paintWinningFields(0);
          alert(`${CROSS} победил`);
          return true;
      }
      else if(diagonalZeroCondition || diagonalZeroCondition1){
          diagonalZeroCondition ? paintWinningFields(0,2) : paintWinningFields(0);
          alert(`${ZERO} победил`);
          return true;
      }
  }
  if(checkHorizontalWinner() || checkDiagonalWinner())
      return true;
  for(let i = 0; i < gameBoard.length; i++){
    if(checkVerticalWinner(i))
        return true;
      break;
  }
}
//winningType = 0 - vertical
//winningType = 1 - horizontal
//winningType = 2 - diagonal
//winningType = 3 - diagonal1
function paintWinningFields(index, winningType = 3) {
    if (winningType == 0) {
        for (let i = 0; i < gameBoard.length; i++) {
            findCell(i, index).style.color = 'red'
        }
        return
    } else if (winningType == 1) {
        for (let i = 0; i < gameBoard.length; i++) {
            findCell(index, i).style.color = 'red'
        }
    }
    else if (winningType == 2){
        for(let i = 0; i < gameBoard.length; i++)
            findCell(i, i).style.color = 'red'
    }
    else{
        for(let i = 0; i < gameBoard.length; i++)
            findCell(gameBoard.length - i - 1, i).style.color = 'red'
    }
}


function makeAImove(){
    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
    let randRow = getRandomInt(gameBoard.length);
    let randCol = getRandomInt(gameBoard.length);
    if(gameBoard[randRow][randCol] === EMPTY){
        gameBoard[randRow][randCol] = ZERO;
        renderSymbolInCell(ZERO, randRow, randCol);
        clickCount++;
        return;
    }
    else
        makeAImove();
}

function cellClickHandler (row, col) {
    if(!checkWinner()) {
        if (gameBoard[row][col] === EMPTY) {
            let fieldState = (clickCount % 2 === 0) ? CROSS : ZERO;
            gameBoard[row][col] = fieldState;
            renderSymbolInCell(fieldState, row, col);
            clickCount++;
            if(!checkWinner() && clickCount != gameBoard.length ** 2){
                makeAImove();
            }
        }
        if (clickCount === gameBoard.length ** 2 && !checkWinner()) {
            alert("Победила дружба!");
        }
    }
    console.log(gameBoard);
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
    startGame();
    clickCount = 0;
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
