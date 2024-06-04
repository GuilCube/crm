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
        throw new Exception('Заповніть всі поля');
    }

    $link->begin_transaction();

    $sql = "INSERT INTO in_items (in_id, g_name, g_quantity) VALUES (?, ?, ?)";
    $stmt = $link->prepare($sql);

    if ($stmt === false) {
        throw new Exception('SQL preparation failed: ' . $link->error);
    }

    foreach ($data as $item) {
        // Ensure the necessary fields are set and not empty
        if (!isset($item['in_id']) || !isset($item['g_name']) || !isset($item['g_quantity']) || empty(trim($item['g_name'])) || !is_numeric($item['g_quantity'])) {
            throw new Exception('Missing required fields or fields are empty');
        }

        $in_id = intval($item['in_id']);
        $g_name = trim($item['g_name']);
        $g_quantity = intval($item['g_quantity']);

        $stmt->bind_param('isi', $in_id, $g_name, $g_quantity);

        if (!$stmt->execute()) {
            throw new Exception('Execution failed: ' . $stmt->error);
        }
    }

    $stmt->close();
    $link->commit();
    echo json_encode(['status' => 'success', 'message' => 'Data inserted successfully']);
} catch (Exception $e) {
    $link->rollback();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

$link->close();
?>
