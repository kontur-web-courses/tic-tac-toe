class Game {
    constructor(width, height) {
        this.cells = [];
        this.isOver = false;
        this.winnerCells = []
        this.moveCount = 0;
        if (width > 0 && height > 0) {
            this.width = width;
            this.height = height;

        } else throw Error("Неправильно заданы размеры поля");
        for (let i = 0; i < this.height; i++) {
            const row = [];
            for (let j = 0; j < this.width; j++) {
                row.push(new Cell())
            }
            this.cells.push(row);
        }
    }

    isGameFieldFull() {
        return this.moveCount === this.width * this.height;
    }

    clickCell(row, column, symbol) {
        const cell = this.cells[row][column];
        if (!cell) throw new InvalidGameFieldAddressError(`Клетки с адресом x=${column} y=${row} не существует`);
        if (cell.symbol !== SYMBOL.EMPTY) throw new CellNotEmptyError();
        cell.symbol = symbol;
        this.moveCount++;
        if (this.isGameFieldFull()) throw new GameFieldIsFullError();
        this.winnerCells = this.tryToGetWinningCells() || [];
        console.log(this.winnerCells)
        console.log(this.cells)
        this.isOver = this.winnerCells.length !== 0;
    }

    getWinnerChain(startPont, endPoint) {
        const cells = []
        if (startPont.x === endPoint.x){
            const cycleSymbol = this.cells[startPont.y][startPont.x].symbol;
            if (cycleSymbol === SYMBOL.EMPTY) return
            for (let y = startPont.y ; y <= endPoint.y; y++){
                if (this.cells[y][startPont.x].symbol !== cycleSymbol) return
                cells.push(new Point(startPont.x, y))
            }
            return cells;
        }
        if (startPont.y === endPoint.y){
            const cycleSymbol = this.cells[startPont.y][startPont.x].symbol;
            if (cycleSymbol === SYMBOL.EMPTY) return
            for (let x = startPont.x ; x <= endPoint.x; x++){
                if (this.cells[startPont.y][x].symbol !== cycleSymbol) return
                cells.push(new Point(x, startPont.y))
            }
            return cells;
        }
        if (startPont.x === 0 && endPoint.x === this.width -1  && startPont.y === 0 && endPoint.y === this.height - 1){
            const cycleSymbol = this.cells[startPont.y][startPont.x].symbol;
            if (cycleSymbol === SYMBOL.EMPTY) return
            for (let x = 0, y = 0; x <= endPoint.x && y <= endPoint.y; x++, y++){
                if (this.cells[y][x].symbol !== cycleSymbol) return
                cells.push(new Point(x,y))
            }
            return cells;
        }
        if (startPont.x === 0 && endPoint.x === this.width -1  && startPont.y === this.height - 1 && endPoint.y === 0){
            const cycleSymbol = this.cells[startPont.y][startPont.x].symbol;
            if (cycleSymbol === SYMBOL.EMPTY) return
            for (let x = startPont.x, y = startPont.y; x <= endPoint.x && y > endPoint.y; x++, y--){
                if (this.cells[y][x].symbol !== cycleSymbol) return
                cells.push(new Point(x,y))
            }
            return cells;
        }

    }

    tryToGetWinningCells() {
        let chain = this.getWinnerChain(new Point(0, 0), new Point(this.width -1, this.height - 1))
        if (chain) return chain;
        chain = this.getWinnerChain(new Point(0, this.height - 1), new Point(this.width -1, 0));
        if (chain) return chain;
        for (let i = 0; i <= this.width - 1; i++) {
            chain = this.getWinnerChain(new Point(0, i), new Point(this.width -1, i));
            if (chain) return chain;
        }
        for (let i = 0; i <= this.height - 1; i++) {
            chain = this.getWinnerChain(new Point(i, 0), new Point(i, this.height - 1));
            if (chain) {
                return chain
            }
        }
    }


}

class Cell {
    constructor() {
        this.symbol = SYMBOL.EMPTY;
    }

}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}