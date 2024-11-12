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
    const productList = document.getElementById('productList');
    productList.innerHTML = '<h1 class="text-center mb-4">Resulatados de tu busqueda</h1>';

    if (products.length === 0) {
        return;
    }

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'col-lg-4 col-md-4 col-sm-4 mb-4';
        productDiv.innerHTML = `
            <div class="card text-center" style="width: 20em;">
                   <img src="${product.imageUrl}" class="card-img-top mb-2" style="box-shadow: 0px 1px 0px 0px rgba(213,213,213,0.90);" alt="">
                    <div class="card-body p-0 " style="height: 180px; padding-bottom: 15px;">
                        <h5 class="card-title">${product.nombre}</h5>
                        <p class="card-text pb-3">${product.descripcion}</p>
                        <strong><p class="card-text fs-4">$${product.precio}</p></strong>
                    </div>
                
                <a href="#" class="btn btn-primary mb-2 mt-3" style="width: 200px; align-self: center;">Comprar</a>
            </div>`;
        productList.appendChild(productDiv);
    });
}

function searchProducts(products) {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const productList = document.getElementById('productList');
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
