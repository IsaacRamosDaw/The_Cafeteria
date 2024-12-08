// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getOne } from "../../../services/studentService";
// import SearchBar from "../../../components/searchBar/SearchBar";
// import TabsBar from "../../../components/tabsBar/tabsBar";
// import Setting from "../../../components/setttingsComp/Setting";
// import WalletBalance from "../../../components/setttingsComp/walletBalance/WalletBalance";
// import { useTheme } from "../../../contexts/ThemeContext";
// import { FiUser } from "react-icons/fi";
// import { MdOutlineLocalCafe, MdFavoriteBorder, MdOutlineLightMode, MdOutlineDarkMode, MdOutlinePrivacyTip } from "react-icons/md";
// import { IoIosLogOut } from "react-icons/io";
// import { GoGraph } from "react-icons/go";
// import { Link } from "react-router-dom";
// import "./StudentSettings.scss";

// function StudentSettings() {
//   const { id } = useParams(); // Obtén el ID de la URL
//   const [studentData, setStudentData] = useState(null);
//   const [decodedId, setDecodedId] = useState(null);
//   const token = localStorage.getItem("token");
//   const { theme, toggleTheme } = useTheme();

//   useEffect(() => {
//     if (token) {
//       const base64Payload = token.split(".")[1];
//       const decodedPayload = JSON.parse(atob(base64Payload));
//       setDecodedId(decodedPayload.id);
//     }
//   }, [token]);

//   useEffect(() => {
//     async function fetchStudent() {
//       if (id) {
//         try {
//           const data = await getOne(id);
//           setStudentData(data);
//         } catch (error) {
//           console.error("Error al obtener el estudiante:", error);
//         }
//       } else {
//         console.error("El ID del estudiante no está disponible en la URL.");
//       }
//     }
//     fetchStudent();
//   }, [id]);

//   return (
//     <div id="page-settings-student">
//       <SearchBar />

//       <main id="student-setttings">
//         <WalletBalance />

//         <div id="settings-container">
//           <Setting icon={<FiUser />} to={id ? `/accountSetting/${id}` : "#"} text={"Cuenta"} />
//           <Setting
//             icon={theme === "light" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
//             text={"Tema"}
//             toggle={true}
//           />
//           <Setting icon={<MdFavoriteBorder />} to={"/favorites"} text={"Favoritos"} />
//           <Setting icon={<MdOutlineLocalCafe />} to={"/mycafeteria"} text={"Mi Cafetería"} />
//           <Setting icon={<GoGraph />} to={"/credits"} text={"Créditos"} />
//           <Setting icon={<MdOutlinePrivacyTip />} to={"/policy"} text={"Política de privacidad"} />
//         </div>

//         <section id="section-log-out">
//           <Link to="/">
//             <div className="container-logout">
//               <IoIosLogOut />
//               <h1>Cerrar sesión</h1>
//             </div>
//             <p>v0.03</p>
//           </Link>
//         </section>
//       </main>

//       <TabsBar />
//     </div>
//   );
// }

// export default StudentSettings;

function StudentSettings() {
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [decodedId, setDecodedId] = useState(null);
  const token = localStorage.getItem("token");
  const { theme, toggleTheme } = useTheme();

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
      console.error("No hay un ID disponible para buscar los datos del estudiante.");
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

  const effectiveId = id || decodedId;

  return (
    <div id="page-settings-student">
      <SearchBar id={studentId}/>
      <main id="student-setttings">
        <WalletBalance />
        <div id="settings-container">
          <Setting icon={<FiUser />} to={`/accountSetting/${effectiveId}`} text={"Cuenta"} />
          <Setting
            icon={theme === "light" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
            text={"Tema"}
            toggle={true}
          />
          <Setting icon={<MdFavoriteBorder />} to={"/favorites"} text={"Favoritos"} />
          <Setting icon={<MdOutlineLocalCafe />} to={"/mycafeteria"} text={"Mi Cafetería"} />
          <Setting icon={<GoGraph />} to={"/credits"} text={"Créditos"} />
          <Setting icon={<MdOutlinePrivacyTip />} to={"/policy"} text={"Política de privacidad"} />
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