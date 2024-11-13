<?php
include('DB.php');

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Leer los datos enviados a través de POST
$productosJSON = file_get_contents('php://input');

// Decodificar los datos JSON
$productos = json_decode($productosJSON, true);

// Verificar si los productos llegaron correctamente
if (empty($productos)) {
    echo json_encode(["success" => false, "message" => "No se recibieron productos"]);
    exit;
}

// Procesar los productos recibidos
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
        // El producto se insertó correctamente
    } else {
        echo json_encode(["success" => false, "message" => "Error al insertar el producto: " . $stmt->error]);
        exit;
    }

    $stmt->close();
}

// Cerrar la conexión a la base de datos
$conn->close();

// Si todo salió bien, devolver una respuesta de éxito
echo json_encode(["success" => true, "message" => "Productos comprados exitosamente"]);
?>
