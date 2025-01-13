import {
  create,
  edit,
  editImg,
  getOne,
} from "../../../../services/school.service";
import Button from "../../../button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Label from "../../../label/Label";
import "../Form.scss";

export default function SchoolForm() {
  const navigate = useNavigate();
  const [schoolData, setSchoolData] = useState({});
  const { id } = useParams();

  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    getOne(id)
      .then((data) => {
        setSchoolData(data);
      })
      .catch((error) => console.error("Error fetching admin data:", error));
  }, [id]);

  const handleCreate = async (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      address: addressRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
    };

    const photo = fileRef.current.files[0];

    try {
      const user = await create(formData);
      await editImg(user.id, { file: photo });

      navigate(-1);
    } catch (error) {
      console.error("Error en el proceso de creación:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const photo = fileRef.current.files[0];

    // Create a url for see the image
    // const url = URL.createObjectURL(photo)

    const formData = {
      name: nameRef.current.value,
      address: addressRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
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
        <h2>Colegio</h2>
        <Label
          id={"name-school"}
          placeHolder={ id ? schoolData.name : "Nombre del colegio"}
          title={"Nombre"}
          type={"text"}
          ref={nameRef}
        />
        <Label
          id={"address-school"}
          placeHolder={ id ? schoolData.address : "Direccion del colegio"}
          title={"Direccion"}
          type={"text"}
          ref={addressRef}
        />
        <Label
          id={"email-school"}
          placeHolder={ id ? schoolData.email : "Correo del colegio"}
          title={"Correo"}
          type={"email"}
          ref={emailRef}
        />
        <Label
          id={"phone-school"}
          placeHolder={ id ? schoolData.phone : "Telefono del colegio"}
          title={"Telefono"}
          type={"text"}
          ref={phoneRef}
        />
        <Label
          id={"photo-school"}
          placeHolder={"Foto del colegio"}
          title={"Foto del colegio"}
          type={"file"}
          ref={fileRef}
        />
        <div id="buttons">
          <Button submit={true} text={id ? "Editar" : "Crear"} />
        </div>
      </form>
    </main>
  );
}
