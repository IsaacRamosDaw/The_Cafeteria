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
const form = document.getElementById('update-student-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = form.getAttribute('data-id');
  console.log("este es el id: " + id)


  const formData = new FormData(form);
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    age: formData.get("age")
  }

  console.log("username :" + data.username)
  console.log("password :"+ data.password)
  console.log("phone :"+ data.phone)
  console.log("age :" + data.age)

  try {
    await fetch('/api/student/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(data), 
    });

   
      window.location.href = '/api/view/student';
    
  } catch (err) {

    console.error('Error de red:', err.message);
    alert('Error al conectar con el servidor');
  }
});
