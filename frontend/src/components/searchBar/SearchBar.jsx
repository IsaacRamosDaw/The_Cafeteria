import { Link} from "react-router-dom";
import "./SearchBar.scss";
import { LuCircleUser } from "react-icons/lu";

function SearchBar({input = 'false'}) {

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
  return (
    <nav id="header-container">
      <div>
      {
        input == "true" ? <input type="text" name="" id="" /> :
        <h2>Isaac Ramos Pérez</h2>
      }
        <Link id="icon-user" 
        to=
        {
          role === "worker" ? 
          "/worker/profile" : 
          "/student/profile"
        }>
          <LuCircleUser className="go-profile"/>
        </Link>
      </div>
    </nav>
  );
}

export default SearchBar;
