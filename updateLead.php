<?php
// Set the content type to application/json
header('Content-Type: application/json');

// Get the raw POST data
$rawData = file_get_contents("php://input");

// Decode the JSON data
$data = json_decode($rawData, true);

// Check if data is received
if (is_null($data)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    exit;
}

// Extract data
$idLead = $data['idLead'];
$leadType = $data['leadType'];
$leadStatus = $data['leadStatus'];
$leadPhone = $data['leadPhone'];
$leadName = $data['leadName'];
$leadEmail = $data['leadEmail'];
$leadComment = $data['leadComment'];

// Example: Print the received data (for debugging purposes)
error_log("Received data: " . print_r($data, true));

include("DBconnect.php");

// Prepare the SQL statement
$sql = "UPDATE leads SET leadType=?, leadStatus=?, leadPhone=?, leadName=?, leadEmail=?, leadComment=? WHERE idLead=?";
$stmt = $link->prepare($sql);

if ($stmt === false) {
    echo json_encode(['status' => 'error', 'message' => 'SQL preparation failed: ' . $link->error]);
    exit;
}

// Bind the parameters
$stmt->bind_param("ssssssi", $leadType, $leadStatus, $leadPhone, $leadName, $leadEmail, $leadComment, $idLead);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Data updated successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Data update failed: ' . $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$link->close();
?>
