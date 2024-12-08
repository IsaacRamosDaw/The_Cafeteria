import SearchBar from "../../../components/searchBar/SearchBar";
import TabsBar from "../../../components/tabsBar/TabsBar";
import Setting from "../../../components/setttingsComp/Setting";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import { FiUser } from "react-icons/fi";
import { MdOutlineLocalCafe } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { GoGraph } from "react-icons/go";

import "./WorkerSettings.scss";

function WorkerSettings() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate()

  const clearToken = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div id="page-settings-worker">
      <SearchBar />
      <h2>The muggings</h2>
      <img id="coffeShop-image" src="../../../../public/images/settings/coffeImage.jpg" alt="" />
      <main id="worker-setttings">

        <div id="settings-container">
          <Setting icon={<FiUser />} to={"/worker/profile/update"} text={"Cuenta"} />

          <Setting
            icon={
              theme == "light" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />
            }
            text={"Tema"}
            toggle={true}
          />
          <Setting
            icon={<MdOutlineLocalCafe />}
            to={"/worker/profile/mycafeteria"}
            text={"Mi Cafeteria"}
          />
          <Setting
            icon={<MdOutlinePrivacyTip />}
            to={"/profile/policy"}
            text={"Política de privacidad"}
          />
        </div>

        <section id="section-log-out">
          <div onClick={clearToken}>
            <div className="container-logout">
              <IoIosLogOut />
              <h1>Cerrar sesión</h1>
            </div>
            <p>v0.03</p>
          </div>
        </section>
      </main>

      <TabsBar />
    </div>
  );
}

export default WorkerSettings;
