function comprarProductos() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        alert("El carrito está vacío..");
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


    const loadingMessage = document.getElementById("loadingMessage");
    if (loadingMessage) loadingMessage.style.display = "block";


    fetch("./php/comprod.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productosParaEnviar)  
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
