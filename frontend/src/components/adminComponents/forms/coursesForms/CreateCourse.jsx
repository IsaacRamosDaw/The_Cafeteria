import Button from "../../../button/Button";
import Label from "../../../label/Label";
import { create } from "../../../../services/course.service.js";
import { useNavigate } from "react-router-dom";
import "../Form.scss";

function CreateCourse() {
    const navigate = useNavigate();

    const handleCreate = (e) => {
      e.preventDefault();

      let nameCourse = document.querySelector("#name-course");
      const formData = {
        name: nameCourse.value,
      };

      create(formData).then(() => {
        navigate(-1);
      });
  };
  
  return (
        <main className="form-container">
      <form onSubmit={handleCreate} id="course-form">
        <h2>Curso</h2>
        <Label
          id={"name-course"}
          placeHolder={"Nombre del curso"}
          title={"Nombre"}
          type={"text"}
        />
        <div id="buttons">
          <Button submit={true} text={"Crear"} />
        </div>
      </form>
    </main>
  )
}

export default CreateCourse;