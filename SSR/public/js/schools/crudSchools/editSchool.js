const form = document.getElementById('edit-school-form');
const schoolId = form.getAttribute('data-id'); 

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        address: formData.get('address'),
        email: formData.get('phone'),
        phone: formData.get('phone')
    };

    try {
        const response = await fetch(`/api/schools/edit/${schoolId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('School updated successfully');
            window.location.href = '/api/schools';
        } else {
            const error = await response.json();
            alert(`Error updating school: ${error.message}`);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('An unexpected error occurred.');
    }
});
