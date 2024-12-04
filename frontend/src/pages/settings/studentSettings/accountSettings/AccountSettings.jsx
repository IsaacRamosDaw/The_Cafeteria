import SearchBar from "../../../../components/searchBar/SearchBar";
import TabsBar from "../../../../components/tabsBar/TabsBar";
import "./AccountSettings.scss";
import Button from "../../../../components/button/Button";

import InputFormSetting from "../../../../components/setttingsComp/inputFormSetting/InputFormSetting";

import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";

export default function AccountSettings() {
  let endPoint = "http://localhost:8080/images/"

  const handleAccount = (e) => {
    e.preventDefault();

    console.log(e.target);
  };

  const [user, setUser] = useState( {
    name: "John Doe",
    school: "IES El Rincon",
    course: "1º Bachillerato",
    email: "hola@gmail.com",
    edad: 14,
    phone: 1234567890,
    contrasenia: "1234",
    imgProfile: "image-1732653502736.jpg"
  });

  return (
    <div id="page-account-client">
      <SearchBar />
      <main id="content-account-client">
        <section className="container-back">
          <FaArrowLeftLong />
        </section>
        <section className="container-info">
          <div className="container-img-profile">
            <Avatar
              alt={user.name}
              src={ `${endPoint}${user.imgProfile}` || "/static/images/avatar/1.jpg" }
              sx={{ bgcolor: deepOrange[500], width: 70, height: 70 }}
            />
          </div>
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
             title={"Email"}
             option={2}
             placeholder={user.email}
          />
          <InputFormSetting 
          title={"Edad"} 
          option={2} 
          placeholder={user.edad} 
          />
          <InputFormSetting
            title={"Contraseña"}
            option={2}
            placeholder={user.contrasenia}
          />
          <InputFormSetting
            title={"Curso"}
            option={2}
            placeholder={user.course}
          />
          <InputFormSetting
            title={"Teléfono"}
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
  );
}
