<?php
include("DBConnect.php");

try {
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    $leadType = isset($data['leadType']) ? $data['leadType'] : '';
    $leadStatus = isset($data['leadStatus']) ? $data['leadStatus'] : '';
    $leadPhone = isset($data['leadPhone']) ? $data['leadPhone'] : '';
    $leadName = isset($data['leadName']) ? $data['leadName'] : '';
    $leadEmail = isset($data['leadEmail']) ? $data['leadEmail'] : '';
    $leadComment = isset($data['leadComment']) ? $data['leadComment'] : '';

    $conditions = [];
    $params = [];

    if (!empty($leadType)) {
        $conditions[] = "leadType = ?";
        $params[] = $leadType;
    }

    if (!empty($leadStatus)) {
        $conditions[] = "leadStatus = ?";
        $params[] = $leadStatus;
    }

    if (!empty($leadPhone)) {
        $conditions[] = "leadPhone LIKE ?";
        $params[] = '%' . $leadPhone . '%';
    }

    if (!empty($leadName)) {
        $conditions[] = "leadName LIKE ?";
        $params[] = '%' . $leadName . '%';
    }

    if (!empty($leadEmail)) {
        $conditions[] = "leadEmail LIKE ?";
        $params[] = '%' . $leadEmail . '%';
    }

    if (!empty($leadComment)) {
        $conditions[] = "leadComment LIKE ?";
        $params[] = '%' . $leadComment . '%';
    }

    if (count($conditions) == 0) {
        echo json_encode(['success' => false, 'error' => 'Не введено критерії пошуку']);
        exit;
    }

    $sql = "SELECT * FROM leads";
    if (count($conditions) > 0) {
        $sql .= " WHERE " . implode(" AND ", $conditions);
    }

    $stmt = $link->prepare($sql);
    if ($stmt === false) {
        throw new Exception("Error preparing query: " . $link->error);
    }

    $stmt->bind_param(str_repeat('s', count($params)), ...$params);
    $stmt->execute();

    $result = $stmt->get_result();
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode(['success' => true, 'data' => $data]);

    $stmt->close();
    $link->close();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    if (isset($stmt)) {
        $stmt->close();
    }
    $link->close();
}
?>
