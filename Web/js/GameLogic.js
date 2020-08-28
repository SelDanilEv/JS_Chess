"use strict"

let controller = new Controller(new Model(), new View());

$(document).ready(function () {
    console.log("ready!");
    controller.SetBoard(9);
});


function ChangeBoardSize() {
    controller.ClearAllFields();
    let size = $("#BorderSize").val();
    controller.SetBoard(size);
    $("#BoardSizeValue").text(size);
}


