import SearchBar from "../../../components/searchBar/SearchBar";
import TabsBar from "../../../components/tabsBar/tabsBar";
import Separator from "../../../components/separator/Separator";
import Setting from "../../../components/setttingsComp/Setting";
import { Link } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import "./StudentSettings.scss";

import { FiUser } from "react-icons/fi";

function StudentSettings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div id="page-settings-student">
      <SearchBar />
      <Separator />

      <main id="student-setttings">
        <section id="section-money">
          <p>Your balance</p>
          <h2> €45.02 </h2>
        </section>

        <section id="section-visa">
          <div id="visa-container">
            <div id="visa">
              <h2>VISA</h2>
            </div>
            <div id="visa-add">
              <img src="" alt="" />
              <h3>Añade tu visa</h3>
            </div>
          </div>
          <h2>**** **** **** 7955</h2>
        </section>

        <section id="visa-options">
          <Link className="option">
            <img src="../../../../public/images/icons/card-plus.svg" alt="" />
            <h2>Add Money</h2>
          </Link>
          <Link className="option">
            <img
              src="../../../../public/images/icons/card-settinggs.svg"
              alt=""
            />
            <h2>Add Money</h2>
          </Link>
          <Link className="option">
            <img src="../../../../public/images/icons/card-remove.svg" alt="" />
            <h2>Add Money</h2>
          </Link>
        </section>

        <div id="settings-container">
          <Setting icon={<FiUser />} text={"Cuenta"} />
          <Setting icon={<FiUser />} text={"Notificaciones"} />
          <Setting icon={<FiUser />} text={"Politica de privacidad"} />
          <Setting icon={<FiUser />} text={"Contáctanos"} />
          <Setting icon={<FiUser />} text={"Politica de privacidad"} />
        </div>
        <div id="change-theme">
          <div>
            <img className="menu-item-icon" src={<FiUser />} />
            <span className="menu-item-text"> Cambiar tema</span>
          </div>
        </div>
      </main>

      <section id="section-log-out">
        <div id="log-out"></div>
        <div id="version"></div>
      </section>

      <TabsBar />
    </div>
  );
}

export default StudentSettings;
