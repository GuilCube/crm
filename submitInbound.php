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

// Validate the data
if (!isset($data['sender']) || !isset($data['goods']) || !is_array($data['goods'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Missing or invalid fields']);
    exit;
}
if (empty($data['sender']) || empty($data['goods'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Missing or invalid fields']);
    exit;
}

$sender = $data['sender'];
$in_comment = $data['in_comment'];
$goods = $data['goods'];

try {
    $link->begin_transaction();

    // Insert sender and comment into the inbound table
    $sql = "INSERT INTO inbound (sender, in_comment) VALUES (?, ?)";
    $stmt = $link->prepare($sql);

    if ($stmt === false) {
        throw new Exception('SQL preparation failed: ' . $link->error);
    }

    $stmt->bind_param('ss', $sender, $in_comment);

    if (!$stmt->execute()) {
        throw new Exception('Execution failed: ' . $stmt->error);
    }

    // Get the last inserted in_id
    $in_id = $stmt->insert_id;
    $stmt->close();

    // Prepare the statement for updating goods quantity
    $updateGoodsStmt = $link->prepare("UPDATE goods SET g_quantity = g_quantity + ? WHERE g_name = ?");
    if ($updateGoodsStmt === false) {
        throw new Exception('SQL preparation failed: ' . $link->error);
    }

    // Prepare the statement for inserting into in_items
    $insertInItemsStmt = $link->prepare("INSERT INTO in_items (in_id, g_id, g_quantity) VALUES (?, (Select g_id from goods where g_name = ?), ?)");
    if ($insertInItemsStmt === false) {
        throw new Exception('SQL preparation failed: ' . $link->error);
    }

    // Process each good item
    foreach ($goods as $item) {
        if (!isset($item['g_name']) || !isset($item['g_quantity']) || !is_numeric($item['g_quantity'])) {
            throw new Exception('Missing or invalid fields in goods');
        }
        

        $g_name = $item['g_name'];
        $g_quantity = intval($item['g_quantity']);

        // Update goods table
        $updateGoodsStmt->bind_param('is', $g_quantity, $g_name);
        if (!$updateGoodsStmt->execute()) {
            throw new Exception('Execution failed: ' . $updateGoodsStmt->error);
        }

        // Insert into in_items table
        $insertInItemsStmt->bind_param('isi', $in_id, $g_name, $g_quantity);
        if (!$insertInItemsStmt->execute()) {
            throw new Exception('Execution failed: ' . $insertInItemsStmt->error);
        }
    }

    $updateGoodsStmt->close();
    $insertInItemsStmt->close();
    $link->commit();
    echo json_encode(['status' => 'success', 'message' => 'Data processed successfully']);
} catch (Exception $e) {
    $link->rollback();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

$link->close();
?>
