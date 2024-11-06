import Button from "../../../button/Button";
import Label from "../../../label/Label";
import { create } from "../../../../services/schoolService";
import { useNavigate } from "react-router-dom";
import "../Form.scss";

function CreateSchool() {
    const navigate = useNavigate();

    const handleCreate = (e) => {
      e.preventDefault();

      let nameSchool = document.querySelector("#name-school");
      let addressSchool = document.querySelector("#address-school");
      let emailSchool= document.querySelector("#email-school")
      let phoneSchool = document.querySelector("#phone-school");
      const formData = {
        name: nameSchool.value,
        address: addressSchool.value,
        email: emailSchool.value,
        phone: phoneSchool.value
      };

      create(formData).then(() => {
        navigate(-1);
      });
  };
  
  return (
        <main className="form-container">
      <form onSubmit={handleCreate} id="school-form">
        <h2>Colegio</h2>
        <Label
          id={"name-school"}
          placeHolder={"Nombre del colegio"}
          title={"Nombre"}
          type={"text"}
        />
        <Label
          id={"address-school"}
          placeHolder={"Dirección del colegio"}
          title={"Dirección"}
          type={"text"}
        />
        <Label
          id={"email-school"}
          placeHolder={"Email del colegio"}
          title={"Email"}
          type={"email"}
        />
        <Label
          id={"phone-school"}
          placeHolder={"Teléfono del colegio"}
          title={"Teléfono"}
          type={"phone"}
        />

        <div id="buttons">
          <Button submit={true} text={"Crear"} />
        </div>
      </form>
    </main>
  )
}

export default CreateSchool;