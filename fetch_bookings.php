<?php
// Koneksi ke database
$conn = new mysqli('localhost', 'root', '', 'futsal_booking');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query untuk mendapatkan data booking
$sql = "SELECT id, name, date, time, created_at, phone, status FROM bookings";
$result = $conn->query($sql);

$booking = array();
if ($result->num_rows > 0) {
    // Output data dari setiap row
    while($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }
}

$conn->close();

// Mengembalikan data dalam format JSON
header('Content-Type: application/json');
echo json_encode($bookings);
?>
