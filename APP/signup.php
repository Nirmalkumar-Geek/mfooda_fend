<?php
include 'library/auth.php';

if(isset($_COOKIE['username']) and isset($_COOKIE['token'])){
	$username = $_COOKIE['username'];
	$token = $_COOKIE['token'];

	if(verify_session($username, $token)){
		header("Location: /home.php");
	}
}

$flag = 0;
if(!isset($_GET['verify']) and isset($_POST['username']) and isset($_POST['password']) and isset($_POST['cpassword'])){
	$username = $_POST['username'];
	$password = $_POST['password'];
	$cpassword = $_POST['cpassword'];

	if($password == $cpassword){
		if(do_signup($username, $password) == 1){
			header("Location: /signup.php?verify=$username");
		} else {
			$flag = -2;
		}
	} else {
		$flag = -1; //password and confirm password do not match
	}
}

if(isset($_GET['verify']) or isset($_POST['otp'])){
	$username = $_GET['verify'];
	if(isset($_POST['otp'])){
		if(do_verify_signup($username, $_POST['otp'])){
			header("Location: /signin.php?signup=success");
			exit();
		} else {
			$flag = -3;
		}
	}
}

?>


<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.84.0">
    <title>Signin Template · Bootstrap v5.0</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/sign-in/">

    

    <!-- Bootstrap core CSS -->
<link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>

    
    <!-- Custom styles for this template -->
    <link href="signin.css" rel="stylesheet">
  </head>
  <body class="text-center">



<main class="form-signin" >
<?php if($flag == 5){?>
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Failed to Add Customer Details !!! 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
<?php }else if($flag == 2){?>

    <div class="alert alert-success alert-dismissible fade show" role="alert">
        Signup Successfull
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div> 
    <?php }?>
  <form action = "/signup" method = "POST">
    <!--<img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">-->
    <h1 class="h3 mb-3 fw-normal">Sign up</h1>

    <div class="form-floating p-1">
      <input type="text" class="form-control " id="floatingInput" placeholder="First Name" name="firstname" required>
      <label for="floatingInput">First Name</label>
    </div>
    <div class="form-floating mt-2">
      <input type="text" class="form-control " id="floatingInput" placeholder="Last Name" name="lastname" required>
      <label for="floatingInput">Last Name</label>
    </div>

    <div class="form-floating mt-2">
      <input type="email" class="form-control " id="floatingInput" placeholder="name@example.com" name="email" required>
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating mt-2">
      <input type="password" class="form-control " id="floatingPassword" placeholder="Password" name="password" required>
      <label for="floatingPassword">Password</label>
    </div>
    <div class="form-floating mt-2">
      <input type="password" class="form-control " id="floatingPassword" placeholder="Confirm Password" name="cpassword" required>
      <label for="floatingPassword">Confirm Password</label>
    </div>
    
    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
    
  </form>
</main>

<script src="./assets/dist/js/bootstrap.bundle.min.js"></script>
    
  </body>
</html>
