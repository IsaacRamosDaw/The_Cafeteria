import Button from "../../../button/Button";
import Label from "../../../label/Label";
import { edit, getOne } from "../../../../services/workerService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Form.scss";

export default function EditWorker() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [workerData, setWorkerData] = useState({ name: "", phone: "" });

  useEffect(() => {
    getOne(id)
      .then((data) => setWorkerData(data))
      .catch((error) => console.log("Error fetching worker data:", error));
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();

    let nameWorker = document.querySelector("#name-worker");
    let passwordWorker = document.querySelector("#password-worker");
    let phoneWorker = document.querySelector("#phone-worker");

    const formData = {
      name: nameWorker.value,
      password: passwordWorker.value,
      phone: phoneWorker.value,
    };

    edit(id, formData).then(() => {
      navigate(-1);
    });
  };
  
  return (
    <main className="form-container">
      <form id="worker-form">
        <h2>worker</h2>
        <Label
          id={"name-worker"}
          placeHolder={workerData.name}
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
          placeHolder={workerData.phone}
          title={"Teléfono"}
          type={"text"}
        />

        <div id="buttons">
          <Button onClick={handleEdit} text={"Editar"} />
        </div>
      </form>
    </main>
  );
}