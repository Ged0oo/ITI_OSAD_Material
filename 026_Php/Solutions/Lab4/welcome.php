<?php
session_start();

if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit;
}
?>

<h1>Welcome <?= $_SESSION['user'] ?></h1>

<img src="<?= $_SESSION['picture'] ?>" width="150">

<br><br>
<a href="logout.php">Logout</a>