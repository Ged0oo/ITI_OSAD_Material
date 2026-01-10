function addData() {
    document.querySelectorAll('.error').forEach(e => e.innerText = "");

    var isValid = true;
    var name = document.getElementById('name').value.trim();
    var age = document.getElementById('age').value.trim();
    var email = document.getElementById('email').value.trim();

    if (!name.match(/^[a-zA-Z\s]+$/)) {
        document.getElementById('nameErr').innerText = "Field is required";
        isValid = false;
    }

    if (!age || age <= 0) {
        document.getElementById('ageErr').innerText = "Enter valid age";
        isValid = false;
    }
    
    if (!email.match(/^\S+@\S+\.\S+$/)) {
        document.getElementById('emailErr').innerText = "Not a valid e-mail address";
        isValid = false;
    }

    if (isValid) {
        var table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow();
        newRow.innerHTML = `<td>${name}</td><td>${age}</td><td>${email}</td>`;
        resetFields();
    }
}

function resetFields() {
    document.getElementById('name').value = "";
    document.getElementById('age').value = "";
    document.getElementById('email').value = "";
    document.querySelectorAll('.error').forEach(e => e.innerText = "");
}

function clearTable() {
    resetFields();
    var tableBody = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = "";
}