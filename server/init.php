<?php
header('Content-Type:application/json');
//连接mongodb的数据库服务
 $url = "mongodb://127.0.0.1:27017";
//$url="mongodb://kunyashaw:123456@ds123728.mlab.com:23728/db_articles";
// mongo ds123728.mlab.com:23728/db_articles -u <dbuser> -p <dbpassword>
$conn = new MongoClient($url);

//指定操作的数据库名称
$db = $conn->db_articles;

?>