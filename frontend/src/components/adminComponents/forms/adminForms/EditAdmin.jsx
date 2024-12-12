import Button from "../../../button/Button";
// import Label from "../../../label/Label";
import { edit, getOne } from "../../../../services/adminService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Label from "../../../label/Label";

export default function EditAdmin() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({ name: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useParams();
  
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const photoRef = useRef(null)

  useEffect(() => {
    getOne(id)
      .then((data) => {
        setAdminData(data);
      })
      .catch((error) => console.error("Error fetching admin data:", error));
  }, [id]);

  // const handleFileUpload = async () => {
  //   if (!selectedFile) {
  //     return;
  //   }
  //   try {
  //     await updateProfilePicture(id, selectedFile);
  //     setUserData((prev) => ({
  //       ...prev,
  //       imgProfile: URL.createObjectURL(selectedFile),
  //     }));
  //   } catch (error) {
  //     console.error("Error al actualizar la imagen de perfil:", error);
  //   }
  // };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log(file);
      setSelectedFile(file);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      file: photoRef.current.value
    }

    console.log(formData)

    // try {
    //   await edit(id, formData);
    //   navigate(-1);
    // } catch (error) {
    //   console.error("Error al editar:", error);
    // }
  };

  return (
    <main className="form-container">
      <form onSubmit={handleEdit} id="admin-form">
        <h2>Admin</h2>
        <Label
          id={"name-admin"}
          placeHolder={"Nombre del administrador"}
          title={"Nombre"}
          type={"text"}
          ref={usernameRef}
        />
        <Label
          id={"password-admin"}
          placeHolder={"Contraseña del administrador"}
          title={"Contraseña"}
          type={"password"}
          ref={passwordRef}
        />
        <Label
          id={"photo-admin"}
          placeHolder={"Foto del administrador"}
          title={"Foto de perfil"}
          type={"file"}
          onchange={handleFileChange}
          ref={photoRef}
        />
        <div id="buttons">
          <Button submit={true} text={"Crear"} />
        </div>
      </form>
    </main>
  );
}
