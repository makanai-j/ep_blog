<?php
$ini_path = "{$_SERVER['DOCUMENT_ROOT']}/../env_vars/lepl.net.ini";
// php.ini をパースします
$ini = parse_ini_file($ini_path);

try{
    $query = $_POST["query"];
    $dbName = $_POST["DBName"];
    //$query = "select * from diaries";
    //$DBName = "blog_english_mysql";
    //アクセス先のdataBaseを選択、nullならnull返して終了
    if(is_null($dbName)) {
        echo null;
        exit();
    }else if($dbName == "story"){
        $dbName = $ini["DB_STORY"];
    }else if($dbName == "diary"){
        $dbName = $ini["DB_DIARY"];
    }else if($dbName == "info"){
        $dbName = $ini["DB_INFO"];
    }

    $dsn = "mysql:host={$ini["DB_HOST"]};dbname={$dbName};charset=utf8";
    $usr = $ini["USER_NAME"];
    $pass = $ini["PWD"];

    $pdo = new PDO($dsn,$usr,$pass);
    //エラー処理
    $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_SILENT);
}catch (PDOException $e){
    exit($e->getMessage());
}

$stmt = $pdo->query($query);
//responseがfalseでなければ配列にして返す
if($stmt && $stmt -> rowCount() > 0){
    foreach($stmt as $row){
        $data[] = $row;
    }
} else {
    $data = false;
}

//jsonで返す
echo json_encode($data);
exit();
?>