const endpointStudent = "http://localhost:8080/api/student/";
const buttonsStudent = document.querySelectorAll(".delete-button");
//! Eliminar
buttonsStudent.forEach((button) => {
  button.addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-id");
    console.log(endpointStudent + id);
    fetch(endpointStudent + id, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          console.log("error al eliminar el estudiante");
        }
        e.target.parentElement.remove();
      })
      .catch((err) => {
        console.log("ha habido un problema en la red");
      });
  });
});

//! UPDATE
let formStudent = document.querySelector("#update-student-form");
const idStudent = formStudent.getAttribute("data-id");
formStudent.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formStudent);

  console.log("Data form user:", idStudent, formData);

  try {
    const response = await fetch(endpointStudent + idStudent, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      console.log({ message: `Error updating student: ${error.message}` });
    }

    console.log("Endpoint fetched:", response);
    window.location.href = "/admin";
  } catch (error) {
    console.error("Error:", error);
    console.log({ message: "An unexpected error occurred in student form" });
  }
});
