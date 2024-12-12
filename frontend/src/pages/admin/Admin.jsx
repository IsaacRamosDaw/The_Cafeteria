import ProfileBar from "../../components/profileBar/ProfileBar";
import SchoolContainer from "../../components/adminComponents/schoolContainer/SchoolContainer";
import AdminContainer from "../../components/adminComponents/adminContainer/AdminContainer";
import WorkerContainer from "../../components/adminComponents/workerContainer/WorkerContainer";
import CoffeContainer from "../../components/adminComponents/coffeShopContainer/CoffeShopContainer";
import CourseContainer from "../../components/adminComponents/courseContainer/CourseContainer";
import "./Admin.scss";

//React icons
import { IoIosLogOut } from "react-icons/io";

// Speed dial components
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import Work from "@mui/icons-material/Work";
import AccountCircle from "@mui/icons-material/AccountCircle";
// import School from "@mui/icons-material/School";
import MenuBook from "@mui/icons-material/MenuBook";
// import LocalCafe from "@mui/icons-material/LocalCafe";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";

function Admin() {
  const navigate = useNavigate();

  const actions = [
    { icon: <Work />, name: "Trabajador", to: "/worker" },
    // { icon: <School />, name: "Colegio", to: "/school" },
    { icon: <AccountCircle />, name: "Admin", to: "/admin" },
    { icon: <MenuBook />, name: "Curso", to: "/course" },
    // { icon: <LocalCafe />, name: "Cafetería", to:"/coffeShop"},
  ];

  const goTo = (page) => {
    navigate(page);
  };

  const clearToken = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="page-admin-container">
      <SearchBar />

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
          // sx={{
          //   ".MuiButtonBase-root ":{
          //     backgroundColor: "#fff",
          //     fontSize: 28,
          //     color: "var(--text-1)",
          //     fontWeight: "600"
          //   },
          //   "& .MuiSvgIcon-root": {
          //     fontSize: 20,
          //     color: "#000",
          //   },
          // }}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => goTo(action.to)}
          />
        ))}
      </SpeedDial>

      <main id="admin-home">
        <details>
          <summary>
            <h2>Administradores</h2>
          </summary>
          <AdminContainer />
        </details>

        <details>
          <summary>
            <h2>Trabajadores</h2>
          </summary>
          <WorkerContainer />
        </details>

        <details>
          <summary>
            <h2>Cafeterías</h2>
          </summary>
          <CoffeContainer />
        </details>

        <details>
          <summary>
            <h2>Colegios</h2>
          </summary>
          <SchoolContainer />
        </details>

        <details>
          <summary>
            <h2>Cursos</h2>
          </summary>
          <CourseContainer />
        </details>
      </main>

      <section id="section-log-out">
        <div onClick={clearToken}>
          <div className="container-logout">
            <IoIosLogOut />
            <h1>Cerrar sesión</h1>
          </div>
          <p>v0.03</p>
        </div>
      </section>
    </div>
  );
}

export default Admin;
