// import Button from "../../../button/Button";
// import Label from "../../../label/Label";
// import { create } from "../../../../services/coffeshopService";
// import { useNavigate } from "react-router-dom";
// import "../Form.scss";

// function CreateCoffeShop() {
//   const navigate = useNavigate();

//   const handleCreate = (e) => {
//     e.preventDefault();

//     let nameCoffeShop = document.querySelector("#name-coffeShop");
//     let fileCoffeShop = document.querySelector("#file-coffeShop");
    
//     const formData = {
//       name: nameCoffeShop.value,
//       file: fileCoffeShop.value,
//     };

//     console.log('bbbbbb', create(formData).then(() => {
//       navigate(-1);
//     }));
    
//   };

//   return (
//     <main className="form-container">
//       <form onSubmit={handleCreate} id="coffeShop-form">
//         <h2>Cafetería</h2>
//         <Label
//           id={"name-coffeShop"}
//           placeHolder={"Nombre de la cafetería"}
//           title={"Nombre"}
//           type={"text"}
//         />
//         <Label
//           id={"file-coffeShop"}
//           title={"Imagen"}
//           type={"file"}
//         />

//         <div id="buttons">
//           <Button submit={true} text={"Crear"} />
//         </div>
//       </form>
//     </main>
//   );
// }

// export default CreateCoffeShop;


