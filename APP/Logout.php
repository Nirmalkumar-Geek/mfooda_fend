<?php

require_once './lib/Auth.php';
require_once './lib/Connection.php';

$logout = new Auth(Connection::getConnection());

if(isset($_COOKIE['username']) and isset($_COOKIE['token'])){
	$username = $_COOKIE['username'];
	$token = $_COOKIE['token'];

	if($logout->verify_session($username, $token)){
		$logout->invalidate_session($username, $token);
		header("Location: /index");
	} else {
		header("Location: /index");
	}
} else {
	header("Location: /index");
}