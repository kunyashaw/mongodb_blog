<?php
header('Content-Type:application/json');
//连接mongodb的数据库服务
$url = "mongodb://127.0.0.1:27017";
$conn = new MongoClient($url);

//指定操作的数据库名称
$db = $conn->db_articles;

?>