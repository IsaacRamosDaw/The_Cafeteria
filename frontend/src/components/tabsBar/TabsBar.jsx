import { Link } from "react-router-dom";
import "./TabsBar.scss";

function TabsBar({worker}) {
  return (
    <nav id="footer-container">
      <ul>
        <li>
          <Link to={worker ? "/homeworker" : "/home"}>
            <img  className="img-tab-icon" src="/images/icons/home.svg" alt="Home" />
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link to={worker ? "/menuworker" : "/menu"}>
            <img  className="img-tab-icon" src="/images/icons/menu.svg" alt="menu" />
            <p>Menu</p>
          </Link>
        </li>
        <li>
          <Link to={worker ? "/orderworker" : "/orders"}>
            <img className="img-tab-icon" src="/images/icons/orders.svg" alt="Orders" />
            <p>Orders</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default TabsBar;
