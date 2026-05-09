<?php
require_once __DIR__ . '/Database.php';
$db = new Database();
$conn = $db->connect("localhost", "root", "root", "php");
$users = $db->select('users');
?>
<h2>All Users</h2>
<table border="1" cellpadding="6">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Room</th>
        <th>Ext</th>
        <th>Picture</th>
        <th>Actions</th>
    </tr>
    <?php foreach ($users as $u): ?>
    <tr>
        <td><?= $u['id'] ?></td>
        <td><?= $u['name'] ?></td>
        <td><?= $u['email'] ?></td>
        <td><?= $u['room']?></td>
        <td><?= $u['ext']?></td>
        <td><?php if (!empty($u['pic'])): ?><img src="<?= $u['pic'] ?>" width="80"><?php endif; ?></td>
        <td>
            <a href="edit_user.php?id=<?= urlencode($u['id']) ?>">Edit</a>
            &nbsp;|&nbsp;
            <a href="delete_user.php?id=<?= urlencode($u['id']) ?>" onclick="return confirm('Delete this user?')">Delete</a>
        </td>
    </tr>
    <?php endforeach; ?>
</table>
<br>
<a href="add_user.php">Add New User</a>

<?php $conn->close(); ?>
