import Button from "../../../components/button/Button";
import "./Form.scss";
import Label from "../../../components/label/Label";
import create from "../../../services/adminService";

function AdminForm() {

  const endpoint = "http://localhost:8080/api/admin";
  
  
  const handleCreate = (e) => {
    e.preventDefault();

    let nameAdmin = document.querySelector("#name-admin");
    let passwordAdmin = document.querySelector("#password-admin");
    
    const formData = {
      name: nameAdmin.value,
      password: passwordAdmin.value,
    };

    create(formData)
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("admin-form"));

    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        body: formData,
      });

      console.log(await response.json());
    } catch (error) {
      console.error("Error al editar:", error);
    }
  };

  return (
    <main className="form-container">
      <form id="admin-form">
        <h2>Admin</h2>
        <Label
          id={"name-admin"}
          placeHolder={"Nombre del administrador"}
          title={"Nombre"}
          type={"text"}
        />
        <Label
          id={"password-admin"}
          placeHolder={"Contraseña del administrador"}
          title={"Contraseña"}
          type={"password"}
        />

        <div id="buttons">
          <Button onClick={handleCreate} text={"Crear"} />
          <Button onClick={handleEdit} text={"Editar"} />
        </div>
      </form>
    </main>
  );
}

export default AdminForm;
