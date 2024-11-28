import Button from "../../../button/Button";
import Label from "../../../label/Label";
import { create } from "../../../../services/adminService";
import { useNavigate } from "react-router-dom";
import "../Form.scss";

function CreateAdmin() {
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();

    let nameAdmin = document.querySelector("#name-admin");
    let passwordAdmin = document.querySelector("#password-admin");
    
    const formData = {
      username: nameAdmin.value,
      password: passwordAdmin.value,
    };

    console.log('bbbbbb', create(formData).then(() => {
      navigate(-1);
    }));
    
  };

  return (
    <main className="form-container">
      <form onSubmit={handleCreate} id="admin-form">
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
          <Button submit={true} text={"Crear"} />
        </div>
      </form>
    </main>
  );
}

export default CreateAdmin;
