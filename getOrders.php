<?php
include ("DBConnect.php");

$sql = "SELECT \n"
    . "    o.o_id,\n"
    . "    o.l_id,\n"
    . "    o.o_status,\n"
    . "    o.adress,\n"
    . "    o.o_comment,\n"
    . "    o.m_id,\n"
    . "    oi.g_id,\n"
    . "    oi.g_quantity,\n"
    . "    g.g_name,\n"
   . "    l.leadName\n"
    . "FROM \n"
    . "    orders o\n"
    . "JOIN \n"
    . "    order_items oi ON o.o_id = oi.o_id\n"
    . "JOIN \n"
    . "    goods g ON oi.g_id = g.g_id\n"
    . "JOIN \n"
    . "	leads l ON l.idLead = o.l_id\n"
    . "ORDER BY \n"
    . "    o.o_id, oi.g_id;";

$result = $link->query($sql);
$data = array();

if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}
if ($data[0]['o_comment']==0) {
    $data[0]['o_comment']='';
}

echo json_encode($data);
?>