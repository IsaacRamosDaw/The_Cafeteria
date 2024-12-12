import Button from "../../../button/Button";
import { edit, getOne } from "../../../../services/coffeShop.service";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Form.scss";

export default function EditSchool() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [coffeData, setCoffeData] = useState({
    name: "",
    file: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    file: "",
  });

  useEffect(() => {
    getOne(id)
      .then((data) => {
        setCoffeData(data);
        setFormData({
          name: data.name,
          file: data.file  
        });
      })
      .catch((error) => console.error("Error fetching school data:", error));
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
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al editar:", error);
    }
  };

  return (
    <main className="form-container">
      <form id="school-form">
        <h2>Cafetería</h2>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre de la cafetería"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagen">Imagen</label>
          <input
            id="file"
            value={formData.file}
            onChange={handleChange}
            type="file"
          />
        </div>

        <div id="buttons">
          <Button onClick={handleEdit} text={"Editar"} />
        </div>
      </form>
    </main>
  );
}