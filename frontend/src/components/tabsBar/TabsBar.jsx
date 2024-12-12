import { Link, useLocation } from "react-router-dom";
import "./TabsBar.scss";
// import { MdHome } from "react-icons/md";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
function TabsBar({ worker }) {
  const location = useLocation();

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
    <nav id="footer-container">
      <ul>
        <li>
          <Link to={"/orders"}>
            <FaListAlt
              className={`img-tab-icon ${
                location.pathname === (worker ? "/orderworker" : "/orders")
                  ? "active"
                  : ""
              }`}
            />
            <p
              className={`${
                location.pathname === (worker ? "/orderworker" : "/orders")
                  ? "active"
                  : ""
              }`}
            >
              Pedidos
            </p>
          </Link>
        </li>
        <li>
          <Link to={"/menu"}>
            <MdOutlineRestaurantMenu
              className={`img-tab-icon ${
                location.pathname === (worker ? "/menuworker" : "/menu")
                  ? "active"
                  : ""
              }`}
            />
            <p
              className={`${
                location.pathname === (worker ? "/menuworker" : "/menu")
                  ? "active"
                  : ""
                  
              }`}
            >
              Home
            </p>
          </Link>
        </li>
        <li>
          <Link to={role === "worker" ? "/worker/profile" : "/student/profile"}>
            <IoPersonSharp
              className={`img-tab-icon ${
                location.pathname ===
                (worker ? "/worker/profile" : "/student/profile")
                  ? "active"
                  : ""
              }`}
            />
            <p
              className={`${
                location.pathname ===
                (worker ? "/worker/profile" : "/student/profile")
                  ? "active"
                  : ""
              }`}
            >
              Perfil
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default TabsBar;
