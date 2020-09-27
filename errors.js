class InvalidGameFieldAddressError extends Error{
    constructor(message) {
        super(message);
    }
}

class CellNotEmptyError extends Error{
    constructor(message) {
        super(message);
    }
}

class GameFieldIsFullError extends Error{
    constructor(message) {
        super(message);
    }
}