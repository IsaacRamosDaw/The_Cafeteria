import Button from "../../../button/Button";
import Label from "../../../label/Label";
import create from '../../../../services/adminService'
import { useNavigate } from "react-router-dom";
import "../Form.scss"

export default function CreateAdmin(){
    const navigate = useNavigate();

    const handleCreate = (e) => {
        e.preventDefault();
    
        let nameAdmin = document.querySelector("#name-admin");
        let passwordAdmin = document.querySelector("#password-admin");
        const formData = {
          name: nameAdmin.value,
          password: passwordAdmin.value,
        };
    
        create(formData);
    
        navigate("/admin");
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
            </div>
          </form>
        </main>
      );
}