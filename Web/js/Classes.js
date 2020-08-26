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

class View {
    constructor() {
        this.turn = "white";
    }

    ShowMessage(str) {
        let messageBox = $("#game__message");
        messageBox.text(str);
        setTimeout(() => messageBox.text(""), 2000)
    }

    DefinePreviewImage(color, kind) {
        $("#AddMenu__PreviewImage").attr('src', 'img/pieces/' + color + kind + '.png');
    }

    ClearField(coordinates) {
        $(coordinates).text("");
    }

    SetPiece(CellID, KindOfPiece, ColorOfPiece) {
        let image = document.createElement("IMG");
        image.src = 'img/pieces/' + ColorOfPiece + KindOfPiece + '.png';
        image.style.height = image.style.width = "100%";
        this.ClearField(CellID);
        $(CellID).append(image);
    }

    ChangeTurn() {
        $(".turn").css("border", "solid 1px black")
        switch (this.turn) {
            case "white":
                this.turn = "black"
                break;
            case "black":
                this.turn = "white"
                break;
        }
        $(".turn__" + this.turn).css("border", "solid 5px green")
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        if (this.model instanceof Model && this.view instanceof View) {
            console.log("Good binding model and view");
        }
    }

    CheckCoordinates(coordinates) {
        return !!$(coordinates).length;
    }

    get coordinatesForSetOrClear() {
        let coordinates = '#' + $("#Coordinates").val().toLowerCase();
        if (this.CheckCoordinates(coordinates))
            return coordinates;
    }

    get coordinatesForMoveFrom() {
        let coordinates = '#' + $("#CoordinatesFrom").val().toLowerCase();
        if (this.CheckCoordinates(coordinates))
            return coordinates;
    }

    get coordinatesForMoveTo() {
        let coordinates = '#' + $("#CoordinatesTo").val().toLowerCase();
        if (this.CheckCoordinates(coordinates))
            return coordinates;
    }

    get colorForReview() {
        return this.DefineColorOfPiece($("#pieceColor").val());
    }

    get kindForReview() {
        return $("#pieceKind").val();
    }

    DefineColorOfPiece(color) {
        switch (color) {
            case "black":
            case "b":
                return 'b';
            case "white":
            case "w":
                return 'w';
        }
    }

    ShowMessage(str) {
        this.view.ShowMessage(str);
    }

    CreatePreviewImage() {
        this.view.DefinePreviewImage(this.colorForReview, this.kindForReview);
    }

    SetPiece() {
        let color = this.colorForReview;
        let kind = this.kindForReview;
        let coordinates = this.coordinatesForSetOrClear;
        if (coordinates) {
            this.AddPiece(color, kind, coordinates);
        } else {
            this.ShowMessage("Out of range");
        }
    }

    AddPiece(color, kind, coordinates) {
        this.model.AddPiece(new Piece(color, kind, coordinates));
        this.view.SetPiece(coordinates, kind, color);
    }

    MovePiece() {
        let coordinatesFrom = this.coordinatesForMoveFrom;
        let coordinatesTo = this.coordinatesForMoveTo;

        if (!coordinatesFrom || !coordinatesTo) {
            this.ShowMessage("Out of range");
            return;
        }

        let piece = this.model.GetPieceByCoordinates(coordinatesFrom);

        if (!piece) {
            this.ShowMessage("There is no piece");
            return;
        }

        if (piece.color !== this.DefineColorOfPiece(this.view.turn)) {
            this.ShowMessage("It is not your piece");
            return;
        }

        this.model.MovePiece(coordinatesFrom, coordinatesTo);
        this.view.ClearField(coordinatesFrom);
        this.view.SetPiece(piece.coordinates, piece.type, piece.color);
        this.view.ChangeTurn();
    }

    ClearField() {
        let coordinates = this.coordinatesForSetOrClear;
        if (coordinates) {
            this.model.ClearField(coordinates);
            this.view.ClearField(coordinates);
        } else {
            this.ShowMessage("Out of range");
        }
    }

    SetClassic() {
        this.ClearAllFields();
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

        this.AddPiece('b', 'k', '#e8');
        this.AddPiece('b', 'q', '#d8');
        this.AddPiece('w', 'q', '#d1');
        this.AddPiece('w', 'k', '#e1');

        this.AddPiece('b', 'b', '#c8');
        this.AddPiece('b', 'b', '#f8');
        this.AddPiece('w', 'b', '#c1');
        this.AddPiece('w', 'b', '#f1');

        this.AddPiece('b', 'n', '#b8');
        this.AddPiece('b', 'n', '#g8');
        this.AddPiece('w', 'n', '#b1');
        this.AddPiece('w', 'n', '#g1');

        this.AddPiece('b', 'r', '#a8');
        this.AddPiece('b', 'r', '#h8');
        this.AddPiece('w', 'r', '#a1');
        this.AddPiece('w', 'r', '#h1');

        for (let i = 0; i < letters.length; i++) {
            this.AddPiece('b', 'p', '#' + letters[i] + '7');
        }

        for (let i = 0; i < letters.length; i++) {
            this.AddPiece('w', 'p', '#' + letters[i] + '2');
        }
    }

    ClearAllFields() {
        for (let i = 0; i < this.model.Pieces.length; i++) {
            this.view.ClearField(this.model.Pieces[i].coordinates);
        }
        this.model.Pieces = [];
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