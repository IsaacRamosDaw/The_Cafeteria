import Button from "../../../button/Button";
import {
  create,
  edit,
  getOne,
} from "../../../../services/admin.service";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Label from "../../../label/Label";
import '../Form.scss'

export default function AdminForm() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({ name: "" });
  const { id } = useParams();

  const [errorName, setErrorName] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    getOne(id)
      .then((data) => {
        setAdminData(data);
      })
      .catch((error) => console.error("Error fetching admin data:", error));
  }, [id]);

  const handleCreate = async (e) => {
    e.preventDefault();

    // let hasError = false; 

    const formData = new FormData()
    formData.append('username', usernameRef.current.value)
    formData.append('password', passwordRef.current.value)
    formData.append('file', photoRef.current.files[0])

    // if(formData.username.length < 3 || formData.username.length > 15){
    //   setErrorName("El nombre de usuario debe tener entre 3 y 15 caracteres.");
    //   hasError = true;
    // } else {
    //   setErrorName(null);
    // }

    // if(formData.password.length < 3 || formData.password.length > 15){
    //   setErrorPassword("La contraseña debe tener entre 3 y 15 caracteres")
    //   hasError = true;
    // } else {
    //   setErrorPassword(null);
    // }

    // if (hasError) return;

    try {
      await create(formData);

      navigate(-1);
    } catch (error) {
      console.error("Error en el proceso de creación:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('username', usernameRef.current.value)
    formData.append('password', passwordRef.current.value)
    formData.append('file', photoRef.current.files[0])

    // if(formData.username.length < 3 || formData.username.length > 15){
    //   setErrorName("El nombre de usuario debe tener entre 3 y 15 caracteres.");
    //   hasError = true;
    // } else {
    //   setErrorName(null);
    // }

    // if(formData.password.length < 3 || formData.password.length > 15){
    //   setErrorPassword("La contraseña debe tener entre 3 y 15 caracteres")
    //   hasError = true;
    // } else {
    //   setErrorPassword(null);
    // }
    
    console.log(formData);

    try {
      await edit(id, formData);
      
      navigate(-1);
    } catch (error) {
      console.error("Error al editar:", error);
    }
  };

  return (
    <main className="form-container">
      <form onSubmit={id ? handleEdit : handleCreate} id="admin-form">
        <h2>Admin</h2>
        {errorName && <p className="error-text-validation">{errorName}</p>}
        <Label
          id={"name-admin"}
          placeHolder={ id ? adminData.username : "Nombre del administrador"}
          title={"Nombre"}
          type={"text"}
          ref={usernameRef}
        />

        {errorPassword && <p className="error-text-validation">{errorPassword}</p>}
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
          ref={photoRef}
        />
        <div id="buttons">
          <Button submit={true} text={id ? "Editar" : "Crear"} />
        </div>
      </form>
    </main>
  );
}
