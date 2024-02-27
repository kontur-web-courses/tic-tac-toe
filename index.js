const PLAYER1 = 'X';
const PLAYER2 = 'O';
const EMPTY = ' ';

let counter = 0;
let winner = null;
let player = PLAYER1
let field = [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY];


const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
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
    if (winner === null) {
        let cellCymbol = field[row * 3+ col];

        if (cellCymbol === EMPTY && (winner === null || counter == 0)){
            let newCymbol = (player === PLAYER1) ? PLAYER1 : PLAYER2;
            field[row * 3+ col] = player;
            player = (player === PLAYER1) ? PLAYER2 : PLAYER1;
            counter++;
            renderSymbolInCell(newCymbol, row, col)
        }
        //printFieldAlert()
        winner = checkWinner();

        if (winner !== null){
            if (winner === PLAYER1){
                comb = findWinnerCombination()
                alert(comb)
                renderSymbolInCell (field[comb[0]], Math.trunc(comb[0] / 3), comb[0] % 3, '#990000');
                renderSymbolInCell (field[comb[1]], Math.trunc(comb[1] / 3), comb[1] % 3, '#990000');
                renderSymbolInCell (field[comb[2]], Math.trunc(comb[2] / 3), comb[2] % 3, '#990000');
                alert ("Победил Player 1", comb);
            }     
            else if (winner === PLAYER2){
                comb = findWinnerCombination()
                renderSymbolInCell (field[comb[0]], Math.trunc(comb[0] / 3), comb[0] % 3, '#990000');
                renderSymbolInCell (field[comb[1]], Math.trunc(comb[1] / 3), comb[1] % 3, '#990000');
                renderSymbolInCell (field[comb[2]], Math.trunc(comb[2] / 3), comb[2] % 3, '#990000');
                alert ("Победил Player 2", comb);
        }
        }
        else if (checkDraw()){
            alert ("Победила дружба");
        }
        
        console.log(`Clicked on cell: ${row}, ${col}`);
    }
    


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */


    
}

function checkDraw () {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (field[i * 3 + j] === EMPTY) {
                return false;
            }
        }
    }
    return true;
}

function printFieldAlert() {
    res = '';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (field[i * 3 + j] === EMPTY) {
                res += '_';
            } else {
                res += field[i * 3 + j];
            }
        }
            
    }
    alert(res);
}   

function findWinnerCombination () {
    let combs = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < 8; i++) {
		if (
			field[combs[i][0]] === field[combs[i][1]] &&
			field[combs[i][1]] === field[combs[i][2]] &&
			field[combs[i][0]] != EMPTY
		) {
			return combs[i];
		}
	}
	
	return [];
}


function checkWinner () {
    if ((field[0] === field[1] && field[1] === field[2] && field[0] === PLAYER1)|| 
        (field[3] === field[4] && field[4] === field[5] && field[3] === PLAYER1) || 
        (field[6] === field[7] && field[7] === field[8] && field[6] === PLAYER1) ||
        (field[0] === field[3] && field[3] === field[6] && field[0] === PLAYER1) ||
        (field[1] === field[4] && field[4] === field[7] && field[1] === PLAYER1) ||
        (field[2] === field[5] && field[5] === field[8] && field[2] === PLAYER1) ||
        (field[0] === field[4] && field[4] === field[8] && field[0] === PLAYER1) ||
        (field[2] === field[4] && field[4] === field[6] && field[6] === PLAYER1)) {
            return PLAYER1
        }
   else if ((field[0] === field[1] && field[1] === field[2] && field[0] === PLAYER2)|| 
   (field[3] === field[4] && field[4] === field[5] && field[3] === PLAYER2) || 
   (field[6] === field[7] && field[7] === field[8] && field[6] === PLAYER2) ||
   (field[0] === field[3] && field[3] === field[6] && field[0] === PLAYER2) ||
   (field[1] === field[4] && field[4] === field[7] && field[1] === PLAYER2) ||
   (field[2] === field[5] && field[5] === field[8] && field[2] === PLAYER2) ||
   (field[0] === field[4] && field[4] === field[8] && field[0] === PLAYER2) ||
   (field[2] === field[4] && field[4] === field[6] && field[6] === PLAYER2)) {
            return PLAYER2
        }
    else return null
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
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            field[i * 3 + j] = EMPTY;
            renderSymbolInCell(EMPTY, i, j)
    
            }
        }
    winner = null
    console.log('reset!');
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
