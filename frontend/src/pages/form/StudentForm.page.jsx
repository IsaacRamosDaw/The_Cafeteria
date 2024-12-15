import { Link, useNavigate } from "react-router-dom";
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
    phone: "",
    CourseId: "",
  });

  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState({}); // Estado para los errores

  const navigate = useNavigate();

  useEffect(() => {
    get()
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error :", error));
  }, []);

  // Validación de campos
  function validateFields() {
    const newErrors = {};

    if (!values.username.trim()) {
      newErrors.username = "Por favor ingresa un nombre de usuario válido.";
    }
    if (!values.password.trim()) {
      newErrors.password = "La contraseña es requerida.";
    }
    if (!values.age || !/^[0-9]+$/.test(values.age)) {
      newErrors.age = "La edad debe ser un número válido.";
    }
    if (!values.phone || !/^[0-9]{9,}$/.test(values.phone)) {
      newErrors.phone = "El teléfono debe tener al menos 9 dígitos.";
    }
    if (!values.CourseId) {
      newErrors.CourseId = "Debes seleccionar un curso.";
    }

    return newErrors;
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      create(values)
        .then((response) => {
          console.log("User created:", response);
          navigate(-1);
        })
        .catch((error) => {
          console.error("Error creating the user:", error);
        });
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  return (
    <div className="form-container-template">
      <form onSubmit={handleSubmit}>

        {errors.username && <p className="error-text">{errors.username}</p>}
        <Label
          title="Tu nombre de usuario"
          placeHolder="Introduce tu nombre"
          id="username"
          name="username"
          onChange={handleChange}
        />

        {errors.age && <p className="error-text">{errors.age}</p>}
        <Label
          title="Edad"
          placeHolder="Introduce tu edad"
          id="age"
          name="age"
          type="text"
          onChange={handleChange}
        />

        {errors.phone && <p className="error-text">{errors.phone}</p>}
        <Label
          title="Tu teléfono"
          placeHolder="Introduce tu teléfono"
          id="phone"
          name="phone"
          onChange={handleChange}
        />

        {errors.password && <p className="error-text">{errors.password}</p>}
        <Label
          title="Contraseña"
          placeHolder="Escribe tu contraseña"
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
        />

        <div className="label-input">
          {errors.CourseId && <p className="error-text">{errors.CourseId}</p>}
          <label className="label-text" htmlFor="CourseId">
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
