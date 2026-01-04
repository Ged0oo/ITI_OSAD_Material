// Ask the user to enter a message then display it using the different
// html heading tags (from <h1> to <h6>) using Loops.
// DO NOT write the header element explicitly in your script!

var name = prompt("Enter your name:");
console.log(name);
for (let i = 1; i <= 6; i++) {
    document.write(`<h${i}>${name}</h${i}>`);
}
