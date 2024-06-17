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
if (!isset($data['out_adress']) || !isset($data['goods']) || !is_array($data['goods'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => "Пусті або не правильно заповнен поля"]);
    exit;
}

$out_adress = $data['out_adress'];
$out_comment = $data['out_comment'];
$goods = $data['goods'];

try {
    $link->begin_transaction();

    // Insert out_adress and comment into the outbound table
    $sql = "INSERT INTO outbound (out_adress, out_comment) VALUES (?, ?)";
    $stmt = $link->prepare($sql);

    if ($stmt === false) {
        throw new Exception('SQL preparation failed: ' . $link->error);
    }

    $stmt->bind_param('ss', $out_adress, $out_comment);

    if (!$stmt->execute()) {
        throw new Exception('Execution failed: ' . $stmt->error);
    }

    // Get the last inserted out_id
    $out_id = $stmt->insert_id;
    $stmt->close();

    // Prepare the statement for updating goods quantity
    $updateGoodsStmt = $link->prepare("UPDATE goods SET g_quantity = g_quantity - ? WHERE g_name = ?");
    if ($updateGoodsStmt === false) {
        throw new Exception('SQL preparation failed: ' . $link->error);
    }

    // Prepare the statement for inserting into out_items
    $insertOutItemsStmt = $link->prepare("INSERT INTO out_items (out_id, g_id, g_quantity) VALUES (?, (SELECT g_id FROM goods WHERE g_name = ?), ?)");
    if ($insertOutItemsStmt === false) {
        throw new Exception('SQL preparation failed: ' . $link->error);
    }

    // Prepare the statement for checking the available quantity
    $checkQuantityStmt = $link->prepare("SELECT g_quantity FROM goods WHERE g_name = ?");
    if ($checkQuantityStmt === false) {
        throw new Exception('SQL preparation failed: ' . $link->error);
    }

    // Process each good item
    foreach ($goods as $item) {
        if (!isset($item['g_name']) || !isset($item['g_quantity']) || !is_numeric($item['g_quantity'])) {
            throw new Exception('Пусте або не правильно заповнено поле товару');
        }

        $g_name = $item['g_name'];
        $g_quantity = intval($item['g_quantity']);

        // Check the available quantity
        $checkQuantityStmt->bind_param('s', $g_name);
        if (!$checkQuantityStmt->execute()) {
            throw new Exception('Execution failed: ' . $checkQuantityStmt->error);
        }

        $result = $checkQuantityStmt->get_result();
        $row = $result->fetch_assoc();
        if ($row['g_quantity'] < $g_quantity) {
            throw new Exception("Не достатня кількість товару: '$g_name'");
        }

        // Update goods table
        $updateGoodsStmt->bind_param('is', $g_quantity, $g_name);
        if (!$updateGoodsStmt->execute()) {
            throw new Exception('Execution failed: ' . $updateGoodsStmt->error);
        }

        // Insert into out_items table
        $insertOutItemsStmt->bind_param('isi', $out_id, $g_name, $g_quantity);
        if (!$insertOutItemsStmt->execute()) {
            throw new Exception('Execution failed: ' . $insertOutItemsStmt->error);
        }
    }

    $checkQuantityStmt->close();
    $updateGoodsStmt->close();
    $insertOutItemsStmt->close();
    $link->commit();
    echo json_encode(['status' => 'success', 'message' => 'Data processed successfully']);
} catch (Exception $e) {
    $link->rollback();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

$link->close();
?>
