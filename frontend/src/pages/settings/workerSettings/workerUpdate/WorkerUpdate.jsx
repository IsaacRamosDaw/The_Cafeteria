import SearchBar from "../../../../components/searchBar/SearchBar";
import TabsBar from "../../../../components/tabsBar/TabsBar";
import Button from "../../../../components/button/Button";
import InputFormSetting from "../../../../components/setttingsComp/inputFormSetting/InputFormSetting";
import Avatar from "@mui/material/Avatar";

import { deepOrange } from "@mui/material/colors";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function WorkerUpdate() {
  let endPoint = "http://localhost:8080/images/"

  const handleAccount = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

    const [user, setUser] = useState( {
    name: "John Doe",
    contrasenia: "1234",
    phone: 1234567890,
    imgProfile: "image-1732653502736.jpg"
  });

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div id="page-account-client">
      <SearchBar />
            <main id="content-account-client">
        <Link onClick={handleBack} className="container-back">
          <FaArrowLeftLong />
        </Link>
        <section className="container-info">
          <Link to={'/worker/profile'} className="container-img-profile">
            <Avatar
              alt={user.name}
              src={ `${endPoint}${user.imgProfile}` || "/static/images/avatar/1.jpg" }
              sx={{ bgcolor: deepOrange[500], width: 70, height: 70 }}
            />
          </Link>
          <div className="container-info-student">
            <h1>{user.name}</h1>
            <h5>{`${user.course}, ${user.school}`}</h5>
          </div>
        </section>
        <form onSubmit={handleAccount} className="container-inputs">
          <InputFormSetting
            title={"Nombre"}
            option={2}
            placeholder={user.name}
          />
          <InputFormSetting
            title={"Contraseña"}
            option={2}
            placeholder={user.contrasenia}
          />
          <InputFormSetting
            title={"phone"}
            option={2}
            placeholder={user.phone}
          />
          <div className="container-btn-account">
            <Button text={"Actualizar"} submit={true} />
          </div>
        </form>
      </main>
      <TabsBar />
    </div>
  )
}

export default WorkerUpdate