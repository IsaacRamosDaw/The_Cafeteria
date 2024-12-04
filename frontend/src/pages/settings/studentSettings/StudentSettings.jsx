import SearchBar from "../../../components/searchBar/SearchBar";
import TabsBar from "../../../components/tabsBar/TabsBar";
import Setting from "../../../components/setttingsComp/Setting";
import "./StudentSettings.scss";
import { Link } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";

import { FiUser } from "react-icons/fi";
import { MdOutlineLocalCafe } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { GoGraph } from "react-icons/go";

import WalletBalance from "../../../components/setttingsComp/walletBalance/WalletBalance";

function StudentSettings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div id="page-settings-student">
      <SearchBar />
      <WalletBalance/>
      <main id="student-setttings">
        <div id="settings-container">
          <Setting icon={<FiUser />} to={"/student/profile/update"} text={"Cuenta"} />

          <Setting
            icon={
              theme == "light" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />
            }
            text={"Tema"}
            toggle={true}
          />
          <Setting
            icon={<MdFavoriteBorder />}
            to={"/student/profile/favs"}
            text={"Favoritos"}
          />
          <Setting
            icon={<MdOutlineLocalCafe />}
            to={"/student/profile/mycafeteria"}
            text={"Mi Cafeteria"}
          />
          <Setting icon={<GoGraph />} to={"/credits"} text={"Créditos"} />
          <Setting
            icon={<MdOutlinePrivacyTip />}
            to={"/profile/policy"}
            text={"Politica de privacidad"}
          />
        </div>

        <section id="section-log-out">
          <Link to="/">
            <div className="container-logout">
              <IoIosLogOut />
              <h1>Cerrar sesión</h1>
            </div>
            <p>v0.03</p>
          </Link>
        </section>
      </main>

      <TabsBar />
    </div>
  );
}

export default StudentSettings;
