<?php
header('Content-Type: application/json');

// Include the database connection file
include("DBConnect.php");

// Fetch data from the goods table
$sql = "SELECT (
SELECT COUNT(*) AS 'number of records'
FROM orders)/
(SELECT COUNT(*) AS 'number of records'
FROM leads l)*100 as 'result';";

$result = $link->query($sql);
$ratio =$result->fetch_assoc();
if ($result) {  
    echo json_encode(['status' => 'success', 'data' => $ratio]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch data']);
}

$link->close();
?>