import { Link } from "react-router-dom";
import './Plus.scss';
import { getUserRole } from "../../services/utils";

function Plus({ url }) {
  
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
