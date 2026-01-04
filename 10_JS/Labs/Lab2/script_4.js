let nums = [];

for (let i = 0; i < 3; i++) {
    let val = Number(prompt(`Enter value ${i + 1}:`));
    nums.push(val);
}

document.write(`
    <h3>Summation:</h3>
    <h1>${nums[0] + nums[1] + nums[2]}</h1>
    <hr>
    <h3>Multiplication:</h3>
    <h1>${nums[0] * nums[1] * nums[2]}</h1>
    <hr>
    <h3>Division:</h3>
    <h1>${nums[0] / nums[1] / nums[2]}</h1>
`);
