import Button from "../../../button/Button";
import {
  create,
  edit,
  editImg,
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

    const formData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    const photo = photoRef.current.files[0];

    console.log(formData)

    try {
      const user = await create(formData);
      await editImg(user.admin.id, { file: photo });

      navigate(-1);
    } catch (error) {
      console.error("Error en el proceso de creación:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const photo = photoRef.current.files[0];

    // Create a url for see the image
    // const url = URL.createObjectURL(photo)

    const formData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    console.log(formData);

    try {
      await edit(id, formData);
      await editImg(id, { file: photo });
      navigate(-1);
    } catch (error) {
      console.error("Error al editar:", error);
    }
  };

  return (
    <main className="form-container">
      <form onSubmit={id ? handleEdit : handleCreate} id="admin-form">
        <h2>Admin</h2>
        <Label
          id={"name-admin"}
          placeHolder={ id ? adminData.username : "Nombre del administrador"}
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
          ref={photoRef}
        />
        <div id="buttons">
          <Button submit={true} text={id ? "Editar" : "Crear"} />
        </div>
      </form>
    </main>
  );
}
