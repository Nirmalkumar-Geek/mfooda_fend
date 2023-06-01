<?php
require_once './lib/Auth.php';
require_once './lib/Connection.php';

$auth = new Auth(Connection::getConnection());

if(isset($_COOKIE['username']) and isset($_COOKIE['token'])){
	$username = $_COOKIE['username'];
	$token = $_COOKIE['token'];

	if($auth->verify_session($username, $token)){
		header("Location: /Dashboard");
	}
}



$flag = 0;
if(isset($_POST['username']) and isset($_POST['password'])){
	if($auth->do_signin($_POST['username'], $auth->bake_some_hash($_POST['password']))){
		header("Location: /Dashboard");
	} else {
		$flag = 0;
	}
} else {
	$flag = -1;
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
    <title>Signin</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/sign-in/">

    

    <!-- Bootstrap core CSS -->
<link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet">

    
    <!-- Custom styles for this template -->
    <link href="signin.css" rel="stylesheet">
  </head>
  <body class="text-center">
    
<main class="form-signin">
  <form action="/signin" method="POST">

  <?php
		if($flag == 0) {
			?>
			<div class="alert alert-danger" role="alert">
				Your username or password did not match.
				<?php
				if($flag != -1){
					include 'signup';
				}
				?>
			</div>
			<?php
		} else if(isset($_GET['signup'])){
			if($_GET['signup'] == 'success'){
			?>
				<div class="alert alert-success" role="alert">
				Signup success, you can login now!
				</div>
			<?php
			}
		}
		?>
    <!--<img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">-->
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="username">
      <label for="floatingInput">User Name</label>
    </div>
    <div class="form-floating mt-2">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password">
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
      Don't have an account yet?
      </label>
      <a href="/signup">Signup</a>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2023–2024</p>
  </form>
</main>


    
  </body>
</html>
