import Button from "../../../button/Button";
import Label from "../../../label/Label";
import { create, editImg } from "../../../../services/admin.service";
import { useNavigate } from "react-router-dom";
import "../Form.scss";

function CreateAdmin() {
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    let nameAdmin = document.querySelector("#name-admin");
    let passwordAdmin = document.querySelector("#password-admin");
    let photoAdmin = document.querySelector("#photo-admin").files[0];

    const formData = {
      username: nameAdmin.value,
      password: passwordAdmin.value,
      file: photoAdmin,
    };

    try {
      // Crear el usuario y esperar el resultado
      const user = await create(formData);

      console.log("User created:", user);

      // Verificar si el ID existe
      if (user.admin && user.admin.id) {
        const updatedImg = await editImg(user.admin.id, formData.file);
        console.log("Image updated:", updatedImg);
      } else {
        console.error("Failed to retrieve the user ID.");
      }

      // Redirect to the previous page
      navigate(-1);
    } catch (error) {
      console.error("Error in the creation process:", error);
    }
  };

  return (
    <main className="form-container">
      <form onSubmit={handleCreate} id="admin-form">
        <h2>Admin</h2>
        <Label
          id={"name-admin"}
          placeHolder={"Nombre del administrador"}
          title={"Nombre"}
          type={"text"}
        />
        <Label
          id={"password-admin"}
          placeHolder={"Contraseña del administrador"}
          title={"Contraseña"}
          type={"password"}
        />
        <Label
          id={"photo-admin"}
          placeHolder={"Foto del administrador"}
          title={"Foto de perfil"}
          type={"file"}
        />
        <div id="buttons">
          <Button submit={true} text={"Crear"} />
        </div>
      </form>
    </main>
  );
}

export default CreateAdmin;
