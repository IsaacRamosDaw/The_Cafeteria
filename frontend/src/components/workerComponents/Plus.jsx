import { Link } from "react-router-dom";
import './Plus.scss';

function Plus({ url }) {
  const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      return decodedPayload.role;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const role = getUserRole();

  // Mostrar el componente solo si el rol es "admin" o "worker"
  if (role === "student") {
    return null;
  }

  return (
    <Link to={url} id="plus-container">
      <span>&#43;</span>
    </Link>
  );
}

export default Plus;
