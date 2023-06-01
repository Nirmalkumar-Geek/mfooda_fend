<?php

class Connection{

public static function getConnection(){

    $conn = new mysqli("mysql.selfmade.ninja:3306","esther","esther@12345","esther_adminend");

    if($conn->connect_error){


            return false;

    }

    return $conn;

}

}


?>