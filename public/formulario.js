async function cargarProductos() {
    try {
        const response = await fetch('./productos.json');
        if (!response.ok) throw new Error('Error en la respuesta de la red');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error cargando los productos:', error);
        return [];
    }
}

function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.className = 'col-lg-3 col-md-6 col-sm-12 mb-4';

        productDiv.innerHTML = `
            <div class="card text-center h-100">
                <img src="${producto.imageUrl}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text flex-grow-1">${producto.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                        <strong class="fs-4 mx-auto">$${producto.precio}</strong>
                        <div>
                            <a href="#" class="btn btn-outline-primary me-2 p-2 edit-btn" data-id="${producto.id}"><i class="bi bi-pencil"></i></a>
                            <a href="#" class="btn btn-outline-danger p-2"><i class="bi bi-trash3-fill"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        productList.appendChild(productDiv);
    });
}

const productState = { products: [] };

cargarProductos().then(products => {
    productState.products = products;
    displayProducts(products);
});

// Función para buscar productos
function searchProducts(query) {
    const filteredProducts = productState.products.filter(product =>
        product.nombre.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filteredProducts);
}

// Evento para manejar la búsqueda
document.getElementById('searchInput').addEventListener('input', (event) => {
    const query = event.target.value;
    searchProducts(query);
});

// Manejar clic en el botón de edición y eliminación
document.addEventListener('click', async (event) => {
    if (event.target.closest('.edit-btn')) {
        const productId = event.target.closest('.edit-btn').getAttribute('data-id');
        const producto = productState.products.find(p => p.id == productId);

        if (producto) {
            console.log('Editando producto:', producto);
            document.getElementById('editNombre').value = producto.nombre;
            document.getElementById('editDescripcion').value = producto.descripcion;
            document.getElementById('editPrecio').value = producto.precio;
            document.getElementById('editId').value = producto.id;

            const modal = new bootstrap.Modal(document.getElementById('editForm'));
            modal.show();
        }
    }

    // Manejar clic en el botón de eliminación
    if (event.target.closest('.btn-outline-danger')) {
        const productId = event.target.closest('.btn-outline-danger').parentElement.querySelector('.edit-btn').getAttribute('data-id');

        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (confirmDelete) {
            try {
                const response = await fetch(`/Productos/${productId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    const deletedProduct = await response.json();
                    alert(deletedProduct.Mensaje);
                    
                    // Eliminar el producto del estado local
                    productState.products = productState.products.filter(p => p.id != productId);
                    displayProducts(productState.products); // Refrescar la visualización
                } else {
                    const error = await response.json();
                    alert(error);
                }
            } catch (error) {
                alert('Error al eliminar el producto. Por favor, inténtelo más tarde.');
            }
        }
    }
});

// Manejar el envío del formulario de edición
document.getElementById('editProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('Enviando formulario de edición');

    const id = document.getElementById('editId').value;
    const nombre = document.getElementById('editNombre').value;
    const descripcion = document.getElementById('editDescripcion').value;
    const precio = document.getElementById('editPrecio').value;

    try {
        const response = await fetch(`/Productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, descripcion, precio }),
        });

        if (response.ok) {
            const updatedProduct = await response.json();
            alert(updatedProduct.mensaje);

            // Actualizar el producto en el estado local
            const index = productState.products.findIndex(p => p.id == id);
            if (index !== -1) {
                productState.products[index] = { id, nombre, descripcion, precio };
                displayProducts(productState.products); // Refrescar la visualización
            } else {
                console.error('Producto no encontrado para actualizar');
            }
        } else {
            const error = await response.json();
            console.error('Error al actualizar el producto:', error);
            alert(error);
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Error al actualizar el producto. Por favor, inténtelo más tarde.');
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('editForm'));
    modal.hide();
});
