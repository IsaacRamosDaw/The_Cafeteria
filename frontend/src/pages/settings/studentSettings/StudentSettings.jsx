import SearchBar from "../../../components/searchBar/SearchBar"
import TabsBar from "../../../components/tabsBar/tabsBar"
import Separator from "../../../components/separator/Separator"
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch"
import './StudentSettings.scss'
import Setting from "../../../components/setttingsComp/Setting";
import { useTheme } from "../../../contexts/ThemeContext";

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
              <img src="/public/images/icons/plus.svg" alt="add your money" />
            </Link>
          </div>
        </div>
        <div id="settings-container">
          <Setting icon={"/public/images/icons/fav.svg"} text={"Cuenta"} />
          <Setting
            icon={"/public/images/icons/fav.svg"}
            text={"Notificaciones"}
          />
          <Setting
            icon={"/public/images/icons/fav.svg"}
            text={"Politica de privacidad"}
          />
          <Setting icon={"/public/images/icons/fav.svg"} text={"Contáctanos"} />
          <Setting
            icon={"/public/images/icons/fav.svg"}
            text={"Politica de privacidad"}
          />
        </div>
        <div id="change-theme">
          <div>
            <img
              className="menu-item-icon"
              src="../../../../public/images/icons/theme.svg"
            />
            <span className="menu-item-text">Cambiar tema</span>
          </div>
          <Switch defaultChecked onClick={toggleTheme} />
        </div>
      </main>

      <TabsBar />
    </>
  );
}

export default StudentSettings