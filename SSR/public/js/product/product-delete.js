const endpoint = '/api/products/'
const buttons = document.querySelectorAll('.delete-button');

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.delete-button');
  buttons.forEach((button) => {
    alert("hola");
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      console.log(endpoint + id);
      fetch(endpoint + id, {
        method: 'DELETE',
      })
        .then((res) => {
          if (!res.ok) {
            console.log("error al eliminar el producto");
          }
          e.target.parentElement.remove();
        })
        .catch((err) => {
          console.log("ha habido un problema en la red" + err.message);
        });
    });
  });
});