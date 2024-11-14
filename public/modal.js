    document.addEventListener('DOMContentLoaded', function() {
    
    var modal = document.getElementById("modal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0]; 

    
    btn.onclick = function() {
        modal.style.display = "block"; 
        actualizarModalCarrito();  
    };

    span.onclick = function() {
        modal.style.display = "none";  
    };


    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";  
        }
    };
});


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

function agregarProductoAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  
    if (!producto || !producto.nombre || !producto.precio) {
        console.error("Producto inválido:", producto);
        return; 
    }

    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito)); 


    actualizarModalCarrito();
}


function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarModalCarrito();  
}


function borrarProductos() {
    localStorage.removeItem("carrito");  
    actualizarModalCarrito();  
}


function agregarProducto(producto) {
    if (!producto || !producto.nombre || !producto.precio) {
        console.error("Producto inválido:", producto);
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push(producto);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarModalCarrito();
}

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


function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);  
    localStorage.setItem("carrito", JSON.stringify(carrito));  
    actualizarModalCarrito();  
}
