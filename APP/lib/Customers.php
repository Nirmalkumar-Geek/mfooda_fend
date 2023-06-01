<?php


class Customers{


    private $conn = null;


function __construct($conn){


    $this->conn = $conn;


}


function add_customers($firstname,$lastname,$email,$address,$phonenumber,$roomscount,$category){


        $query = "INSERT INTO `customers`(`firstname`,`lastname`,`email`,`address`,`phonenumber`,`norooms`,`category`) VALUES ('$firstname','$lastname','$email','$address','$phonenumber','$roomscount','$category');";

        if($this->conn->query($query)){

            return 1;
    
        }else{
    
            return 0;
    
        }

}

function get_Customer_Details(){

    $query = "SELECT * FROM customers";
    $result = $this->conn->query($query);
    if($result->num_rows > 0){

        return $result;

    }else{

        return 0;

    }


}

function make_inactive($id){

    $query = "UPDATE customers SET active = 0 WHERE id = '$id';";
    
    $query3 = "SELECT * FROM customers WHERE id = '$id';";
    $result = $this->conn->query($query3);

    if($result->num_rows >0){

        $row = $result->fetch_assoc();
        $category = $row['category'];
        $norooms = $row['norooms'];
        $query2 = "UPDATE Rooms SET available = avilable+'$norooms' WHERE category = '$category';";
        $query4 = "UPDATE Rooms SET occupied = occupied-'$norooms' WHERE category = '$category';";
        //$this->conn->query($query2);
        //$this->conn->query($query4);
        $this->conn->query($query);
        

    }else{

        return 0;

    }


}






}


