const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const modesAI = {
    STUPID: 'STUPID',
    SMART: 'SMART',
};

const SETTING = {
    startDimension: 3,      // Начальный размер поля
    autoExpanding: true,    // Авторасшиерние
    enabledAI: true,        // ИИ
    modeAI: modesAI.SMART,  // Режим ИИ
}

// Служебные константы (исходя из условий задачи - "Победа = 3 одинаховых символа в ряд")
const situations = [
    [[0, -1], [0, 0], [0, 1]],  //   Horizontal
    [[-1, 0], [0, 0], [1, 0]],  //   Vertical
    [[-1, -1], [0, 0], [1, 1]],  //  \
    [[-1, 1], [0, 0], [1, -1]],  //  /
];
const combinations = [
    {
        value: ZERO + ZERO + EMPTY,
        rank: 1,
        nextMove: 2,
        otherCell: 0,
    },
    {
        value: ZERO + EMPTY + ZERO,
        rank: 1,
        nextMove: 1,
        otherCell: 0,
    },
    {
        value: EMPTY + ZERO + ZERO,
        rank: 1,
        nextMove: 0,
        otherCell: 1,
    },
    {
        value: CROSS + CROSS + EMPTY,
        rank: 2,
        nextMove: 2,
        otherCell: 0,
    },
    {
        value: CROSS + EMPTY + CROSS,
        rank: 2,
        nextMove: 1,
        otherCell: 0,
    },
    {
        value: EMPTY + CROSS + CROSS,
        rank: 2,
        nextMove: 0,
        otherCell: 1,
    },
    {
        value: CROSS + EMPTY + EMPTY,
        rank: 3,
        nextMove: 1,
        otherCell: 0,
    },
    {
        value: EMPTY + CROSS + EMPTY,
        rank: 3,
        nextMove: 0,
        otherCell: 1,
    },
    {
        value: EMPTY + EMPTY + CROSS,
        rank: 3,
        nextMove: 1,
        otherCell: 0,
    },
    {
        value: ZERO + EMPTY + CROSS,
        rank: 4,
        nextMove: 1,
        otherCell: 0,
    },
    {
        value: CROSS + EMPTY + ZERO,
        rank: 4,
        nextMove: 1,
        otherCell: 0,
    },
    {
        value: ZERO + EMPTY + EMPTY,
        rank: 5,
        nextMove: 1,
        otherCell: 0,
    },
    {
        value: EMPTY + ZERO + EMPTY,
        rank: 5,
        nextMove: 0,
        otherCell: 1,
    },
    {
        value: EMPTY + EMPTY + ZERO,
        rank: 5,
        nextMove: 1,
        otherCell: 0,
    },
    {
        value: CROSS + ZERO + EMPTY,
        rank: 6,
        nextMove: 2,
        otherCell: 0,
    },
    {
        value: EMPTY + ZERO + CROSS,
        rank: 6,
        nextMove: 0,
        otherCell: 1,
    },
    {
        value: EMPTY + CROSS + ZERO,
        rank: 7,
        nextMove: 0,
        otherCell: 1,
    },
    {
        value: ZERO + CROSS + EMPTY,
        rank: 7,
        nextMove: 2,
        otherCell: 0,
    },
    {
        value: EMPTY + EMPTY + EMPTY,
        rank: 8,
        nextMove: 1,
        otherCell: 0,
    },
];

// Игровые состояния
let dimension;
let field;
let isNextPlayer;
let freeCells;
let isFinish;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

// При авторасширении происходят незапланированные ходы, т.к. меняется поле.
// Корректно работает без ИИ и авторасширения.
// testWin()

// Бесполезный тест, если поле авторасширяемое.
// Корректно работает без ИИ и авторасширения.
// testDraw()

function startGame() {
    dimension = SETTING.startDimension;
    renderGrid(dimension);
    field = new Array(dimension);
    for (let row = 0; row < dimension; row++) {
        field[row] = new Array(dimension).fill(EMPTY);
    }
    isNextPlayer = CROSS;
    freeCells = field.length ** 2;
    isFinish = false;
}

function expandField() {
    dimension += 2;
    renderGrid(dimension);
    for (let row of field) {
        row.push(EMPTY);
        row.unshift(EMPTY);
    }
    field.push(Array(dimension).fill(EMPTY));
    field.unshift(Array(dimension).fill(EMPTY));
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            if (field[i][j] !== EMPTY) {
                renderSymbolInCell(field[i][j], i, j);
            }
        }
    }
    freeCells += 4 * dimension - 4;
}

function renderGrid(dimension) {
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

function cellClickHandler(row, col) {
    if (isFinish) return;
    if (field[row][col] === EMPTY) {
        renderSymbolInCell(isNextPlayer, row, col);
        field[row][col] = isNextPlayer;
        freeCells--;
        const winner = getWinner2(field);
        if (winner) {
            // Красит победную комбинацию в красный
            for (let cell of winner.situation) {
                renderSymbolInCell(field[cell[0]][cell[1]], cell[0], cell[1], '#f00');
            }
            // Так сообщеине появляется после отрисовки
            setTimeout(() => {
                alert('Победил ' + winner.player);
            }, 0);
            isFinish = true;
        } else if (freeCells <= 0) {
            setTimeout(() => {
                alert('Победила дружба');
            }, 0);
            isFinish = true;
        } else if (SETTING.autoExpanding && freeCells < dimension ** 2 / 2) {
            // Расширение поля
            expandField();
        }
        isNextPlayer = (isNextPlayer === CROSS) ? ZERO : CROSS;
    }
    if (SETTING.enabledAI && !isFinish && isNextPlayer === ZERO) {
        if (SETTING.modeAI === modesAI.STUPID) {
            stupidAI();
        } else if (SETTING.modeAI === modesAI.SMART) {
            smartAI();
        }
    }
}

function stupidAI() {
    let row;
    let col;
    while (true) {
        row = Math.floor(Math.random() * dimension);
        col = Math.floor(Math.random() * dimension);
        if (field[row][col] === EMPTY)
            break;
    }
    cellClickHandler(row, col);
}

function smartAI() {
    const [row, col] = getNextMove();
    cellClickHandler(row, col);
}

function getNextMove() {
    let bestMoves = [];
    let rank = 8;
    for (let row = 0; row < dimension; row++) {
        for (let col = 0; col < dimension; col++) {
            for (let situation of situations) {
                try {
                    const a = field[row + situation[0][0]][col + situation[0][1]];
                    const b = field[row + situation[1][0]][col + situation[1][1]];
                    const c = field[row + situation[2][0]][col + situation[2][1]];
                    const abc = a + b + c;
                    if (a && b && c) {
                        for (let combination of combinations) {
                            if (rank >= combination.rank && abc === combination.value) {
                                let move = {};
                                rank = (rank > combination.rank) ? combination.rank : rank;
                                move.rank = rank;
                                move.cell = [row + situation[combination.nextMove][0], col + situation[combination.nextMove][1]];
                                move.otherCell = [row + situation[combination.otherCell][0], col + situation[combination.otherCell][1]];
                                bestMoves.push(move);
                            }
                        }
                    }
                } catch (error) {
                }
            }
        }
    }
    bestMoves.sort((a, b) => {
        let res = a.rank - b.rank;
        if (res !== 0) {
            return res;
        } else {
            const aIsDiagonal = a.cell[0] !== a.otherCell[0] && a.cell[1] !== a.otherCell[1];
            const bIsDiagonal = b.cell[0] !== b.otherCell[0] && b.cell[1] !== b.otherCell[1];
            if (aIsDiagonal && bIsDiagonal || !aIsDiagonal && !bIsDiagonal) {
                return 0;
            } else if (aIsDiagonal) {
                return -1;
            } else if (bIsDiagonal) {
                return 1;
            }
        }
    });
    return bestMoves[0].cell;
}

// Проверка для полей любого поля
function getWinner2() {
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            for (let situation of situations) {
                try {
                    const a = field[i + situation[0][0]][j + situation[0][1]];
                    const b = field[i + situation[1][0]][j + situation[1][1]];
                    const c = field[i + situation[2][0]][j + situation[2][1]];
                    if (a !== EMPTY && a === b && a === c) {
                        return {
                            player: a,
                            situation: [
                                [i + situation[0][0], j + situation[0][1]],
                                [i + situation[1][0], j + situation[1][1]],
                                [i + situation[2][0], j + situation[2][1]]
                            ],
                        };
                    }
                } catch (error) {
                }
            }
        }
    }
    return null;
}

// Проверка для поля 3x3
function getWinner() {
    const situations = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];
    for (let situation of situations) {
        const a = field[situation[0][0]][situation[0][1]];
        const b = field[situation[1][0]][situation[1][1]];
        const c = field[situation[2][0]][situation[2][1]];
        if (a !== EMPTY && a === b && a === c) {
            return {
                player: a,
                situation: situation,
            };
        }
    }
    return null;
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    startGame()
}


/* Test Function */

/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
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
