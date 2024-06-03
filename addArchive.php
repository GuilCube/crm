<?php
header('Content-Type: application/json');

// Include the database connection file
include("DBConnect.php");

// Get the raw POST data
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Check if data is received
if (is_null($data)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    exit;
}

// Validate and update data
try {
    // Ensure data is an array and not empty
    if (!is_array($data) || empty($data)) {
        throw new Exception('No data provided or data is not in the correct format');
    }

    $link->begin_transaction();

    // Prepare the select statement to get the g_id
    $sqlSelect = "SELECT g_id FROM goods WHERE g_name = ? OR g_articul = ? LIMIT 1";
    $stmtSelect = $link->prepare($sqlSelect);

    if ($stmtSelect === false) {
        throw new Exception('SQL preparation for select statement failed: ' . $link->error);
    }

    // Prepare the update statement for the goods table to set archived to true
    $sqlUpdate = "UPDATE goods SET archived = TRUE WHERE g_id = ?";
    $stmtUpdate = $link->prepare($sqlUpdate);

    if ($stmtUpdate === false) {
        throw new Exception('SQL preparation for update statement failed: ' . $link->error);
    }

    foreach ($data as $item) {
        // Ensure at least one of the necessary fields is set and not empty
        if ((!isset($item['g_name']) || empty(trim($item['g_name']))) && (!isset($item['g_articul']) || empty(trim($item['g_articul'])))) {
            throw new Exception('Either g_name or g_articul must be provided and non-empty');
        }

        $g_name = isset($item['g_name']) ? trim($item['g_name']) : null;
        $g_articul = isset($item['g_articul']) ? trim($item['g_articul']) : null;

        // Select the g_id from the goods table
        $stmtSelect->bind_param('ss', $g_name, $g_articul);

        if (!$stmtSelect->execute()) {
            throw new Exception('Select execution failed: ' . $stmtSelect->error);
        }

        $result = $stmtSelect->get_result();
        if ($row = $result->fetch_assoc()) {
            $g_id = $row['g_id'];

            // Update the goods table to set archived to true
            $stmtUpdate->bind_param('i', $g_id);

            if (!$stmtUpdate->execute()) {
                throw new Exception('Update execution failed: ' . $stmtUpdate->error);
            }
        } else {
            throw new Exception('No matching record found to archive');
        }
    }

    $stmtSelect->close();
    $stmtUpdate->close();
    $link->commit();
    echo json_encode(['status' => 'success', 'message' => 'Data archived successfully']);
} catch (Exception $e) {
    $link->rollback();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

$link->close();
?>
