<?php
include('DB.php');

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$json_data = file_get_contents('../productos.json');
$productos = json_decode($json_data, true);

$indiceAleatorio = array_rand($productos);  

$productoSeleccionado = $productos[$indiceAleatorio];

$stmt = $conn->prepare("INSERT INTO productos (nombre, descripcion, precio, categoria, stock, imageUrl) VALUES (?, ?, ?, ?, ?, ?)");

if ($stmt === false) {
    die('Error al preparar la consulta: ' . $conn->error);
}

$stmt->bind_param("ssisis", 
    $productoSeleccionado['nombre'], 
    $productoSeleccionado['descripcion'], 
    $productoSeleccionado['precio'], 
    $productoSeleccionado['categoria'], 
    $productoSeleccionado['stock'], 
    $productoSeleccionado['imageUrl']
);

if ($stmt->execute()) {
    echo "Producto comprado exitosamente <br>";
} else {
    echo "Error al insertar el producto  " . $stmt->error . "<br>";
}

$stmt->close();
$conn->close();
?>
