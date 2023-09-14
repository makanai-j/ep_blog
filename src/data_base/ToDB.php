<?php
$usr = 'root';
$pass = '';
try{
    //$query = $_POST["query"];
    //$DBName = $_POST["DBName"];
    $query = "select * from diaries";
    $DBName = "blog_english_mysql";
    //アクセス先のdataBaseを選択、nullならnull返して終了
    /*if(is_null($DBName)) {
        echo null;
        exit();
    }else if($DBName == "story"){
        $DBName = "blog_story_mysql";
    }else if($DBName == "diary"){
        $DBName = "blog_english_mysql";
    }*/

    $dsn = "mysql:host=localhost;dbname={$DBName};charset=utf8";

    $pdo = new PDO($dsn,$usr,$pass);
    //エラー処理
    $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_SILENT);
}catch (PDOException $e){
    exit($e->getMessage());
}

$stmt = $pdo->query($query);
//responseがfalseでなければ配列にして返す
if($stmt){
    foreach($stmt as $row){
        $data[] = $row;
    }
}

//jsonで返す
echo json_encode($data);
exit();
?>