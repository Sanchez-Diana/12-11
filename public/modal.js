// Definir todas las funciones primero para que estén disponibles cuando las necesites

// Función para agregar un producto al carrito
function agregarProducto(producto) {
    if (!producto) {
        console.error("Producto no válido:", producto);
        return; // Producto es null o undefined
    }
    if (!producto.nombre || !producto.precio) {
        console.error("Producto inválido, faltan propiedades:", producto);
        return; 
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);  // Agregar producto al carrito
    localStorage.setItem("carrito", JSON.stringify(carrito)); 

    actualizarModalCarrito();
}

// Función para actualizar la vista del carrito en el modal
function actualizarModalCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoUl = document.getElementById('carrito');
    const totalElement = document.getElementById('total');
    carritoUl.innerHTML = ''; 

    let total = 0;

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;

        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'x';
        eliminarBtn.onclick = () => eliminarProducto(index);

        li.appendChild(eliminarBtn);
        carritoUl.appendChild(li);

        total += producto.precio;
    });

    totalElement.textContent = `Total: $${total}`;
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);  
    localStorage.setItem("carrito", JSON.stringify(carrito));  

    actualizarModalCarrito();
}

// Función para borrar todos los productos del carrito
function borrarProductos() {
    localStorage.removeItem("carrito");  
    actualizarModalCarrito(); 
}

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("modal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0]; 

    // Mostrar el modal
    btn.onclick = function() {
        modal.style.display = "block"; 
        actualizarModalCarrito();  
    };

    // Cerrar el modal
    span.onclick = function() {
        modal.style.display = "none";  
    };

    // Cerrar el modal si se hace clic fuera de él
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";  
        }
    };

    // Cargar productos desde el archivo JSON
    fetch('./productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar productos: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos cargados desde productos.json:", data); 

            if (Array.isArray(data) && data.length > 0) {
                const primerProducto = data[0];
                console.log("Primer producto:", primerProducto);  

                if (primerProducto && primerProducto.nombre && primerProducto.precio) {
                    agregarProducto(primerProducto); 
                } else {
                    console.error("El primer producto no tiene la estructura esperada:", primerProducto);
                }
            } else {
                console.error('No se encontraron productos en el archivo JSON o el archivo está vacío.');
            }
        })
        .catch(error => {
            console.error('Error al cargar productos:', error);
        });
});
