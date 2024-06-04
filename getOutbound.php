<?php
header('Content-Type: application/json');

// Include the database connection file
include("DBConnect.php");

try {
/*SELECT inb.out_id,inb.out_adress,inb.out_comment,g.g_name,ii.g_quantity 
from outbound inb 
JOIN out_items ii on inb.out_id=ii.out_id 
JOIN goods g on g.g_id= ii.g_id 
ORDER BY ii.out_id=inb.out_id; */

    $sql = "SELECT inb.out_id,inb.out_adress,inb.out_comment,g.g_name,ii.g_quantity 
    from outbound inb 
    JOIN out_items ii on inb.out_id=ii.out_id 
    JOIN goods g on g.g_id= ii.g_id 
    ORDER BY ii.out_id=inb.out_id;";
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
