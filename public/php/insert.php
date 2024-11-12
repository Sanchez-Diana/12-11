<!DOCTYPE html>
<html>
<head>
    <title>Poductos</title>
    <link rel="stylesheet" href="datos.css">
</head>
<body>

<section id="info">
    <?php
    include 'DB.php';

    $json_data = file_get_contents('productos.json');
    $productos = json_decode($json_data, true);

   
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        foreach ($productos as $producto) {
            $id = $producto['id'];
            $nombre = $producto['nombre'];
            $stock = $producto['stock'];
            $precio = $producto['precio'];
            $descripcion = $producto['descripcion'];
           
            $sql = "INSERT INTO articulos (id_articulo, Nombre, Stock, Precio, Descripcion) 
                    VALUES ('$id', "$nombre", '$stock', '$precio','$descripcion')";

            
            if (mysqli_query($conn, $sql)) {
                echo "<h3>Producto '$nombre' insertado exitosamente.</h3>";
            } else {
                echo "ERROR: No se pudo insertar '$nombre'. " . mysqli_error($conn);
            }
        }
    }

    mysqli_close($conn);
    ?>

</section>

</body>
</html>