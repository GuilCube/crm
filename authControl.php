<?php
include("DBConnect.php");
header('Content-Type: application/json');
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Get login and password from the request
$login = $data['login'];
$password = $data['password'];

if (empty($login) || empty($password)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Missing login or password']);
    exit;
}

try {
    // Prepare the statement for checking managers
    $stmt = $link->prepare("SELECT * FROM managers WHERE m_login = ? AND m_password = ?");
    $stmt->bind_param('ss', $login, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['status' => 'success', 'role' => 'manager']);
        $stmt->close();
        $link->close();
        exit;
    }

    $stmt->close();

    // Prepare the statement for checking depotworkers
    $stmt = $link->prepare("SELECT * FROM depotworkers WHERE w_login = ? AND w_password = ?");
    $stmt->bind_param('ss', $login, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['status' => 'success', 'role' => 'depotworker']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid login or password']);
    }

    $stmt->close();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

$link->close();
?>
