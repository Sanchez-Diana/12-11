async function cargarProductos() {
    try {
        const response = await fetch('./productos.json');
        if (!response.ok) {
            throw new Error('Error en la respuesta de la red');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error cargando los productos:', error);
        return [];
    }
}
function displayProducts(products) {
    const productList = document.getElementById('productList2');
    productList.innerHTML = '<h1 class="text-center mb-4">Resultados de tu búsqueda</h1>';

    if (products.length === 0) {
        return;
    }
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
function searchProducts(products) {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const productList = document.getElementById('productList2');
    if (!query) {
        productList.innerHTML = '';
    } else {
        const filteredProducts = products.filter(product =>
            product.nombre.toLowerCase().includes(query)
        );
        displayProducts(filteredProducts);
    }
}

document.getElementById('searchInput').addEventListener('input', () => {
    if (productState.products) {
        searchProducts(productState.products);
    }
});

const productState = {
    products: []
};

cargarProductos().then(products => {
    productState.products = products;
});