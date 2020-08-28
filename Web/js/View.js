'use strict'

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
            case "green":
                this.turn = "white"
                break;
        }
        $(".turn__" + this.turn).css("border", "solid 5px green")
    }

    SetBoard(numb){
        $('.game__board:first').html(this.Generate(numb));
    }

    Generate(numb) {
        let code = "";
        let letters = 'abcdefghi'.split('').splice(0,numb).reverse();
        code += '<table class="game__chess-board"><tbody>\n';
        for (let i = numb; i > 0; i--) {
            code += '<tr>\n';
            for (let j = numb; j > 0; j--) {
                if (j === numb) {
                    code += '<th>' + i + '</th>\n';
                }
                code += '<td id="' + letters[j-1] + i + '"></td>\n';
            }
            code += '</tr>\n';
        }
        code += '<tr>\n<th></th>\n';
        for (let i = numb; i > 0; i--) {
            code += '<th>' + letters[i-1] + '</th>\n';
        }
        code += '</tr></tbody></table>';
        return code;
    }
}
