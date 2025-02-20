import Button from "../../../button/Button";
import {
  create,
  edit,
  updateProfilePicture,
  getOne,
} from "../../../../services/worker.service";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Label from "../../../label/Label";
import '../Form.scss'

export default function WorkerForm() {
  const navigate = useNavigate();
  const [workerData, setWorkerData] = useState({ name: "" });
  const { id } = useParams();

  const [errorName, setErrorName] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);

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

    if (formData.username.length < 3 || formData.username.length > 15) {
      setErrorName("El nombre de usuario debe tener entre 3 y 15 caracteres.");
      hasError = true;
    } else {
      setErrorName(null);
    }

    if (formData.password.length < 3 || formData.password.length > 15) {
      setErrorPassword("La contraseña debe tener entre 3 y 15 caracteres")
      hasError = true;
    } else {
      setErrorPassword(null);
    }

    if (formData.phone.length < 9 || formData.phone.length > 12) {
      setErrorPhone("El formato del teléfono debe ser entre 9 y 12 dígitos")
      hasError = true;
    } else {
      setErrorPhone(null);
    }

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

    if (formData.username.length < 3 || formData.username.length > 15) {
      setErrorName("El nombre de usuario debe tener entre 3 y 15 caracteres.");
      hasError = true;
    } else {
      setErrorName(null);
    }

    if (formData.password.length < 3 || formData.password.length > 15) {
      setErrorPassword("La contraseña debe tener entre 3 y 15 caracteres")
      hasError = true;
    } else {
      setErrorPassword(null);
    }

    if (formData.phone.length < 9 || formData.phone.length > 12) {
      setErrorPhone("El formato del teléfono debe ser entre 9 y 12 dígitos")
      hasError = true;
    } else {
      setErrorPhone(null);
    }

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
        {errorName && <p className="error-text-validation">{errorName}</p>}
        <Label
          id={"name-worker"}
          placeHolder={workerData.username || "Nombre del trabajador"}
          title={"Nombre"}
          type={"text"}
          ref={usernameRef}
        />
        {errorPassword && <p className="error-text-validation">{errorPassword}</p>}
        <Label
          id={"password-worker"}
          placeHolder={"Contraseña del trabajador"}
          title={"Contraseña"}
          type={"password"}
          ref={passwordRef}
        />
        {errorPhone && <p className="error-text-validation">{errorPhone}</p>}
        <Label
          id={"phone-worker"}
          placeHolder={workerData.phone || "Telefono del trabajador"}
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
