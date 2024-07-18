<?php
// Koneksi ke database
$conn = new mysqli('localhost', 'root', '', 'futsal_booking');
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

$sql = "SELECT * FROM contacts ORDER BY created_at DESC";
$result = $conn->query($sql);

$contacts = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $contacts[] = $row;
    }
}

echo json_encode($contacts);

$conn->close();
?>
