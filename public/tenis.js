fetch('./productos.json')
    .then(response => response.json())
    .then(data => {
        const productosTenis = data.filter(producto => producto.categoria === "Tenis");

        const contenedor = document.getElementById('productos-container');

        productosTenis.forEach(producto => {
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
                        <button onclick="agregarProducto()" class="btn btn-outline-primary p-2"><i class="bi bi-cart4"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;

            contenedor.appendChild(productoDiv);
        });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
