const endpoint = '/api/student/'
const buttons = document.querySelectorAll('.delete-button');

//! Eliminar
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-id');
    console.log(endpoint + id);
    fetch(endpoint + id, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          console.log("error al eliminar el estudiante");
        }
        e.target.parentElement.remove();
        console.log("studiante con este id eliminado")

      }).catch((err) => {
        console.log("ha habido un problema en la red")
      })
  })
})

//! UPDATE
  const form = document.getElementById('update-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir el envío predeterminado del formulario

    // Crear un objeto con los datos del formulario
    const formData = new FormData(form);
    const urlEncodedData = new URLSearchParams(formData).toString(); // Convertir a URL-encoded

    try {
      // Enviar la solicitud al servidor
      const response = await fetch('/api/view/1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Indicamos el tipo correcto
        },
        body: urlEncodedData, // Enviar los datos como URL-encoded
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Actualización exitosa:', result);
        alert('Datos enviados correctamente');
      } else {
        console.error('Error al enviar los datos:', response.statusText);
        alert('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error al conectar con el servidor');
    }
  });
