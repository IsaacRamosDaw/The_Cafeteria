import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Label from "../../components/label/Label";
import "./Welcome.scss";
import { login } from "../../services/welcomeService";

function Welcome() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const [inputName, inputPassword] = e.target;

    const name = inputName.value;
    const password = inputPassword.value;

    try {
      const role = await login({ username: name, password: password });

      role === "admin" ? navigate("/dashboard") : navigate("/home");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  }

  return (
    <div className="form-container-template">
      <object
        className="img-avatar-welcome"
        data="/images/icons/userLogin.svg"
        type="image/svg+xml"
      ></object>
      <form id="form" onSubmit={handleSubmit}>
        <Label title="Name" placeHolder="John Doe" id="name" />

        <Label
          title="Password"
          placeHolder="Your password"
          id="password"
          type="password"
        />

        <Button submit={true} text="Sing in" />
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
