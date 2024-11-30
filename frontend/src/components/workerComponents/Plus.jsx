// import { Link } from "react-router-dom";
// import './Plus.scss'

// function Plus({url}) {

//   return (
//     <Link to={url} id="plus-container">
//         <span>&#43;</span> 
//     </Link>
//   );
// }

// export default Plus;

import { Link } from "react-router-dom";
import './Plus.scss';

function Plus({ url }) {
  // Asumiendo que tienes una función para obtener el rol del usuario
  const getUserRole = () => {
    const token = localStorage.getItem("token"); // O de tu estado de autenticación
    if (!token) return null;

    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      return decodedPayload.role; // Asegúrate de que 'role' esté en el payload
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const role = getUserRole();

  // Mostrar el componente solo si el rol es "admin" o "worker"
  if (role !== "admin" && role !== "worker") {
    return null;
  }

  return (
    <Link to={url} id="plus-container">
      <span>&#43;</span>
    </Link>
  );
}

export default Plus;
