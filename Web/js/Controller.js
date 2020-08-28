'use strict'

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

    SetBoard(numb){
        this.view.SetBoard(numb);
    }

    SetClassic() {
        this.view.SetBoard(8);
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