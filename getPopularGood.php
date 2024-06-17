<?php
header('Content-Type: application/json');

// Include the database connection file
include("DBConnect.php");

// Fetch data from the goods table
$sql = "SELECT g.g_name, sum(oi.g_quantity) as 'total_ordered' from order_items oi
join goods g on g.g_id=oi.g_id
GROUP By g.g_name
ORDER by 'total_ordered' asc
limit 1;";
$result = $link->query($sql);
$good =$result->fetch_assoc();
if ($result) {  
    echo json_encode(['status' => 'success', 'data' => $good]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch data']);
}

$link->close();
?>