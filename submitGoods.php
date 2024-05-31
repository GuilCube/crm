<?php
header('Content-Type: application/json');

// Include the database connection file
include("DBConnect.php");

// Get the raw POST data
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Check if data is received
if (is_null($data)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    exit;
}

// Validate and insert data
try {
    $link->begin_transaction();

    $sql = "INSERT INTO goods (g_name, g_articul) VALUES (?, ?)";
    $stmt = $link->prepare($sql);

    if ($stmt === false) {
        throw new Exception('SQL preparation failed: ' . $link->error);
    }

    foreach ($data as $item) {
        $g_name = $item['g_name'];
        $g_articul = $item['g_articul'];

        if (empty($g_name) || empty($g_articul)) {
            throw new Exception('Missing required fields');
        }

        $stmt->bind_param('ss', $g_name, $g_articul);
        $stmt->execute();
    }

    $stmt->close();
    $link->commit();
    echo json_encode(['status' => 'success', 'message' => 'Data inserted successfully']);
} catch (Exception $e) {
    $link->rollback();
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

$link->close();
?>
