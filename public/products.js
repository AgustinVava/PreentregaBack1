// public/js/products.js

// Manejo del envío del formulario para agregar un producto
document.getElementById('addProductForm').onsubmit = async (e) => {
  e.preventDefault(); // Evita que el formulario se envíe de forma tradicional
  const formData = new FormData(e.target); // Crea un objeto FormData
  const data = Object.fromEntries(formData.entries()); // Convierte FormData a un objeto JSON

  // Envía la solicitud POST para agregar el nuevo producto
  const response = await fetch('/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data), // Convierte el objeto a JSON
  });

  // Verifica si la respuesta fue exitosa
  if (response.ok) {
    location.reload(); // Recargar la página para ver el nuevo producto
  } else {
    // Manejo de errores en caso de que la creación falle
    const errorResponse = await response.json();
    alert(`Error al agregar producto: ${errorResponse.message}`);
  }
};

// Función para eliminar un producto
async function deleteProduct(pid) {
  const response = await fetch(`/products/${pid}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    location.reload(); // Recargar la página para ver los cambios
  } else {
    const errorResponse = await response.json();
    alert(`Error al eliminar producto: ${errorResponse.message}`);
  }
}

// Función para actualizar un producto
async function updateProduct(pid) {
  const newData = prompt("Ingrese los nuevos datos en formato JSON (ejemplo: {title: 'Nuevo título', price: 100}):");
  if (newData) {
    try {
      const parsedData = JSON.parse(newData); // Intenta parsear los nuevos datos
      const response = await fetch(`/products/${pid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedData),
      });
      if (response.ok) {
        location.reload(); // Recargar la página para ver los cambios
      } else {
        const errorResponse = await response.json();
        alert(`Error al actualizar producto: ${errorResponse.message}`);
      }
    } catch (error) {
      alert("Formato JSON inválido. Por favor, inténtalo de nuevo.");
    }
  }
}
