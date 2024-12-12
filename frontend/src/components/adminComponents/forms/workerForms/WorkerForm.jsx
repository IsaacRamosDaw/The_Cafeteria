import Button from "../../../button/Button";
import {
  create,
  edit,
  updateProfilePicture,
  getOne,
} from "../../../../services/workerService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Label from "../../../label/Label";

export default function WorkerForm() {
  const navigate = useNavigate();
  const [workerData, setWorkerData] = useState({ name: "" });
  const { id } = useParams();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    getOne(id)
      .then((data) => {
        setWorkerData(data);
      })
      .catch((error) => console.error("Error fetching worker data:", error));
  }, [id]);

  const handleCreate = async (e) => {
    e.preventDefault();

    const formData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      phone: phoneRef.current.value,
    };

    const photo = photoRef.current.files[0];

    try {
      const user = await create(formData);
      await updateProfilePicture(user.id, { file: photo });

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
        phone: phoneRef.current.value,
      };

    console.log(formData);

    try {
      await edit(id, formData);
      await updateProfilePicture(id, { file: photo });
      navigate(-1);
    } catch (error) {
      console.error("Error al editar:", error);
    }
  };

  return (
    <main className="form-container">
      <form onSubmit={id ? handleEdit : handleCreate} id="worker-form">
        <h2>Trabajador</h2>
        <Label
          id={"name-worker"}
          placeHolder={workerData.username || "Nombre del trabajador"}
          title={"Nombre"}
          type={"text"}
          ref={usernameRef}
        />
        <Label
          id={"password-worker"}
          placeHolder={"Contraseña del trabajador"}
          title={"Contraseña"}
          type={"password"}
          ref={passwordRef}
        />
        <Label
          id={"phone-worker"}
          placeHolder={ workerData.phone || "Telefono del trabajador"}
          title={"Telefono"}
          type={"text"}
          ref={phoneRef}
        />
        <Label
          id={"photo-worker"}
          placeHolder={"Foto del trabajador"}
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
