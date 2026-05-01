<?php
$errors = [];

if (empty(trim($_POST['first_name'] ?? ''))) {
    $errors[] = "First name is required.";
} elseif (!preg_match("/^[a-zA-Z ]+$/", $_POST['first_name'])) {
    $errors[] = "First name must contain only letters.";
}

if (empty(trim($_POST['last_name'] ?? ''))) {
    $errors[] = "Last name is required.";
} elseif (!preg_match("/^[a-zA-Z ]+$/", $_POST['last_name'])) {
    $errors[] = "Last name must contain only letters.";
}

if (empty(trim($_POST['email'] ?? ''))) {
    $errors[] = "Email is required.";
} elseif (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email format.";
}

if (empty($_POST['gender'])) {
    $errors[] = "Gender is required.";
} elseif (!in_array($_POST['gender'], ['male', 'female'])) {
    $errors[] = "Invalid gender value.";
}

if (!empty($errors)) {
    echo "<h3 style='color:red;'>Validation Errors:</h3><ul>";
    foreach ($errors as $err) {
        echo "<li style='color:red;'>$err</li>";
    }
    echo "</ul>";
    echo "</br>";
    echo '<a href="index.html">⬅ Go back to form</a>';
    exit;
}

$first_name = trim($_POST['first_name'] ?? '');
$last_name  = trim($_POST['last_name'] ?? '');
$email      = trim($_POST['email'] ?? '');
$gender     = $_POST['gender'] ?? '';
$address    = trim($_POST['address'] ?? '');
$country    = $_POST['country'] ?? '';
$skills     = isset($_POST['skills']) ? implode(",", $_POST['skills']) : '';
$department = trim($_POST['department'] ?? '');
$record = "$first_name|$last_name|$email|$gender|$address|$country|$skills|$department" . PHP_EOL;
file_put_contents("customer.txt", $record, FILE_APPEND);

echo "Thanks " . ($gender == 'male' ? 'Mr.' : 'Ms.') . " $first_name $last_name<br>";
echo "Please review your information:<br>";
echo "Name: $first_name $last_name<br>";
echo "Email: $email<br>";
echo "Address: $address<br>";
echo "Country: $country<br>";
echo "Your Skills: $skills<br>";
echo "Department: $department<br><br>";
echo '<a href="records.php"> View All Records</a> | ';
echo '<a href="index.html"> Add Another</a>';
?>