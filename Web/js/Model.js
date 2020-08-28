'use strict'

 class Model {
    constructor() {
    }

    Pieces = [];

    GetPieceByCoordinates(coordinates) {
        return this.Pieces.find(x => x.coordinates === coordinates);
    }

    AddPiece(Piece) {
        let pieceIndex = this.Pieces.findIndex(x => x.coordinates === Piece.coordinates);
        if (pieceIndex === -1) {
            this.Pieces.push(Piece);
        } else {
            this.Pieces[pieceIndex] = Piece;
        }
    };

    MovePiece(coordinatesFrom, coordinatesTo) {
        this.ClearField(coordinatesTo);
        let pieceIndex = this.Pieces.findIndex(x => x.coordinates === coordinatesFrom);
        if (pieceIndex !== -1)
            this.Pieces[pieceIndex].Move(coordinatesTo);
    }

    ClearField(coordinates) {
        let pieceIndex = this.Pieces.findIndex(x => x.coordinates === coordinates);
        if (pieceIndex !== -1)
            this.Pieces.splice(pieceIndex, 1);
    }
}

 class Piece {
    constructor(color, type, coordinates) {
        this.color = color;
        this.type = type;
        this.coordinates = coordinates;
    }

    Move(coordinates) {
        this.coordinates = coordinates;
    }
}