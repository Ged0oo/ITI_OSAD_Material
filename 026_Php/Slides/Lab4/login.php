<?php
session_start();
$err = "";

$conn = new mysqli("localhost", "root", "root", "php");
if ($conn->connect_error) {
    die("DB Connection failed");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $pass  = $_POST['password'] ?? '';

    if (!preg_match('/^[a-z0-9_]{8}$/', $pass)) {
        $err = "Password: 8 chars, lowercase/digits/_ only.";
    } else {
        $stmt = $conn->prepare("SELECT name, email, password, pic FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $res = $stmt->get_result();

        if($row = $res->fetch_assoc()){
            if(password_verify($pass, $row['password'])){
                $_SESSION['user'] = $row['name'];
                $_SESSION['picture'] = $row['pic'];
                header("Location: welcome.php");
                exit;
            } else {
                $err = "Invalid login credentials.";
            }
        } else {
            $err = "Invalid login credentials.";
        }
    }

    $stmt->close();
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