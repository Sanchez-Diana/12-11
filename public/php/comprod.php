<?php
include('DB.php');

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$productosJSON = file_get_contents('php://input');


$productos = json_decode($productosJSON, true);

if (empty($productos)) {
    echo json_encode(["success" => false, "message" => "No se recibieron productos"]);
    exit;
}

foreach ($productos as $producto) {
    $stmt = $conn->prepare("INSERT INTO productos (nombre, descripcion, precio, categoria, stock, imageUrl) VALUES (?, ?, ?, ?, ?, ?)");

    if ($stmt === false) {
        echo json_encode(["success" => false, "message" => "Error al preparar la consulta: " . $conn->error]);
        exit;
    }

    $stmt->bind_param("ssisis", 
        $producto['nombre'], 
        $producto['descripcion'], 
        $producto['precio'], 
        $producto['categoria'], 
        $producto['stock'], 
        $producto['imageUrl']
    );

    if ($stmt->execute()) {
    } else {
        echo json_encode(["success" => false, "message" => "Error al insertar el producto: " . $stmt->error]);
        exit;
    }

    $stmt->close();
}


$conn->close();

echo json_encode(["success" => true, "message" => "Productos comprados exitosamente"]);
?>
