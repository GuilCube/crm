<?php
include ("DBConnect.php");

$sql = "SELECT * FROM `leads`;";
$result = $link->query($sql);
$data = array();

if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
?>