<?php
include("DBConnect.php");

$idLead = $_POST['idLead'];
$leadType = $_POST['leadType'];
$leadStatus = $_POST['leadStatus'];
$leadPhone = $_POST['leadPhone'];
$leadName = $_POST['leadName'];
$leadEmail = $_POST['leadEmail'];
$leadComment = $_POST['leadComment'];

$sql = "INSERT INTO `lead` (idLead, leadType, leadStatus, leadPhone, leadName, leadEmail, leadComment) 
        VALUES ('$idLead', '$leadType', '$leadStatus', '$leadPhone', '$leadName', '$leadEmail', '$leadComment')";

if (mysqli_query($link, $sql)) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => mysqli_error($link)]);
}

mysqli_close($link);
?>
