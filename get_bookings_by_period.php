<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $period = $_POST['period'];
    $periodValue = json_decode($_POST['period_value'], true);

    // Koneksi ke database
    $conn = new mysqli('localhost', 'root', '', 'futsal_booking');
    if ($conn->connect_error) {
        die("Koneksi gagal: " . $conn->connect_error);
    }

    $query = "";
    if ($period == 'monthly') {
        $query = "SELECT * FROM bookings WHERE MONTH(date) = ? AND YEAR(date) = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ii", $periodValue['month'], $periodValue['year']);
    } else if ($period == 'yearly') {
        $query = "SELECT * FROM bookings WHERE YEAR(date) = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $periodValue['year']);
    }

    $stmt->execute();
    $result = $stmt->get_result();
    $bookings = [];
    while ($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }

    echo json_encode($bookings);

    $stmt->close();
    $conn->close();
}
?>
