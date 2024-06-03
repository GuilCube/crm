<?php
header('Content-Type: application/json');

// Include the database connection file
include("DBConnect.php");

// Fetch data from the goods table
$sql = "SELECT * FROM goods Where archived =0";
$result = $link->query($sql);

if ($result) {
    $goods = array();
    while ($row = $result->fetch_assoc()) {
        $goods[] = $row;
    }
    
    echo json_encode(['status' => 'success', 'data' => $goods]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch data']);
}

$link->close();
?>
