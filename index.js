const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let player = 0;
let dim;
let field;
let win = false;
const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    dim = Number(prompt("Введите длину поля: ", 3));
    field = [];
    for (let i = 0; i < dim; i++) {
        field[i] = [];
        for (let j = 0; j < dim; j++) {
            field[i][j] = '-';
        }
   }
    renderGrid(dim);
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
    // Пиши код тут
    let winner = checkWinner();
    if(winner != "-")
    {
        player = 0;
        alert("Победитель: " + winner);
    }
    if(field[row][col] == '-' && winner == "-")
    {
        if(player%2==0)
        {
            renderSymbolInCell(CROSS, row, col);
            field[row][col] = 1;
        }
        else
        {
            renderSymbolInCell(ZERO, row, col);
            field[row][col] = 4;
        }
        player++;
        if(isOver(field))
            alert("Победила дружба");
    }
    if(player %2 != 0)
        getRandom();
    console.log(`Clicked on cell: ${row}, ${col}`);
}



function checkWinner()
{
    let sum =  0;
    for (let i = 0; i < field.length; i++) 
    { 
        for(let j = 0; j < field.length; j++) 
        {
            sum+= field[j][i];
        }

        if(sum == field.length)
        {
            for(let j = 0; j < field.length; j++) 
            {
                makeRed(j, i, CROSS);
            }
          
            return CROSS;
        }
        else
            if (sum == field.length*4) 
                { 
                    for(let j = 0; j < field.length; j++) 
                    {
                        makeRed(j, i, ZERO);
                    }
                    return ZERO;
                }
        sum =  0
    }
        
     for (let i = 0; i < field.length; i++) 
    {  
        sum = 0;
        for(let j = 0; j < field.length; j++) 
        {
            sum+= field[i][j];
        }

        if(sum == field.length)
        {
            for(let j = 0; j < field.length; j++) 
            {
                makeRed(i, j, CROSS);
            }
            return CROSS;
        }
        else
            if (sum == field.length*4) 
                { 
                    for(let j = 0; j < field.length; j++) 
                    {
                        makeRed(i, j, ZERO);
                    }
                    return ZERO;
                }
    }
    
    sum = 0;
    for(let j = 0; j < field.length; j++) 
    {
        sum+= field[j][j];
    }

       if (sum == field.length) 
        {
            for(let j = 0; j < field.length; j++) 
            {
                makeRed(j, j, CROSS);
            }
            return CROSS;
        }
        else
            if (sum == field.length*4) 
            {
                for(let j = 0; j < field.length; j++) 
                {
                    makeRed(j, j, ZERO);
                }
                return ZERO;
            }   
              
    sum = 0;
    for(let i = 0; i < field.length; i++) 
        sum+=field[i][field.length-i-1];
    
    if(sum == field.length)
    {
        for(let i = 0; i < field.length; i++) 
            makeRed(i, field.length-i-1, CROSS); 
        return CROSS;
    }

        else
        if(sum == field.length*4) 
            {
                for(let i = 0; i < field.length; i++) 
                    makeRed(i, field.length-i-1, ZERO); 
                return ZERO;
            } 
        return "-";
}

function makeRed(x, y, value)
{
    renderSymbolInCell(value, x, y, "#FF0000");

}

function isOver(arr)
{
    const sum = arr => arr.reduce((res, el) => res + (Array.isArray(el) ? sum(el) : el), 0);
    if(sum(arr)>8)
        return true;
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
    for(let i=0; i<field.length; i++)
        for(let j=0; j<field.length; j++)
            {
                renderSymbolInCell(EMPTY, i, j);
                field[i][j] = "-";
            }
    console.log('reset!');
}
 
//вывод случайного числа
function getRandom()
{    
    let x = Math.floor(Math.random() * field.length);
    let y = Math.floor(Math.random() * field.length);
    cellClickHandler (x, y);
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