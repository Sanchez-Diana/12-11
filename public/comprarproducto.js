// Función para realizar la compra de los productos en el carrito
function comprarProductos() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verificar que el carrito no esté vacío
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const productosParaEnviar = carrito.map(producto => ({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        categoria: producto.categoria,
        stock: producto.stock,
        imageUrl: producto.imageUrl
    }));

    // Mostrar mensaje de carga (opcional)
    const loadingMessage = document.getElementById("loadingMessage");
    if (loadingMessage) loadingMessage.style.display = "block";

    // Enviar la compra al servidor
    fetch("./php/comprod.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productosParaEnviar)  // Enviar los productos como JSON
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Compra realizada exitosamente.");
            localStorage.removeItem("carrito");  
            actualizarModalCarrito(); 
        } else {
            alert("Hubo un problema con la compra.");
        }
    })
    .catch(error => {
        console.error("Error al enviar la compra:", error);
        alert("Hubo un error al realizar la compra.");
    })
    .finally(() => {
        if (loadingMessage) loadingMessage.style.display = "none";  
    });
}
