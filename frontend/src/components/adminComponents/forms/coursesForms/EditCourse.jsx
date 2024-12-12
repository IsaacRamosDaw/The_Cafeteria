import Button from "../../../button/Button";
import { edit, getOne } from "../../../../services/course.service.js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Form.scss";

export default function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [courseData, setCourseData] = useState({
    name: "",
  });
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    getOne(id)
      .then((data) => {
        setCourseData(data);
        setFormData({
          name: data.name,
        });
      })
      .catch((error) => console.error("Error fetching course data:", error));
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
      <form id="course-form">
        <h2>Curso</h2>
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

        <div id="buttons">
          <Button onClick={handleEdit} text={"Editar"} />
        </div>
      </form>
    </main>
  );
}