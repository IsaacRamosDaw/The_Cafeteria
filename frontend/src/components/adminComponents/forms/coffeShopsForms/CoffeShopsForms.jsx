import Button from "../../../button/Button";
import {
  create,
  edit,
  editImg,
  getOne,
} from "../../../../services/coffeShop.service";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Label from "../../../label/Label";
import '../Form.scss'

export default function CoffeShopsForms() {
  const navigate = useNavigate();
  const [coffeShopData, setCoffeShopData] = useState({ name: "" });
  const { id } = useParams();

  const nameRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    getOne(id)
      .then((data) => {
        setCoffeShopData(data);
      })
      .catch((error) => console.error("Error fetching coffe shop data:", error));
  }, [id]);

  const handleCreate = async (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
    };

    const photo = photoRef.current.files[0];

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

    const photo = photoRef.current.files[0];

    // Create a url for see the image
    // const url = URL.createObjectURL(photo)

    const formData = {
        name: nameRef.current.value
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
      <form onSubmit={id ? handleEdit : handleCreate} id="worker-form">
        <h2>Cafeteria</h2>
        <Label
          id={"name-coffeShop"}
          placeHolder={ id ? coffeShopData.name : "Nombre de la Cafeteria"}
          title={"Nombre"}
          type={"text"}
          ref={nameRef}
        />
        <Label
          id={"photo-coffeShop"}
          placeHolder={"Foto del Cafeteria"}
          title={"Foto de la cafeteria"}
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
