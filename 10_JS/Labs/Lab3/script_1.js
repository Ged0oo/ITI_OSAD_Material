let nums = [];

for (let i = 0; i < 5; i++) {
    let val = Number(prompt(`Enter value ${i + 1}:`));
    nums.push(val);
}

document.write(`
    <h3>You Have Entered:</h3>
    <h1>${nums.join(" , ")}</h1>
    <hr>
`);

nums.sort(function(a, b) {
    return b - a;
});

document.write(`
    <h3>The Sorted Version (Descending):</h3>
    <h1>${nums.join(" , ")}</h1>
    <hr>
`);

nums.reverse();

document.write(`
    <h3>Reverse Sorting (Ascending):</h3>
    <h1>${nums.join(" , ")}</h1>
    <hr>
`);
