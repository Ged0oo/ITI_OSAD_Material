<?php
session_start();
if (empty($_SESSION['user'])) {
    header("Location: login.php");
    exit;
}
$user = $_SESSION['user'];
$pic  = $_SESSION['picture'] ?? '';
?>
<!doctype html>
<html>
<head><title>Welcome</title></head>
<body style="font-family:Arial; text-align:center; padding:40px;">

<h1>Welcome, <?= $user ?>!</h1>

<?php if ($pic && file_exists($pic)): ?>
    <img src="<?= $pic ?>" width="200" style="border-radius:10px; border:1px solid #ccc;">
<?php else: ?>
    <p><i>No profile picture found.</i></p>
<?php endif; ?>

<br><br>
<a href="logout.php">Logout</a>

</body>
</html>
