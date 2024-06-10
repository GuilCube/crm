<?php
include("DBConnect.php"); // Assuming this file establishes a connection to the database and assigns it to $link

try {
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    $l_name = isset($data['l_name']) ? $data['l_name'] : '';
    $o_status = isset($data['o_status']) ? $data['o_status'] : '';
    $goods = isset($data['goods']) ? $data['goods'] : [];
    $adress = isset($data['adress']) ? $data['adress'] : '';
    $leadComment = isset($data['leadComment']) ? $data['leadComment'] : '';

    // Building query conditions
    $conditions = [];
    $params = [];
    $types = '';

    if (!empty($l_name)) {
        $conditions[] = "l.leadName LIKE ?";
        $params[] = '%' . $l_name . '%';
        $types .= 's';
    }

    if (!empty($o_status)) {
        $conditions[] = "o.o_status = ?";
        $params[] = $o_status;
        $types .= 's';
    }

    if (!empty($adress)) {
        $conditions[] = "o.adress LIKE ?";
        $params[] = '%' . $adress . '%';
        $types .= 's';
    }

    if (!empty($leadComment)) {
        $conditions[] = "o.o_comment LIKE ?";
        $params[] = '%' . $leadComment . '%';
        $types .= 's';
    }

    $sql = "SELECT o.o_id, o.l_id, o.o_status, o.adress, o.o_comment, o.m_id, o.created,
                   oi.g_id, oi.g_quantity, g.g_name, l.leadName
            FROM orders o
            JOIN order_items oi ON o.o_id = oi.o_id
            JOIN goods g ON oi.g_id = g.g_id
            JOIN leads l ON o.l_id = l.idLead";

    if (count($conditions) > 0) {
        $sql .= " WHERE " . implode(" AND ", $conditions);
    }

    if (!empty($goods)) {
        $goodsConditions = [];
        foreach ($goods as $good) {
            $goodsConditions[] = "(g.g_name LIKE ? AND oi.g_quantity = ?)";
            $params[] = '%' . $good['name'] . '%';
            $params[] = $good['quantity'];
            $types .= 'si';
        }
        if (count($goodsConditions) > 0) {
            $sql .= (count($conditions) > 0 ? " AND " : " WHERE ") . "(" . implode(" OR ", $goodsConditions) . ")";
        }
    }

    $stmt = $link->prepare($sql);
    if ($stmt === false) {
        throw new Exception("Error preparing query: " . $link->error);
    }

    $stmt->bind_param($types, ...$params);
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
