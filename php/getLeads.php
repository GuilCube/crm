<?php
$hostname = "localhost";
$username = "root";
$passwordbd = "";
$dbName = "crm";
$link = mysqli_connect($hostname, $username, $passwordbd, $dbName);

if (!$link) {
    echo "Помилка: Неможливо встановити з'єднання з MySQL." . PHP_EOL;
    echo "Код помилки errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Текст помилки error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

$sql = "SELECT * FROM `lead`;";
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