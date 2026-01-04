function  A() {
    var y;
    console.log(y);
}

function  B() {
    try {
        console.log(y);
    } catch (e) {
        console.log(e.message);
    }
}

function  C() {
    var x = 10;
    var y = 20;
    console.log(y * x - 2);
}

function  D() {
    var y;
    console.log(typeof y);
}

function  E() {
    var x = "1";
    var y = 2;
    console.log(x + y);
}

function  F() {
    var x = 1;
    var y = true;
    console.log(x + y);
}

A(); // undefined
B(); // ReferenceError: y is not defined
C(); // 198
D(); // undefined
E(); // 12
F(); // 2
