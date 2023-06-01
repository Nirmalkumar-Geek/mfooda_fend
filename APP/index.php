<?php

require_once './lib/Auth.php';
require_once './lib/Connection.php';

$oauth = new Auth(Connection::getConnection());

if(isset($_COOKIE['username']) and isset($_COOKIE['token'])){
	$username = $_COOKIE['username'];
	$token = $_COOKIE['token'];

	if($oauth->verify_session($username, $token)){
		header("Location: /Dashboard");
	} else {
		header("Location: /signin");
	}
} else {
	header("Location: /signin");
}

