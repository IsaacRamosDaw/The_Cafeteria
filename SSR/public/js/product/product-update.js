const { response } = require("express");

const endpoint = 'http://localhost:8080/api/products/'
const form = document.getElementById('update-product-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = form.getAttribute('data-id');
  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
  }

  try {
    const response = await fetch(endpoint + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return alert(response.message);
    }

    return alert('Producto actualizado con éxito');
  } catch (err) {
    console.error('Error de red:', err.message);
    alert('Error al conectar con el servidor');
  }
});