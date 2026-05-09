<?php
$errors = [];
require_once __DIR__ . '/Database.php';

$db = new Database();
$conn = $db->connect("localhost", "root", "root", "php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name  = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $pass  = $_POST['password'] ?? '';
    $room  = $_POST['room'] ?? '';
    $ext   = $_POST['ext'] ?? '';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email.";
    if (!preg_match('/^\S+@\S+\.\S+$/', $email)) $errors[] = "Invalid email.";
    if (!in_array($room, ['Application1','Application2','Cloud'])) $errors[] = "Pick a room.";

    $tmp = $_FILES['picture']['tmp_name'] ?? '';
    if (!$tmp) {
        $errors[] = "not a valid photo.";
    }

    if (!$errors) {
        $pic = "uploads/" . basename($_FILES['picture']['name']);
        move_uploaded_file($tmp, $pic);
        $hashedPass = password_hash($pass, PASSWORD_DEFAULT);
        $db->insert('users', [ 'name' => $name, 'email' => $email, 'password' => $hashedPass, 'room' => $room, 'ext' => $ext, 'pic' => $pic,]);
        header('Location: users.php');
        exit;
    }
}
?>
<form method="post" enctype="multipart/form-data">
    <h2>Add User</h2>
    <?php foreach ($errors as $e) echo "<p style='color:red'>$e</p>"; ?>

    Name: <input name="name" required><br><br>
    Email: <input name="email" required><br><br>
    Password: <input type="password" name="password" required><br><br>

    Room No:
    <select name="room">
        <option>Application1</option>
        <option>Application2</option>
        <option>Cloud</option>
    </select><br><br>

    Ext:      <input name="ext"><br><br>
    Picture:  <input type="file" name="picture" accept="image/*" required><br><br>

    <button>Save</button>
    <button type="reset">Reset</button>
</form>