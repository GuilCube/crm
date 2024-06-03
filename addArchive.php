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

// Validate and insert data
try {
    // Ensure data is an array and not empty
    if (!is_array($data) || empty($data)) {
        throw new Exception('No data provided or data is not in the correct format');
    }

    $link->begin_transaction();

    // Prepare the insert statement for the archive table
    $sqlInsert = "INSERT INTO archived_goods (g_id, g_name, g_articul) VALUES (?, ?, ?)";
    $stmtInsert = $link->prepare($sqlInsert);

    if ($stmtInsert === false) {
        throw new Exception('SQL preparation for archived_goods table failed: ' . $link->error);
    }

    // Prepare the select statement to get the g_id
    $sqlSelect = "SELECT g_id FROM goods WHERE g_name = ? AND g_articul = ? LIMIT 1";
    $stmtSelect = $link->prepare($sqlSelect);

    if ($stmtSelect === false) {
        throw new Exception('SQL preparation for select statement failed: ' . $link->error);
    }

    // Prepare the delete statement for the goods table
    $sqlDelete = "DELETE FROM goods WHERE g_name = ? AND g_articul = ?";
    $stmtDelete = $link->prepare($sqlDelete);

    if ($stmtDelete === false) {
        throw new Exception('SQL preparation for goods table failed: ' . $link->error);
    }

    foreach ($data as $item) {
        // Ensure the necessary fields are set and not empty
        if (!isset($item['g_name']) || !isset($item['g_articul']) || empty(trim($item['g_name'])) || empty(trim($item['g_articul']))) {
            throw new Exception('Missing required fields or fields are empty');
        }

        $g_name = trim($item['g_name']);
        $g_articul = trim($item['g_articul']);

        // Select the g_id from the goods table
        $stmtSelect->bind_param('ss', $g_name, $g_articul);

        if (!$stmtSelect->execute()) {
            throw new Exception('Select execution failed: ' . $stmtSelect->error);
        }

        $result = $stmtSelect->get_result();
        if ($row = $result->fetch_assoc()) {
            $g_id = $row['g_id'];

            // Insert into the archived_goods table
            $stmtInsert->bind_param('iss', $g_id, $g_name, $g_articul);

            if (!$stmtInsert->execute()) {
                throw new Exception('Insert execution failed: ' . $stmtInsert->error);
            }

            // Delete from the goods table
            $stmtDelete->bind_param('ss', $g_name, $g_articul);

            if (!$stmtDelete->execute()) {
                throw new Exception('Delete execution failed: ' . $stmtDelete->error);
            }
        } else {
            throw new Exception('No matching record found to archive');
        }
    }

    $stmtInsert->close();
    $stmtSelect->close();
    $stmtDelete->close();
    $link->commit();
    echo json_encode(['status' => 'success', 'message' => 'Data moved to archived_goods successfully']);
} catch (Exception $e) {
    $link->rollback();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

$link->close();
?>
