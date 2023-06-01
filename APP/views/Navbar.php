<?php
$currentFileName = basename($_SERVER['PHP_SELF']);
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.84.0">
    <title>Admin Dashboard</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/dashboard/">

    

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
    <link href="./views/dashboard.css" rel="stylesheet">
  </head>
  <body>
    
<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
  <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">Hotel Del luna</a>
  <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
  <div class="navbar-nav">
    <div class="nav-item text-nowrap">
      <a class="nav-link px-3" href="/Logout">Sign out</a>
    </div>
  </div>
</header>

<div class="container-fluid">
  <div class="row">
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse fs-5 ">
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item ">
            <?php if($currentFileName == "Dashboard.php"){?>
              <a class="nav-link active" aria-current="page" href="/Dashboard">
            <?php }else{?>
              <a class="nav-link " aria-current="page" href="/Dashboard">
            <?php }?>
              <span data-feather="home"></span>
              Dashboard
            </a>
          </li>
          <li class="nav-item">
          <?php if($currentFileName == "Availablity.php"){?>
              <a class="nav-link active" href="/Availablity">
            <?php }else{?>
              <a class="nav-link" href="/Availablity">
            <?php }?>
            
              <span data-feather="file"></span>
             Availability
            </a>
          </li>
          <li class="nav-item">
          <?php if($currentFileName == "Registration.php"){?>
            <a class="nav-link active" href="/Registration">
            <?php }else{?>
              <a class="nav-link" href="/Registration">
            <?php }?>
            
              <span data-feather="user-plus"></span>
              Check in
            </a>
          </li>
          <li class="nav-item">
          <?php if($currentFileName == "Checkout.php"){?>
            <a class="nav-link active" href="/Checkout">
            <?php }else{?>
              <a class="nav-link" href="/Checkout">
            <?php }?>
            
              <span data-feather="user-minus"></span>
              Check out
            </a>
          </li>
          <li class="nav-item">
          <?php if($currentFileName == "Records.php"){?>
            <a class="nav-link active" href="/Records">
            <?php }else{?>
              <a class="nav-link" href="/Records">
            <?php }?>
            
              <span data-feather="file"></span>
              Records
            </a>
          </li>
        </ul>

        
      </div>
    </nav>

    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    

      

     


    <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>

      <script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js" integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js" integrity="sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha" crossorigin="anonymous"></script><script src="./views/dashboard.js"></script>
  </body>
</html>
