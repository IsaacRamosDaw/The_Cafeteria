import SearchBar from "../../../../components/searchBar/SearchBar.jsx";
import TabsBar from "../../../../components/tabsBar/TabsBar.jsx";
import Button from "../../../../components/button/Button.jsx";
import InputFormSetting from "../../../../components/setttingsComp/inputFormSetting/InputFormSetting.jsx";
import {
  getOne,
  edit,
  updateProfilePicture
} from "../../../../services/worker.service.js";
import Avatar from "@mui/material/Avatar";
import { BiSolidPencil } from "react-icons/bi";

import { getUserId, getUserRole } from "../../../../services/utils.js";

import { deepOrange } from "@mui/material/colors";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import "./WorkerUpdate.scss";

export default function WorkerUpdate() {
  const navigate = useNavigate();
  const id = getUserId();
  const [selectedFile, setSelectedFile] = useState(null);

  const [invalidUser, setInvalidUser] = useState(true);

  const [imgProfile, setImgProfile] = useState("");

  // Ref hooks
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);

  // DB data
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    getOne(id).then((data) => {
      setUserData(data);
    });
    
  }, [id]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log(file);
      setSelectedFile(file);
      setImgProfile(URL.createObjectURL(file));
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      return;
    }
    try {
      await updateProfilePicture(id, selectedFile);
      setUserData((prev) => ({
        ...prev,
        imgProfile: URL.createObjectURL(selectedFile),
      }));
    } catch (error) {
      console.error("Error updating the profile image:", error);
    }
  };

  const HandleEdit = async (e) => {
    e.preventDefault();
  
    const formData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      phone: phoneRef.current.value,
    };
  
   // Check if any field is empty (value equals "")
    const emptyField = Object.entries(formData).find(([key, value]) => value === "");
  
    if (emptyField) {
      setInvalidUser(false)
      setTimeout(() => {
        setInvalidUser(true)
      }, 2000)
      const [key] = emptyField;
      return;// Stop execution if any field is empty

    }
  
    try {
      await edit(id, formData);
      await handleFileUpload();
  
      navigate(-1);
    } catch (error) {
      console.error("Error of update:", error);
    }
  };
  

  useEffect(() => {
    resetImageProfile();
  }, [userData]);

  const resetImageProfile = () => {
    setImgProfile("http://localhost:8080/images/" + userData.filename);
  };

  return (
    <div id="page-account-worker">
      <SearchBar />
      <main id="content-account-worker">
        <section className="container-back">
          <FaArrowLeftLong onClick={() => navigate(-1)} />
        </section>
        <section className="container-info">
          <div className="container-img-profile">
            <Avatar
              className="avatar-img"
              onClick={() => document.getElementById("file-input").click()}
              alt={userData.username}
              src={imgProfile || "/static/images/avatar/1.jpg"}
              sx={{ width: 90, height: 90 }}
            />
            <BiSolidPencil className="edit-mode-icon" />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="file-input"
          />
          <h1> {userData.username} </h1>
          <p> {""} </p>
        </section>
        <form onSubmit={HandleEdit} className="container-inputs">
          <InputFormSetting
            title={"Nombre"}
            option={2}
            placeholder={userData.username}
            ref={usernameRef}
            ariaLabeledBy="name-update-label"
          />
          <InputFormSetting
            title={"Contraseña"}
            option={2}
            placeholder={userData.phone}
            type="password"
            ref={passwordRef}
            ariaLabeledBy="password-update-label"
          />
          <InputFormSetting
            title={"Telefono"}
            option={2}
            placeholder={"Numero de telefono"}
            ref={phoneRef}
            ariaLabeledBy="phone-update-label"
          />
          <div className="container-btn-account">
            <Button text={"Actualizar"} submit={true} />
          </div>
        </form>
        <Stack
        sx={{ display: `${invalidUser ? "none" : "block"}`, width: "90%" }}
        spacing={2}
      >
        <Alert  severity="error"> No hay datos para actualizar </Alert>
      </Stack>
        <TabsBar />
      </main>
    </div>
  );
}
