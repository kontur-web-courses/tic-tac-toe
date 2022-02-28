const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let FIELD_SIZE = 3;
let emptyCount = 0;
let isCrossesTurn = true;
let isGameEnded = false;
const RED = '#EF342D';
let emptyCells = new Set();

let points = new Map(
	[[CROSS, -1],
	 [EMPTY, 0],
	 [ZERO, 1]]);

let players = new Map()
	.set(-1, CROSS)
	.set(1, ZERO)
	.set(0, EMPTY);

startGame();
addResetListener();
let field = initField(FIELD_SIZE);

function initField(size){	
	let field = [];
	for (let i = 0; i < size; i++){
		let row = [];
		for (let j = 0; j < size; j++) {
			// emptyCells.add((i, j));
			console.log(emptyCells.size);
			row.push(EMPTY);
			renderSymbolInCell(EMPTY, i, j);
		}

		field.push(row);
	}
	
	emptyCount = size ** 2;
	return field;
}

function startGame () {
    renderGrid(FIELD_SIZE);
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
	if (field[row][col] !== EMPTY || isGameEnded) return;
	
    console.log(`Clicked on cell: ${row}, ${col}`);
	field[row][col] = isCrossesTurn ? CROSS : ZERO;
	isCrossesTurn = !isCrossesTurn;
	renderSymbolInCell(field[row][col], row, col);
	emptyCells.delete((row, col));
	console.log(emptyCells.size);
	
	let winner = checkWinner();
	if (winner !== 0) {
		let winnersSymbol = players.get(winner);
		alert(winnersSymbol);
		isGameEnded = true;
	}
	
	if (--emptyCount === 0) {
		alert('Победила дружба!');
		isGameEnded = true;
	}
	
	// let turn = getSmartAITurn();
	// console.log(`Clicked on cell: ${turn[0]}, ${turn[1]}`);
	// field[turn[0]][turn[1]] = isCrossesTurn ? CROSS : ZERO;
	// isCrossesTurn = !isCrossesTurn;
	// renderSymbolInCell(field[turn[0]][turn[1]], turn[0], turn[1]);
	// emptyCells.delete(turn);

	// winner = checkWinner();
	// if (winner !== 0) {
		// let winnersSymbol = players.get(winner);
		// alert(winnersSymbol);
		// isGameEnded = true;
	// }
	
	// if (emptyCells.size === 0) {
		// alert('Победила дружба!');
		// isGameEnded = true;
	// }
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
	
	const setSizeButton = document.getElementById('setSize');
    setSizeButton.addEventListener('click', setSize);
}

function resetClickHandler () {
    console.log('reset!');
	
	field = initField(FIELD_SIZE);
	isGameEnded = false;
	isCrossesTurn = true;
}

function setSize () {
    const number = parseInt(document.getElementById('number').value);

	FIELD_SIZE = number;
	startGame(FIELD_SIZE);
	field = initField(FIELD_SIZE);
}

function checkWinner(){
	let sum = 0;
	
	for (let i = 0; i < FIELD_SIZE; i++){
		sum = 0;
		for (let j = 0; j < FIELD_SIZE; j++)
			sum += points.get(field[i][j]);
		
		if (Math.abs(sum) === FIELD_SIZE){
			for (let j = 0; j < FIELD_SIZE; j++){
				renderSymbolInCell(field[i][j], i, j, RED);
			}
			return Math.sign(sum);
		}
	}
	
	for (let i = 0; i < FIELD_SIZE; i++){
		sum = 0;
		for (let j = 0; j < FIELD_SIZE; j++)
			sum += points.get(field[j][i]);
		
		if (Math.abs(sum) === FIELD_SIZE){
			for (let j = 0; j < FIELD_SIZE; j++){
				renderSymbolInCell(field[j][i], j, i, RED);
			}
			return Math.sign(sum);
		}
	}
	
	sum = 0;

	for (let i = 0; i < FIELD_SIZE; i++){
		sum += points.get(field[i][i]);
	}
	
	if (Math.abs(sum) === FIELD_SIZE){
		for (let j = 0; j < FIELD_SIZE; j++){
			renderSymbolInCell(field[j][j], j, j, RED);
		}
		return Math.sign(sum);
	}
	
	sum = 0;
	for (let i = 0; i < FIELD_SIZE; i++){
		sum += points.get(field[i][FIELD_SIZE - i - 1]);
	}
	
	if (Math.abs(sum) === FIELD_SIZE){
		for (let j = 0; j < FIELD_SIZE; j++){
			renderSymbolInCell(field[j][FIELD_SIZE - j - 1], j, FIELD_SIZE - j - 1, RED);
		}
		
		return Math.sign(sum);
	}
	
	return 0;
}

function getSmartAITurn(){
	return [...emptyCells][Math.floor(Math.random() * emptyCells.size)];
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
