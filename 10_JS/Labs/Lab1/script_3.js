// Write a script that takes from the user n values and returns their sum, 
// stop receiving values from user when he enters 0 or sum exceeds 100, 
// check that the entered data is numeric 
// and inform the user with the total sum of the entered values.


let sum = 0;

while (true) {
    let input = prompt("Enter a number (0 to stop):");
    
    if (input === null) break;

    let num = Number(input);

    if (isNaN(num)) {
        continue;
    }

    if (num === 0) break;

    sum += num;

    if (sum > 100) break;
}

console.log(`Total Sum: ${sum}`);
alert(`Total Sum: ${sum}`);
