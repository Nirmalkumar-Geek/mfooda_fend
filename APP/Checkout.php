<?php
include './views/Navbar.php';
require_once './lib/Customers.php';
require_once './lib/Connection.php';
require_once './lib/Rooms.php';

$getcustomer = new Customers(Connection::getConnection());
$rooms = new Rooms(Connection::getConnection());

if(isset($_GET["id"])){
    $item_id = $_GET["id"];
    settype($item_id, "int");
    $getcustomer->make_inactive($item_id);

}

$result = $getcustomer->get_Customer_Details();

?>
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Customer Registration</h1>
        <!--<div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
            <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            This week
          </button>
        </div>-->
</div>

<div class="container-fluid">

  <!-- Page Heading -->

  <!-- Content Row -->
  <div class="row">

  

    <?php

while($row = $result->fetch_assoc()) { if($row["active"] == 1){?>


<div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-success shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-xs font-weight-bold text-success text-uppercase mb-1"><?php echo $row['firstname'].$row['lastname'];?></div>
              <div class="alert alert-success alert-dismissible fade show" role="alert">
                 <?php echo $row['category'];?>
              </div>
              <div class="alert alert-warning alert-dismissible fade show" role="alert">
              Occupied - <?php echo $row['email'];?>
              </div>
              <a class="btn btn-danger" href="/Checkout?id=<?php echo $row['id'];?>">Check Out</a>            
            </div>
            <div class="col-auto">
              <i class="fas fa-star fa-2x text-gray-300"></i>
              
            </div>
          </div>
        </div>
      </div>
    </div>



<?php
}  
}

?>
    



</div>