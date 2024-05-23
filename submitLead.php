<?php
include("DBConnect.php");

$rawData = file_get_contents("php://input");

// Decode the JSON data
$data = json_decode($rawData, true);

// Check if data is received
if (is_null($data)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    exit;
}

$leadType = $data['leadType'];
$leadStatus = $data['leadStatus'];
$leadPhone = $data['leadPhone'];
$leadName = $data['leadName'];
$leadEmail = $data['leadEmail'];
$leadComment = $data['leadComment'];

// if (empty($leadType) || empty($leadStatus) || empty($leadPhone) || empty($leadName) || empty($leadEmail)) {
//     echo json_encode(['status' => 'error', 'message' => 'All fields except comment are required.']);
//     exit;
// }

$sql = "INSERT INTO `leads` (leadType, leadStatus, leadPhone, leadName, leadEmail, leadComment,m_id) 
        VALUES ('$leadType', '$leadStatus', '$leadPhone', '$leadName', '$leadEmail', '$leadComment',1)";

if (mysqli_query($link, $sql)) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => mysqli_error($link)]);
}

mysqli_close($link);
?>
