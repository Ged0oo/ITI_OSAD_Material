function getName() {
    while (true) {
        let input = prompt("Enter User Name:");
        if (isNaN(input) && input.length > 3 && input.length < 10) return input;
        alert("Name must be 4–9 letters");
    }
}

function getAge() {
    while (true) {
        let input = prompt("Enter User Age:");
        if (!isNaN(input) && input > 10 && input < 60) return Number(input);
        alert("Age must be between 10 and 60");
    }
}

let users = [];
let n = Number(prompt("Enter Number of users:"));

for (let i = 0; i < n; i++) {
    let name = getName();
    let age = getAge();
    users.push({ name, age });
}

let rows = "";
for (let user of users) {
    rows += `
        <tr>
            <td>${user.name}</td>
            <td>${user.age}</td>
        </tr>
    `;
}

document.write(`
    <h2>Users List</h2>
    <table border="1" cellpadding="8">
        <tr>
            <th>Name</th>
            <th>Age</th>
        </tr>
        ${rows}
    </table>
`);
