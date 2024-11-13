async function cargarProductos() {
    const contenedor = document.getElementById('contenedor');
    if (!contenedor) {
        console.error('El contenedor no existe en el DOM');
        return;
    }

    // Mostrar el spinner de carga mientras se obtienen los productos
    contenedor.innerHTML = '<div class="spinner-border" role="status"><span class="visually-hidden">Cargando...</span></div>';

    try {
        const response = await fetch('./productos.json');
        const data = await response.json();

        // Filtrar productos destacados por su id
        const prodDestacados = data.filter(producto =>
            producto.id && [1, 2, 4, 5, 6, 7, 8, 9].includes(producto.id)
        );

        // Mostrar los productos destacados
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
                             <button class="btn btn-outline-primary p-2 btn-agregar-carrito" data-producto='${JSON.stringify(producto)}'>
                            <i class="bi bi-cart4"></i> Agregar al carrito
                        </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            contenedorProductos.appendChild(productoDiv);

            // Agregar el evento al botón para agregar productos al carrito
            const agregarProducto = productoDiv.querySelector('.btn-agregar-carrito');
            agregarProducto.addEventListener('click', function() {
                // Obtener el producto desde el atributo data-producto
                const producto = JSON.parse(agregarProducto.getAttribute('data-producto'));
                agregarProductoAlCarrito(producto);
            });
        });
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
}
