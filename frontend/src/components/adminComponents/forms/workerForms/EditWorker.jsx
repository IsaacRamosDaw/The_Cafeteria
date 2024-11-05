import Button from "../../../button/Button";
import Label from "../../../label/Label";
import { edit } from "../../../../services/workerService";
import { useNavigate } from "react-router-dom";
import "../Form.scss";
export default function EditWorker() {
    const navigate = useNavigate();

    const handleEdit = async (e) => {
      e.preventDefault();

      edit(id);

      navigate("/dashboard");
  };
  
  return (
    <main className="form-container">
      <form id="worker-form">
        <h2>worker</h2>
        <Label
          id={"name-worker"}
          placeHolder={"Nombre del worker"}
          title={"Nombre"}
          type={"text"}
        />
        <Label
          id={"password-worker"}
          placeHolder={"Contraseña del worker"}
          title={"Contraseña"}
          type={"password"}
        />
        <Label
          id={"phone-worker"}
          placeHolder={"Teléfono del worker"}
          title={"Contraseña"}
          type={"phone"}
        />

        <div id="buttons">
          <Button onClick={handleEdit} text={"Editar"} />
        </div>
      </form>
    </main>
  );
}