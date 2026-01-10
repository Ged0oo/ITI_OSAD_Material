var input = document.getElementById("onlynums");

input.addEventListener("keypress", function(event) {
    var code = event.keyCode;
    if (code < 48 || code > 57) {
        event.preventDefault();
        console.log("Only numbers are allowed!");
    }
});