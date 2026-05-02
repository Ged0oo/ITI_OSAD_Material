<?php
session_start();
$err = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $pass  = $_POST['password'] ?? '';

    if (!preg_match('/^[a-z0-9_]{8}$/', $pass)) {
        $err = "Password: 8 chars, lowercase/digits/_ only.";
    } elseif (file_exists("users.txt")) {
        foreach (file("users.txt") as $line) {
            $cols = explode("|", trim($line));
            if ($cols[1] === $email && $cols[2] === $pass) {
                $_SESSION['user'] = $cols[0];
                $_SESSION['picture'] = $cols[5];
                header("Location: welcome.php");
                exit;
            }
        }
        $err = "Invalid login.";
    } else {
        $err = "No users yet.";
    }
}
?>
<form method="post">
    <h1>Cafeteria</h1>
    <p style="color:red"><?= $err ?></p>
    Email:    <input name="email"><br><br>
    Password: <input type="password" name="password"><br><br>
    <button>Login</button>
</form>