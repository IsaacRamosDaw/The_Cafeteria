import Button from "../../../button/Button";
import Label from "../../../label/Label";
import { create } from "../../../../services/adminService";
import { useNavigate } from "react-router-dom";
import "../Form.scss";

function CreateCoffeShop() {
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();

    let nameCoffeShop = document.querySelector("#name-coffeshop");
    let fileCoffeShop = document.querySelector("#file-coffeshop")
    
    const formData = {
        name: nameCoffeShop.value,
        file: fileCoffeShop.value
    };

    console.log('bbbbbb', create(formData).then(() => {
      navigate(-1);
    }));
    
  };

  return (
    <main className="form-container">
      <form onSubmit={handleCreate} id="coffeshop-form">
        <h2>Cafetería</h2>
        <Label
          id={"name-coffeshop"}
          placeHolder={"Nombre de la cafetería"}
          title={"Nombre"}
          type={"text"}
        />
        <Label
          id={"file-coffeshop"}
          placeHolder={"Imagen de la cafetería"}
          title={"Imagen"}
          type={"file"}
        />
        <div id="buttons">
          <Button submit={true} text={"Crear"} />
        </div>
      </form>
    </main>
  );
}

export default CreateCoffeShop;

