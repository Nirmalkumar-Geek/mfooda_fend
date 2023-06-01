<?php


class Auth{


    private $conn = null;
    private $salt = "gNT_ICJLl8HHOEHaLhhHgZgn-vx1KYrKr4M4dkZagwI";

function __construct($conn){

    $this->conn = $conn;

}


function bake_some_hash($password){


    return md5(strrev($password.$this->salt));
    

}

function do_signup($username,$email,$password){

    $query = "INSERT INTO `users`(`username`, `email`,`password`) VALUES ('$username', '$email','$password');";

    if($this->conn->query($query)){

        return true;

    }else{

        return false;

    }

}


function do_signin($username,$hashed_passwd){

	
    $query = "SELECT * FROM `users` WHERE username='$username' AND password='$hashed_passwd';";
    $result  = $this->conn->query($query);
	
    if($result->num_rows == 1){

        $token =  $this->bake_some_hash(rand(100000,999999));
	

		$expiry = time()+(60*60); //means 1 hour from now.
		return $this->add_session($username, $token, $expiry);

    }else{

		
        return 0;
    }




}


function add_session($username,$token,$expiry){

	$mysqltime = date('Y-m-d H:i:s', $expiry);
    
    $query = "INSERT INTO `session` (`username`, `token`, `expiry`) VALUES ('$username', '$token', '$mysqltime');";


	if ($this->conn->query($query)) {
		setcookie('username', $username ,$expiry,'/');
		setcookie('token', $token ,$expiry,'/');
		
		return 1;
	} else {
		return 0;
	}

}

function verify_session($username, $token) {
	$query   = "SELECT * FROM `session` WHERE username='$username' AND token = '$token';";
	$result  = $this->conn->query($query);

	if ($result->num_rows == 1) {
		$row = $result->fetch_assoc();
		if((int)$row['active'] == 1){
			$expiry = strtotime($row['expiry']);
			if($expiry > time()){
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
}


function invalidate_session($username, $token) {
	$query   = "UPDATE `session` SET `active` = '0' WHERE `username` = '$username' AND `token` = '$token';";
	
	setcookie('username', $username ,time()-3600,'/');
	setcookie('token', $token ,time()-3600,'/');
	return $this->conn->query($query);
}

function get_current_username(){
	if(verify_session($_COOKIE['username'], $_COOKIE['token'])){
		return $_COOKIE['username'];
	} else {
		return NULL;
	}
}


}

