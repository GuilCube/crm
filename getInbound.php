<?php
header('Content-Type: application/json');

// Include the database connection file
include("DBConnect.php");

try {
    $sql = "SELECT in_id, sender, g_name, g_quantity, in_comment FROM inbound";
    $result = $link->query($sql);

    if (!$result) {
        throw new Exception('Query failed: ' . $link->error);
    }

    $inboundData = [];
    while ($row = $result->fetch_assoc()) {
        $inboundData[] = $row;
    }

    echo json_encode(['status' => 'success', 'data' => $inboundData]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

$link->close();
?>
