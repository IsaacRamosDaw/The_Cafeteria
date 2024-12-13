import Button from "../../../button/Button";
import Label from "../../../label/Label";
import { edit, getOne } from "../../../../services/worker.service";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Form.scss";

export default function EditWorker() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [workerData, setAdminData] = useState({ name: "" });
  const [formData, setFormData] = useState({ username: "", password: "" });

  useEffect(() => {
    getOne(id)
      .then((data) => {
        setAdminData(data);
        setFormData({ username: data.name, password: "" });
      })
      .catch((error) => console.error("Error fetching admin data:", error));
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      await edit(id, formData);
      navigate(-1);
    } catch (error) {
      console.error("Error with upate:", error);
    }
  };
  
  return (
    <main className="form-container">
      <form id="worker-form">
        <h2>Worker</h2>
        {/* <Label
          id={"name-worker"}
          placeHolder={formData.name}
          title={"Nombre"}
          type={"text"}
        /> */}
        {/* <Label
          id={"password-worker"}
          placeHolder={"Contraseña del worker"}
          title={"Contraseña"}
          type={"password"}
        />
        <Label
          id={"phone-worker"}
          placeHolder={formData.phone}
          title={"Teléfono"}
          type={"text"}
        /> */}
        <div className="form-group">
          <label htmlFor="username">Nombre</label>
          <input
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nombre del trabajador"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña del trabajador"
            type="password"
          />
        </div>

        <div id="buttons">
          <Button onClick={handleEdit} text={"Editar"} />
        </div>
      </form>
    </main>
  );
}