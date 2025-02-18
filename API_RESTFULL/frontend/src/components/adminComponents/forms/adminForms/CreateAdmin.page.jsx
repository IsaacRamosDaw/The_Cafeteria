import Button from "../../../button/Button";
import Label from "../../../label/Label";
import { create, editImg } from "../../../../services/admin.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Form.scss";

function CreateAdmin() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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
      // Intentamos crear el usuario
      const user = await create(formData);

      // Si `create` falla, no llegamos a este punto
      if (!user?.admin?.id) {
        throw new Error("Failed to retrieve the user ID.");
      }

      // Llamar a `editImg` solo si `create` tuvo éxito
      if (formData.file) {
        await editImg(user.admin.id, formData.file);
      }

      navigate(-1);
    } catch (error) {
      console.error("Error in the creation process:", error);
      setError("Error en la creación del administrador");
    }
  };

  return (
    <main className="form-container">
      <form onSubmit={handleCreate} id="admin-form">
        <h2>Admin</h2>
        <Label id="name-admin" placeHolder="Nombre del administrador" title="Nombre" type="text" />
        <Label id="password-admin" placeHolder="Contraseña del administrador" title="Contraseña" type="password" />
        <Label id="photo-admin" placeHolder="Foto del administrador" title="Foto de perfil" type="file" />
        {error && <p data-testid="error-message">{error}</p>}
        <div id="buttons">
          <Button submit={true} text="Crear" />
        </div>
      </form>
    </main>
  );
}

export default CreateAdmin;
