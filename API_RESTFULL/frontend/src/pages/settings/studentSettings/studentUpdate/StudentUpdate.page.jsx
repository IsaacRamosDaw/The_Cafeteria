import SearchBar from "../../../../components/searchBar/SearchBar.jsx";
import TabsBar from "../../../../components/tabsBar/TabsBar.jsx";
import Button from "../../../../components/button/Button.jsx";
import InputFormSetting from "../../../../components/setttingsComp/inputFormSetting/InputFormSetting.jsx";
import { getOne, edit, updateProfilePicture } from "../../../../services/student.service.js";
import { get, getOne as getOneStudent } from "../../../../services/course.service.js";
import Avatar from "@mui/material/Avatar";
import { BiSolidPencil } from "react-icons/bi";
import { getUserId } from "../../../../services/utils.js";
import { Alert } from "@mui/material";
import Stack from "@mui/material/Stack";
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
  const [invalidUser, setInvalidUser] = useState(true);
  const [resultForm, setResultForm] = useState(false);

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
    const fetchData = async () => {
      try {
        const studentData = await getOne(id);
        setUserData(studentData);

        const courseData = await getOneStudent(id);
        setCurrentCourse(courseData.name);

        const coursesData = await get();
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImgProfile(URL.createObjectURL(file));
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
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

    // Validar campos obligatorios
    if (!formData.username || !formData.password || !formData.age || !formData.CourseId || !formData.phone) {
      setResultForm(true);
      setInvalidUser(false); // Mostrar mensaje de error
      setTimeout(() => {
        setResultForm(false);
      }, 2000);
      return; // Detener la ejecución si hay campos vacíos
    }

    try {
      await edit(id, formData);
      await handleFileUpload();

      setResultForm(true);
      setInvalidUser(true); // Mostrar mensaje de éxito
      setTimeout(() => {
        setResultForm(false);
        navigate(-1)
      }, 2000);

    } catch (error) {
      setResultForm(true);
      setInvalidUser(false); // Mostrar mensaje de error
      setTimeout(() => {
        setResultForm(false);
      }, 2000);
      console.error("Error of update:", error);
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
              role="img"
              className="avatar-img"
              onClick={() => document.getElementById("file-input").click()}
              alt={userData.username}
              src={imgProfile || "/static/images/avatar/1.jpg"}
              sx={{ width: 90, height: 90 }}
            />
            <BiSolidPencil className="edit-mode-icon" />
          </div>
          <label aria-hidden="true" style={{ display: "none" }} htmlFor="file-input">
            Foto
          </label>
          <input
            aria-hidden="true"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="file-input"
            name="file-input"
          />
          <div className="container-info-student">
            <h2 className="name-student-update-profile">{userData.username}</h2>
            <h3 className="course-student-update-profile">{currentCourse}</h3>
          </div>
        </section>
        <form onSubmit={HandleEdit} className="container-inputs">
          <InputFormSetting
            title={"Nombre"}
            option={2}
            placeholder={userData.username}
            ref={usernameRef}
          />
          <InputFormSetting
            title={"Contraseña"}
            option={2}
            placeholder="Nueva contraseña"
            type="password"
            ref={passwordRef}
          />
          <InputFormSetting
            title={"Edad"}
            option={2}
            type="number"
            placeholder={userData.age}
            ref={ageRef}
          />
          <div className="label-input">
            <label aria-label="Course" className="label-text" htmlFor="CourseId">
              Selecciona tu curso
            </label>
            <select
              className="select-courses-container"
              id="CourseId"
              name="CourseId"
              ref={CourseIdRef}
            >
              <option>Elige un curso</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <InputFormSetting
            title={"Teléfono"}
            type={"number"}
            option={2}
            placeholder={userData.phone}
            ref={phoneRef}
          />
          <div className="container-btn-account">
            <Button role="button" text={"Actualizar"} submit={true} />
          </div>
        </form>
        <Stack sx={{ display: resultForm ? "block" : "none", width: "90%" }} spacing={2}>
          {invalidUser ? (
            <Alert severity="success">Datos actualizados</Alert>
          ) : (
            <Alert severity="error">Datos incorrectos</Alert>
          )}
        </Stack>
        <TabsBar />
      </main>
    </div>
  );
}

export default StudentUpdate;