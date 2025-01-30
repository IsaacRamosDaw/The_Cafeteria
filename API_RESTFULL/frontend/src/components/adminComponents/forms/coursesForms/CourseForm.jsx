import Button from "../../../button/Button";
import { create } from "../../../../services/course.service";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import Label from "../../../label/Label";
import "../Form.scss";

export default function CourseForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const nameRef = useRef(null);

  const handleCreate = async (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
    };

    try {
      await create(formData);

      navigate(-1);
    } catch (error) {
      console.error("Error en el proceso de creación:", error);
    }
  };

  return (
    <main className="form-container">
      <form onSubmit={handleCreate} id="worker-form">
        <h2>Cursos</h2>
        <Label
          id={"name-course"}
          placeHolder={"Nombre del curso"}
          title={"Nombre"}
          type={"text"}
          ref={nameRef}
          aria-labelledby={"Ingrese aquí el nombre del curso"}
        />
        <div id="buttons">
          <Button submit={true} text={id ? "Editar" : "Crear"} />
        </div>
      </form>
    </main>
  );
}
