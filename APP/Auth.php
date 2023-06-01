<?php

include 'lib/Connection.php';
include 'lib/Users.php';
include 'lib/Middleware.php';

$conn = Connection::getConnection();
$user = new Users($conn);


if($_GET("/signup")){




        if($user->Signupuser($_POST("firstname"),$_POST("lastname"),$_POST("email"),$_POST("password"))){


                header("/login");


        }else{


                header("/signup");


        }




}



























