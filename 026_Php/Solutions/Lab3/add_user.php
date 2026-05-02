<?php
$errors = [];

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
        $record = "$name|$email|$pass|$room|$ext|$pic".PHP_EOL;
        file_put_contents("users.txt", $record, FILE_APPEND);
        echo "<h3>New User saved.</h3> <a href='login.php'>Go to Login</a>";
        exit;
    }
}
?>
<form method="post" enctype="multipart/form-data">
    <h2>Add User</h2>
    <?php foreach ($errors as $e) echo "<p style='color:red'>$e</p>"; ?>

    Name:     <input name="name" required><br><br>
    Email:    <input name="email" required><br><br>
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