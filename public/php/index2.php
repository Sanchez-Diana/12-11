<!DOCTYPE html>
<html lang="en">
   <head>
      <title>SportZone</title>
      <link rel="stylesheet" href="estiloformu2.css">
      <link rel="icon" href="logotienda.png">
   </head>
   <body>
      <style>
body{
    margin: auto;
    background-color: #413a38;

}
#info{
    color: white;
    background-color: #fffc47;
    box-shadow: 0px 0px 0px 2px black;
    border-radius: 37px;
    text-align: center;
    margin-top: 15%;
    margin-inline: 30%;
    width: 500px;
    height: 175px;
}
label{
   display: flex;
    color: black;
    font-size: 20px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    flex-direction: column;
}
input:focus {
    -moz-box-shadow:0 0 10px 3px rgb(51, 171, 223);
    -webkit-box-shadow:0 0 10px 3px rgb(51, 171, 223);
    box-shadow:0 0 10px 3px rgb(51, 171, 223);
}
      </style>
   <section id="info">
    <form action="comprar.php" method="post">     

<select style="font-size: 20px; margin-top: 20px;" name="id_producto" required>
            <option value="">Seleccione un producto</option>
            <?php
            include 'DB.php';
            $json_data = file_get_contents('../productos.json');
            $productos = json_decode($json_data, true);
            foreach ($productos as $producto) {
                echo "<option value='{$producto['id']}'>{$producto['nombre']} - \${$producto['precio']}</option>";
            }
            ?>
        </select>
    <p>
        <label for="Cantidad">Cantidad:</label>
        <input style="width: 90px; height: 20px; margin-top: 10px;" type="number" name="Cantidad" min="1" max="99">
    </p>
    <button type="submit" class="btn btn-primary mb-2 mt-3" style="width: 200px;">Comprar</button>
    <button onclick="window.location.href='../index.html'" class="btn btn-primary mb-2 mt-3" style="width: 200px;">Inicio</button>
    
    </form>
      </section>
   </body>
</html>