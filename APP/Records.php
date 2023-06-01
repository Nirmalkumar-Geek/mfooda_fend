<?php

include './views/Navbar.php';
require_once './lib/Customers.php';
require_once './lib/Connection.php';


$getcustomer = new Customers(Connection::getConnection());

$result = $getcustomer->get_Customer_Details();


?>

<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Customer Records</h1>
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

<table class="table table-striped">
  <thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">Customer Name</th>
    <th scope="col">Room Category</th>
    <th scope="col">No Rooms</th>
    <th scope="col">Email</th>
  </tr>
  </thead>
  <tbody>
  <?php

while($row = $result->fetch_assoc()) {?>
  <tr>
    <th scope="row"><?php echo $row['id']?></th>
    <td><?php echo $row['firstname'].$row['lastname']?></td>
    <td><?php echo $row['category']?></td>
    <td><?php echo $row['norooms']?></td>
    <td><?php echo $row['email']?></td>
  </tr>
  <?php }?>
  </tbody>
</table>