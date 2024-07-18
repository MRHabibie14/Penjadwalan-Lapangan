<?php
session_start();
include 'db.php';

$username = $_POST['username'];
$password = hash('sha256', $_POST['password']);

$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $_SESSION['username'] = $row['username'];
    $_SESSION['role'] = $row['role'];
    echo json_encode(['success' => true, 'role' => $row['role']]);
} else {
    echo json_encode(['success' => false]);
}
?>
