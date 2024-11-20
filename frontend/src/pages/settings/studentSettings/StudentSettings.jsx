import SearchBar from "../../../components/searchBar/SearchBar";
import TabsBar from "../../../components/tabsBar/tabsBar";
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

      <main id="student-setttings">
        <WalletBalance />

        <div id="settings-container">
          <Setting icon={<FiUser />} to={"/accountSetting"} text={"Cuenta"} />

          <Setting
            icon={
              theme == "light" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />
            }
            text={"Tema"}
            toggle={true}
          />
          <Setting
            icon={<MdFavoriteBorder />}
            to={"/favorites"}
            text={"Favoritos"}
          />
          <Setting
            icon={<MdOutlineLocalCafe />}
            to={"/mycafeteria"}
            text={"Mi Cafeteria"}
          />
          <Setting icon={<GoGraph />} to={"/credits"} text={"Creditos"} />
          <Setting
            icon={<MdOutlinePrivacyTip />}
            to={"/policy"}
            text={"Politica de privacidad"}
          />
        </div>

        <section id="section-log-out">
          <Link to="/">
            <div className="container-logout">
              <IoIosLogOut />
              <h1>Logout</h1>
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
