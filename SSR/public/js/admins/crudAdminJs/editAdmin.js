const endpointEditAdmin = 'http://localhost:8080/api/admin/';
const form = document.getElementById('edit-admin-form');
const adminId = form.getAttribute('data-id'); 

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const formData = new FormData(form);

    try {
        const response = await fetch(endpointEditAdmin+adminId, {
            method: 'PUT',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Admin updated successfully: ', result);
            window.location.href = '/admin';
        } else {
            const error = await response.json();
            console.log(`Error updating admin: ${error.message}`);
        }
    } catch (err) {
        console.error('Error:', err);
        console.log('An unexpected error occurred.');
    }
});
