<?php

class Rooms{


    private $conn = null;


    function __construct($conn){
    
    
        $this->conn = $conn;
     
    }


function get_rooms_details(){


    $query = "SELECT * FROM Rooms";
    $result = $this->conn->query($query);

    if ($result->num_rows > 0) {
        
        return $result;

    }else{

        return 0;

    }

}


function get_room_availablity($category){

$query = "SELECT * FROM Rooms WHERE category = '$category';";
$result = $this->conn->query($query);

if ($result->num_rows > 0) {
        
    return $result;

}else{

    return 0;

}

}

function update_rooms_availablity($category,$norooms){

$query = "UPDATE Rooms SET available = '$norooms' WHERE category = '$category';";


if ($this->conn->query($query)) {
        
    return 1;

}else{

    return 0;

}



}

function update_rooms_occupied($category,$norooms){

    $query = "UPDATE Rooms SET occupied = '$norooms' WHERE category = '$category';";
    
    
    if ($this->conn->query($query)) {
            
        return 1;
    
    }else{
    
        return 0;
    
    }



}
}
