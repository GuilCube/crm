<?php
header('Content-Type: application/json');
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);
// Include the database connection file
include("DBConnect.php");

// Get the form data
$sender = $data['sender'] ?? '';
$in_comment = $data['in_comment'] ?? '';
$goods = $data['goods'] ?? [];

// Validate form data (you may need more validation depending on your requirements)
if (empty($sender) || empty($goods)) {
    echo json_encode(['status' => 'error', 'message' => 'Sender and goods data are required']);
    exit;
}

// Begin a transaction
$link->begin_transaction();

try {
    // Insert data into the inbound table for each goods entry
    $stmtInbound = $link->prepare("INSERT INTO inbound (sender, g_name, g_quantity, in_comment) VALUES (?, ?, ?, ?)");
    $stmtInbound->bind_param("ssis", $sender, $g_name, $g_quantity, $in_comment);

    foreach ($goods as $good) {
        $g_name = $good['name'] ?? '';
        $g_quantity = $good['quantity'] ?? '';

        // Skip empty goods entries
        if (empty($g_name) || empty($g_quantity)) {
            continue;
        }

        $stmtInbound->execute();
    }

    $stmtInbound->close();

    // Update the goods table by increasing the quantity for each provided g_name
    $stmtUpdateGoods = $link->prepare("UPDATE goods SET g_quantity = g_quantity + ? WHERE g_name = ?");
    $stmtUpdateGoods->bind_param("is", $g_quantity, $g_name);

    foreach ($goods as $good) {
        $g_name = $good['name'] ?? '';
        $g_quantity = $good['quantity'] ?? '';

        // Skip empty goods entries
        if (empty($g_name) || empty($g_quantity)) {
            continue;
        }

        $stmtUpdateGoods->execute();
    }

    $stmtUpdateGoods->close();

    // Commit the transaction
    $link->commit();

    echo json_encode(['status' => 'success', 'message' => 'Data inserted and updated successfully']);
} catch (Exception $e) {
    // Rollback the transaction if an error occurs
    $link->rollback();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

// Close the database connection
$link->close();
?>
