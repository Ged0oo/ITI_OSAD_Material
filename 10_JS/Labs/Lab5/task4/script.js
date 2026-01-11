let a = 10;
let b = 20;

document.getElementById("before").innerText = `Before swap: a = ${a}, b = ${b}`;

[a, b] = [b, a];

document.getElementById("after").innerText = `After swap: a = ${a}, b = ${b}`;
