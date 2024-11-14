<?php


    $hostname = "localhost";
    $username = "root";
    $password = "";
    $dbname = "sportzone";


    $conn = mysqli_connect($hostname, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }
?>
