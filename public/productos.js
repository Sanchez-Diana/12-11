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
        const response = await fetch('./productos.json');
        const data = await response.json();

        const prodDestacados = data.filter(producto =>
            producto.id && [1, 2, 4, 5, 6, 7, 8, 9].includes(producto.id)
        );

        const contenedorProductos = document.getElementById('productos-destacados');
        if (!contenedorProductos) {
            console.error('El contenedor de productos destacados no se encuentra.');
            return;
        }

        contenedorProductos.innerHTML = '';

        prodDestacados.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.className = 'col-lg-4 col-md-4 col-sm-4 mb-4';
            productoDiv.innerHTML = `
                <div class="card text-center h-100">
                    <img src="${producto.imageUrl || 'placeholder.jpg'}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text flex-grow-1">${producto.descripcion}</p>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <strong class="fs-4 mx-auto">$${producto.precio}</strong>
                            <div>
                                <button class="btn btn-outline-primary p-2 btn-agregar-carrito">
                                    <i class="bi bi-cart4"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            contenedorProductos.appendChild(productoDiv);

            
            const btnAgregar = productoDiv.querySelector('.btn-agregar-carrito');
            btnAgregar.addEventListener('click', function() {
                agregarProducto(producto);
            });
        });
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
}
