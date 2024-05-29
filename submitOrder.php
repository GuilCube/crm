<?php
// Set the content type to application/json
header('Content-Type: application/json');

include("DBConnect.php");

// Get the raw POST data
$rawData = file_get_contents("php://input");

// Decode the JSON data
$data = json_decode($rawData, true);

// Check if data is received
if (is_null($data)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    exit;
}

// Extract data
$leadName = isset($data['leadName']) ? $data['leadName'] : null;
$adress = isset($data['adress']) ? $data['adress'] : null;
$o_comment = isset($data['o_comment']) ? $data['o_comment'] : ""; // Ensure empty string if not provided
$goods = isset($data['goods']) ? $data['goods'] : [];

// Example: Print the received data (for debugging purposes)
error_log("Received data: " . print_r($data, true));

// Validate required fields
if (is_null($leadName) || is_null($adress)) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    exit;
}

// Hardcoded value
$m_id = 1;

// Start a transaction
$link->begin_transaction();

try {
    // Insert into the main order table
    $sql = "INSERT INTO orders (l_id, adress, o_comment, m_id) VALUES ((SELECT idLead FROM leads WHERE leadName = ?), ?, ?, ?)";
    $stmt = $link->prepare($sql);

    if ($stmt === false) {
        throw new Exception('SQL preparation failed: ' . $link->error);
    }

    $stmt->bind_param('sssi', $leadName, $adress, $o_comment, $m_id);
    $stmt->execute();

    // Get the inserted order ID
    $new_order_id = $stmt->insert_id;
    $stmt->close();

    // Insert the new goods data
    $sql = "INSERT INTO order_items (o_id, g_id, g_quantity) VALUES (?, (SELECT g_id FROM goods WHERE g_name = ?), ?)";
    $stmt = $link->prepare($sql);

    if ($stmt === false) {
        throw new Exception('SQL preparation failed: ' . $link->error);
    }

    foreach ($goods as $item) {
        $g_name = $item['g_name'];
        $g_quantity = $item['g_quantity'];
        $stmt->bind_param('isi', $new_order_id, $g_name, $g_quantity);
        $stmt->execute();
    }

    $stmt->close();

    // Commit the transaction
    $link->commit();

    echo json_encode(['status' => 'success', 'message' => 'Data inserted successfully', 'order_id' => $new_order_id]);
} catch (Exception $e) {
    // Rollback the transaction if something failed
    $link->rollback();
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

// Close the connection
$link->close();
?>
