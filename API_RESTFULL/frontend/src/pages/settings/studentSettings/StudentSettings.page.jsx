import SearchBar from "../../../components/searchBar/SearchBar";
import TabsBar from "../../../components/tabsBar/TabsBar";
import Setting from "../../../components/setttingsComp/Setting";
import CreditBalance from "../../../components/setttingsComp/creditBalance/CreditBalance";
import { useTheme } from "../../../contexts/ThemeContext";

import { getUserId } from "../../../services/utils";
import { getOne } from "../../../services/student.service";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiUser } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineLocalCafe, MdOutlineLightMode, MdOutlineDarkMode, MdOutlinePrivacyTip, } from "react-icons/md";

import "./StudentSettings.scss";
import WebSocketContext from "../../../contexts/WebSocketsContext";

function StudentSettings() {

  const id = getUserId();
  const [studentData, setStudentData] = useState(null);
  const [decodedId, setDecodedId] = useState(null);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); 

  const { logOut } = useContext(WebSocketContext)

  useEffect(() => {
    const studentId = id || decodedId;
    if (!studentId) {
      console.error(
        "There is no ID available to search for the student's data."
      );
      return;
    }

    async function fetchStudent() {
      try {
        const data = await getOne(studentId);
        setStudentData(data);
      } catch (error) {
        console.error("Error with get the student:", error.message);
      }
    }
    fetchStudent();

  }, [id, decodedId]);

  const clearToken = () => {
    logOut()
    localStorage.removeItem("token");
    navigate("/");
  };

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
          <Setting
            icon={<MdOutlinePrivacyTip className="icons" />}
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

{/* <Setting
            icon={<MdOutlineLocalCafe />}
            to={"/student/profile/mycafeteria"}
            text={"Mi Cafetería"}
          /> */}
{/* <Setting icon={<GoGraph />} to={"/credits"} text={"Créditos"} /> */ }