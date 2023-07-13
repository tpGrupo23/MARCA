// todo esto de acá empieza la animación del carousel!
const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; 
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; 
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); 
    });
});

const autoSlide = () => {
    
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); 
    let firstImgWidth = firstImg.clientWidth + 14;
    
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { 
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
   
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

//termina el carousel.

//empieza el menú desplegable!
let menuVisible = false;
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}
function seleccionar(){
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
//termina el menú

//empieza la validación de formulario!
  function enviarFormulario() {
    const nombre = document.getElementById('nombre');
    const telefono = document.getElementById('telefono');
    const correo = document.getElementById('correo');
    const tema = document.getElementById('tema');
    const mensaje = document.getElementById('mensaje');

    if (nombre.value === '') {
      alert('Por favor, ingresa tu nombre.');
      nombre.focus();
      return;
    }

    const expresionRegularTelefono = /^[0-9]{10}$/;
    if (!expresionRegularTelefono.test(telefono.value)) {
      alert('Por favor, ingresa un número de teléfono válido (no incluyas el código de área).');
      telefono.focus();
      return;
    }

    const expresionRegularCorreo = /^\S+@\S+\.\S+$/;
    if (!expresionRegularCorreo.test(correo.value)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      correo.focus();
      return;
    }

    if (tema.value === '') {
      alert('Por favor, ingresa un tema para el mensaje.');
      tema.focus();
      return;
    }

    if (mensaje.value === '') {
      alert('Por favor, ingresa un mensaje.');
      mensaje.focus();
      return;
    }

    // Si todos los campos son válidos, se envía el formulario
    alert('Formulario enviado exitosamente!');
    document.getElementById('formulario-contacto').reset();
  }





















var lastScrollTop = 0;

window.addEventListener('scroll', function() {
  var currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScrollTop > lastScrollTop) {
    // Scroleando hacia abajo
    document.getElementById('encabezado').classList.add('scroleando-abajo');
  } else {
    // Scroleando hacia arriba
    document.getElementById('encabezado').classList.remove('scroleando-abajo');
  }
  lastScrollTop = currentScrollTop;
});

function toggleCuadrado() {
  var cuadrado = document.getElementById("cuadrado");
  cuadrado.style.display = cuadrado.style.display === "none" ? "block" : "none";
}












// Variable para almacenar los productos agregados al carrito
var carrito = [];
var inventario = [];

function mostrarInventario() {
  var inventarioTable = document.getElementById('inventarioTable');
  var url = 'https://tpgrupo23.pythonanywhere.com/productos';
  fetch(url)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al obtener el inventario.');
      }
    })
    .then(function(data) {
      inventario = data;

      var tableHTML = '<tr><th></th><th></th><th></th><th></th><th></th><th></th></tr>';
      for (var i = 0; i < data.length; i++) {
        tableHTML += '<tr>';
        tableHTML += '<td><img class="img-producto" data-codigo="' + data[i].codigo + '" src="' + data[i].imagen + '"></td>';

        tableHTML += '<td>' + data[i].descripcion + '</td>';
        tableHTML += '<td>' + data[i].cantidad + '  Unidades Disponibles</td>';
        tableHTML += '<td>' + data[i].precio + '$ </td>';
        tableHTML += '<td><button class="agregar-carrito" data-codigo="' + data[i].codigo + '" data-stock="' + data[i].cantidad + '" data-descripcion="' + data[i].descripcion + '" data-precio="' + data[i].precio + '">Agregar al carrito</button></td>';
        tableHTML += '</tr>';
      }
      inventarioTable.innerHTML = tableHTML;

      // Agregar evento click al botón "Agregar al carrito"
      var botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
      botonesAgregarCarrito.forEach(function(boton) {
        boton.addEventListener('click', function() {
          var codigoProducto = this.getAttribute('data-codigo');
          var stockProducto = parseInt(this.getAttribute('data-stock'));
          var descripcionProducto = this.getAttribute('data-descripcion');
          var precioProducto = parseFloat(this.getAttribute('data-precio')); // Obtener el precio del producto
      
          var productoExistente = carrito.find(function(producto) {
            return producto.codigo === codigoProducto;
          });
      
          if (productoExistente) {
            // Si el producto ya existe en el carrito y no supera el stock disponible, incrementar la cantidad
            if (productoExistente.cantidad < stockProducto) {
              productoExistente.cantidad++;
            } else {
              alert('No hay suficiente stock disponible para este producto.');
            }
          } else {
            // Si el producto no existe en el carrito y hay stock disponible, agregarlo
            if (stockProducto > 0) {
              var nuevoProducto = {
                codigo: codigoProducto,
                cantidad: 1,
                descripcion: descripcionProducto,
                precio: precioProducto // Asignar el precio del producto al nuevo producto en el carrito
              };
              carrito.push(nuevoProducto);
            } else {
              alert('No hay stock disponible para este producto.');
            }
          }

          // Actualizar la visualización del carrito y el inventario
          mostrarCarrito();
          mostrarInventario();
        });
      });
    })
    .catch(function(error) {
      console.log('Error:', error);
      alert('Error al obtener el inventario.');
    });
}

var comprarButton = document.createElement('button');
comprarButton.innerText = 'Comprar';

comprarButton.classList.add('custom-button');


function mostrarCarrito() {
  var carritoTable = document.getElementById('carritoTable');
  var tableHTML = '<tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th></th></tr>';
  for (var i = 0; i < carrito.length; i++) {
    tableHTML += '<tr>';
    tableHTML += '<td>' + carrito[i].descripcion + '</td>';
    tableHTML += '<td>';
    tableHTML += '<span class="cantidad">' + carrito[i].cantidad + '</span>';
    tableHTML += '</td>';
      var precioTotal = carrito[i].precio * carrito[i].cantidad;
      tableHTML += '<td>' + precioTotal + '$</td>';
   
       tableHTML += '<td><button class="quitar-carrito" data-index="' + i + '"></button></td>';
       tableHTML += '<td>';
       tableHTML += '<button class="decrementar-cantidad" data-index="' + i + '"></button>';
       tableHTML += '</td>';
       tableHTML += '<td><button class="incrementar-cantidad" data-index="' + i + '"></button></td>';
       tableHTML += '</tr>';

    
    tableHTML += '</tr>';
  }
  carritoTable.innerHTML = tableHTML;

  // Agregar botón "Comprar"
  comprarButton.addEventListener('click', function() {
    // Realizar la compra de todos los productos en el carrito
    var promesasCompra = carrito.map(function(producto) {
      var url = 'https://tpgrupo23.pythonanywhere.com/productos/' + producto.codigo;
      return fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cantidad: -producto.cantidad }) // Restar la cantidad del producto en el carrito al inventario
      })
        .then(function(response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error al comprar los productos.');
          }
        })
        .catch(function(error) {
          console.log('Error:', error);
          alert('Error al comprar los productos.');
        });
    });
  
    Promise.all(promesasCompra)
      .then(function() {
        // Actualizar la visualización del carrito y del inventario
        carrito = [];
        mostrarCarrito();
        mostrarInventario();
      });
  });
  // Agregar el botón al carritoTable
  var carritoRow = document.createElement('tr');
  var carritoCell = document.createElement('td');
  carritoCell.setAttribute('colspan', '4');
  carritoCell.appendChild(comprarButton);
  carritoRow.appendChild(carritoCell);
  carritoTable.appendChild(carritoRow);

  // Agregar evento click al botón "Quitar"
  var botonesQuitarCarrito = document.querySelectorAll('.quitar-carrito');
  botonesQuitarCarrito.forEach(function(boton) {
    boton.addEventListener('click', function() {
      var index = parseInt(this.getAttribute('data-index'));
      carrito.splice(index, 1); // Eliminar el producto del carrito
      mostrarCarrito(); // Actualizar la visualización del carrito
      mostrarInventario(); // Actualizar la visualización del inventario
    });
  });

  // Agregar eventos click a los botones de incremento y decremento
  var botonesIncrementarCantidad = document.querySelectorAll('.incrementar-cantidad');
botonesIncrementarCantidad.forEach(function(boton) {
  boton.addEventListener('click', function() {
    var index = parseInt(this.getAttribute('data-index'));
    var codigoProducto = carrito[index].codigo;
    
    console.log('Código del producto en el carrito:', codigoProducto);
    
    var productoEnInventario = inventario.find(function(producto) {
      return parseInt(producto.codigo) === parseInt(codigoProducto);
    });
    
    console.log('Producto encontrado en el inventario:', productoEnInventario);
    
    if (productoEnInventario) {
      var stockProducto = productoEnInventario.cantidad;
      console.log('Stock del producto:', stockProducto);
      
      if (carrito[index].cantidad < stockProducto) {
        carrito[index].cantidad++;
        mostrarCarrito();
      } else {
        alert('No hay suficiente stock disponible para este producto.');
      }
    } else {
      console.log('El producto no está presente en el inventario.');
    }
  });
});
  
  var botonesDecrementarCantidad = document.querySelectorAll('.decrementar-cantidad');
  botonesDecrementarCantidad.forEach(function(boton) {
    boton.addEventListener('click', function() {
      var index = parseInt(this.getAttribute('data-index'));
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--; // Decrementar la cantidad del producto en el carrito
        mostrarCarrito(); // Actualizar la visualización del carrito
      }
    });
  });
}



// Llamar a la función para mostrar el inventario al cargar la página
mostrarInventario();
