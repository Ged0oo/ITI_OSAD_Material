<?php
require_once __DIR__ . '/Database.php';
$db = new Database();
$conn = $db->connect("localhost", "root", "root", "php");

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = (int)($_POST['id'] ?? 0);
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $room = $_POST['room'] ?? '';
    $ext = $_POST['ext'] ?? '';
    $db->update('users', $id, ['name' => $name, 'email' => $email, 'room' => $room, 'ext' => $ext,]);
    header('Location: users.php');
    exit;
}

$user = $db->selectWhere('users', 'id', $id);
if (!$user) {
    echo "User not found.";
    exit;
}
?>
<form method="post">
    <h2>Edit User</h2>
    <input type="hidden" name="id" value="<?= htmlspecialchars($user['id']) ?>">
    Name: <input name="name" value="<?= htmlspecialchars($user['name']) ?>"><br><br>
    Email: <input name="email" value="<?= htmlspecialchars($user['email']) ?>"><br><br>
    Room: <select name="room">
        <option<?= $user['room'] === 'Application1' ? ' selected' : '' ?>>Application1</option>
        <option<?= $user['room'] === 'Application2' ? ' selected' : '' ?>>Application2</option>
        <option<?= $user['room'] === 'Cloud' ? ' selected' : '' ?>>Cloud</option>
    </select><br><br>
    Ext: <input name="ext" value="<?= htmlspecialchars($user['ext']) ?>"><br><br>
    <button>Save</button>
</form>

<a href="users.php">Back to users</a>

<?php $conn->close(); ?>
