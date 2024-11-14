document.addEventListener('DOMContentLoaded', async () => {
    await cargarProductos();
});

async function cargarProductos() {
    const contenedor = document.getElementById('contenedor');
    if (contenedor) {
        contenedor.innerHTML = '<div class="spinner-border" role="status"><span class="visually-hidden">Cargando...</span></div>';
    } else {
        console.error('El contenedor no existe en el DOM');
        return;
    }

    try {
        const respuesta = await fetch('http://localhost:3000/productos');
        const productos = await respuesta.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        contenedor.innerHTML = '<p>Error al cargar los productos.</p>';
    }
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById('contenedor');
    let productosHTML = ''; 

    productos.forEach(producto => {
        productosHTML += `
            <div class="card text-center h-100">
                <img src="${producto.imageUrl || 'placeholder.jpg'}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text flex-grow-1">${producto.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                        <strong class="fs-4 mx-auto">$${producto.precio}</strong>
                        <div>
                            <button onclick="agregarProducto(${JSON.stringify(producto)})" class="btn btn-outline-primary p-2 btn-agregar-carrito">
                                <i class="bi bi-cart4"></i> Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    const boton = productoDiv.querySelector('button');
    boton.onclick = function() {
        agregarProducto(producto);
    };
    contenedor.innerHTML = productosHTML;
    
}
