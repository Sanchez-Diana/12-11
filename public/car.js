let carrito = []; 
let total = 0; 


const productos = [
    {
        "id": "1",
        "nombre": "Camiseta de la Selección Nacional",
        "descripcion": "Camiseta oficial de la selección nacional de fútbol para la temporada 2024.",
        "precio": 67500,
        "categoria": "Futbol",
        "stock": 50,
        "imageUrl": "./img/Arg.png"
    },
    {
        "id": "2",
        "nombre": "Pelota de Fútbol Adidas Tango 1978",
        "descripcion": "Balón de fútbol Adidas Tango, ideal para partidos y entrenamientos.",
        "precio": 40500,
        "categoria": "Futbol",
        "stock": 100,
        "imageUrl": "./img/PelotaTango.png"
    },
    {
        "id": "3",
        "nombre": "Botin Nike 'Tiempo'",
        "descripcion": "Botas de fútbol Nike Tiempo, con diseño ergonómico y máxima comodidad, plantilla con amortiguación.",
        "precio": 108000,
        "categoria": "Futbol",
        "stock": 30,
        "imageUrl": "./img/Botin.png"
    },
 
];
function agregarProducto(id, nombre, precio) {
    const producto = { id, nombre, precio };
    carrito.push(producto);
    total += precio;
    mostrarCarrito();
}

function mostrarCarrito() {
    const carritoUl = document.getElementById('carrito');
    carritoUl.innerHTML = '';  

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'x';
        eliminarBtn.onclick = () => eliminarProducto(index);
        
        li.appendChild(eliminarBtn);
        carritoUl.appendChild(li);
    });

    document.getElementById('total').textContent = `Total: $${total}`;
}

function eliminarProducto(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    mostrarCarrito();
}


function borrarProductos() {
    carrito = [];
    total = 0;
    mostrarCarrito();
}


function actualizarModalCarrito() {
    mostrarCarrito();
}

document.getElementById('myBtn').addEventListener('click', function() {
    modal.style.display = "block";
    actualizarModalCarrito();
});


document.querySelector('.close').addEventListener('click', function() {
    modal.style.display = "none";
});

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};