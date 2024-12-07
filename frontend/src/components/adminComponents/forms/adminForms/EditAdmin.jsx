import Button from "../../../button/Button";
// import Label from "../../../label/Label";
import { edit, getOne } from "../../../../services/adminService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditAdmin() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [adminData, setAdminData] = useState({ name: "" });
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
      console.error("Error al editar:", error);
    }
  };

  return (
    <main className="form-container">
      <form id="admin-form">
        <h2>Admin</h2>
        <div className="form-group">
          <label htmlFor="username">Nombre</label>
          <input
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nombre del administrador"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña del administrador"
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

