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
    phone: "",
    courseId: "",
  });

  // console.log("Datos en frontend", values);

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [errorName, setErrorName] = useState(null);
  const [errorAge, setErrorAge] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    get()
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();

    let hasError = false; 

    if (values.username.length < 3 || values.username.length > 15) {
      setErrorName("El nombre de usuario debe tener entre 3 y 15 caracteres.");
      hasError = true;
    } else {
      setErrorName(null);
    }

    const age = parseInt(values.age, 10); 

    if (isNaN(age) || age < 10) {
      setErrorAge("Debes tener más de 10 años.");
      hasError = true;
    } else {
      setErrorAge(null);
    }

    if (values.phone.length < 9 || values.phone.length > 12) {
      setErrorPhone("El formato del teléfono debe ser entre 9 y 12 dígitos")
      hasError = true;
    } else {
      setErrorPhone(null);
    }

    if (values.password.length < 3 || values.password.length > 15) {
      setErrorPassword("La contraseña debe tener entre 3 y 15 caracteres")
      hasError = true;
    } else {
      setErrorPassword(null);
    }


    if (hasError) return; 

    create(values)
      .then((response) => {
        console.log("User created:", response);
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error creating the user:", error);
        setError("Error creando el usuario");
      });
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
        {errorName && <p className="error-text-validation">{errorName}</p>}
        <Label
          title="Tu nombre de usuario"
          placeHolder="Introduce tu nombre"
          id="username"
          name="username"
          onChange={handleChange}
          arialabelledby="name-student-label"
          required={true}
        />

        {errorAge && <p className="error-text-validation">{errorAge}</p>}
        <Label
          title="Edad"
          placeHolder="Introduce tu edad"
          id="age"
          name="age"
          type="text"
          onChange={handleChange}
          arialabelledby="edad-student-label"
        />

        {errorPhone && <p className="error-text-validation">{errorPhone}</p>}
        <Label
          title="Tu teléfono"
          placeHolder="Introduce tu teléfono"
          id="phone"
          name="phone"
          onChange={handleChange}
          arialabelledby="phone-student-label"
        />

        {errorPassword && <p className="error-text-validation">{errorPassword}</p>}
        <Label
          title="Contraseña"
          placeHolder="Escribe tu contraseña"
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          arialabelledby="password-student-label"
        />
        <div className="label-input">
          <label className="label-text" htmlFor="courseId" aria-label="Escoge tu curso" id="label-student-course">
            Selecciona tu curso
          </label>
          <select name="courseId" id="courseId" onChange={handleChange}>
            <option value="">Elige un curso</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id} aria-label={course.name} aria-labelledby="label-student-course">
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <Button submit={true} text="Registrarme" />
      </form>
      {error && <p>{error}</p>}
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

