import { Link } from "react-router-dom";
import React from "react";
import Button from "../../components/button/Button";
import Label from "../../components/label/Label";
import "./Welcome.scss";

function Welcome() {
  const [values, setValues] = React.useState({
    user: "",
    password: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log(values);
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
    <div className="form-container-template" onSubmit={handleSubmit}>
      <object className="img-avatar-welcome" data="/images/icons/userLogin.svg" type="image/svg+xml"></object>
      <form id="form">
        <Label title="Name" placeHolder="John Doe" id="name" />
        <Label
          title="Password"
          placeHolder="Your password"
          id="password"
          type="password"
        />
        <Button submit={false} text="Sing in" />
      </form>
      <p className="register-form-text">
        {`Don't`} you have a account?
        <Link className="link-to-register" to="/form">
          , <u>Log In</u>
        </Link>
      </p>
    </div>
  );
}

export default Welcome;
