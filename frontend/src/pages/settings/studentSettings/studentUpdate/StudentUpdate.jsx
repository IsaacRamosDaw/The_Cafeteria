import SearchBar from "../../../../components/searchBar/SearchBar";
import TabsBar from "../../../../components/tabsBar/TabsBar";
import Button from "../../../../components/button/Button";
import InputFormSetting from "../../../../components/setttingsComp/inputFormSetting/InputFormSetting";
import {
  getOne,
  edit,
  updateProfilePicture,
} from "../../../../services/studentService";
import { get } from "../../../../services/courseService";
import Avatar from "@mui/material/Avatar";

import { getUserId, getUserRole } from "../../../../services/utils.js";

import { deepOrange } from "@mui/material/colors";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./StudentUpdate.scss";

export default function AccountSettings() {
  const navigate = useNavigate();
  const id = getUserId();
  const [selectedFile, setSelectedFile] = useState(null);
  const [courses, setCourses] = useState([]);

  // Ref hooks
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const ageRef = useRef(null);
  const CourseIdRef = useRef(null);
  const phoneRef = useRef(null);

  // DB data
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    age: "",
    phone: "",
    imgProfile: "",
    CourseId: "",
  });

  useEffect(() => {
    getOne(id).then((data) => {
      setUserData(data);
    });
    
    get()
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Por favor, selecciona un archivo primero.");
      return;
    }
    try {
      await updateProfilePicture(id, selectedFile);
      alert("Imagen de perfil actualizada correctamente");
      setUserData((prev) => ({
        ...prev,
        imgProfile: URL.createObjectURL(selectedFile),
      }));
    } catch (error) {
      console.error("Error al actualizar la imagen de perfil:", error);
      alert("Hubo un error al subir la imagen.");
    }
  };

  const HandleEdit = async (e) => {
    e.preventDefault();

    const formData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      age: ageRef.current.value,
      CourseId: CourseIdRef.current.value,
      phone: phoneRef.current.value,
    };

    try {
        await edit(id, formData);
        alert("Datos actualizados correctamente");
        navigate(-1);
    } catch (error) {
        console.error("Error al editar:", error);
    }
  };

  return (
    <div id="page-account-client">
      <SearchBar />
      <main id="content-account-client">
        <section className="container-back">
          <FaArrowLeftLong onClick={() => navigate(-1)} />
        </section>
        <section className="container-info">
          <div className="container-img-profile">
            <Avatar
              alt={userData.username}
              src={userData.imgProfile || "/static/images/avatar/1.jpg"}
              sx={{ bgcolor: deepOrange[500], width: 70, height: 70 }}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="file-input"
          />
          <button
            className="btn-change-image"
            onClick={() => document.getElementById("file-input").click()}
          >
            Cambiar Imagen
          </button>
          <button
            className="btn-upload"
            onClick={handleFileUpload}
            disabled={!selectedFile}
          >
            Subir Imagen
          </button>
        </section>
        <form onSubmit={HandleEdit} className="container-inputs">
          <InputFormSetting
            title={"Nombre"}
            option={2}
            placeholder={userData.username}
            onChange={handleInputChange}
            ref={usernameRef}
          />
          <InputFormSetting
            title={"Contraseña"}
            option={2}
            placeholder="Nueva contraseña"
            type="password"
            onChange={handleInputChange}
            ref={passwordRef}
          />
          <InputFormSetting
            title={"Edad"}
            option={2}
            placeholder={userData.age}
            onChange={handleInputChange}
            ref={ageRef}
          />
          <div className="label-input">
            <label className="label-text" htmlFor="CourseId">
              Selecciona tu curso
            </label>
            <select
              name="CourseId"
              ref={CourseIdRef}
              value={userData.CourseId}
              onChange={handleInputChange}
            >
              <option value="">Elige un curso</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <InputFormSetting
            title={"Teléfono"}
            option={2}
            placeholder={userData.phone}
            ref={phoneRef}
            onChange={handleInputChange}
          />
          <div className="container-btn-account">
            <Button text={"Actualizar"} submit={true} />
          </div>
        </form>
        <TabsBar />
      </main>
    </div>
  );
}
