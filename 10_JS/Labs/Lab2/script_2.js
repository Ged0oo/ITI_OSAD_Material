function pallendrome(input, s){
    if(s === 'n' || s === 'no') input = input.toLowerCase();
    let reversed = input.split("").reverse().join("");
    return input === reversed;}

let input = prompt("Enter a Word:");
let s = prompt("Case Sensitive ? ");
s = s.toLowerCase()

console.log(pallendrome(input, s));
