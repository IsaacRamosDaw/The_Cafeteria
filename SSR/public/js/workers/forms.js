const endpointWorker = "http://localhost:8080/api/worker/";

let formWorker = document.querySelector("#worker-form-edit");
const id = formWorker.getAttribute("data-id");

formWorker.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formWorker);

  console.log("Data form user:", id, formData);

  try {
    const response = await fetch(endpointWorker + id, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      console.log({ message: `Error updating worker: ${error.message}` });
    }

    console.log("Endpoint fetched:", response);
    window.location.href = "/admin";
  } catch (error) {
    console.error("Error:", error);
    console.log({ message: "An unexpected error occurred in worker form" });
  }
});

async function deleteWorker(id) {
  id = parseInt(id);
  console.log("Boton: ", id);
  try {
    const response = await fetch(endpointWorker + id, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(`Error eliminando trabajador: ${error.message}`);
    }
    console.log("Trabajador eliminado correctamente");
    window.location.reload();
  } catch (error) {
    console.error("Error:", error);
    console.log("Ocurrió un error inesperado.");
  }
}
