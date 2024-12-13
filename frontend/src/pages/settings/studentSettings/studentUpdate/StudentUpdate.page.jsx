import SearchBar from "../../../../components/searchBar/SearchBar.jsx";
import TabsBar from "../../../../components/tabsBar/TabsBar.jsx";
import Button from "../../../../components/button/Button.jsx";
import InputFormSetting from "../../../../components/setttingsComp/inputFormSetting/InputFormSetting.jsx";
import {
  getOne,
  edit,
  updateProfilePicture,
} from "../../../../services/student.service.js";
import {
  get,
  getOne as getOneStudent,
} from "../../../../services/course.service.js";
import Avatar from "@mui/material/Avatar";
import { BiSolidPencil } from "react-icons/bi";

import { getUserId, getUserRole } from "../../../../services/utils.js";

import { deepOrange } from "@mui/material/colors";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./StudentUpdate.scss";

function StudentUpdate() {
  const navigate = useNavigate();
  const id = getUserId();
  const [selectedFile, setSelectedFile] = useState(null);
  const [courses, setCourses] = useState([]);

  const [imgProfile, setImgProfile] = useState("");
  const [currentCourse, setCurrentCourse] = useState("");

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

    getOneStudent(id).then((data) => {
      setCurrentCourse(data.name);
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
      age: ageRef.current.value,
      CourseId: CourseIdRef.current.value,
      phone: phoneRef.current.value,
    };

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
    <div id="page-account-client">
      <SearchBar />
      <main id="content-account-client">
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
          <p> {currentCourse} </p>
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
            className="select-courses-container"
              name="CourseId"
              ref={CourseIdRef}
              onChange={handleInputChange}
            >
              <option>Elige un curso</option>
              {courses.map((course, index) => (
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

export default StudentUpdate