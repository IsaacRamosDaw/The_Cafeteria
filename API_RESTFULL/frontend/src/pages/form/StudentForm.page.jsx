import { Link, useNavigate, } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import Label from "../../components/label/Label";
import { create } from "../../services/student.service";
import { get } from "../../services/course.service";
import "./StudentForm.scss";

function StudentForm() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    age: "",
    phone:"",
    CourseId: "",
  });

  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    get()
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error :", error));
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();

    create(values)
      .then((response) => {
        console.log("User created:", response);
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error creating the user:", error);
      });
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    console.log(`Field changed: ${name}, Value: ${value}`); // For debugging
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  return (
    <div className="form-container-template">
      <form onSubmit={handleSubmit}>
        <Label
          title="Tu nombre de usuario"
          placeHolder="Introduce tu nombre"
          id="username"
          name="username"
          onChange={handleChange}
        />
        <Label
          title="Edad"
          placeHolder="Introduce tu edad"
          id="age"
          name="age"
          type="text"
          onChange={handleChange}
        />
        <Label
          title="Tu teléfono"
          placeHolder="Introduce tu teléfono"
          id="phone"
          name="phone"
          onChange={handleChange}
        />
        <Label
          title="Contraseña"
          placeHolder="Escribe tu contraseña"
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
        />
        <div className="label-input">
          <label className="label-text" htmlFor="courseId">
            Selecciona tu curso
          </label>
          <select name="CourseId" id="CourseId" onChange={handleChange}>
            <option value="">Elige un curso</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <Button submit={true} text="Registrarme" />
      </form>
      <p className="register-form-text">
        ¿Tienes una cuenta?
        <Link className="link-to-register" to="/">
          , <u>Iniciar sesión</u>
        </Link>
      </p>
    </div>
  );
}

export default StudentForm;

