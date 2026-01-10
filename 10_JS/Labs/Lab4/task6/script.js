document.addEventListener("keydown", function(event) {
    var keyCode = event.keyCode;
    var message = "ASCII Code: " + keyCode;
    
    if (keyCode == 16) message += "\nShift detected";
    if (keyCode == 17) message += "\nCTRL detected";
    if (keyCode == 18) message += "\nAlt detected";

    alert(message);
});