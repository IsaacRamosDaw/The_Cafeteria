import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Label from "../../components/label/Label";
import "./Welcome.scss";
import { login } from "../../services/welcome.service";
import { useState } from "react";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { tabScrollButtonClasses } from "@mui/material";

function Welcome() {
  const navigate = useNavigate();

  const [invalidUser, setInvalidUser] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();

    const [inputName, inputPassword] = e.target;

    const name = inputName.value;
    const password = inputPassword.value;

    try {
      const user = await login({ username: name, password: password });

      user.role === "admin" ? navigate("/dashboard") : navigate("/menu");
    } catch (error) {
      // console.error("Login failed:", error.message);
      setInvalidUser(false);
    }
  }

  return (
    <div className="form-container-template">
      <object
        className="img-avatar-welcome"
        data="/images/icons/userLogin.svg"
        type="image/svg+xml"
      ></object>
      <Stack
        sx={{ display: `${invalidUser ? "none" : "block"}`, width: "90%" }}
        spacing={2}
      >
        <Alert severity="error">Usuario invalido</Alert>
      </Stack>

      <form id="form" onSubmit={handleSubmit}>
        <Label title="Nombre" placeHolder="John Doe" id="name" />

        <Label
          title="Contraseña"
          placeHolder="Tu contraseña"
          id="password"
          type="password"
        />

        <Button submit={true} text="Iniciar sesión" />
      </form>
      <p className="register-form-text">
        {`¿No`} tienes una cuenta?
        <Link className="link-to-register" to="/form">
          , <u>Registrarse</u>
        </Link>
      </p>
    </div>
  );
}

export default Welcome;
