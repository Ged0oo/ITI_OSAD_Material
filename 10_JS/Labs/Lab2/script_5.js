function strictTwoParamFunction(...args) {
    if (arguments.length !== 2) {
        throw new Error("Expected 2 parameters");
    }
    return "Function executed with 2 parameters.";
}


function reverseParameters(...args) {
    return args.reverse();
}


function addNumericalValues(...values) {
    let sum = 0;
    let n = values.length;

    for (let i = 0; i < n; i++) {
        if (typeof values[i] !== "number") {
            throw new Error("All parameters must be numerical values only.");
        }
        sum += values[i];
    }

    return sum;
}



function getDayName(dateString) {
    const date = new Date(dateString);
    if(isNaN(date.getTime())) return "Invalid Date String";
    return date.toLocaleDateString('en-US', { weekday: 'long' });
}


// console.log(strictTwoParamFunction(10));
console.log(strictTwoParamFunction(10, 20));
// console.log(strictTwoParamFunction(10, 20, 30));

console.log(reverseParameters("A", "B", "C"));
console.log(reverseParameters(1, 2, 3, 4, 5, 6, 7, 8));

console.log(addNumericalValues(10, 20.5, 30, 5));

console.log(getDayName("2023-12-25"));
console.log(getDayName("01/04/2026"));
