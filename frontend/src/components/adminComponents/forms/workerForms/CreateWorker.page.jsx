import Button from "../../../button/Button";
import Label from "../../../label/Label";
import { create } from "../../../../services/worker.service";
import { useNavigate } from "react-router-dom";
import "../Form.scss";

function CreateWorker() {
    const navigate = useNavigate();

    const handleCreate = (e) => {
      e.preventDefault();

      let nameWorker = document.querySelector("#name-worker");
      let passwordWorker = document.querySelector("#password-worker");
      let phoneWorker = document.querySelector("#phone-worker");
      const formData = {
        username: nameWorker.value,
        password: passwordWorker.value,
        phone: phoneWorker.value
      };

      create(formData).then(() => {
        navigate(-1);
      });
  };
  
  return (
        <main className="form-container">
      <form onSubmit={handleCreate} id="worker-form">
        <h2>worker</h2>
        <Label
          id={"name-worker"}
          placeHolder={"Nombre del trabajador"}
          title={"Nombre"}
          type={"text"}
        />
        <Label
          id={"password-worker"}
          placeHolder={"Contraseña del trabajador"}
          title={"Contraseña"}
          type={"password"}
        />
        <Label
          id={"phone-worker"}
          placeHolder={"Teléfono del trabajador"}
          title={"phone"}
          type={"phone"}
        />

        <div id="buttons">
          <Button submit={true} text={"Crear"} />
        </div>
      </form>
    </main>
  )
}

export default CreateWorker