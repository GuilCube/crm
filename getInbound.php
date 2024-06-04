<?php
header('Content-Type: application/json');

// Include the database connection file
include("DBConnect.php");

try {
/*SELECT inb.in_id,inb.sender,inb.in_comment,g.g_name,ii.g_quantity from inbound inb JOIN in_items ii on inb.in_id=ii.in_id JOIN goods g on g.g_id= ii.g_id ORDER BY ii.in_id=inb.in_id; */

    $sql = "SELECT inb.in_id,inb.sender,inb.in_comment,g.g_name,ii.g_quantity from inbound inb JOIN in_items ii on inb.in_id=ii.in_id JOIN goods g on g.g_id= ii.g_id ORDER BY ii.in_id=inb.in_id; ";
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
