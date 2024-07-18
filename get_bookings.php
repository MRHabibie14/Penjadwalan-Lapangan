<?php
// Koneksi ke database
$conn = new mysqli('localhost', 'root', '', 'futsal_booking');
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

$sql = "SELECT * FROM bookings ORDER BY date, time";
$result = $conn->query($sql);

$bookings = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }
}

echo json_encode($bookings);

$conn->close();
?>
