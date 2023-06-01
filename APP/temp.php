<?php


require_once './lib/Rooms.php';
require_once './lib/Connection.php';


$myroom = new Rooms(Connection::getConnection());


$result = $myroom->get_rooms_details();


while($row = $result->fetch_assoc()) {
    echo $row['category'];
  }