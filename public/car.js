// let carrito = JSON.parse(localStorage.getItem("carrito")) || []; 
// console.log(carrito); // Verifica si el carrito contiene productos

// let total = 0; 


// const productos = [
//     {
//         "id": "1",
//         "nombre": "Camiseta de la Selección Nacional",
//         "precio": 67500,
//     },
//     {
//         "id": "2",
//         "nombre": "Pelota de Fútbol Adidas Tango 1978",
//         "precio": 40500,
//     },
//     {
//         "id": "3",
//         "nombre": "Botin Nike 'Tiempo'",
//         "precio": 108000,
//     }
// ];
// async function mostrarCarrito() { 
//     const carritoUl = document.getElementById('carrito');
//     carritoUl.innerHTML = '';  // Limpia la lista del carrito

//     carrito.forEach((producto, index) => {
//         if (!producto || !producto.nombre || !producto.precio) {
//             console.error("Producto inválido en el carrito:", producto);
//             return;  // Ignorar productos inválidos
//         }

//         const li = document.createElement('li');
//         li.textContent = `${producto.nombre} - $${producto.precio}`;

//         const eliminarBtn = document.createElement('button');
//         eliminarBtn.textContent = 'x';
//         eliminarBtn.onclick = () => eliminarProducto(index);

//         li.appendChild(eliminarBtn);
//         carritoUl.appendChild(li);
//     });
// }

// function agregarProducto(producto) {
//     // Aquí puedes agregar lógica para agregar el producto al carrito
//     console.log("Producto agregado:", producto);

//     // Validar el producto antes de agregarlo
//     if (!producto || !producto.nombre || !producto.precio) {
//         console.error("Producto inválido:", producto);
//         return;  // No agregar productos inválidos
//     }

//     // Obtener el carrito desde el localStorage o iniciar uno vacío
//     let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//     // Agregar el producto
//     carrito.push(producto);
//     localStorage.setItem("carrito", JSON.stringify(carrito));

//     // Actualizar el modal del carrito
//     actualizarModalCarrito();
// }




// function eliminarProducto(index) {
//     total -= carrito[index].precio;  // Restar el precio al total
//     carrito.splice(index, 1);        // Eliminar del carrito
//     mostrarCarrito();                // Actualizar vista del carrito
// }

// function borrarProductos() {
//     carrito = [];  // Vaciar carrito
//     total = 0;     // Resetear total
//     mostrarCarrito();  // Mostrar carrito vacío
// }

// productos.forEach((producto, index) => {
//     document.getElementById(`agregar-${producto.id}`).addEventListener('click', () => {
//         agregarAlCarrito(producto);
//     });
// });

// // Llamada inicial para mostrar el carrito
// mostrarCarrito();

// function actualizarModalCarrito() {
//     mostrarCarrito();
// }

// document.getElementById('myBtn').addEventListener('click', function() {
//     modal.style.display = "block";
//     actualizarModalCarrito();
// });


// document.querySelector('.close').addEventListener('click', function() {
//     modal.style.display = "none";
// });

// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// };
