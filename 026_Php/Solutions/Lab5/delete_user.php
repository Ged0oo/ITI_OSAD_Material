<?php
require_once __DIR__ . '/Database.php';
$db = new Database();
$conn = $db->connect("localhost", "root", "root", "php");

$id = $_GET['id'] ?? null;
if ($id) {
    $db->delete('users', (int)$id);
}
header('Location: users.php');
exit;
