// On contact page prompt user to enter his name, make sure that name is string, 
// and let the user enter his birth year and make sure that it is a number, 
// and it is less than 2010, and then calculate his age. 
// For each prompt if user input valid show him next prompt, 
// if not valid show him the same prompt again until user enters it correctly (use loops). 
// And after validating user input, write all user input on the page in that format:
// Name: ahmed
// Birth year: 1981
// Age: 3


let currentYear = 2025;

let name;
while (true) {
    name = prompt("Enter your Name:");
    if (name === null) {
        alert("Try Again");
        continue;
    }

    if (name.length > 0 && isNaN(name)) break;
    else alert("Please enter a valid name");
}

let birthYear;
while (true) {
    let input = prompt("Enter your Birth Year (before 2010): ");
    if (input === null) {
        alert("Try Again");
        continue;
    }

    birthYear = Number(input);
    if (!isNaN(birthYear) && birthYear < 2010) break;
    else alert("Please enter a valid birth year less than 2010!");
}

if (name && birthYear) {
    let age = currentYear - birthYear;
    document.write(`<h2>Name: ${name}</h2>`);
    document.write(`<h2>Birth Year: ${birthYear}</h2>`);
    document.write(`<h2>Age: ${age}</h2>`);
}
