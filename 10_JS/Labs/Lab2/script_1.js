function getName() {
    while (true) {
        let input = prompt("Enter Your Name:");
        if (isNaN(input)) return input;
    }
}

function getPhone() {
    while (true) {
        let input = prompt("Enter Your Phone Number (8 digits):");
        if (!isNaN(input) && input.length === 8) {
            return input;
        }
    }
}

function getMobile() {
    while (true) {
        let input = prompt("Enter Your Mobile Number (11 digits):");
        if (!isNaN(input) && input.length === 11 &&
            (input.startsWith("010") ||
             input.startsWith("011") ||
             input.startsWith("012") ||
             input.startsWith("015"))
        ) return input;
    }
}

function getEmail() {
    let reg = /^[a-zA-Z0-9-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    while (true) {
        let input = prompt("Enter Your Email Address:");
        if (reg.test(input)) return input;
    }
}

var name = getName();
var phone = getPhone();
var mobile = getMobile();
var email = getEmail();


document.write(`
    <h3>Name:</h3>
    <h1>${name}</h1>

    <h3>Mobile Phone:</h3>
    <h1>${mobile}</h1>

    <h3>Phone Number:</h3>
    <h1>${phone}</h1>

    <h3>Email:</h3>
    <h1>${email}</h1>
`);
