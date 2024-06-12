<?php
include("DBConnect.php");

try {
    // Retrieve and decode the JSON data from the request body
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    // Extract and sanitize input fields
    $goods = isset($data['goods']) ? $data['goods'] : '';
    $articul = isset($data['articul']) ? $data['articul'] : '';

    // Initialize the conditions and parameters arrays
    $conditions = [];
    $params = [];

    // Check if the goods name is provided
    if (!empty($goods)) {
        $conditions[] = "g_name LIKE ?";
        $params[] = '%' . $goods . '%';
    }

    // Check if the articul is provided
    if (!empty($articul)) {
        $conditions[] = "g_articul LIKE ?";
        $params[] = '%' . $articul . '%';
    }

    // If no search criteria is provided, return an error
    if (count($conditions) == 0) {
        echo json_encode(['success' => false, 'error' => 'Не введено критерії пошуку']);
        exit;
    }

    // Build the SQL query
    $sql = "SELECT * FROM goods";
    if (count($conditions) > 0) {
        $sql .= " WHERE " . implode(" AND ", $conditions);
    }

    // Prepare the SQL statement
    $stmt = $link->prepare($sql);
    if ($stmt === false) {
        throw new Exception("Error preparing query: " . $link->error);
    }

    // Bind parameters and execute the statement
    $stmt->bind_param(str_repeat('s', count($params)), ...$params);
    $stmt->execute();

    // Fetch the results
    $result = $stmt->get_result();
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Return the results as JSON
    echo json_encode(['status' => 'success', 'data' => $data]);

    // Close the statement and connection
    $stmt->close();
    $link->close();
} catch (Exception $e) {
    // Handle exceptions and return an error message
    echo json_encode(['status' => 'error', 'error' => $e->getMessage()]);
    if (isset($stmt)) {
        $stmt->close();
    }
    $link->close();
}
?>
