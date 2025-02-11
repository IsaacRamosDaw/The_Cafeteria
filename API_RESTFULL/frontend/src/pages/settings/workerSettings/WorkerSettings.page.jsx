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
import { useContext, useEffect, useState } from "react";
import { getUserId } from "../../../services/utils";
import { getOne } from "../../../services/coffeShop.service";

import "./WorkerSettings.scss";
import WebSocketContext from "../../../contexts/WebSocketsContext";

function WorkerSettings() {
  const { theme, toggleTheme } = useTheme();
  const [coffeShopData, setCoffeShopData] = useState({});
  const navigate = useNavigate();

  const { logOut } = useContext(WebSocketContext)

  const folder = "http://localhost:8080/images/";

  const clearToken = () => {
    logOut()
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const workerId = getUserId();
    if (!workerId) {
      console.error(
       "There is no ID available to search for the worker's data."
      );
      return;
    }

    async function fetchWorker() {
      try {
        const data = await getOne(workerId);
        setCoffeShopData(data);
      } catch (error) {
        console.error("Error retrieving the worker:", error);
      }
    }
    fetchWorker();
  }, []);

  return (
    <div id="page-settings-worker">
      <SearchBar />
      <div className="container-img-worker-settings">
        <h2> {coffeShopData.name} </h2>

        <img
          className="coffeShop-image"
          src={folder + coffeShopData.filename}
          alt=""
        />
      </div>

      <main id="worker-setttings">
        <div id="settings-container">
          <Setting
            icon={<FiUser />}
            to={"/worker/profile/update"}
            text={"Cuenta"}
          />

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

      <TabsBar worker={true} />
    </div>
  );
}

export default WorkerSettings;
