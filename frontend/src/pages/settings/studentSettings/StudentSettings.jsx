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
        <section id="section-money">
          <p>Your balance</p>
          <h2>Dinero</h2>
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
            <img src="../../../../public/images/icons/card-settinggs.svg" alt="" />
            <h2>Add Money</h2>
          </Link>
          <Link className="option">
            <img src="../../../../public/images/icons/card-remove.svg" alt="" />
            <h2>Add Money</h2>
          </Link>
        </section>

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

      <section id="section-log-out">
        <div id="log-out"></div>
        <div id="version"></div>
      </section>

      <TabsBar />
    </>
  );
}

export default StudentSettings