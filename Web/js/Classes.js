'use strict'

class Model {
    constructor() {
    }

    Pieces = [];

    AddPiece(Piece) {
        this.Pieces.push(Piece);
    };

    MovePiece(coordinatesFrom, coordinatesTo) {
        this.ClearField(coordinatesTo);
        let pieceIndex = this.Pieces.findIndex(x => x.coordinates == coordinatesFrom);
        this.Pieces[pieceIndex].coordinates = coordinatesTo;
    }

    ClearField(coordinates) {
        let pieceIndex = this.Pieces.findIndex(x => x.coordinates == coordinates);
        if (pieceIndex != -1)
            this.Pieces.splice(pieceIndex, 1);
    }

    Render() {
        this.Pieces.forEach((x) => {

        });
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

    CreatePreviewImage(){
        this.view.DefinePreviewImage();
    }

    SetField() {

    }

    MovePiece(){
        
    }

    ClearField(){

    }


}

class View {
    constructor() {
    }

    DefinePreviewImage() {
        let color = $("#pieceColor").val();
        let kind = $("#pieceKind").val();
        $("#AddMenu__PreviewImage").attr('src', 'img/pieces/' + this.DefineColorOfPiece(color) + kind + '.png');
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

    SetFigure() {
        let color = $("#pieceColor").val();
        let kind = $("#pieceKind").val();
        let coordinates = $("#Coordinates").val();
        coordinates = '#' + coordinates;

        if ($(coordinates).length) {
            this.AddFigure(coordinates, kind, color);
        } else {
            $("#game__message").text("Out of range");
            setTimeout(() => $("#game__message").text(""), 2000)
        }
    }

    ClearField() {
        let coordinates = $("#Coordinates").val();
        coordinates = '#' + coordinates;

        if ($(coordinates).length) {
            this.RemoveFigure(coordinates);
        } else {
            $("#game__message").text("Out of range");
            setTimeout(() => $("#game__message").text(""), 2000)
        }
    }

    AddFigure(CellID, KindOfPiece, ColorOfPiece) {
        let image = document.createElement("IMG");
        image.src = 'img/pieces/' + this.DefineColorOfPiece(ColorOfPiece) + KindOfPiece + '.png';
        image.style.height = image.style.width = "100%";
        this.RemoveFigure(CellID);
        $(CellID).append(image);
    }

    RemoveFigure(CellID) {
        let img = $(CellID).text("");
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