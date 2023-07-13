const inventarioButton = document.getElementById('inv-link');
const inventarioTable = document.getElementById('inv-table');
const addProductLink = document.getElementById('add-product-link');
const addProductForm = document.getElementById('add-product-form');
const addProductButton = document.getElementById('add-product-button');
const removeProductLink = document.getElementById('inv-link-remove');
const removeProductTable = document.getElementById('inv-table-remove');
const modifyProductLink = document.getElementById('inv-link-modify');
const modifyProductTable = document.getElementById('inv-table-modify');
const modifyProductForm = document.getElementById('modify-product-form');

modifyProductLink.addEventListener('click', function(event) {
  event.preventDefault();
  modifyProductTable.classList.toggle('hidden');
  document.getElementById('modify-product-form').classList.add('hidden');
  if (!modifyProductTable.classList.contains('hidden')) {
    mostrarInventarioModificar();
    document.getElementById('modify-product-form').classList.add('hidden');
  }
  if (!addProductForm.classList.contains('hidden')) {
    addProductForm.classList.add('hidden');
  }
  if (!inventarioTable.classList.contains('hidden')) {
    inventarioTable.classList.add('hidden');
  }
  if (!removeProductTable.classList.contains('hidden')) {
    removeProductTable.classList.add('hidden');
  }
});


removeProductLink.addEventListener('click', function(event) {
  event.preventDefault();
  removeProductTable.classList.toggle('hidden');
  if (!removeProductTable.classList.contains('hidden')) {
    mostrarInventarioQuitar();
    document.getElementById('modify-product-form').classList.add('hidden');
  }
  if (!addProductForm.classList.contains('hidden')) {
    addProductForm.classList.add('hidden');
  }
  if (!inventarioTable.classList.contains('hidden')) {
    inventarioTable.classList.add('hidden');
  }
  if (!modifyProductTable.classList.contains('hidden')) {
    modifyProductTable.classList.add('hidden');
  }
});


inventarioButton.addEventListener('click', function(event) {
  event.preventDefault();
  inventarioTable.classList.toggle('hidden');
  if (!inventarioTable.classList.contains('hidden')) {
    mostrarInventario();
    document.getElementById('modify-product-form').classList.add('hidden');
  }
  if (!addProductForm.classList.contains('hidden')) {
    addProductForm.classList.add('hidden');
  }
  if (!removeProductTable.classList.contains('hidden')) {
    removeProductTable.classList.add('hidden');
  }
  if (!modifyProductTable.classList.contains('hidden')) {
    modifyProductTable.classList.add('hidden');
  }
});

addProductLink.addEventListener('click', function(event) {
  event.preventDefault();
  addProductForm.classList.toggle('hidden');
  document.getElementById('modify-product-form').classList.add('hidden');
  if (!inventarioTable.classList.contains('hidden')) {
    inventarioTable.classList.add('hidden');
  }
  if (!removeProductTable.classList.contains('hidden')) {
    removeProductTable.classList.add('hidden');
  }
  if (!modifyProductTable.classList.contains('hidden')) {
    modifyProductTable.classList.add('hidden');
  }
});

addProductForm.addEventListener('submit', function(event) {
  event.preventDefault();
  agregarProducto();
});



function mostrarInventarioQuitar() {
  var url = 'https://tpgrupo23.pythonanywhere.com/productos';
  fetch(url)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al obtener el inventario para quitar productos.');
      }
    })
    .then(function(data) {
      var tableHTML = '<tr><th></th><th>Código</th><th>Producto</th><th>Cantidad</th><th>Precio</th></tr>';
      for (var i = 0; i < data.length; i++) {
        tableHTML += '<tr>';
        tableHTML += '<td><button class="remove-btn" data-id="' + data[i].codigo + '"></button></td>';

        tableHTML += '<td>' + data[i].codigo + '</td>';
        tableHTML += '<td>' + data[i].descripcion + '</td>';
        tableHTML += '<td>' + data[i].cantidad + '</td>';
        tableHTML += '<td>' + data[i].precio + '$ </td>';
        tableHTML += '</tr>';
      }
      removeProductTable.innerHTML = tableHTML;
      agregarEventosQuitar();
    })
    .catch(function(error) {
      console.log('Error:', error);
      alert('Error al obtener el inventario para quitar productos.');
    });
}


function agregarEventosQuitar() {
  var removeButtons = document.getElementsByClassName('remove-btn');
  for (var i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener('click', function() {
      var codigo = this.getAttribute('data-id');
      quitarProducto(codigo);
    });
  }
}

function quitarProducto(codigo) {
  var url = 'https://tpgrupo23.pythonanywhere.com/productos/' + codigo;
  fetch(url, {
    method: 'DELETE',
    mode: 'cors',
  })
    .then(function(response) {
      if (response.ok) {
        mostrarInventarioQuitar();
      } else {
        throw new Error('Error al quitar el producto.');
      }
    })
    .catch(function(error) {
      console.log('Error:', error);
      alert('Error al quitar el producto.');
    });
}




function mostrarInventario() {
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
      var tableHTML = '<tr><th>Código</th><th>Producto</th><th>Cantidad</th><th>Precio</th></tr>';
      for (var i = 0; i < data.length; i++) {
        tableHTML += '<tr>';
        tableHTML += '<td>' + data[i].codigo + '</td>';
        tableHTML += '<td>' + data[i].descripcion + '</td>';
        tableHTML += '<td>' + data[i].cantidad + '</td>';
        tableHTML += '<td>' + data[i].precio + '$ </td>';
        tableHTML += '<td><img class="img-producto" data-codigo="' + data[i].codigo + '" src="' + data[i].imagen + '"></td>';
        tableHTML += '</tr>';
      }
      inventarioTable.innerHTML = tableHTML;
    })
    .catch(function(error) {
      console.log('Error:', error);
      alert('Error al obtener el inventario.');
    });
}



function agregarProducto() {
  var codigo = document.getElementById('product-code').value;
  var descripcion = document.getElementById('product-name').value;
  var cantidad = document.getElementById('product-quantity').value;
  var precio = document.getElementById('product-price').value;
  var imagen = document.getElementById('product-image').value; 

  var producto = {
    codigo: codigo,
    descripcion: descripcion,
    cantidad: cantidad,
    precio: precio,
    imagen: imagen 
  };

  var url = 'https://tpgrupo23.pythonanywhere.com/productos';

  fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al agregar el producto.');
      }
    })
    .then(function(data) {
      alert('Producto agregado correctamente.');
      document.getElementById('product-code').value = '';
      document.getElementById('product-name').value = '';
      document.getElementById('product-quantity').value = '';
      document.getElementById('product-price').value = '';
      document.getElementById('product-image').value = ''; // Limpiar el campo de enlace de imagen
    })
    .catch(function(error) {
      console.log('Error:', error);
      alert('Error al agregar el producto.');
    });
}



function mostrarInventarioModificar() {
  var url = 'https://tpgrupo23.pythonanywhere.com/productos';
  fetch(url)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al obtener el inventario para modificar productos.');
      }
    })
    .then(function(data) {
      console.log('Datos obtenidos', data);

      var tableHTML = '<tr><th></th><th>Código</th><th>Producto</th><th>Cantidad</th><th>Precio</th></tr>';
      for (var i = 0; i < data.length; i++) {
        tableHTML += '<tr>';
        tableHTML += '<td><button class="modify-btn" data-id="' + data[i].codigo + '"></button></td>';
        tableHTML += '<td>' + data[i].codigo + '</td>';
        tableHTML += '<td>' + data[i].descripcion + '</td>';
        tableHTML += '<td>' + data[i].cantidad + '</td>';
        tableHTML += '<td>' + data[i].precio + '$ </td>';
        tableHTML += '</tr>';
      }
      modifyProductTable.innerHTML = tableHTML;

      // Agregar evento de clic a los botones "Modificar"
      var modifyButtons = document.getElementsByClassName('modify-btn');
      for (var i = 0; i < modifyButtons.length; i++) {
        modifyButtons[i].addEventListener('click', function(event) {
          var codigo = event.target.getAttribute('data-id');
          obtenerProducto(codigo)
            .then(function(producto) {
              // Completar el formulario de modificación con los datos del producto
              document.getElementById('codigo').value = producto.codigo;
              document.getElementById('descripcion').value = producto.descripcion;
              document.getElementById('cantidad').value = producto.cantidad;
              document.getElementById('precio').value = producto.precio;

              document.getElementById('modify-product-form').classList.remove('hidden');

              // Habilitar el botón "Modificar" en el formulario
              document.getElementById('btn-modificar').disabled = false;

              // Evento de clic del botón "Guardar" en el formulario de modificación
              document.getElementById('btn-modificar').addEventListener('click', function() {
                // Obtener los valores del formulario
                var codigo = document.getElementById('codigo').value;
                var descripcion = document.getElementById('descripcion').value;
                var cantidad = document.getElementById('cantidad').value;
                var precio = document.getElementById('precio').value;

                // Realizar la solicitud PUT al endpoint correspondiente de la API
                fetch('https://tpgrupo23.pythonanywhere.com/productos/' + codigo, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    descripcion: descripcion,
                    cantidad: cantidad,
                    precio: precio
                  })
                })
                  .then(function(response) {
                    if (response.ok) {
                      // El producto se ha modificado correctamente
                      alert('Producto modificado correctamente.');
                      // Actualizar la tabla o realizar otras acciones necesarias
                    } else {
                      // Hubo un error al modificar el producto
                      throw new Error('Error al modificar el producto.');
                    }
                  })
                  .catch(function(error) {
                    console.log('Error:', error);
                    alert('Error al modificar el producto.');
                  });

                // Deshabilitar el botón "Modificar" después de guardar los cambios
                document.getElementById('btn-modificar').disabled = true;
              });
            })
            .catch(function(error) {
              console.log('Error:', error);
              alert('Error al obtener la información del producto.');
            });
        });
      }
    })
    .catch(function(error) {
      console.log('Error:', error);
      alert('Error al obtener el inventario para modificar productos.');
    });
}

document.getElementById("guardar").addEventListener("click", function(event) {
  event.preventDefault();
  guardarProducto();
});

function guardarProducto() {
  const codigo = document.getElementById("codigo").value;
  const descripcion = document.getElementById("descripcion").value;
  const cantidad = document.getElementById("cantidad").value;
  const precio = document.getElementById("precio").value;

  const data = {
    descripcion: descripcion,
    cantidad: cantidad,
    precio: precio
  };

  fetch(`https://tpgrupo23.pythonanywhere.com/productos/${codigo}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al modificar el producto.');
      }
    })
    .then(function(data) {
      if (data) {
        alert(data.message);
      } else {
        alert('Producto modificado correctamente.');
      }
      location.reload();
    })
    .catch(function(error) {
      console.error("Error:", error);
      alert('Error al modificar el producto.');
    });
}


function obtenerProducto(codigo) {
  var url = 'https://tpgrupo23.pythonanywhere.com/productos/' + codigo;
  return fetch(url)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al obtener la información del producto con código ' + codigo);
      }
    })
    .catch(function(error) {
      console.log('Error:', error);
      throw new Error('Error al obtener la información del producto con código ' + codigo);
    });
}


