<?php

include './views/Navbar.php';
require_once './lib/Rooms.php';
require_once './lib/Connection.php';


$myroom = new Rooms(Connection::getConnection());


$result = $myroom->get_rooms_details();

?>

<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Rooms Availablity</h1>
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

while($row = $result->fetch_assoc()) {?>

<div class="col-xl-3 col-md-6 mb-4">
      <div class="card border-left-success shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-xs font-weight-bold text-success text-uppercase mb-1"><?php echo $row['category'];?></div>
              <div class="alert alert-success alert-dismissible fade show" role="alert">
              Available -  <?php echo $row['available'];?>
              </div>
              <div class="alert alert-warning alert-dismissible fade show" role="alert">
              Occupied - <?php echo $row['occupied'];?>
              </div>              
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

?>
    



</div>