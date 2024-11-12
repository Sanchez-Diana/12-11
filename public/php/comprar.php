<!DOCTYPE html>
<html>
<head>
    <title>Poductos</title>
    <link rel="stylesheet" href="datos.css">
</head>
<body>
<style>
    body{
    margin: auto;
    background-color: #413a38;

}
#info{
    font-size: 20px;
    padding-top: 10px;
    color: black;
    background-color: #fffc47;
    box-shadow: 0px 0px 0px 2px black;
    border-radius: 37px;
    text-align: center;
    margin-top: 15%;
    margin-inline: 30%;
    width: 500px;
    height: 175px;
}
</style>
<section id="info">
    <?php
    include 'DB.php';

    $json_data = file_get_contents('../productos.json');
    $productos = json_decode($json_data, true);


    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['id_producto'])) {
        $id = $_POST['id_producto'];
        $cantidad = $_POST['Cantidad']; 
    
        foreach ($productos as $producto) {
            if ($producto['id'] == $id) {
                $nombre = $producto['nombre'];
                $precio = $producto['precio'];

                $sql = "INSERT INTO articulosxpedidos (Nombre, Cantidad, Precio, id_articulo) 
                        VALUES ('$nombre', '$cantidad', '$precio', '$id')";
    
                if (mysqli_query($conn, $sql)) {
                    echo "<h3>Producto '$nombre' comprado exitosamente.</h3>";
                } else {
                    echo "ERROR: No se pudo insertar '$nombre'. " . mysqli_error($conn);
                }
                break;
            }
        }
    }
    mysqli_close($conn);
    ?>
    <button onclick="window.location.href='../index.html'" class="btn btn-primary mb-2 mt-3" style="width: 150px;">Inicio</button>
    <button onclick="window.history.back()" class="btn btn-primary mb-2 mt-3" style="width: 150px;">Regresar</button>
</section>

</body>
</html>
