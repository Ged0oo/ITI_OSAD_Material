<?php
session_start();
$err = "";

require_once __DIR__ . '/Database.php';

$db = new Database();
$conn = $db->connect("localhost", "root", "root", "php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $pass  = $_POST['password'] ?? '';

    if (!preg_match('/^[a-z0-9_]{8}$/', $pass)) {
        $err = "Password: 8 chars, lowercase/digits/_ only.";
    } else {
        $users = $db->select('users');
        $found = null;
        foreach ($users as $row) {
            if (($row['email'] ?? '') === $email) {
                $found = $row;
                break;
            }
        }

        if ($found) {
            if (password_verify($pass, $found['password'])) {
                $_SESSION['user'] = $found['name'];
                $_SESSION['picture'] = $found['pic'];
                header("Location: welcome.php");
                exit;
            } else {
                $err = "Invalid login credentials, try again.";
            }
        } else {
            $err = "Invalid login credentials, try again.";
        }
    }

}

$conn->close();

?>
<form method="post">
    <h1>Cafeteria</h1>
    <p style="color:red"><?= $err ?></p>
    Email:    <input name="email"><br><br>
    Password: <input type="password" name="password"><br><br>
    <button>Login</button>
</form>