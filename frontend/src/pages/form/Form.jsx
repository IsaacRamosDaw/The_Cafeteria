import { Link } from "react-router-dom";
import React from "react";
import Button from "../../components/button/Button";
import Label from "../../components/label/Label";
import "./Form.scss";

function Form() {
  const [values, setValues] = React.useState({
    center: "",
    name: "",
    email: "",
    school: "",
    age: "",
    course: "",
    password: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    // Aquí puedes usar values para enviar la información
    console.log(values); // Por ejemplo, puedes enviar esto a una API
  }

  function handleChange(evt) {
    const { target } = evt;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);
  }

  return (
    <div className="form-container-template">
      <form onSubmit={handleSubmit}>
        <Label title="Your name" placeHolder="Enter your name" id="name" />
        <Label
          title="School"
          placeHolder="Your school"
          type="text"
          id="school"
          select={true}
        />
        <Label title="Age" placeHolder="Enter your age" type="number" id="age" />
        <Label
          title="Course"
          placeHolder="Escoge tu curso"
          id="Course"
          select={true}
        />
        <Label title="Email" placeHolder="Write here your email" id="email" />
        <Label
          title="Password"
          placeHolder="Write here your password"
          id="password"
          type="password"
        />
        <Button submit={true} text="Registrarme" />
      </form>
      <p className="register-form-text">
      You have a account?
        <Link className="link-to-register" to="/welcome">
          , <u>Sign In</u>
        </Link>
      </p>
    </div>
  );
}

export default Form;
