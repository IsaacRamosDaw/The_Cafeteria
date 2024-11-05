import Button from "../../../button/Button";
import Label from "../../../label/Label";
import {edit} from "../../../../services/adminService";
import { useNavigate } from "react-router-dom";
import "../Form.scss";

export default function EditAdmin() {
  const navigate = useNavigate();
  const id = 3

  const handleEdit = async (e) => {
    e.preventDefault();

    edit(id);
    
    navigate("/dashboard")
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
          <Button onClick={handleEdit} text={"Editar"} />
        </div>
      </form>
    </main>
  );
}
