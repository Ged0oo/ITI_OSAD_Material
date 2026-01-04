var r = Number(prompt("Enter Circle Radius:"));

var area = Math.PI * Math.pow(r, 2);
var prem = 2 * Math.PI * r;

document.write(`
    <h3>Area:</h3>
    <h1>${area}</h1>
    <hr>
    <h3>Perimeter:</h3>
    <h1>${prem}</h1>
`);
