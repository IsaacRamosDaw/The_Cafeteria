const { response } = require("express");

const endpoint = '/api/products/'
const form = document.getElementById('update-product-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = form.getAttribute('data-id');
  console.log("este es el id: " + id)
  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
  }

  console.log("username :" + data.name)
  console.log("price :"+ data.price)
  console.log("description :"+ data.description)

  try {
    await fetch('/api/products/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(data), 
    });
      if(!response.ok){
        window.location.href = '/api/view/product';
      }
  } catch (err) {
    console.error('Error de red:', err.message);
    alert('Error al conectar con el servidor');
  }
});