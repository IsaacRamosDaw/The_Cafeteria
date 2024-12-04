import { Link, useLocation } from "react-router-dom";
import "./TabsBar.scss";
import { MdHome } from "react-icons/md";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";

function TabsBar({ worker }) {
  const location = useLocation();

  return (
    <nav id="footer-container">
      <ul>
        <li>
          <Link to={worker ? "/homeworker" : "/home"}>
            <MdHome
              className={`img-tab-icon ${location.pathname === (worker ? "/homeworker" : "/home") ? "active" : ""
                }`}
            />
            <p
              className={`${location.pathname === (worker ? "/homeworker" : "/home") ? "active" : ""
                }`}
            >
              Home
            </p>
          </Link>
        </li>
        <li>
          <Link to={worker ? "/menuworker" : "/menu"}>
            <MdOutlineRestaurantMenu
              className={`img-tab-icon ${location.pathname === (worker ? "/menuworker" : "/menu") ? "active" : ""
                }`}
            />
            <p
              className={`${location.pathname === (worker ? "/menuworker" : "/menu") ? "active" : ""
                }`}
            >
              Menú
            </p>
          </Link>
        </li>
        <li>
          <Link to={worker ? "/orderworker" : "/orders"}>
            <FaListAlt
              className={`img-tab-icon ${location.pathname === (worker ? "/orderworker" : "/orders") ? "active" : ""
                }`}
            />
            <p
              className={`${location.pathname === (worker ? "/orderworker" : "/orders") ? "active" : ""
                }`}
            >
              Pedidos
            </p>
          </Link>
        </li>
      </ul>
    </nav>

  );
}

export default TabsBar;

