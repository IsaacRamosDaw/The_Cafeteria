const endpoint = '/api/admin/';
const buttons = document.querySelectorAll('.delete-button');

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        fetch(endpoint + id, {
            method: "DELETE",
        })
        .then((res) => {
            if (!res.ok) {
                console.log("Error");
                return;
            }
            e.target.closest('li').remove();
        })
        .catch((error) => {
            console.log("Problema", error);
        });
    });
});
