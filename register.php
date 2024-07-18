<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $password = $_POST['password'];
    $role = 'user'; // Set default role as 'user'

    if (empty($username) || empty($email) || empty($phone) || empty($password)) {
        header("Location: index.html?error=All fields are required!");
        exit();
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $conn = new mysqli('localhost', 'root', '', 'futsal_booking');
    if ($conn->connect_error) {
        header("Location: index.html?error=Connection failed: " . $conn->connect_error);
        exit();
    }

    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    if (!$stmt) {
        header("Location: index.html?error=Prepare failed: " . $conn->error);
        exit();
    }
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        echo "Username or email already taken!";
        $stmt->close();
        $conn->close();
        exit();
    } else {
        echo "Username and email are available<br>";
    }
    $stmt->close();

    $stmt = $conn->prepare("INSERT INTO users (username, email, phone, password, role) VALUES (?, ?, ?, ?, ?)");
    if (!$stmt) {
        header("Location: index.html?error=Prepare failed: " . $conn->error);
        exit();
    }
    $stmt->bind_param("sssss", $username, $email, $phone, $hashed_password, $role);

    if ($stmt->execute()) {
        echo "Registration successful!";
        exit();
    } else {
        header("Location: index.html?error=Error: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();
}
?>
