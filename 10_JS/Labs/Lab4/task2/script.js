
var input = document.getElementById("Answer");

function EnterNumber(num) {
    input.value += num;
}

function EnterOperator(op) {
    input.value += op;
}

function EnterClear() {
    input.value = "";
}

function EnterEqual() {
    try {
        input.value = eval(input.value);
    } catch (error) {
        input.value = "Error";
    }
}