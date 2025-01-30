import "./Form.scss";
import Label from "../../../components/label/Label";
import Button from '../../../components/button/Button'

function SchoolForm() {
  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("school-form"));

    try {
      const response = await fetch("http://localhost:8080/api/createSchools", {
        method: "POST",
        body: formData,
      });

      console.log(await response.json());
    } catch (error) {
      console.error("Error al crear:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("worker-form"));

    try {
      const response = await fetch("/api/worker", {
        method: "PUT",
        body: formData,
      });

      console.log(await response.json());
    } catch (error) {
      console.error("Error of update:", error);
    }
  };
  return (
    <main className="form-container">
      <form id="school-form">
        <h2>Schools</h2>
        <Label
          id="name-school"
          placeHolder="Name of the school"
          title="Name"
          type="text"
          aria-labelledby="Ingrese nombre del colegio"
        />
        <Label
          id="password-school"
          placeHolder="Password of the school"
          title="Password"
          type="password"
          aria-labelledby="Ingrese contraseña del colegio"
        />
        <Label
          id="phone-school"
          placeHolder="Phone of the school"
          title="Phone"
          type="number"
          aria-labelledby="Ingrese el número del colegio"
        />
        <Label
          id="adress-school"
          placeHolder="Adress of the school"
          title="Adress"
          type="text"
          aria-labelledby="Ingrese la dirección del colegio"
        />
        <div id="buttons">
          <Button onClick={handleCreate} text="Crear" />
          <Button onClick={handleEdit} text="Editar" />
        </div>
      </form>
    </main>
  );
}

export default SchoolForm;
