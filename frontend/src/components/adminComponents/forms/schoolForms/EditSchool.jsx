import Button from "../../../button/Button";
import Label from "../../../label/Label";
import { edit } from "../../../../services/schoolService";
import { useNavigate } from "react-router-dom";
import "../Form.scss";
export default function EditSchool() {
    const navigate = useNavigate();

    const handleEdit = async (e) => {
      e.preventDefault();

      edit(id);

      navigate("/dashboard");
  };
  
  return (
    <main className="form-container">
      <form id="school-form">
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
          <Button onClick={handleEdit} text={"Editar"} />
        </div>
      </form>
    </main>
  );
}