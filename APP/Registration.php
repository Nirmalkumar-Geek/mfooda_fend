<?php

include './views/Navbar.php';
require_once './lib/Customers.php';
require_once './lib/Rooms.php';
require_once './lib/Connection.php';

$Customers = new Customers(Connection::getConnection());
$Rooms = new Rooms(Connection::getConnection());

/*if(isset($_COOKIE['username']) and isset($_COOKIE['token'])){
	$username = $_COOKIE['username'];
	$token = $_COOKIE['token'];

	if(verify_session($username, $token)){
		header("Location: /Dashboard");
	}
}*/
$flag = 0;
if( isset($_POST['firstname']) and isset($_POST['lastname']) and isset($_POST['email']) and isset($_POST['address']) and isset($_POST['phonenumber']) and isset($_POST['norooms']) and isset($_POST['category'])){
	$firstname = $_POST['firstname'];
	$lastname = $_POST['lastname'];
	$email = $_POST['email'];
  $address = $_POST['address'];
  $phonenumber = $_POST['phonenumber'];
  $norooms = $_POST['norooms'];
  $category = str_replace(' ', '', $_POST['category']);

  $room = $Rooms->get_room_availablity($category);
  $row = $room->fetch_assoc();
  
  settype($norooms, "int");
  $final_room_count = $row["available"] - $norooms;
  //echo $final_room_count;
  //echo $norooms;
  
  if( (int)$_POST['norooms'] <= $row["available"]){

    if($Customers->add_customers($firstname,$lastname,$email,$address,$phonenumber,$norooms,$category)){

      $Rooms->update_rooms_availablity($category,$final_room_count);
      $Rooms->update_rooms_occupied($category,$norooms+$row['occupied']);
      

      $flag = 1;


  }else{

      $flag = 5;

  }

  }else{

      $flag = 6;

  }
  


}else{


$flag = -1;


}





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

<?php if($flag == 5){?>
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Failed to add Customer Details !!! 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
<?php }else if($flag == 1){?>

    <div class="alert alert-success alert-dismissible fade show" role="alert">
        Customers Details Added Successfully
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div> 
<?php }else if($flag == 6){?>

<div class="alert alert-warning alert-dismissible fade show" role="alert">
    Only <?php echo $row["available"]; ?> Rooms are avilable !
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div> 
<?php }?>

  <div class="row justify-content-center">
    <div class="col-md-6">
    <form action = "/Registration" method = "POST" >
    <!--<img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">-->
    

    <div class="form-floating p-1  justify-content-center">
      <input type="text" class="form-control" id="floatingInput" placeholder="First Name" name="firstname" required>
      <label for="floatingInput">First Name</label>
    </div>
    <div class="form-floating p-1 ">
      <input type="text" class="form-control " id="floatingInput" placeholder="Last Name" name="lastname" required>
      <label for="floatingInput">Last Name</label>
    </div>

    <div class="form-floating p-1 ">
      <input type="email" class="form-control " id="floatingInput" placeholder="name@example.com" name="email" required>
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating p-1 ">
      <input type="text" class="form-control " id="floatingPassword" placeholder="Password" name="address" required>
      <label for="floatingPassword">Address</label>
    </div>
    <div class="form-floating p-1 ">
      <input type="number" class="form-control " id="floatingPassword" placeholder="Phone Number" name="phonenumber" required>
      <label for="floatingPassword">Phone Number</label>
    </div>
    <div class="form-floating p-1 ">
      <input type="number" class="form-control " id="floatingPassword" placeholder="No of Rooms" name="norooms" required>
      <label for="floatingPassword">No Rooms</label>
    </div>
    <div class="col-md-3 w-100 p-1">
    <select class="form-select " name="category" required="">
       <option selected="" disabled="" value="">Rooms Category</option>
       <option value="kidsplaysuite">kids play suite</option>
       <option value="couplesromancesuite">couples romance suite</option>
       <option value="singleroom">single room</option>
       <option value="twinroom">twin room</option>
     </select>
    <div class="invalid-feedback">
       Please select a valid state.
    </div>
  </div>
    
    <button class="w-100 btn btn-lg btn-primary mt-3" type="submit">Add</button>
 
  </form>
    </div>
  </div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>