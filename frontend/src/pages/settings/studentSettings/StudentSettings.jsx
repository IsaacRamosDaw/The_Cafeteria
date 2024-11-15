import SearchBar from "../../../components/searchBar/SearchBar"
import TabsBar from "../../../components/tabsBar/tabsBar"
import Separator from "../../../components/separator/Separator"
import { Link } from "react-router-dom";
import './StudentSettings.scss'
import Setting from "../../../components/setttingsComp/Setting";
import { useTheme } from "../../../contexts/ThemeContext";

import { FiUser } from "react-icons/fi";

function StudentSettings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <SearchBar />
      <Separator />
      <main id="student-setttings">
        <div id="wallet-container">
          <div id="wallet">
            <p>Créditos</p>
            <p id="money">37€</p>
          </div>
          <div id="add-money">
            <Link>
              <img src="/images/icons/plus.svg" alt="add your money" />
            </Link>
          </div>
        </div>
        <div id="settings-container">
          <Setting icon={<FiUser /> } text={"Cuenta"} />
          <Setting
            icon={<FiUser /> }
            text={"Notificaciones"}
          />
          <Setting
            icon={<FiUser /> }
            text={"Politica de privacidad"}
          />
          <Setting icon={<FiUser /> } text={"Contáctanos"} />
          <Setting
            icon={<FiUser /> }
            text={"Politica de privacidad"}
          />
        </div>
        <div id="change-theme">
          <div>
            <img
              className="menu-item-icon"
              src={<FiUser /> }
            />
            <span className="menu-item-text"> Cambiar tema</span>
          </div>
        </div>
      </main>

      <TabsBar />
    </>
  );
}

export default StudentSettings