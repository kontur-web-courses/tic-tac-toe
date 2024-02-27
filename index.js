const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let free_index = [];
let pole = [];
let k = 0;
let stop = false;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';
    for (let i = 0; i < dimension; i++) {
        pole[i] = [];
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            pole[i][j] = EMPTY;
            free_index.push([i, j]);
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function getRandomInt(min, max) {
    console.log(`random`);
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (!stop) {
        if (findCell(row, col).textContent === ZERO) {
            return;
        }
        if (findCell(row, col).textContent === EMPTY){
            pole[row][col] = CROSS;
            free_index.filter(number => (number[0] !== row || number[1] !== col));
            renderSymbolInCell(CROSS, row, col);
            k += 1;
            console.log(`update1`);
        }
    }

    let b = checkWinner();
    if (!stop && b[0]) {
        stop = true;
        for (let i = 0; i < b[1].length; i++) {
            renderSymbolInCell(b[0], b[1][i][0], b[1][i][1], '#FF0000');
        }
        alert('Победил ' + b[0])
    }

    if (!stop && k === pole[0].length * pole[0].length) {
        stop = true;
        alert('Победила дружба!')
    }


    if (!stop) {
        let p = true;
        while (p) {
            let m = getRandomInt(0, free_index.length - 1);
            let i = free_index[m][0];
            let j = free_index[m][1];
            console.log(free_index[m][0]);
            console.log(free_index[m][1]);
            if (pole[i][j] === EMPTY) {
                console.log(`1`);
                p = false;
                pole[i][j] = ZERO;
                free_index.filter(number => (number[0] !== i || number[1] !== j));
                renderSymbolInCell(ZERO, i, j, '#333');
            }
        }
        console.log(`update2`);
        k += 1;
    }

    b = checkWinner();
    if (!stop && b[0]) {
        stop = true;
        for (let i = 0; i < b[1].length; i++) {
            renderSymbolInCell(b[0], b[1][i][0], b[1][i][1], '#FF0000');
        }
        alert('Победил ' + b[0])
    }

    if (!stop && k === pole[0].length * pole[0].length) {
        stop = true;
        alert('Победила дружба!')
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
    free_index = []
    stop = false;
    k = 0;
    for (let i = 0; i < pole[0].length; i++) {
        for (let j = 0; j < pole[0].length; j++) {
            pole[i][j] = EMPTY;
            free_index.push([i, j]);
            findCell(i, j).textContent = EMPTY;
        }
    }
    console.log('reset!');
}

function checkWinner () {
    console.log('cheackwinner!');
    let win = [];
    let l = 0;
    let a = '';
    console.log('1');
    for (let i = 0; i < pole[0].length; i++) {
        a = pole[i][0];
        for (let j = 0; j < pole[0].length; j++) {
            if (a === EMPTY) {
                break;
            }
            if (pole[i][j] === a) {
                win.push([i, j])
                l += 1;
            }
        }
        if (l === pole[0].length) {
            return [pole[i][0], win];
        }
        l = 0;
        win = [];
    }

    console.log('2');
    win = [];
    a = '';
    l = 0;
    for (let i = 0; i < pole[0].length; i++) {
        a = pole[0][i];
        for (let j = 0; j < pole[0].length; j++) {
            if (a === EMPTY) {
                break;
            }
            if (pole[j][i] === a) {
                win.push([j, i])
                l += 1;
            }
        }
        if (l === pole[0].length) {
            return [pole[0][i], win];
        }
        l = 0;
        win = [];
    }

    console.log('3');
    win = [];
    l = 0;
    a = pole[0][0];
    for (let i = 0; i < pole[0].length; i++) {
        if (a === EMPTY) {
            break;
        }
        if (pole[i][i] === a) {
            win.push([i, i])
            l += 1;
        }
        if (l === pole[0].length) {
            return [pole[0][0], win];
        }
    }

    console.log('4');
    win = [];
    l = 0;
    a = pole[0][pole[0].length - 1];
    for (let i = 0; i < pole[0].length; i++) {
        if (a === EMPTY) {
            break;
        }
        if (pole[i][pole[0].length - 1 - i] === a) {
            win.push([i, pole[0].length - 1 - i])
            l += 1;
        }
        if (l === pole[0].length) {
            return [pole[0][pole[0].length - 1], win];
        }
    }

    return [0, 0];
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
