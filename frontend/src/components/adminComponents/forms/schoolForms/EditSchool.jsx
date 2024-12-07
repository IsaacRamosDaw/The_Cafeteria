import Button from "../../../button/Button";
import { edit, getOne } from "../../../../services/schoolService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Form.scss";

export default function EditSchool() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [schoolData, setSchoolData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    file:""
  });
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    file:""
  });

  useEffect(() => {
    getOne(id)
      .then((data) => {
        setSchoolData(data);
        setFormData({
          name: data.name,
          address: data.address,
          email: data.email,
          phone: data.phone,
          file: data.file,
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
        <h2>Colegio</h2>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre del colegio"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Dirección</label>
          <input
            id="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Dirección del colegio"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email del colegio"
            type="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Teléfono del colegio"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Dirección</label>
          <input
            id="file"
            value={formData.file}
            onChange={handleChange}
            placeholder="Dirección del colegio"
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
