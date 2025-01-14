const form = document.getElementById('edit-admin-form');
const adminId = form.getAttribute('data-id'); // Obtén el ID del admin desde un atributo del formulario

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const formData = new FormData(form);
    const data = {
        username: formData.get('username'),
    };

    try {
        const response = await fetch(`/api/admin/edit/${adminId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Admin updated successfully');
            window.location.href = '/api/admin';
        } else {
            const error = await response.json();
            alert(`Error updating admin: ${error.message}`);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('An unexpected error occurred.');
    }
});
