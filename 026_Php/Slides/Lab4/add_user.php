<?php
$errors = [];
$conn = new mysqli("localhost", "root", "root", "php");
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
        $stmt = $conn->prepare("INSERT INTO users (name, email, password, room, ext, pic) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $name, $email, $hashedPass, $room, $ext, $pic);
        $stmt->execute();
        $stmt->close();
        echo "<h3>New User saved.</h3> <a href='login.php'>Go to Login</a>";
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