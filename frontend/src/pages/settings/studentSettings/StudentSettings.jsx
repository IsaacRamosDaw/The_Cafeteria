import SearchBar from "../../../components/searchBar/SearchBar";
import TabsBar from "../../../components/tabsBar/TabsBar";
import Setting from "../../../components/setttingsComp/Setting";
import "./StudentSettings.scss";
import { getUserId } from "../../../services/utils";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import { useEffect, useState } from "react";
import { getOne } from "../../../services/studentService";
import { FiUser } from "react-icons/fi";
import {
  MdOutlineLocalCafe,
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdOutlinePrivacyTip,
} from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { GoGraph } from "react-icons/go";
import "./StudentSettings.scss";

import CreditBalance from "../../../components/setttingsComp/creditBalance/CreditBalance";

function StudentSettings() {
  const id = getUserId();
  const [studentData, setStudentData] = useState(null);
  const [decodedId, setDecodedId] = useState(null);
  const token = localStorage.getItem("token");
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const clearToken = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      setDecodedId(decodedPayload.id);
    }
  }, [token]);

  useEffect(() => {
    const studentId = id || decodedId;
    if (!studentId) {
      console.error(
        "No hay un ID disponible para buscar los datos del estudiante."
      );
      return;
    }

    async function fetchStudent() {
      try {
        const data = await getOne(studentId);
        setStudentData(data);
      } catch (error) {
        console.error("Error al obtener el estudiante:", error);
      }
    }
    fetchStudent();
  }, [id, decodedId]);

  return (
    <div id="page-settings-student">
      <SearchBar />
      <CreditBalance />
      <main id="student-setttings">
        <div id="settings-container">
          <Setting
            icon={<FiUser />}
            to={"/student/profile/update"}
            text={"Cuenta"}
          />

          <Setting
            icon={
              theme === "light" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />
            }
            text={"Tema"}
            toggle={true}
          />
          {/* <Setting
            icon={<MdFavoriteBorder />}
            to={"/student/profile/favs"}
            text={"Favoritos"}
          /> */}
          <Setting
            icon={<MdOutlineLocalCafe />}
            to={"/student/profile/mycafeteria"}
            text={"Mi Cafetería"}
          />
          <Setting icon={<GoGraph />} to={"/credits"} text={"Créditos"} />
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

export default StudentSettings;
